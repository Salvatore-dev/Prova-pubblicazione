"use server"

import sql_Elephant from "@/app/lib/test/connectpostgre";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache';
export async function GET(request: NextRequest) : Promise<NextResponse> {
    
    try {
        const response = await sql_Elephant`
        SELECT * 
        FROM campaigns;
        `
        return new NextResponse(JSON.stringify(response))
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))
    }
}

export  async function POST(req: NextRequest) : Promise<NextResponse> {
   
    
    try {
        const data = await req.json()
        ///console.log(data);
        
        const {campaign_name} = data
        console.log(campaign_name);
        const response = await  sql_Elephant`
        INSERT INTO campaigns (name)
        VALUES (${campaign_name}) RETURNING*;
        `
        return new NextResponse(JSON.stringify(response))
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify(null))
    }
}

