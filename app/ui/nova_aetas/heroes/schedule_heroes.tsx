"use client"

import React from 'react'

import { memo, useEffect, useState } from 'react'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import { HERO, Hero } from '@/app/lib/Nova_aetas/definitions'
import New_hero from '../modals/new_hero'
import TableHero from './tableHero'
import All_heroes_Select from '../modals/All_heroes_Select';

function Schedule_heroes({data, id_campaign}: {data: HERO[], id_campaign: number | null | undefined}) {
const [heroes, setHeroes]= useState<HERO[] | []>(data)
const [hero_to_select, setHero_to_select] = useState<Hero[]| null>(null)
const [show_heroes, setShow_heroes] = useState<boolean>(false)

useEffect(()=>{
  async function getHeroes() {
    const response = await axios.get(`api/nova_aetas/heroes`)
    if (response.data) {
      console.log(response.data);
      const hero_list : Hero[] = response.data
      setHero_to_select(hero_list)
    }
  }
  if (show_heroes) {
    getHeroes()
  } else setHero_to_select(null)
  
}, [show_heroes])
console.log('controlla eroi' , heroes);


return (
    <div className=' my-5'>
      <div className=' flex items-center gap-4 justify-center py-4 bg-gray-300'>
        <p className='m-0 p-0 text-xl md:text-2xl lg:text-4xl text-center font-bold'>Schede Eroi</p>
        <New_hero addHero={setHeroes} id_campaign={id_campaign} />
        <Button onClick={()=> setShow_heroes(prev=> !prev)}>{show_heroes ? 'Nascondi eroi disponibili': 'Vedi eroi diponibili'}</Button>
      </div>
      <div>
        <All_heroes_Select data={hero_to_select} id_campaign={id_campaign} addHero={setHeroes} setShow_heroes={setShow_heroes} />
      </div>
      <div>
       <Tabs
       id='controlled-tab-heros'
       defaultActiveKey={heroes.length > 0 ? `Heroes_${heroes[0].name}` : 'default'}
       variant='tabs'
       fill
       justify
       unmountOnExit = {false}
       className='mb-3 text-2xl font-semibold bg-gray-300 text-slate-950'
       >
        {heroes && heroes.map((el, i)=> (
          <Tab
          eventKey={`Heroes_${el.name}`}
          title={el.name}
          key={`Heroes_${i}`}
          >
            <TableHero data={el} />
          </Tab>
        ))}

       </Tabs>
      </div>
    </div>
  )
}

export default memo(Schedule_heroes)