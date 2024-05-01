"use client"

import React from 'react'
import Table from 'react-bootstrap/Table';

import { useEffect, useState, useReducer, memo } from 'react';
import { Hero, HERO } from '@/app/lib/Nova_aetas/definitions';
import axios from 'axios';

import { useDebouncedCallback } from 'use-debounce';

import Hero_strengthenings from './hero_strengthenings';
import Experience_icon from './experience_title';
import Liasom_title from './liasom_title';
import Conquest_title_hero from './conquest_title';
import Hero_conquests from './hero_conquests';
import Hero_injuries from './hero_injuries';

import Hero_icon_title from './title_spent';

import Hero_skills from './hero_skills';
import { Case_modify_Hero } from '@/app/lib/Nova_aetas/definitions';


type Changing_data_hero = {
  value: string | number | null,
  changing: boolean
}

interface Hero_data {
  id: number,
  name: string,
  players: string,
  class: string,
  liaison: Changing_data_hero,
  note: Changing_data_hero,
  hero_conquests: string,
  destiny: Changing_data_hero,
  spent: Changing_data_hero,
  earned: Changing_data_hero,
  strengthenings: string,
  campaign_id: number | null

}


const default_value: Hero_data = {
  id: 0,
  name: '',
  players: '',
  class: '',
  liaison: {
    value: 'vuoto',
    changing: false
  },
  note: {
    value: 'vuoto',
    changing: false
  },
  hero_conquests: '0,0,0,0,0,0,0',
  destiny: {
    value: 0,
    changing: false
  },
  spent: {
    value: 0,
    changing: false
  },
  earned: {
    value: 0,
    changing: false
  },
  strengthenings: 'vuoto,vuoto,vuoto,vuoto,vuoto',
  campaign_id: 0,
}


