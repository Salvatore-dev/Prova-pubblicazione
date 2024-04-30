"use client"

import React, { useEffect } from 'react'

import { useState, memo } from 'react'
import { Image } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

import Treasury_title from './Treasury_title';
import { popolini } from '@/app/lib/Nova_aetas/data';
import { treasury_campaign } from '@/app/lib/Nova_aetas/data'
import { Icon_treasury, Item_treasury } from '@/app/lib/Nova_aetas/definitions'


import elementum from '@/public/image/nova_aetas/carta_reagente_elementum.jpg'
import pecunia from '@/public/image/nova_aetas/carta_reagente_pecunia.jpg'
import alchimia from '@/public/image/nova_aetas/carta_reagente_alchimia.jpg'
import popolino from '@/public/image/nova_aetas/popolino.jpg'

import { useDebouncedCallback } from 'use-debounce';

import { Treasury } from '@/app/lib/Nova_aetas/definitions';
import axios from 'axios';

interface Set_treasury extends Item_treasury {
    campaign_id: number,
    src?: string,
    changing: boolean
}

const default_schedule = [...treasury_campaign, popolini]


function Treasury_data({ data, Campaign_id }: { data: Treasury[] | null, Campaign_id: number | null | undefined }) {

    const [itemsTreasury, setItemTreasury] = useState<Set_treasury[] | null>(null)
    console.log(itemsTreasury);

    useEffect(() => {

        const treasury = default_schedule.map(el => {
            let img
            const campaign_id = Campaign_id

            if (el.icon === Icon_treasury.elementum) { img = { src: elementum } }

            if (el.icon === Icon_treasury.pecunia) { img = { src: pecunia } }

            if (el.icon === Icon_treasury.alchimia) { img = { src: alchimia } }

            if (el.icon === Icon_treasury.popolino) {
                img = { src: popolino }
            }
            return {
                ...el,
                campaign_id: campaign_id,
                ...img?.src,
                changing: false
            }
        }) as Set_treasury[]
        if (data) {

            const d = treasury.map(el => {
                const item = el.name
                const g = data.filter(el => el.name === item)
                if (item === g[0]?.name) {
                    return {
                        ...el,
                        quantity: g[0]?.quantity,
                        id: g[0]?.id
                    }
                }
                return {
                    ...el
                }
            })
            setItemTreasury(d)
        } else setItemTreasury(treasury)

    }, [data])

    function changing(index: number) {
        console.log('controlla indice', index);

        if (itemsTreasury) {
            const newItems = itemsTreasury.map((el, i) => {
                if (i === index) {
                    return { ...el, changing: true }
                }
                return el
            })
            setItemTreasury(newItems)
        }

    }
    const handleSubmit = useDebouncedCallback((value: string, id_campaign: number, id_item: number | null | undefined, index: number, item: string) => {

        async function patch_item(new_quantity: number) {
            let check = false
            const response = await axios.patch(`api/nova_aetas/campaigns/${id_campaign}/treasury/${id_item}`, {
                quantity: new_quantity,
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (response.data) {
                console.log(response);
                check = true
                if (itemsTreasury && check) {
                    const newItems = itemsTreasury.map((el, i) => {
                        if (i === index) {
                            return { ...el, changing: false, quantity: new_quantity }
                        }
                        return el
                    })
                    setItemTreasury(newItems)
                }
            }
        }
        async function create_item(new_quantity: number) {
            let check = false
            const response = await axios.post(`api/nova_aetas/campaigns/${id_campaign}/treasury/${item}`, {
                quantity: new_quantity,
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (response.data) {
                //console.log(response);
                const new_id = response.data[0].id
                check = true
                if (itemsTreasury && check) {
                    const newItems = itemsTreasury.map((el, i) => {
                        if (i === index) {
                            return { ...el, changing: false, quantity: new_quantity, id: new_id }
                        }
                        return el
                    })
                    setItemTreasury(newItems)
                }
            }
        }
        if (value) {
            const quantity = parseFloat(value.trim())
            //console.log(quantity, id_campaign, id_item);
            if (id_item) {
                console.log('pronto per modifica', id_item);
                patch_item(quantity)
            } else {
                console.log('pronto per creazione', id_campaign);
                create_item(quantity)
            }
        }
    }, 3000)
    return (
        <section className=' flex flex-col justify-center m-auto p-3'>
            <div className='w-[90%] m-auto'><Treasury_title /></div>
            <Table striped bordered hover responsive='md' className='w-full m-auto'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Posseduti</th>
                        <th>Acquisto</th>
                        <th>vendita</th>
                    </tr>
                </thead>
                <tbody>
                    {itemsTreasury && itemsTreasury.map((el, i) => (
                        <tr key={el.name + i}>
                            <td className=''><Image className=' float-left top-0' height={30} width={30} src={el.src} alt={el.name + 'immagine icona'} /> <p className='relative top-1'>{el.name}</p></td>
                            <td className={`hover:cursor-pointer`} onClick={() => changing(i)}>{el.changing ? <input type='number' onChange={(event) => handleSubmit(event.currentTarget.value, el.campaign_id, el.id, i, el.name)} defaultValue={el.quantity}></input> : <p className={`${el.quantity== 0 && 'text-amber-400'}`}>{el.quantity}</p>}</td>
                            <td><div className={`flex items-center gap-1`}><p className=' my-auto'>{el.purchase || '--'}</p> <Image className='' alt='icona popolino' width={30} height={30} src={itemsTreasury[itemsTreasury.length - 1].src} />  </div></td>
                            <td><div className={`flex items-center gap-1`}><p className=' my-auto'>{el.sale || '--'}</p> <Image className='' alt='icona popolino' width={30} height={30} src={itemsTreasury[itemsTreasury.length - 1].src} />  </div>   </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </section>

    )
}

export default memo(Treasury_data)