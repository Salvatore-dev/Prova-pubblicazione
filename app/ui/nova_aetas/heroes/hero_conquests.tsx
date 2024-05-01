"use client"

import React from 'react'
import { useState, useEffect, memo } from 'react';
import axios from 'axios';
import { Case_modify_Hero } from '@/app/lib/Nova_aetas/definitions';
import { useDebouncedCallback } from 'use-debounce';

type Changing_data_hero_connquest = {
    value: string | number,
    changing: boolean
  }


function Hero_conquests({hero_conquests, hero_id}: {hero_conquests: string | null, hero_id: number | null}) {
  const [conquests, setConquests]= useState<Changing_data_hero_connquest[] | null>(null)
  
  useEffect(()=>{
    if(hero_conquests){
        const  array_conquests = hero_conquests.split(',').map(el => {
                return {
                value: el,
                changing: false
                }})
                setConquests(array_conquests)
    }
    
  },[hero_conquests])
    
  function changing(index: number, set: boolean) {
    if (conquests) {
      const arr: Changing_data_hero_connquest[] = [...conquests].map((el, i)=>{
        if (i === index) {
          return {
            ...el,
            changing: set
          }
        }
        return{
          ...el
        }
      })
      setConquests(arr)

    }
    
  }
  
const handleSubmit = useDebouncedCallback(async (value: string ,index:  number)=>{
  // let imput_value = parseFloat(value)
  // if (imput_value <= 0 ) {
  //   imput_value = 0
  // }
  if (conquests) {
    const string= [...conquests].map((el, i)=>{
      if (i=== index){
        if (value === '') {
          return '0'
        }
        return  value.trim()
      } 
        return el.value
      
    }).join()
    console.log("vedi arrai pronto per modifica", string);
    
    const response = await axios.patch(`http://localhost:3000/api/nova_aetas/heroes/${hero_id}/campaign/${Case_modify_Hero.conquests}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                value: string
            })
            if (response.data) {
              console.log('controllo risposta conquista' , response.data[0]);
            const Hero_conquests = response.data[0].hero_conquests as string
            const g : Changing_data_hero_connquest[] = conquests.map((el, i)=>{
              if (i === index) {
                return {
                  ...el,
                  value: Hero_conquests.split(',')[index].trim(),
                  changing: false
                }
              }
              return el
            })
            setConquests(g)
            } else {
              changing(index, false)
            }
            
  }
  

}, 3000)
  
  return (
    <div className='flex gap-3 md:gap-12 justify-around flex-wrap'>
        {
            conquests && conquests.map((item, i)=> (
                <p className={`m-0 h-auto ${item.value==0 && 'text-amber-700'}`} onClick={()=>changing(i, true)} key={`conquest_ ${i}`}>{!item.changing? item.value : <input className='m-0 w-16 p-2 h-auto text-black' type='number' defaultValue={item.value} onChange={(e)=> handleSubmit(e.currentTarget.value, i)}></input>}</p>
            ))
        }
    </div>
  )
}

export default memo(Hero_conquests)