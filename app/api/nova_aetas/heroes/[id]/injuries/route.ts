"use server"

import sql_Elephant from "@/app/lib/test/connectpostgre";
import { NextRequest, NextResponse } from "next/server";
import { isConvertibleToNumber } from "@/app/lib/Nova_aetas/data";



export async function POST(request: NextRequest, params: { params: { id: string } }) : Promise<NextResponse> {
    const id = params.params.id.trim()
    if (!isConvertibleToNumber(id)) {
        console.log('hero_id is not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const id_hero = parseFloat(id)
    //console.log(id_hero, typeof id_hero);
    const query: { name: string, popolini: string } = await request.json()
    const { name, popolini } = query
    console.log("controllo richiesta creazione injuriy", name, popolini);
    
    try {
        const response = await sql_Elephant`
        INSERT INTO serious_injuries (name, popolini, hero_id)
        VALUES 
        (${name}, ${popolini}, ${id_hero})
        RETURNING*;
        `
        console.log(response);  
            return new NextResponse(JSON.stringify(response)) 
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))
    }
    
}