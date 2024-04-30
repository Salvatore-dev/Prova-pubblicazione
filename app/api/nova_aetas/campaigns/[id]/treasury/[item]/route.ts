"use server"

import sql_Elephant from "@/app/lib/test/connectpostgre";
import { NextRequest, NextResponse } from "next/server";

import { Item_treasury } from "@/app/lib/Nova_aetas/definitions";

import { treasury_campaign, popolini, isConvertibleToNumber } from "@/app/lib/Nova_aetas/data";


export async function POST(Request: NextRequest, params: { params: { id: string, item: string } }): Promise<NextResponse> {
    //console.log(params);
        const id = params.params.id.trim()
        const item = params.params.item.trim()

        if (!isConvertibleToNumber(id)) {
            console.log('campaing_id not valid number');
            return new NextResponse(JSON.stringify(null))
        }
        const id_campaign = parseFloat(id)

    try {
        const data = await Request.json()
        if (!Number.isInteger(data.quantity)) {
            return new NextResponse(JSON.stringify(null))
        }
        let newItem : Item_treasury | null = null
        if(item.toLowerCase() === popolini.name.toLowerCase()) {
            newItem = {...popolini, quantity: data.quantity};
            const {name, icon, quantity}  = newItem;
            const newElement = await sql_Elephant`
            INSERT INTO treasury (name, icon, quantity, campaign_id)
                VALUES
                (${name}, ${icon}, ${quantity}, ${id_campaign})
                RETURNING *
                ;
             `
           // console.log(newElement);
           return new NextResponse(JSON.stringify(newElement))
        }else{
            const check = treasury_campaign.filter(name=> name.name.toLowerCase() === item.toLowerCase())
            console.log(check);
            if (check.length > 0) {
                newItem = {... check[0], quantity: data.quantity};
                const {name, icon, purchase, sale, quantity}  = newItem;
                
                const newElement = await sql_Elephant`
                INSERT INTO treasury (name, icon, purchase, sale, quantity, campaign_id)
                    VALUES
                    (${name}, ${icon}, ${purchase as number}, ${sale as number}, ${quantity}, ${id_campaign})
                    RETURNING *
                    ;
                 `
                 return new NextResponse(JSON.stringify(newElement))
            } else {
                return new NextResponse(JSON.stringify(null))
            }
        }
    } catch (error) {
        console.log(error);
        
        return new NextResponse(JSON.stringify(null))
    }
}

export async function PATCH(Request: NextRequest, params: { params: { id: string, item: string } }) : Promise<NextResponse> {
    console.log(params);
    const data = await Request.json()
    const id = params.params.id.trim()
    if (!isConvertibleToNumber(id)) {
        console.log('campaing_id not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const id_campaign = parseFloat(id)
    const item = params.params.item.trim()
    if (!isConvertibleToNumber(item) ||!Number.isInteger(data.quantity) ) {
        return new NextResponse(JSON.stringify('ciao'))
    }
    const id_item = parseFloat(item)
    //console.log(typeof id_item , typeof data.quantity, id_item);
    
    //let newItem : Item_treasury | null = null
        try {
            const UpdateElement = await sql_Elephant`
            UPDATE treasury
            SET quantity = ${data.quantity}
            WHERE id = ${item}
            RETURNING *
            ;
            `
            return new NextResponse(JSON.stringify(UpdateElement))
        } catch (error) {
            console.log(error);
            
            return new NextResponse(JSON.stringify(null))
        }

}

export async function DELETE(Request: NextRequest, params: { params: { id: string, item: string } }) :Promise<NextResponse> {
    
    const id = params.params.id.trim()
    if (!isConvertibleToNumber(id)) {
        console.log('campaing_id not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const id_campaign = parseFloat(id)
    const item = params.params.item.trim()
    //console.log(id);
    //console.log(typeof item);
    //console.log(Number.isNaN(parseFloat(item)));
    
    if (!isConvertibleToNumber(item)) {
        return new NextResponse(JSON.stringify('ciao'))
    }
    const id_item = parseFloat(item)
    console.log(id_item);
    
    try {

        const result_delete = await sql_Elephant`
        DELETE FROM treasury  
        WHERE id = ${id_item}
        RETURNING  *;
        `

        return new NextResponse(JSON.stringify(result_delete))
    } catch (error) {
        console.log(error);
            
        return new NextResponse(JSON.stringify(null))
    }
}

export async function GET(request: NextRequest, params: { params: { id: string, item: string } }): Promise<NextResponse> {
    const item = params.params.item.trim().toUpperCase()
    console.log(item);
    const id = params.params.id.trim()
    if (!isConvertibleToNumber(id)) {
        console.log('campaing_id not valid number');
        return new NextResponse(JSON.stringify(null))
    }
    const id_campaign = parseFloat(id)
    
    try {
        if (item === "ALL") {
            const response = await sql_Elephant`
            SELECT*
            FROM treasury
            WHERE campaign_id = ${id_campaign} ;
            `
            return new NextResponse(JSON.stringify(response))
        }else{
            if (!isConvertibleToNumber(item)) {
                return new NextResponse(JSON.stringify(null))
            }
            const id_item = parseFloat(item)
        const response = await sql_Elephant`
            SELECT*
            FROM treasury
            Where id = ${id_item} AND campaign_id = ${id_campaign}
        ;
        ` 
        return new NextResponse(JSON.stringify(response))
        }
    } catch (error) {
        return new NextResponse(JSON.stringify('ciao'))
    }
}

    
