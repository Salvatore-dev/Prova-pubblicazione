"use server"

import sql_Elephant from "@/app/lib/test/connectpostgre";
import { NextRequest, NextResponse } from "next/server";
import { isConvertibleToNumber } from "@/app/lib/Nova_aetas/data";
import { HERO, Hero, Injury, Skill } from "@/app/lib/Nova_aetas/definitions";
import { verifySession } from "@/app/lib/dal";


export async function DELETE(Request: NextRequest, params: { params: { id: string } }): Promise<NextResponse> {
    // User authentication and role verification
    const session = await verifySession()

    // Check if the user is authenticated
    if (!session.isAuth) {
        // User is not authenticated
        return new NextResponse(null, { status: 401 })
    }

    const id = params.params.id.trim()

    if (!isConvertibleToNumber(id)) {
        console.log('hero_id is not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const id_hero = parseFloat(id)
    try {
        const response = await sql_Elephant`
        DELETE FROM heroes
        WHERE id = ${id_hero}
        RETURNING  *;
        `
        console.log(response);

        return new NextResponse(JSON.stringify(response))
    } catch (error) {
        console.log(error);

        return new NextResponse(JSON.stringify(null))
    }
}

export async function PATCH(Request: NextRequest, params: { params: { id: string } }): Promise<NextResponse> {

    // User authentication and role verification
    const session = await verifySession()

    // Check if the user is authenticated
    if (!session.isAuth) {
        // User is not authenticated
        return new NextResponse(null, { status: 401 })
    }

    const id = params.params.id.trim()

    if (!isConvertibleToNumber(id)) {
        console.log('hero_id is not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const id_hero = parseFloat(id)
    const r: { id_campaign: number } = await Request.json()
    const { id_campaign } = r
    console.log(typeof id_campaign, id_campaign);

    try {
        const data: HERO[] = await Promise.all(
            [id_hero].map(async el => {
                const hero: Hero[] = await sql_Elephant`
                UPDATE heroes
                SET campaign_id = ${id_campaign}
                WHERE id = ${el}
                RETURNING*;
                `
                const injuries: Injury[] = await sql_Elephant`
                SELECT*
                FROM serious_injuries
                WHERE serious_injuries.hero_id = ${el};
                `
                const skills: Skill[] = await sql_Elephant`
                SELECT*
                FROM skills
                WHERE skills.hero_id = ${el};
                `
                return {
                    ...hero[0],
                    injuries: injuries,
                    skills: skills,
                }
            })

        )
        if (data[0].id) {
            return new NextResponse(JSON.stringify(data[0]))
        } else return new NextResponse(JSON.stringify(null))



    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))
    }

}