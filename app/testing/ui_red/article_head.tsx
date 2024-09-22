import React from 'react'

import style from '@/app/testing/article_header.module.css'
import { StaticImageData } from 'next/image';
import Image from 'next/image'

const data_attuale = addDate() // dovrebbe arrivare una data dal Db in questo fromato sotto quindi memorizzare la data in origine utilizzando questo formato

const date_ISO = convertToISODate(data_attuale)

function Article_head({image_head}:{image_head: StaticImageData}) {
    return (
        <header>
            <div className='flex justify-start text-lg antialiased'>
                <p className=' font-mono font-semibold uppercase'>Concilio Vaticano II</p>
                <p className=' font-light text-neutral-600'><span className='mx-2'>|</span><time dateTime={date_ISO}>{data_attuale.replaceAll('_', ' ')}</time></p>
            </div>
            <h1>Il titolo articolo</h1>
            <p className=' text-justify'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, soluta! Aperiam numquam, eligendi, beatae nobis in nemo non deleniti eius eaque velit, et id similique mollitia consequatur repellendus veniam odio.</p>
            <div className=' relative w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[600px]'>
                <Image className=' bg-center object-cover' fill src={image_head} alt='Foto / immagine articolo' />
            </div>
            
        </header>
    )
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
    const mese: number = mesi.indexOf(meseItaliano.toLowerCase().trim())+ 1;

    // Aggiungi lo zero davanti ai mesi o giorni che sono numeri singoli
    const meseISO: string = mese.toString().padStart(2, '0');
    const giornoISO: string = giorno.trim().padStart(2, '0');

    // Restituisci la stringa nel formato ISO 8601
    return `${anno.trim()}-${meseISO}-${giornoISO}`;
}

// Esempio di utilizzo
// const data: string = "12 settembre 2024";
// const dataISO: string = convertToISODate(data);
// console.log(dataISO);  // Output: 2024-09-12


export default Article_head