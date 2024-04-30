"use server"

import sql_Elephant from "@/app/lib/test/connectpostgre";
import { NextRequest, NextResponse } from "next/server";
import { isConvertibleToNumber } from "@/app/lib/Nova_aetas/data";

import { Action_Type_Injuries } from "@/app/lib/Nova_aetas/definitions";



export async function PATCH(request : NextRequest,params: { params: { id: string, id_item: string } } ) : Promise<NextResponse> {
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
    const id_injury = parseFloat(params.params.id_item.trim());
   console.log(id_injury);
   const query: { value: string, case_value: string } = await request.json()
   const { value, case_value } = query
   console.log('controllo modifica injury' , value, case_value);

   try {
    if (case_value === Action_Type_Injuries.name) {
        const response = await sql_Elephant`
        UPDATE serious_injuries
        SET name = ${value}
        WHERE id = ${id_injury}
        RETURNING*;
        `
        console.log(response);
        return new NextResponse(JSON.stringify(response))
    }
    console.log(case_value === Action_Type_Injuries.popolini);
    
    if (case_value === Action_Type_Injuries.popolini) {
        const response = await sql_Elephant`
        UPDATE serious_injuries
        SET popolini = ${value}
        WHERE id = ${id_injury}
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

export async function DELETE(request: NextRequest, params: { params: { id: string, id_item: string }}) : Promise<NextResponse> {
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
    const id_injury = parseFloat(params.params.id_item.trim());
    console.log("cancella skill", id_hero, id_injury);
    
    try {
        const response = await sql_Elephant`
        DELETE FROM serious_injuries
        WHERE id = ${id_injury}
        RETURNING*;
        `
        console.log(response);
        return new NextResponse(JSON.stringify(response))
        
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))
    }
    
}