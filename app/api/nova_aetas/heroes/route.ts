"use server"

import sql_Elephant from "@/app/lib/test/connectpostgre";
import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/app/lib/dal";


export async function POST(Request: NextRequest): Promise<NextResponse> {
    // User authentication and role verification
    const session = await verifySession()

    // Check if the user is authenticated
    if (!session.isAuth) {
        // User is not authenticated
        return new NextResponse(null, { status: 401 })
    }
    const data = await Request.json()
    console.log('controlla richiesta nuovo eroe', data);

    const { name, player, classe, destiny, campaign_id } = data
    console.log(name, player, classe, destiny, campaign_id);
    try {
        const new_hero = await sql_Elephant`
        INSERT INTO heroes (name, players, class, destiny, campaign_id)
        VALUES 
        (${name}, ${player}, ${classe}, ${destiny}, ${campaign_id})
        RETURNING *
        ;
        `
        // console.log(new_hero);

        return new NextResponse(JSON.stringify(new_hero))
    } catch (error) {
        console.log("controlla errore creazione hero", error);
        return new NextResponse(JSON.stringify(null))
    }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
    // User authentication and role verification
    const session = await verifySession()

    // Check if the user is authenticated
    if (!session.isAuth) {
        // User is not authenticated
        return new NextResponse(null, { status: 401 })
    }
    try {
        const response = await sql_Elephant`
        SELECT * FROM heroes;
        `
        return new NextResponse(JSON.stringify(response))
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))
    }
}