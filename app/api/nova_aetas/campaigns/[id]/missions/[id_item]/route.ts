"use server"

import sql_Elephant from "@/app/lib/test/connectpostgre";
import { NextRequest, NextResponse } from "next/server";

import { isConvertibleToNumber } from "@/app/lib/Nova_aetas/data";


export async function DELETE(request: NextRequest, params: { params: { id: string, id_item: string } }): Promise<NextResponse> {
    const { id, id_item } = params.params
    console.log(id, id_item);
    if (!isConvertibleToNumber(id)) {
        console.log('campaing_id not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const id_campaign = parseFloat(id)

    if (!isConvertibleToNumber(id_item)) {
        console.log('campaing_id not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const idItem = parseFloat(id_item)

    try {
        const response = await sql_Elephant`
        DELETE FROM missions  
        WHERE id = ${idItem} AND campaign_id = ${id_campaign} 
        RETURNING *
        ;
        `
        return new NextResponse(JSON.stringify(response))
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))
    }

}

export async function PATCH(request: NextRequest, params: { params: { id: string, id_item: string } }): Promise<NextResponse> {
    const { id, id_item } = params.params
    console.log(id, id_item);
    const data = await request.json()
    console.log(data);
    const { name, detail, complete } = data
    console.log(name, detail, complete);


    if (!isConvertibleToNumber(id)) {
        console.log('campaing_id not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const id_campaign = parseFloat(id)

    if (!isConvertibleToNumber(id_item)) {
        console.log('campaing_id not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const idItem = parseFloat(id_item)

    try {
        if (name && detail && typeof complete === 'boolean') {
            const response = await sql_Elephant`
            UPDATE missions
            SET 
            name = ${name},
            detail = ${detail},
            complete = ${complete}
            WHERE id = ${idItem} AND campaign_id = ${id_campaign}
            RETURNING*
            ;
            `
            return new NextResponse(JSON.stringify(response))
        } else {
            return new NextResponse(JSON.stringify(null))
        }


    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))
    }
}