"use server"

import { NextRequest, NextResponse } from 'next/server';

import { unstable_noStore as noStore } from 'next/cache';
import { Videos, ErrorResponse } from 'pexels';

import client_Pexel from "../../../utils/connectPexel"

export async function POST(request: NextRequest): Promise<NextResponse> { // esempio
    noStore()
    const data = await request.json()
    console.log('controlla route_video', data);

    const locale = 'it-IT'
    const { query, page, per_page, orientation, size } = data
    try {
        const response = await client_Pexel.videos.search({ query: query, per_page: per_page, page: page, orientation: orientation, size: size, locale: locale })
        const error = response as ErrorResponse
        if (error.error) {
            console.log('errore nella ricerca pexel', error.error);

            return new NextResponse(JSON.stringify(null))
        } else {
            console.log(response);
            const photos = response as Videos
            return new NextResponse(JSON.stringify(photos))
        }
    } catch (error) {
        throw new Error('Failed route pexel.');
    }
}