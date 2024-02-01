"use client"
import React from 'react'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { PhotosWithTotalResults } from 'pexels'

import { Carousel } from 'flowbite-react';

import esempio_1 from '@/public/image/pexel/esempio-1.jpeg'
import esempio_2 from '@/public/image/pexel/esempio-2.jpeg'
import esempio_3 from '@/public/image/pexel/esempio-3.jpeg'
import esempio_4 from '@/public/image/pexel/esempio-4.jpeg'
import esempio_5 from '@/public/image/pexel/esempio-5.jpeg'
import esempio_6 from '@/public/image/pexel/esempio-6.jpeg'
import place_holder from '@/public/image/pexel/placeholder.jpg'

import FooterDefault from '../defaultfooterProject'


enum Orientation {
    portrait = "portrait",
    landscape = "landscape",
    square = "square"
}
const orintationIT = ['ritratto', 'panorama', 'quadrato']

enum Sizes {
    large = 'large',
    medium = 'medium',
    small = 'small'
}
type Form_Query_Pexel_Simple = {
    typeReserch: React.Dispatch<React.SetStateAction<FormData | null>>,
    query: string,
    orientation: Orientation[],
    size: Sizes[],
    color?: string
    locale?: string,
    page: number,
    per_page: number
}
type Query_Pexel_Simple = {
    query: string,
    orientation: string,
    size: string,
    color?: string
    locale?: string,
    page: number,
    per_page: number
}

type ContentFooterProjects = {
    details: string[],
    tecnics: {
        fontEnd?: string[],
        backEnd?: string[]
    },
    greetings?: [{
        description: string,
        link: string,
        text_link: string
    }],
    notes?: [{
        description: string,
        text: string
    }]
}

const placeholder = <Image className='animate-pulse' loading='lazy' src={place_holder} alt='un placeholder'></Image>

