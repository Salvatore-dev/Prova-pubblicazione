"use server"

import sql_Elephant from "@/app/lib/test/connectpostgre";
import { NextRequest, NextResponse } from "next/server";

import { isConvertibleToNumber } from "@/app/lib/Nova_aetas/data";

export async function PUT(request: NextRequest, params: { params: { id: string } }): Promise<NextResponse> {

    const id = params.params.id.trim()
    if (!isConvertibleToNumber(id)) {
        console.log('hero_id is not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const id_hero = parseFloat(id)
    console.log(id_hero, typeof id_hero);


    try {
        const data = await request.json();
        const { campaign_id } = data
        if (campaign_id) {
            const response = await sql_Elephant`
            UPDATE heroes
            SET campaign_id = ${campaign_id}
            WHERE id = ${id_hero}
            RETURNING*;
            `
            return new NextResponse(JSON.stringify(response))
        }
        return new NextResponse(JSON.stringify(null))
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))
    }
}
export async function DELETE(request: NextRequest, params: { params: { id: string } }) {
    const id = params.params.id.trim()
    if (!isConvertibleToNumber(id)) {
        console.log('hero_id is not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const id_hero = parseFloat(id)
    console.log(id_hero, typeof id_hero);


    try {
        const response = await sql_Elephant`
            UPDATE heroes
            SET campaign_id = NULL
            WHERE id = ${id_hero}
            RETURNING*;
            `
        return new NextResponse(JSON.stringify(response))
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))
    }
}