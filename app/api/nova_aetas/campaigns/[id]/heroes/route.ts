"use server"

import sql_Elephant from "@/app/lib/test/connectpostgre";
import { NextRequest, NextResponse } from "next/server";
import { isConvertibleToNumber } from "@/app/lib/Nova_aetas/data";

export async function GET(request : NextRequest, params: {params: {id: string}}) {
    console.log(params.params);
    const id = params.params.id.trim()
    console.log(id);
    
    if (!isConvertibleToNumber(id)) {
        console.log('id_campaign is not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    
    const id_campaign = parseFloat(id)
        // aggiungere chiamata a db

    try {
        const response = await sql_Elephant`
        SELECT * from heroes
        WHERE campaign_id = ${id_campaign}  
        ORDER BY name ASC;
        `
        return new NextResponse(JSON.stringify(response))
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))
    }
}