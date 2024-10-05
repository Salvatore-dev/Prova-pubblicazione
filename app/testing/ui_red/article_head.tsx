import React from 'react'

import style from '@/app/testing/article_header.module.css'
import { StaticImageData } from 'next/image';
import Image from 'next/image'

//const data_attuale = addDate() // dovrebbe arrivare una data dal Db in questo fromato sotto quindi memorizzare la data in origine utilizzando questo formato


function Article_head({ image_head, modifiedDate, title, subTitle, section }: { image_head: string[], modifiedDate: Date, title: string, subTitle: string, section: string }) {
    //console.log(convertDateToItalianString(date), 'data 1', convertDateString(date), "data2");
    const date_ISO = convertDateString(modifiedDate)
    const data_attuale = convertDateToItalianString(modifiedDate)
    return (
        <header className='md:w-[90%] m-auto mt-3'>
            <div className='md:w-[95%] m-auto'>
                <div className="flex justify-start text-base md:text-lg antialiased ">
                    <p className="font-mono font-semibold uppercase">{section}</p>
                    <p className="font-light text-neutral-600">
                        <span className="mx-2">|</span>
                        <time dateTime={date_ISO}>{data_attuale.replaceAll("_", " ")}</time>
                    </p>
                </div>
                <h1 className='text-xxl font-bold md:text-4xl'>{title}</h1>
                <p className="text-justify text-xl md:text-2xl font-light">{subTitle}</p>
            </div>

            {/* Contenitore per l'immagine come sfondo */}
            {/* <div
                className="relative w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[600px] bg-center bg-cover"
                style={{ backgroundImage: `url(${image_head[0]})` }}
            ></div> */}
            <figure>
                <img className='w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[600px]' src={image_head[0]}
                    alt={image_head[1]} />
                <figcaption className=' rounded-b-sm bg-black text-white p-1 text-right text-sm md:text-base antialiased'>{image_head[1]} {image_head[3] && <span><a className=' text-zinc-400 no-underline hover:underline' target='_blank' href={image_head[3]} >{image_head[2]}</a></span>}</figcaption>
            </figure>
        </header>
    );
}


function addDate(): string {
    return new Date().toLocaleString("it-IT", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "Europe/Rome",
    }).replaceAll(' ', '_');
}

function convertToISODate(dateString: string): string {
    // Definisci i mesi in italiano per convertirli in numeri
    const mesi: string[] = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

    // Dividi la stringa in giorno, mese (in italiano) e anno
    const [giorno, meseItaliano, anno]: string[] = dateString.split('_');

    // Trova l'indice del mese in italiano
    const mese: number = mesi.indexOf(meseItaliano.toLowerCase().trim()) + 1;

    // Aggiungi lo zero davanti ai mesi o giorni che sono numeri singoli
    const meseISO: string = mese.toString().padStart(2, '0');
    const giornoISO: string = giorno.trim().padStart(2, '0');

    // Restituisci la stringa nel formato ISO 8601
    return `${anno.trim()}-${meseISO}-${giornoISO}`;
}

function convertDateToItalianString(date: Date): string {
    // Definisci i mesi in italiano
    const mesi: string[] = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

    // Estrai il giorno, mese e anno dall'oggetto Date
    const giorno: number = date.getDate();
    const mese: string = mesi[date.getMonth()]; // getMonth() restituisce un valore da 0 a 11
    const anno: number = date.getFullYear();

    // Restituisci la data nel formato "12 settembre 2024"
    return `${giorno} ${mese} ${anno}`;
}
function convertDateString(date: Date): string {

    // Estrai il giorno, mese e anno dall'oggetto Date
    const giorno: string = date.getDate().toString().padStart(2, '0');
    const mese: string = date.getMonth().toString().padStart(2, '0'); // getMonth() restituisce un valore da 0 a 11
    const anno: number = date.getFullYear();

    // Restituisci la data nel formato "12 settembre 2024"
    return `${anno}-${mese}-${giorno}`;
}



// Esempio di utilizzo
// const data: string = "12 settembre 2024";
// const dataISO: string = convertToISODate(data);
// console.log(dataISO);  // Output: 2024-09-12


export default Article_head