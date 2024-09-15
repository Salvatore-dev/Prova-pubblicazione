"use server"

import sql_Elephant from "@/app/lib/test/connectpostgre";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from 'next/cache';

import { verifySession } from "@/app/lib/dal";

export async function GET(request: NextRequest) : Promise<NextResponse> {
    // User authentication and role verification
  const session = await verifySession()
 
  // Check if the user is authenticated
  if (!session.isAuth) {
    // User is not authenticated
    return new NextResponse(null, { status: 401 })
  }
 
  // Check if the user has the 'admin' role
//   if (session.user.role !== 'admin') { // qui se esistono ruoli nell'user....
//     // User is authenticated but does not have the right permissions
//     return new NextResponse(null, { status: 403 })
//   }
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
    const session = await verifySession()
 
    // Check if the user is authenticated
    if (!session.isAuth) {
      // User is not authenticated
      return new NextResponse(null, { status: 401 })
    }
   
    
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

