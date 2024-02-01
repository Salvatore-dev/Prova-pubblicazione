"use server"

import sql_Elephant from "@/app/lib/test/connectpostgre";
import { NextRequest, NextResponse } from "next/server";


export async function GET(Request: NextRequest): Promise<NextResponse> { // esempio di get funzionanate

    try {
        console.log('CONNECTING TO MONGO');
        console.log('CONNECTED TO MONGO');
        console.log('FETCHING DOCUMENTS');

        console.log('FETCHED DOCUMENTS');
        const users = await sql_Elephant`
        SELECT* FROM users
        `
        return new NextResponse(JSON.stringify(users))
        
    } catch (error) {
        console.log(error);
        throw new Error('Failed get.');
    } 
}