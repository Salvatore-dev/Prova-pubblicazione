"use server"

import sql_Elephant from "@/app/lib/test/connectpostgre";
import { NextRequest, NextResponse } from "next/server";

import { isConvertibleToNumber } from "@/app/lib/Nova_aetas/data";


export async function GET(request: NextRequest, params: {params: {id: string}}) : Promise<NextResponse> {
    const id = params.params.id.trim()
    if (!isConvertibleToNumber(id)) {
        console.log('campaing_id not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const id_campaign = parseFloat(id)
    
    try {
        const response = await sql_Elephant`
        SELECT*
            FROM inventory
            WHERE campaign_id = ${id_campaign} ;
        `
        return new NextResponse(JSON.stringify(response))
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))
        
    }

}


export async function POST(request: NextRequest, params: {params: {id: string}}) : Promise<NextResponse> {
    const id = params.params.id.trim()
    if (!isConvertibleToNumber(id)) {
        console.log('campaing_id not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const id_campaign = parseFloat(id)

    try {
        const data = await request.json()
        const {item} = data
        console.log(item);
        if (item) {
           const newElement = await sql_Elephant`
           INSERT INTO inventory (item, campaign_id)
            VALUES (${item}, ${id_campaign})
            RETURNING *;
           ` 
           return new NextResponse(JSON.stringify(newElement))
        }
        
        return new NextResponse(JSON.stringify(null))
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))
    }


}