function TableHero({ data }: { data: HERO | null }) {

  const [hero, setHero] = useState<Hero_data | null>(null);

  useEffect(() => {
    if (data) {
      const actual_hero: Hero_data = {
        id: data.id,
        name: data.name,
        players: data.players,
        class: data.class,
        liaison: {
          value: data.liaison || 'vuoto',
          changing: false
        },
        hero_conquests: data.hero_conquests,
        note: {
          value: data.note || 'vuoto',
          changing: false
        },
        destiny: {
          value: data.destiny,
          changing: false
        },
        spent: {
          value: data.spent ? data.spent : default_value.spent.value,
          changing: false
        },
        earned: {
          value: data.earned ? data.earned : default_value.earned.value,
          changing: false
        },
        strengthenings: data.hero_strengthenings,
        campaign_id: data.campaign_id
      }
      setHero(actual_hero);
    }
  }, [])


  function changing(type_value: string, set: boolean) {
    if (hero) {
      const data: Hero_data = { ...hero }
      if (type_value === Case_modify_Hero.liaison) {
        data.liaison.changing = set;
        setHero(data)
      }
      if (type_value === Case_modify_Hero.destiny) {
        data.destiny.changing = set;
        setHero(data)
      }
      if (type_value === Case_modify_Hero.earned) {
        data.earned.changing = set;
        setHero(data)
      }
      if (type_value === Case_modify_Hero.spent) {
        data.spent.changing = set;
        setHero(data)
      }
      if (type_value === Case_modify_Hero.note) {
        data.note.changing = set;
        setHero(data)
      }
    }
  }
  const handleChangeValue = useDebouncedCallback(async (value_string: string, case_value: string) => {
    if (hero) {
      console.log('valorin ingresso tabella hero', value_string, case_value);
      
      const response = await axios.patch(`http://localhost:3000/api/nova_aetas/heroes/${hero.id}/campaign/${case_value}`, {
        headers: {
          "Content-Type": "application/json",
        },
        value: value_string
      })
      if (response.data) {
        console.log('controllo risposta tabella hero', response.data[0]);
        if (case_value === Case_modify_Hero.liaison) {
          const Hero_liaison = response.data[0].liaison as string
          const r: Hero_data = { ...hero }
          r.liaison = {
            ...r.liaison,
            value: Hero_liaison,
            changing: false
          }
          setHero(r)
        }
        if (case_value === Case_modify_Hero.destiny) {
          console.log('cotrollo', case_value=== Case_modify_Hero.destiny);
          
          const Hero_new_value = response.data[0].destiny as number
          const r: Hero_data = { ...hero }
          r.destiny = {
            ...r.destiny,
            value: Hero_new_value,
            changing: false
          }
          setHero(r)
        }
        if (case_value === Case_modify_Hero.earned) {
          console.log('cotrollo', case_value=== Case_modify_Hero.earned);
          
          const Hero_new_value = response.data[0].earned as number
          const r: Hero_data = { ...hero }
          r.earned = {
            ...r.earned,
            value: Hero_new_value,
            changing: false
          }
          setHero(r)
        }
        if (case_value === Case_modify_Hero.spent) {
          console.log('cotrollo', case_value=== Case_modify_Hero.spent);
          
          const Hero_new_value = response.data[0].spent as number
          const r: Hero_data = { ...hero }
          r.spent = {
            ...r.spent,
            value: Hero_new_value,
            changing: false
          }
          setHero(r)
        }
        if (case_value === Case_modify_Hero.note) {
          console.log('cotrollo', case_value=== Case_modify_Hero.note);
          
          const Hero_new_value = response.data[0].note as string
          const r: Hero_data = { ...hero }
          r.note = {
            ...r.note,
            value: Hero_new_value,
            changing: false
          }
          setHero(r)
        }
        

      } else {
        changing(case_value, false)
      }
    }
  }, 3000)
  return (
    <section className='w-[80%] m-auto'>
      <Table striped bordered hover responsive='md' className='w-full m-auto'>
        <thead>
          <tr>
            <th>{'eroe'.toUpperCase()}</th>
            <th>{hero && hero.name}</th>
          </tr>
          <tr>
            <th>{'giocatore'.toUpperCase()}</th>
            <th>{hero && hero.players}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Classe Avanzata</td>
            <td>{hero && hero.class}</td>
          </tr>
          <tr>
            <td>
              <Liasom_title />
            </td>
            <td>{(hero && !hero.liaison.changing) ? <p onClick={() => changing(Case_modify_Hero.liaison, true)}>{hero.liaison.value}</p> : <input type='text' defaultValue={hero?.liaison.value || 'vuoto'} onChange={(e) => handleChangeValue(e.currentTarget.value, Case_modify_Hero.liaison)} />}</td>
          </tr>
          <tr>
            <td className=''>
              <Conquest_title_hero />
            </td>
            <td>
              <Hero_conquests hero_conquests={hero && hero.hero_conquests} hero_id={hero && hero.id} />
            </td>
          </tr>
          <Hero_injuries data={data?.injuries} id_hero={hero && hero.id} />
          <tr>
            <td>Note</td>
            <td>{(hero && !hero.note.changing)? <p onClick={()=> changing(Case_modify_Hero.note, true)}>{hero.note.value}</p>: <textarea defaultValue={hero?.note.value || 'vuoto'} onChange={(e)=> handleChangeValue(e.currentTarget.value, Case_modify_Hero.note)} />}</td>
          </tr>
        </tbody>

      </Table>
      <Table striped bordered hover responsive='md' className='w-full m-auto'>
        <thead>
          <tr>
            <th colSpan={2}>
              <Experience_icon />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className=' font-bold'>Destino</td>
            <td>{(hero && !hero.destiny.changing) ? <p onClick={() => changing(Case_modify_Hero.destiny, true)}>{hero.destiny.value}</p> : <input type='number' defaultValue={hero?.destiny.value || 0} onChange={(e) => handleChangeValue(e.currentTarget.value, Case_modify_Hero.destiny)} />}</td>
          </tr>
          <tr>
            <td className=' font-bold'>Potenziamento</td>
            <td><Hero_strengthenings strengthenings={hero && hero.strengthenings} id_hero={hero && hero.id} /></td>
          </tr>
          <Hero_skills data={data?.skills} hero_id={hero && hero.id} />
          <tr>
            <td>
              <Hero_icon_title title='Spesi' />
            </td>
            <td>{(hero && !hero.spent.changing)? <p className={`m-0 p-0 ${hero.earned.value === 0 && 'text-amber-700'}`} onClick={()=> changing(Case_modify_Hero.spent, true)}>{hero.spent.value}</p>: <input type='number' defaultValue={hero?.spent.value|| 0 } onChange={(e)=> handleChangeValue(e.currentTarget.value, Case_modify_Hero.spent)} />}</td>
          </tr>
          <tr>
            <td className=''>
              <Hero_icon_title title='Guadagnati' />
            </td>
            <td>{(hero && !hero.earned.changing) ? <p className={`m-0 p-0 ${hero.earned.value === 0 && 'text-amber-700'}`} onClick={()=> changing(Case_modify_Hero.earned, true)}>{hero.earned.value}</p>: <input type='number' defaultValue={hero?.earned.value || 0} onChange={(e)=> handleChangeValue(e.currentTarget.value, Case_modify_Hero.earned)}/>}</td>
          </tr>
        </tbody>
      </Table>
    </section>
  )
}

export default memo(TableHero)