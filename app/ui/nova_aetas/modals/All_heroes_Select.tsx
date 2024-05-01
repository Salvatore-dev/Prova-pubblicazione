"use client"

import { Dispatch, SetStateAction, useState, useEffect, memo } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Hero, HERO } from '@/app/lib/Nova_aetas/definitions';

import React from 'react'

function All_heroes_Select({ data, id_campaign, addHero, setShow_heroes }: { data: Hero[] | null, id_campaign: number | null | undefined, addHero: Dispatch<SetStateAction<HERO[]>>, setShow_heroes: Dispatch<SetStateAction<boolean>> }) {

    const [show, setShow] = useState(false);
    const [hero, setHero] = useState<Hero[] | null>(null)

    useEffect(() => {
        console.log('azione selziona eroi', data);
        if (data && id_campaign) {
            setHero(data)
        } else {
            setHero(null)
        }

    }, [data])

    async function No_Campaign(id_hero: number) {
        if (id_hero) {
            const response = await axios.delete(`api/nova_aetas/heroes/${id_hero}/campaign`)
            if (response.data[0]) {
                console.log('controlla cancellazione', response.data);

                const r: Hero = response.data[0]
                addHero(prev => [...prev].filter(el => el.id !== r.id))
                setShow_heroes(false)
            }
        }
    }
    async function add_Campaign(id_hero: number) {
        if (id_hero && id_campaign) {
            const response = await axios.patch(`api/nova_aetas/heroes/${id_hero}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                id_campaign: id_campaign
            })
            const r: HERO = response.data;
            addHero(prev => [...prev, r]);
            setShow_heroes(false)
        }
    }
    return (
        hero && <section className='w-[80%] m-auto'>
            <Table
                striped
                bordered
                hover
                responsive='md'
                className='w-full m-auto'
            >
                <thead>
                    <tr>
                        {['Nome', 'Giocatore', 'Classe', 'Status', 'Azione'].map((el, i) => (
                            <th key={`eroe_${i}`}>{el}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {hero && hero.map((el, i) => (
                        <tr key={`value_hero_${i}`}>
                            <td>{el.name}</td>
                            <td>{el.players}</td>
                            <td>{el.class}</td>
                            <td>{el.campaign_id ? 'Impegnato' : 'Disponibile'}</td>
                            <td className='flex justify-between px-2 items-center gap-2'>{!el.campaign_id ? <Button onClick={() => add_Campaign(el.id)} variant='success' className='text-black bg-green-600' size='sm'>Ingaggia</Button> : el.campaign_id === id_campaign ? <Button onClick={() => No_Campaign(el.id)} className='text-black bg-amber-600' variant='outline-warning' size='sm'>Congeda</Button> : <Button variant='warning' className='text-black bg-amber-600' onClick={() => add_Campaign(el.id)} size='sm'>Richiama e ingaggia</Button>} <Button size='sm' className='text-black bg-red-600' variant='outline-danger'>Cancella</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </section>
    )
}

export default memo(All_heroes_Select)