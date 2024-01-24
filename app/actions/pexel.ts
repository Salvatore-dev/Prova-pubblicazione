"use server"

import axios from "axios"

import client_Pexel from "../utils/connectPexel"

import { NextResponse, NextRequest } from "next/server"

const Key  = process.env.PEXEL_KEY as string




type Query_Photos = {
  query: string,
  orientation?: string,
  size?: string,
  color?: string
  locale?: string,
  page?: number,
  per_page?: number
}


export async function getPhotos(request: Query_Photos) {
  const locale = 'it-IT'
  const { query, page, per_page, orientation, size } = request

  try {
    // const response = await axios.get(`https://api.pexels.com/v1/search/?page=${page}&per_page=${per_page}&query=${query}&orientation=${orientation}&size=${size}`, {
    //   headers: {
    //     'Authorization': Key,
    //   },
    //   params:{
    //     'locale': locale
    //   }
    // })
    const response = await client_Pexel.photos.search({ query: query, per_page: per_page, page: page, orientation: orientation, size: size, locale: locale })
    //console.log(response);
    if (response) {
      return response
    } else {
      return null
    }
  } catch (error) {
    console.log('Failed pext actions');
    
    return null
  }




}