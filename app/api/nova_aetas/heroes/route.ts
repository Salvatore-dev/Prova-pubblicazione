"use server"

import sql_Elephant from "@/app/lib/test/connectpostgre";
import { NextRequest, NextResponse } from "next/server";

export async function POST(Request: NextRequest): Promise<NextResponse> {
    const req = Request
    console.log(req);
    const data = await Request.json()
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
        console.log(error);
        return new NextResponse(JSON.stringify(null))
    }
}

export async function GET(request: NextRequest) : Promise<NextResponse> {
    
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