function PhotoResearch() {

    const [photo, setPhoto] = useState<FormData | null>(null)
    const [response, setResponse] = useState<PhotosWithTotalResults | null>(null)
    const [imageLoaded, setImageLoaded] = useState(false);


    useEffect(() => {
        if (photo) {
            const rawFormData2 = Object.fromEntries(photo.entries())
            const query = rawFormData2.query as string
            const orientation = rawFormData2.orientation as string
            const size = rawFormData2.size as string
            const page = rawFormData2.page as string
            const per_page = rawFormData2.per_page as string

            if (query) {
                const dataToSend: Query_Pexel_Simple = {
                    query: query,
                    orientation: orientation,
                    size: size,
                    page: parseInt(page),
                    per_page: parseInt(per_page)
                }

                console.log(dataToSend);
                const DatatoSend2 = 'sa'
                const r = fetch(`/api/pexel/search_photo/`, {
                    method: "POST",
                    body: JSON.stringify(dataToSend), // must match 'Content-Type' header
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        if (data) {
                            const response = data as PhotosWithTotalResults
                            setResponse(response)
                        }
                    })
            }
        }
        setImageLoaded(false)
    }, [photo])

    const InitForm: Form_Query_Pexel_Simple = {
        typeReserch: setPhoto,
        query: '',
        orientation: [Orientation.landscape, Orientation.portrait, Orientation.square],
        size: [Sizes.large, Sizes.medium, Sizes.small],
        page: 1,
        per_page: 10

    }

    useEffect(() => {
        // Verifica se l'immagine è già stata caricata (potrebbe essere in cache)
        const img = document.createElement('img')
        img.src = response?.photos[0]?.src?.original as string
        img.onload = () => {
          setImageLoaded(true);
        };
      }, [response]);

      const content_footer : ContentFooterProjects ={
        details : ['Una piccola applicazione per ricerca foto di libero utilizzo.'],
        tecnics: {
            fontEnd : ['Le foto ricevute dal server sono organizzate in un "carousel".', ' Al caricamento della pagina sono mostrate delle foto che sono archiaviate sul server.'],
            backEnd : ['Il server gestisce le chiamate dal client recuperando i dati da Endpoints esterni.']
        },
        greetings : [{
            description: 'L\'applicazione utilizza le foto messe gentilmente a disposizione da ',
            link: 'https://www.pexels.com',
            text_link : 'Pexel'
        }]
      }

    return (
        <section className='flex flex-col'>
            <form action={InitForm.typeReserch} className='flex flex-col md:flex-row gap-3 p-4 bg-slate-400 items-center md:items-end justify-around'>

                <div className=' h-fit flex flex-row items-stretch'>
                    <input placeholder='Cerca la foto' type="text" id='query' name='query' defaultValue={InitForm.query} required />
                    <button type='submit' className='p-3 bg-black text-white'>
                        <svg className="w-6 h-6 text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                        </svg>
                    </button>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <div className='flex flex-col lg:flex-row items-center'>
                        <label htmlFor="orientation">Orientamento: </label>
                        <select name="orientation" id="orientation" required>
                            {
                                InitForm.orientation?.map((el, i) => (
                                    <option key={el} value={el}>{orintationIT[i]}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className=' flex flex-col lg:flex-row items-center'>
                        <label htmlFor="size">Sizes: </label>
                        <select name="size" id="size" required>
                            {
                                InitForm.size.map(el => (
                                    <option key={el} value={el}>{el}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className='flex flex-row items-center gap-2'>
                    <div>
                        <label htmlFor="page">Pagina: </label>
                        <input type="number" min={1} max={80} name='page' id='page' defaultValue={InitForm.page} required />
                    </div>
                    <div>
                        <label htmlFor="per_page">Per Pagina: </label>
                        <input type="number" name='per_page' id='per_page' min={1} max={InitForm.per_page} defaultValue={1} required />
                    </div>
                </div>
            </form>
            <section className=' bg-slate-200 py-2 flex flex-col md:flex-row items-center gap-2 md:gap-0 justify-end md:justify-around'>
                <div className=''>
                    <a className='' href="https://www.pexels.com" target='_blank'>
                        {/* <img className=' h-11'src="https://images.pexels.com/lib/api/pexels-white.png" /> */}
                        <img className='h-11' src="https://images.pexels.com/lib/api/pexels.png" />
                    </a>
                </div>
                <div>
                    <p className=' flex gap-3 items-center text-sm md:text-xl md:items-baseline'>Risultato ricerca:
                        <span
                            className={` text-sm md:text-lg ${(response && response?.photos.length > 0)
                                ?
                                'text-green-500'
                                :
                                'text-red-600'}`}
                        >
                            {response?.total_results && response.photos.length > 0
                                ?
                                'trovate ' + response.total_results + ' foto'
                                :
                                'nessun risultato.'}
                        </span>
                    </p>
                </div>
            </section>
            <section className="h-[200px] sm:h-[300px] xl:h-[500px] 2xl:h-[600px] w-[90%] m-auto mt-4">
                {(response && response.photos.length > 0) ?
                    <Carousel className='' slide={false}>
                        { imageLoaded? 
                            response?.photos.map((el, i) => (
                                    <img loading='lazy' key={el.id} src={el.src.original} width={el.width} 
                                    height={el.height} 
                                    alt={'Risultato ricerca: '+ el.alt} />
                                
                            )): placeholder}
                    </Carousel>
                     :
                    <Carousel pauseOnHover>
                        <Image loading='lazy' src={esempio_1} alt="foto inerente alla programmazione generica" />
                        <Image loading='lazy' src={esempio_2} alt="foto inerente alla programmazione generica" />
                        <Image loading='lazy' src={esempio_5} alt="foto inerente alla programmazione generica" />
                        <Image loading='lazy' src={esempio_4} alt="foto inerente alla programmazione generica" />
                        <Image loading='lazy' src={esempio_6} alt="foto inerente alla programmazione generica" />
                    </Carousel>}
            </section>
            <section>
                <FooterDefault content={content_footer} />
            </section>
        </section>
    )
}

export default PhotoResearch