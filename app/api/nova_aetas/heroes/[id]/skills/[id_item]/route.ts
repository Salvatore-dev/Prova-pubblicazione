"use server"

import sql_Elephant from "@/app/lib/test/connectpostgre";
import { NextRequest, NextResponse } from "next/server";
import { isConvertibleToNumber } from "@/app/lib/Nova_aetas/data";
import { verifySession } from "@/app/lib/dal";
import { Action_Type_Skills } from "@/app/lib/Nova_aetas/definitions";



export async function PATCH(request: NextRequest, params: { params: { id: string, id_item: string } }): Promise<NextResponse> {
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
    //console.log(id_hero, typeof id_hero);
    if (!isConvertibleToNumber(params.params.id_item.trim())) {
        console.log('id_item is not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const id_skill = parseFloat(params.params.id_item.trim());
    console.log(id_skill);
    const query: { value: string, case_value: string } = await request.json()
    const { value, case_value } = query
    console.log('controllo modifica skill', value, case_value);

    try {
        if (case_value === Action_Type_Skills.name) {
            const response = await sql_Elephant`
        UPDATE skills
        SET name = ${value}
        WHERE id = ${id_skill}
        RETURNING*;
        `
            console.log(response);
            return new NextResponse(JSON.stringify(response))
        }
        if (case_value === Action_Type_Skills.experience) {
            const response = await sql_Elephant`
        UPDATE skills
        SET experience = ${value}
        WHERE id = ${id_skill}
        RETURNING*;
        `
            console.log(response);
            return new NextResponse(JSON.stringify(response))
        }
        return new NextResponse(JSON.stringify(null))
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))

    }
}

export async function DELETE(request: NextRequest, params: { params: { id: string, id_item: string } }): Promise<NextResponse> {
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
    console.log('ciao');

    const id_hero = parseFloat(id)
    console.log(id_hero, typeof id_hero);
    if (!isConvertibleToNumber(params.params.id_item.trim())) {
        console.log('id_item is not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const id_skill = parseFloat(params.params.id_item.trim());
    console.log("cancella skill", id_hero, id_skill);

    try {
        const response = await sql_Elephant`
        DELETE FROM skills
        WHERE id = ${id_skill}
        RETURNING*;
        `
        console.log(response);
        return new NextResponse(JSON.stringify(response))

    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))
    }

}


