"use client"
import React from 'react'

import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import Image from 'next/image'

//import client_Pexel from '../utils/connectPexel';
import { getPhotos } from '../actions/pexel'
import { Carousel } from 'flowbite-react';

import esempio_1 from '@/public/image/pexel/esempio-1.jpeg'
import esempio_2 from '@/public/image/pexel/esempio-2.jpeg'
import esempio_3 from '@/public/image/pexel/esempio-3.jpeg'
import esempio_4 from '@/public/image/pexel/esempio-4.jpeg'
import esempio_6 from '@/public/image/pexel/esempio-6.jpeg'

function FormRequestPhotos() {

  type Photo = {
    id: number,
    width: number,
    height: number,
    url: string,
    photographer: string,
    photographer_url: string,
    photographer_id: number,
    avg_color: string,
    alt: string,
    src: {
      small: string,
      medium: string,
      large: string,
      large2x: string,
      original: string,
      portrait: string,
      landscape: string,
      tiny: string
    },
    liked: boolean

  }

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
  type Form_Query_Photos = {
    typeReserch: React.Dispatch<React.SetStateAction<FormData | null>>,
    query: string,
    orientation: Orientation[],
    size: Sizes[],
    color?: string
    locale?: string,
    page: number,
    per_page: number
  }
  type Query_Photos = {
    query: string,
    orientation: string,
    size: string,
    color?: string
    locale?: string,
    page: number,
    per_page: number
  }

  type Response_Photos = {
    photos: Photo[],
    page: number,
    per_page: number,
    total_results: number,
    prev_page?: string,
    next_page?: string

  }

  const [photo, setPhoto] = useState<FormData | null>(null)


  const [response, setResponse] = useState<Response_Photos | null>(null)


  useEffect(() => {
    if (photo) {
      const rawFormData2 = Object.fromEntries(photo.entries())
      const query = rawFormData2.query as string
      const orientation = rawFormData2.orientation as string
      const size = rawFormData2.size as string
      const page = rawFormData2.page as string
      const per_page = rawFormData2.per_page as string

      if (query) {
        const dataToSend: Query_Photos = {
          query: query,
          orientation: orientation,
          size: size,
          page: parseInt(page),
          per_page: parseInt(per_page)
        }

        console.log(dataToSend);
        getPhotos(dataToSend)
        .then(response=> response?.json() )
        .then(data => {
          console.log(data)
          if (data) {
            const response: Response_Photos = data
            setResponse(response)
          }
        })
      }
    }
  }, [photo])

  const InitForm: Form_Query_Photos[] = [{
    typeReserch: setPhoto,
    query: '',
    orientation: [Orientation.landscape, Orientation.portrait, Orientation.square],
    size: [Sizes.large, Sizes.medium, Sizes.small],
    page: 1,
    per_page: 40

  }]
  return InitForm.map((el, i) => (
    <div className='' key={'query:' +el.query}>
      <form key={'query_form' + i} action={el.typeReserch} className='flex flex-row gap-1 py-4 bg-slate-400 justify-around'>
        <div>
          <label htmlFor='query'>Cerca le foto che desideri: </label>
          <input type="text" id='query' name='query' defaultValue={el.query} required />
        </div>
        <div>
          <label htmlFor="orientation">Orientamento: </label>
          <select name="orientation" id="orientation" required>
            {
              el.orientation?.map((el, i) => (
                <option key={el} value={el}>{orintationIT[i]}</option>
              ))
            }
          </select>
        </div>
        <div>
          <label htmlFor="size">Sizes: </label>
          <select name="size" id="size" required>
            {
              el.size.map(el => (
                <option key={el} value={el}>{el}</option>
              ))
            }
          </select>
        </div>
        <div>
          <label htmlFor="page">Pagina: </label>
          <input type="number" min={1} max={80} name='page' id='page' defaultValue={el.page} required />
        </div>
        <div>
          <label htmlFor="per_page">Per Pagina: </label>
          <input type="number" name='per_page' id='per_page' min={1} max={el.per_page} defaultValue={1} required />
        </div>
        <div>
          <button type='submit' className='p-3 bg-black text-white'> Richiedi foto</button>
        </div>
      </form>
      <div className='flex flex-col gap-3 bg-slate-600 py-6'>
        <div className=' bg-slate-600 text-yellow-300 py-2 flex items-center justify-around'>
          <h1>Risultato immagini</h1>
          <h2>Sono state trovate {response?.total_results} foto</h2>
        </div>
        <div className="h-[200px] sm:h-[300px] xl:h-[500px] 2xl:h-[600px] w-[90%] m-auto">
        {response && <Carousel slide={false}>
            {
              response?.photos.map((el, i) => (
                  <img key={el.id} src={el.src.original} width={el.width} height={el.height} alt={el.alt} />
                
          ))}

          </Carousel>}
          {!response && <Carousel pauseOnHover>
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

  ))
}

function Page() {


  return (
    <div>
        <FormRequestPhotos />
    </div>
  )
}

export default Page