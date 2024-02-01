"use server"

import client from "@/connectionElephantDB"
import { NextRequest, NextResponse } from "next/server";


export async function GET(Request: NextRequest): Promise<NextResponse> { // esempio di get funzionanate

    try {
        console.log('CONNECTING TO MONGO');
        await client.connect();
        console.log('CONNECTED TO MONGO');
        console.log('FETCHING DOCUMENTS');
        const res = await client.query('SELECT* FROM users')

        console.log('FETCHED DOCUMENTS');
        const datas = res.rows[0];
        return new NextResponse(JSON.stringify(datas))
        //console.log(res.rows[0].message) // Hello world!
        //   client.connect(function(err) {
        //     if(err) {
        //       return console.error('could not connect to postgres', err);
        //     }
        //     client.query('SELECT* FROM users', function(err, result) {
        //       if(err) {
        //         return console.error('error running query', err);
        //       }
        //       const data = JSON.parse(JSON.stringify(null))

        //       console.log(result.rows[0]);
        //       // >> output: 2018-08-23T14:02:57.117Z
        //       client.end();
        //     });
        //   });
    } catch (error) {
        console.log(error);
        throw new Error('Failed get.');
    } finally {
        console.log('chiude client');
        
        await client.end()
    }
}