"use server"

import sql_Elephant from "@/app/lib/test/connectpostgre";
import { NextRequest, NextResponse } from "next/server";
import { isConvertibleToNumber } from "@/app/lib/Nova_aetas/data";
import { Result_campaign, Inventory, HERO, Injury, Skill, Conquest, Hero, Treasury, Mission, Campaign_data } from "@/app/lib/Nova_aetas/definitions";
import { verifySession } from "@/app/lib/dal"
import { unstable_noStore as noStore } from 'next/cache';
import { redirect } from "next/navigation";

export async function GET(Request: NextRequest, params: { params: { id: string, item: string } }): Promise<NextResponse> { // esempio di get funzionanate
    const session = await verifySession()
    noStore()
    // Check if the user is authenticated
    if (!session.isAuth) {
        // User is not authenticated
        console.log('non autenticato', session);
        redirect('/')
        return new NextResponse(null, { status: 401 })

    }

    const id = params.params.id.trim()
    if (!isConvertibleToNumber(id)) {
        console.log('campaing_id not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const id_campaign = parseFloat(id)
    //const id_campaign = 1 // per il momento non abilito la creazione campagna e la scelta della stessa. Successivamente da implementare una reicrca get con parametro id
    try {
        console.log('FETCHING campaign_data');
        const campaign_results: Result_campaign[] = await sql_Elephant`
        SELECT
            campaigns.name,
            campaigns.campaign_id,
            inventory.id AS inventory_id,
            inventory.item AS inventory_item_name,
            conquests.number AS conquest,
            conquests.id AS conquest_id,
            treasury.id AS treasury_id,
            treasury.name AS treasury_name,
            treasury.icon AS treasury_icon,
            treasury.purchase AS treasury_purchase,
            treasury.sale AS treasury_sale,
            treasury.quantity AS treasury_quantity,
            missions.id AS mission_id,
            missions.name AS mission_name,
            missions.type AS mission_type,
            missions.detail AS mission_detail,
            missions.complete AS mission_complete
        FROM campaigns
        LEFT JOIN inventory ON campaigns.campaign_id = inventory.campaign_id
        LEFT JOIN conquests ON campaigns.campaign_id = conquests.campaign_id
        LEFT JOIN treasury ON campaigns.campaign_id = treasury.campaign_id
        LEFT JOIN missions ON campaigns.campaign_id = missions.campaign_id
        WHERE campaigns.campaign_id = ${id_campaign};
        `
        console.log('FETCHED campaign_data');
        const campaign_schedule: Campaign_data = {
            campaign: null,
            inventory: null,
            treasury: null,
            missions: null,
            conquests: null
        }
        console.log(campaign_results);
        if (campaign_results.length <= 0) {
            console.log('campagna inesistente');
            return new NextResponse(JSON.stringify(null))
        }

        if (campaign_results && campaign_results[0].campaign_id) {
            const campaign = {
                name: campaign_results[0].name,
                campaign_id: campaign_results[0].campaign_id,
            }
            campaign_schedule.campaign = { ...campaign };
        } else {
            return new NextResponse(JSON.stringify(null))
        }

        if (campaign_results[0].treasury_id) {
            const treasure_duplicate = campaign_results.map(el => {
                return {
                    id: el.treasury_id,
                    name: el.treasury_name,
                    campaign_id: el.campaign_id,
                    quantity: el.treasury_quantity,
                    purchase: el.treasury_purchase,
                    sale: el.treasury_sale,
                    icon: el.treasury_icon
                }
            }) as Treasury[]
            const treasure = filterItems(treasure_duplicate) as Treasury[];
            //console.log(treasure);
            campaign_schedule.treasury = [...treasure]
        }

        //console.log(prova);

        if (campaign_results[0].inventory_id) {
            const inventory_duplicate = campaign_results.map(el => {
                return {
                    id: el.inventory_id,
                    name: el.inventory_item_name,
                    campaign_id: el.campaign_id,
                } as Inventory
            })
            const inventory = filterItems(inventory_duplicate) as Inventory[]
            campaign_schedule.inventory = [...inventory]
        }

        if (campaign_results[0].mission_id) {
            const mission_duplicate = campaign_results.map(el => {
                return {
                    id: el.mission_id,
                    name: el.mission_name,
                    campaign_id: el.campaign_id,
                    type: el.mission_type,
                    detail: el.mission_detail,
                    complete: el.mission_complete
                }
            }) as Mission[]
            const mission = filterItems(mission_duplicate) as Mission[];
            campaign_schedule.missions = [...mission]
        }
        if (campaign_results[0].conquest_id) {
            const conquest_duplicate = campaign_results.map(el => {
                return {
                    id: el.conquest_id,
                    No: el.conquest,
                    campaign_id: el.campaign_id,
                } as Conquest
            })
            const conquest = filterItems(conquest_duplicate) as Conquest[]
            campaign_schedule.conquests = [...conquest]
        }
        // se non trova nessun eroe associato a campagna da array vuoto
        const result_heroes = await sql_Elephant`
        SELECT 
            heroes.campaign_id AS campaign_id,
            heroes.id AS hero_id,
            heroes.name AS hero_name,
            heroes.players AS hero_players,
            heroes.class AS hero_class,
            heroes.liaison AS hero_liaison,
            heroes.note AS hero_note,
            heroes.destiny AS hero_destiny,
            heroes.spent AS hero_spent,
            heroes.earned AS hero_earned,
            heroes.hero_conquests AS hero_conquests,
            heroes.hero_strengthenings AS hero_strengthenings,
            serious_injuries.id AS injury_id,
            serious_injuries.name AS injury_name,
            serious_injuries.popolini AS injury_popolini,
            skills.id AS skill_id,
            skills.name AS skill_name,
            skills.experience AS skill_experience
        FROM heroes
        LEFT JOIN serious_injuries ON serious_injuries.hero_id = heroes.id
        LEFT JOIN skills ON skills.hero_id = heroes.id
        WHERE heroes.campaign_id = ${id_campaign};
    `;

        // Trasformiamo i dati raggruppandoli per eroe
        const heroesMap: { [key: number]: HERO } = {};

        result_heroes.forEach(row => {
            if (!heroesMap[row.hero_id]) {
                heroesMap[row.hero_id] = {
                    campaign_id: row.campaign_id,
                    id: row.hero_id,
                    name: row.hero_name,
                    players: row.hero_players,
                    class: row.hero_class,
                    liaison: row.hero_liaison,
                    note: row.hero_note,
                    destiny: row.hero_destiny,
                    spent: row.hero_spent,
                    earned: row.hero_earned,
                    hero_conquests: row.hero_conquests,
                    hero_strengthenings: row.hero_strengthenings,
                    injuries: [],
                    skills: []
                };
            }

            // Se ci sono ferite (injuries), aggiungile all'eroe
            if (!heroesMap[row.hero_id].injuries) {
                heroesMap[row.hero_id].injuries = [];
            }
            if (row.injury_id) {
                heroesMap[row.hero_id].injuries.push({
                    id: row.injury_id,
                    name: row.injury_name,
                    popolini: row.injury_popolini,
                    hero_id: row.hero_id
                });
            }

            // Se ci sono abilità (skills), aggiungile all'eroe
            if (!heroesMap[row.hero_id].skills) {
                heroesMap[row.hero_id].skills = [];
            }
            if (row.skill_id) {
                heroesMap[row.hero_id].skills.push({
                    id: row.skill_id,
                    name: row.skill_name,
                    experience: row.skill_experience,
                    hero_id: row.hero_id
                });
            }

        });

        // Convertiamo la mappa in un array di HERO
        const heroes: HERO[] = Object.values(heroesMap);

        const dataToSend = {
            campaign_schedule,
            heroes
        }
        return new NextResponse(JSON.stringify(dataToSend))

    } catch (error) {
        console.log(error);
        throw new Error('Failed get.');
    }
}

export async function DELETE(request: NextRequest, params: { params: { id: string } }): Promise<NextResponse> {
    const session = await verifySession()

    // Check if the user is authenticated
    if (!session.isAuth) {
        // User is not authenticated
        return new NextResponse(null, { status: 401 })
    }

    const id = params.params.id.trim()
    if (!isConvertibleToNumber(id)) {
        console.log('campaing_id not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const id_campaign = parseFloat(id)
    console.log(id_campaign);

    try {

        const response = await sql_Elephant`
        DELETE FROM campaigns  
        WHERE campaign_id = ${id_campaign}
        RETURNING*
        ;
        `
        return new NextResponse(JSON.stringify(response))
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))

    }
}


function filterItems(data: Inventory[] | Treasury[] | Mission[] | Conquest[]) {
    const uniqueData = data.filter((item, index, self) =>
        index === self.findIndex((t) => (
            t.id === item.id
        ))
    );
    return uniqueData
}