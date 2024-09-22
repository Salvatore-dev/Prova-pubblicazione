import Pokemon from '@/app/json/prova.json' assert {type: "json"}

import { unstable_noStore as noStore } from 'next/cache';
import { NextResponse, NextRequest } from "next/server";

//import path from 'path'
import { promises as fs } from 'fs';
const DB_PATH = '/app/json/prova.json'
const superHeroesPath = '/app/json/prova2.json'

export async function GET(request: NextRequest): Promise<NextResponse> { // esempio di richiesta di dati da un json e restituzione della lettura effettuata
    //noStore()
    // await fs.writeFile(process.cwd() + '/app/json/prova2.json', file)

    try {

        const file = await fs.readFile(process.cwd() + DB_PATH, 'utf8');
        //console.log(file);
        const response = JSON.parse(file)
        //console.log(typeof response, response);

        return new NextResponse(JSON.stringify(response))
    } catch (error) {
        throw new Error('Failed.');
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> { // esempio
    noStore()
    const data = await request.json()
    // console.log(data);
    //const file = await fs.readFile(process.cwd() + DB_PATH, 'utf8');
    //const r = JSON.parse(data)
    //const newData = [file, data]
    //const response = JSON.stringify(newData)

    // console.log(newData);
    //await fs.writeFile(process.cwd() + '/app/json/prova2.json', newData)
    const pathRequest = "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json"

    try {
        const response = await fetch(pathRequest)
        if (response.ok) {
            const superHeroes = await response.json()
            superHeroes['prova'] = data
            console.log(superHeroes);
            await fs.writeFile(process.cwd() + '/app/json/prova2.json', JSON.stringify(superHeroes, null, "  "))
        }

        const file = await fs.readFile(process.cwd() + superHeroesPath, 'utf8');
        //console.log(file);
        const send = await JSON.parse(file)
        //console.log(typeof response, response);

        return new NextResponse(JSON.stringify(send))
    } catch (error) {
        throw new Error('Failed.');
    }
}