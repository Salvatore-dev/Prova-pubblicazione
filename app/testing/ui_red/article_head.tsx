"use client"
import React from 'react'
import SocialShare from './share_social';
import { usePathname } from 'next/navigation';


function Article_head({ image_head, modifiedDate, title, subTitle, section, author, creationDate }: { image_head: string[], modifiedDate: Date, title: string, subTitle: string, section: string, author: string, creationDate: Date }) {
   
    //console.log(convertDateToItalianString(date), 'data 1', convertDateString(date), "data2");
    const date_ISO_creation = convertDateString(creationDate)
    const date_ISO_lastUpdate = convertDateString(modifiedDate)
    
    const dateCreation = convertDateToItalianString(creationDate)
    const dateLastUpdate = convertDateToItalianString(modifiedDate)
    
    const domain = 'https://prova-pubblicazione.vercel.app'
    const url_article = domain + usePathname()

    return (
        <header className='md:w-[90%] m-auto mt-3'>
            <div className='md:w-[95%] m-auto'>
                <div className="flex justify-start text-base md:text-lg antialiased ">
                    <p className="font-mono font-semibold uppercase">{section}</p>
                    <p className="font-light text-neutral-600">
                        <span className="mx-2">|</span>
                        <time dateTime={date_ISO_creation}>{dateCreation}</time>
                    </p>
                </div>
                <h1 className=' text-2xl font-bold md:text-4xl mb-2'>{title}</h1>
                <p aria-label='subtitile' className="text-justify text-xl md:text-2xl font-light mb-2">{subTitle}</p>
            </div>
            <figure>
                <img className='w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[600px]' src={image_head[0]}
                    alt={image_head[1]} />
                <figcaption className=' rounded-b-sm bg-black text-white p-1 text-right text-sm md:text-base antialiased'>{image_head[1]} {image_head[3] && <span><a className=' text-zinc-400 no-underline hover:underline' target='_blank' href={image_head[3]} >{image_head[2]}</a></span>}</figcaption>
            </figure>
            <div className='m-0 p-0'>
                <p className='m-0 p-0'>Ultima modifica: <time dateTime={date_ISO_lastUpdate}>{dateLastUpdate}</time>. {author !='redazione'&& <span>By <span className=' font-semibold'>{author}</span></span>} </p>
            </div>
            <div>
                <SocialShare title={title} url={url_article} />
            </div>
        </header>
    );
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


export default Article_head