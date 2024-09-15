"use server"

import sql_Elephant from "@/app/lib/test/connectpostgre";
import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/app/lib/dal";
import { isConvertibleToNumber } from "@/app/lib/Nova_aetas/data";


export async function GET(request: NextRequest, params: { params: { id: string } }): Promise<NextResponse> {
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

    try {
        const response = await sql_Elephant`
        SELECT*
            FROM missions
            WHERE campaign_id = ${id_campaign} ;
        `
        return new NextResponse(JSON.stringify(response))
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))

    }

}


export async function POST(request: NextRequest, params: { params: { id: string } }): Promise<NextResponse> {

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

    try {
        const data = await request.json()
        const { name, type, detail } = data
        console.log(name, type, detail);
        if (name && type && detail) {
            const newElement = await sql_Elephant`
           INSERT INTO missions (name, type, detail, complete, campaign_id)
            VALUES
            (${name}, ${type}, ${detail}, false, ${id_campaign})
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