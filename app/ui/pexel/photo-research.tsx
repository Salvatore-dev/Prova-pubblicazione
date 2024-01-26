"use client"
import React from 'react'

import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import Image from 'next/image'
import { PhotosWithTotalResults} from 'pexels'


//import client_Pexel from '../utils/connectPexel';
import { Carousel } from 'flowbite-react';

import esempio_1 from '@/public/image/pexel/esempio-1.jpeg'
import esempio_2 from '@/public/image/pexel/esempio-2.jpeg'
import esempio_3 from '@/public/image/pexel/esempio-3.jpeg'
import esempio_4 from '@/public/image/pexel/esempio-4.jpeg'
import esempio_6 from '@/public/image/pexel/esempio-6.jpeg'


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


function PhotoResearch() {

    const [photo, setPhoto] = useState<FormData | null>(null)
    const [response, setResponse] = useState<PhotosWithTotalResults | null>(null)


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
    }, [photo])

    const InitForm: Form_Query_Pexel_Simple = {
        typeReserch: setPhoto,
        query: '',
        orientation: [Orientation.landscape, Orientation.portrait, Orientation.square],
        size: [Sizes.large, Sizes.medium, Sizes.small],
        page: 1,
        per_page: 10

    }
    return (
        <div>
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
            <div className='flex flex-col gap-3 bg-slate-600 py-6'>
                <div className=' bg-slate-600 py-2'>
                    <h1 className={`text-center font-bold text-lg ${(response && response?.photos.length > 0) ? 'text-green-500' : 'text-red-600'}`}>Risultato ricerca: {response?.total_results && response.photos.length > 0 ? 'sono state trovate ' + response.total_results + ' foto' : 'spiacente la ricerca non ha dato nessun risultato. Riprova!'}</h1>
                </div>
                <div className="h-[200px] sm:h-[300px] xl:h-[500px] 2xl:h-[600px] w-[90%] m-auto">
                    {(response && response.photos.length > 0) ?
                        <Carousel slide={false}>
                            {
                                response?.photos.map((el, i) => (
                                    <img key={el.id} src={el.src.original} width={el.width} height={el.height} alt={'immagine generica, ' + el.alt} />
                                ))}
                        </Carousel> :
                        <Carousel pauseOnHover>
                            <Image src={esempio_1} alt="foto inerente alla programmazione generica" />
                            <Image src={esempio_2} alt="foto inerente alla programmazione generica" />
                            <Image src={esempio_3} alt="foto inerente alla programmazione generica" />
                            <Image src={esempio_4} alt="foto inerente alla programmazione generica" />
                            <Image src={esempio_6} alt="foto inerente alla programmazione generica" />
                        </Carousel>}
                    <div className='text-center'>
                        <a className=' text-lg text-orange-500 hover:cursor-pointer hover:underline' href="https://www.pexels.com" target='_blank'>Photos provided by Pexels</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhotoResearch