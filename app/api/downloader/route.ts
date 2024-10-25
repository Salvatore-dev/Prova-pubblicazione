"use server"

import ytdl from 'ytdl-core';
import { NextResponse } from 'next/server';
import { GiMp40 } from 'react-icons/gi';

export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url || !ytdl.validateURL(url)) {
        return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    try {
        // Stream del video con opzioni modificate
        const videoStream = ytdl(url, {
            quality: 'highest',
            filter: 'audioandvideo',
            requestOptions: {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
                }
            }
        });

        const headers = new Headers();
        headers.append('Content-Disposition', 'attachment; filename="video.mp4"');

        return new NextResponse(videoStream as any, {
            headers,
        });
    } catch (err) {
        console.error("Error downloading:", err);
        return NextResponse.json({ error: 'Failed to download video' }, { status: 500 });
    }
}




