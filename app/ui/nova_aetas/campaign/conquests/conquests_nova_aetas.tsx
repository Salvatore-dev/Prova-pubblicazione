"use client"

import React from 'react'
import { useState, useEffect, memo } from 'react'

import axios from 'axios'

import Table from 'react-bootstrap/Table';

import Conquests_title from './conquests_title';

import { useDebouncedCallback } from 'use-debounce';

import { Conquest } from '@/app/lib/Nova_aetas/definitions';


interface Set_conquests extends Conquest {
    changing: boolean
}
const normal_length = 12

function setLength(normal: number, data: number) : number {
if (normal > data) {
    return  normal - data + 1
} else return 3
}


function Conquests_nova_aetas({ data, Campaign_id }: { data: Conquest[] | null, Campaign_id: number | null | undefined }) {
    const [conquests, setConquests] = useState<Set_conquests[] | null>(null)
  
    useEffect(()=>{
        if (Campaign_id) {
            const item_empty : Set_conquests ={
                id: 0,
                No: 'vuoto',
                campaign_id :  Campaign_id,
                changing : false
            }
            if (data) {
                const new_items = new Array(setLength(normal_length, data.length)).fill(item_empty) as Set_conquests[]
                console.log(new_items);
                const a : Set_conquests[] = data.map(el=> {
                    return {
                        ...el,
                        changing: false
                    }
                })
                setConquests([...a, ...new_items])
            } else {
                setConquests( new Array(normal_length).fill(item_empty))
            }
        }
    }, [data])
    console.log(conquests);

    function changing(index: number) {
        if (conquests) {
            const newItems = conquests.map((el, i) => {
                if (i === index) {
                    return { ...el, changing: true }
                }
                return el
            })
            setConquests(newItems)
        }
    }

    const handleSubmit = useDebouncedCallback((value: string, id_campaign: number, id_item: number, index: number) => {
        console.log(value.trim());
        
        async function create_item(NO: string) {
            let check = false
            const response = await axios.post(`api/nova_aetas/campaigns/${id_campaign}/conquests`, {
                No: NO.trim(),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            console.log('risponsta da post', response);
            
            if (response.data) {
                const new_id = response.data[0].id as number
                check = true
                if (conquests && check) {
                    const newItems = conquests.map((el, i) => {
                        if (i === index) {
                            return { ...el, changing: false, No: NO, id: new_id }
                        }
                        return el
                    })
                    const check_length = newItems.filter(el => el.No === "vuoto").length
                    console.log('lunghezza items', check_length);

                    if (check_length === 0 && Campaign_id) {
                        const newItem: Set_conquests = {
                            id: 0,
                            No: "vuoto",
                            campaign_id: Campaign_id,
                            changing: false
                        }
                        setConquests([...newItems, newItem])

                    } else setConquests(newItems)

                }
            }
        }
        async function delete_item(id: number, idCampaign: number) {
            let check = false
            const response = await axios.delete(`api/nova_aetas/campaigns/${idCampaign}/conquests/${id}`)
            console.log('risposta da delete', response);
            
            if (response.data[0]?.id) {
                check = true
                if (conquests && check) {
                    const newItems = conquests.map((el, i) => {
                        if (i === index) {
                            return { ...el, changing: false, No: 'vuoto', id: 0 }
                        }
                        return el
                    })
                    setConquests(newItems)
                }
            }
        }
        async function patch_item(id: number, idCampaign: number, NO: string) {
            let check = false
            const response = await axios.patch(`api/nova_aetas/campaigns/${idCampaign}/conquests/${id}`, {
                No: NO.trim(),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            console.log('risponsta da modifica', response);
            
            if (response.data[0]?.number) {
                check = true
                const new_item = response.data[0].number as string
                if (conquests && check) {
                    const newItems = conquests.map((el, i) => {
                        if (i === index) {
                            return { ...el, changing: false, No: new_item }
                        }
                        return el
                    })
                    setConquests(newItems)
                }
            }
        }
        if (id_item) {
            console.log('pronto per modifica o cancellazione', id_item, value);
            if (value === '') {
                console.log('cancelazione esistente');
                delete_item(id_item, id_campaign)
            } else {
                console.log('modifica esistente');
                patch_item(id_item, id_campaign, value)
            }
        } else {
            console.log('pronto per creazione', value, id_campaign);
            if (value !== '') {
                create_item(value)
            } else {
                console.log('annullamento modifica');
                if (conquests) {
                    const newItems = conquests?.map((el, i) => {
                        if (i === index) {
                            return { ...el, changing: false, }
                        }
                        return el
                    })
                    setConquests(newItems)
                }

            }

         }

    }, 3000)
    
    return (
    <section className=' flex flex-col justify-center m-0 p-3 w-full md:w-[30%]'>
        <Table striped bordered hover responsive='md' className='w-full m-auto'>
                <thead>
                    <tr>
                        <th className=''><Conquests_title /></th>
                    </tr>
                </thead>
                <tbody>
                    {conquests && conquests.map((el, i) => (
                        <tr key={"conquests_" + i}>
                            <td className=' hover:cursor-pointer' onClick={() => changing(i)}>{el.changing ? <input type='text' onChange={(event) => handleSubmit(event.currentTarget.value, el.campaign_id, el.id, i)} defaultValue={el.No}></input> : <p className={`${el.No === 'vuoto'&& 'text-amber-400'}`}>{el.No}</p>
                            }</td>
                        </tr>

                    ))}
                </tbody>
            </Table>
    </section>
  )
}

export default memo(Conquests_nova_aetas)