"use client"

import React from 'react'
import { useState, useEffect, memo } from 'react'
import Image, { StaticImageData } from 'next/image'
import axios from 'axios'

import { Case_modify_Hero } from '@/app/lib/Nova_aetas/definitions'
import health_strength from '@/public/image/nova_aetas/salute.jpg'
import action_strength from '@/public/image/nova_aetas/punti_azione.jpg'
import dexterity_strength from '@/public/image/nova_aetas/destrezza.jpg'
import physicist_strength from '@/public/image/nova_aetas/fisico.jpg'
import mind_strength from '@/public/image/nova_aetas/mente.jpg'

type Strengthenings_data = {
    src: StaticImageData,
    value: string,
    checked: boolean
}
type R = (value: boolean, id: number) => Promise<void>
const empty_value = 'vuoto'
const strengthenings_values = ['action', 'dexterity', 'physicist', 'mind', 'health']
const default_strengthenings: Strengthenings_data[] = [action_strength, dexterity_strength, physicist_strength, mind_strength, health_strength].map((el) => {
    return {
        src: el,
        value: empty_value.trim(),
        checked: false
    }
})
function Hero_strengthenings({ strengthenings, id_hero }: { strengthenings: string | null, id_hero: number | null }) {
    //console.log('vedi potenziamnti', strengthenings);
    
    const [hero_strengthenings, setHero_stremgthenings] = useState<Strengthenings_data[] | null>(null)
    useEffect(() => {
        if (strengthenings) {
            const actual_hero_strengthenings = strengthenings.split(',').map((el: string, i: number) => {
                if (el.trim() === empty_value.trim()) {
                    console.log("controllo elementi",el, 'id_hero', id_hero);
                    
                    return default_strengthenings[i]
                } else {
                    return {
                        src: default_strengthenings[i].src,
                        value: el.trim(),
                        checked: true
                    }
                }
            })
           // console.log('controllo array potenziamnti con checked',actual_hero_strengthenings, 'id_hero', id_hero);
            
            setHero_stremgthenings(actual_hero_strengthenings)
        }
        
    }, [strengthenings])

    async function sendValue(e: boolean, index: number) {
        //console.log('controllo checked', e, index);
        let actualValue = empty_value
        if (e) actualValue = strengthenings_values[index]
        if (hero_strengthenings) {
            const string_to_send = hero_strengthenings.map((el, i) => {
                if (i === index) {
                    return actualValue.trim()
                } else {
                    return el.value.trim()
                }
            }).join()
            console.log('strtinga da spedire', string_to_send);
            const response = await axios.patch(`api/nova_aetas/heroes/${id_hero}/campaign/${Case_modify_Hero.strengthenings}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                value: string_to_send
            })
            if (response.data) {
                console.log('controllo risposta' , response.data[0]);
            const Hero_strengthenings = response.data[0].hero_strengthenings as string
            const g : Strengthenings_data[] = hero_strengthenings.map( (el, i) => {
                if(i=== index){
                    return{...el,
                    value: Hero_strengthenings.split(',')[index].trim(),
                    checked: Hero_strengthenings.split(',')[index].trim() === empty_value? false: true
                    }
                }
                return{
                    ...el
                }
            }) 
            setHero_stremgthenings(g)
            }
            
        }
        
        

    }

    return (
        <section className=' flex items-center gap-4 justify-center flex-wrap'>
            {
               hero_strengthenings && hero_strengthenings.map((el, i) => (
                <div key={`potenziamento_${i}`} className='m-0 p-0'>
                    <Single_strength source={el} index={i} funx_value={sendValue} />
                </div>
                    
                ))
            }
        </section>
    )
}

function Single_strength({ source, index, funx_value }: { source: Strengthenings_data, index: number, funx_value: R }) {
//console.log(" vedi source",source);

    return (
        <div className='flex items-center gap-1'>
            <input type="checkbox" defaultChecked={source.checked} onChange={(e) => funx_value(e.currentTarget.checked, index)} />
            <Image className='w-auto h-7' src={source.src} alt='icona azione' width={30}></Image>
        </div>
    )
}

export default memo(Hero_strengthenings)