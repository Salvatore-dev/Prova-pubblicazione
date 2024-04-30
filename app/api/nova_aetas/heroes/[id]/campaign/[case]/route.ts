"use server"

import sql_Elephant from "@/app/lib/test/connectpostgre";
import { NextRequest, NextResponse } from "next/server";
import { isConvertibleToNumber } from "@/app/lib/Nova_aetas/data";
import { Case_modify_Hero } from "@/app/lib/Nova_aetas/definitions";

export async function PATCH(request: NextRequest, params: { params: { id: string, case: string } }): Promise<NextResponse> {
    const id = params.params.id.trim()
    if (!isConvertibleToNumber(id)) {
        console.log('hero_id is not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const id_hero = parseFloat(id)
    console.log(id_hero, typeof id_hero);
    const colums = params.params.case.trim();
   console.log(colums);
    const query: { value: string } = await request.json()
    const { value } = query
    console.log(value);


    try {
        if (colums === Case_modify_Hero.strengthenings) {
            const response = await sql_Elephant`
            UPDATE heroes
            SET hero_strengthenings = ${value}
            WHERE id = ${id_hero}
            RETURNING hero_strengthenings;
            `
            console.log(response);
        return new NextResponse(JSON.stringify(response))
        }
        if(colums === Case_modify_Hero.conquests){
            const response = await sql_Elephant`
            UPDATE heroes
            SET hero_conquests = ${value}
            WHERE id = ${id_hero}
            RETURNING hero_conquests;
            `
            console.log(response);  
            return new NextResponse(JSON.stringify(response))
        }
        if(colums=== Case_modify_Hero.liaison){
            const response = await sql_Elephant`
            UPDATE heroes
            SET liaison = ${value}
            WHERE id = ${id_hero}
            RETURNING liaison;
            `
            console.log(response);  
            return new NextResponse(JSON.stringify(response)) 
        }
        if(colums === Case_modify_Hero.destiny){
            const response = await sql_Elephant`
            UPDATE heroes
            SET destiny = ${value}
            WHERE id = ${id_hero}
            RETURNING destiny;
            `
            console.log(response);  
            return new NextResponse(JSON.stringify(response)) 
        }
        if(colums === Case_modify_Hero.earned){
            const response = await sql_Elephant`
            UPDATE heroes
            SET earned = ${value}
            WHERE id = ${id_hero}
            RETURNING earned;
            `
            console.log(response);  
            return new NextResponse(JSON.stringify(response)) 
        }
        if(colums === Case_modify_Hero.spent){
            const response = await sql_Elephant`
            UPDATE heroes
            SET spent = ${value}
            WHERE id = ${id_hero}
            RETURNING spent;
            `
            console.log(response);  
            return new NextResponse(JSON.stringify(response)) 
        }
        if(colums === Case_modify_Hero.note){
            const response = await sql_Elephant`
            UPDATE heroes
            SET note = ${value}
            WHERE id = ${id_hero}
            RETURNING note;
            `
            console.log(response);  
            return new NextResponse(JSON.stringify(response)) 
        }


        return new NextResponse(JSON.stringify(false))
       
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))
    }
}