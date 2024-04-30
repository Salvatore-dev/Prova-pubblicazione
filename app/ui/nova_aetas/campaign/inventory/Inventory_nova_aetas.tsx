"use client"
import React from 'react'

import { useState, useEffect, memo } from 'react'
import Inventory_title from './Inventory_title'

import Table from 'react-bootstrap/Table';

import { useDebouncedCallback } from 'use-debounce';

import axios from 'axios'
import { Inventory } from '@/app/lib/Nova_aetas/definitions'

const normal_length = 12

function setLength(normal: number, data: number): number {
    if (normal > data) {
        return normal - data + 1
    } else return 3
}

interface Set_inventory extends Inventory {
    changing: boolean
}

function Inventory_nova_aetas({ data, Campaign_id }: { data: Inventory[] | null, Campaign_id: number | null | undefined }) {

    const [inventory, setInventory] = useState<Set_inventory[] | null>(null)

    useEffect(() => {
        if (Campaign_id) {
            const item_empty: Set_inventory = {
                id: 0,
                name: "vuoto",
                campaign_id: Campaign_id,
                changing: false
            }
            if (data) {
                const new_items = new Array(setLength(normal_length, data.length)).fill(item_empty) as Set_inventory[]
                // console.log(new_items);
                const a: Set_inventory[] = data.map(el => {
                    return {
                        ...el,
                        changing: false
                    }
                })
                setInventory([...a, ...new_items])
            } else {
                setInventory(new Array(normal_length).fill(item_empty))
            }
        }

    }, [data])
    console.log(inventory);
    function changing(index: number) {
        if (inventory) {
            const newItems = inventory.map((el, i) => {
                if (i === index) {
                    return { ...el, changing: true }
                }
                return el
            })
            setInventory(newItems)
        }
    }
    const handleSubmit = useDebouncedCallback((value: string, id_campaign: number, id_item: number, index: number) => {
        console.log(value.trim());
        async function create_item(item: string) {
            let check = false
            const response = await axios.post(`api/nova_aetas/campaigns/${id_campaign}/inventory`, {
                item: item.trim(),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (response.data) {
                const new_id = response.data[0].id
                check = true
                if (inventory && check) {
                    const newItems = inventory.map((el, i) => {
                        if (i === index) {
                            return { ...el, changing: false, name: item, id: new_id }
                        }
                        return el
                    })
                    const check_length = newItems.filter(el => el.name === "vuoto").length
                    console.log('lunghezza items', check_length);

                    if (check_length === 0 && Campaign_id) {
                        const newItem: Set_inventory = {
                            id: 0,
                            name: "vuoto",
                            campaign_id: Campaign_id,
                            changing: false
                        }
                        setInventory([...newItems, newItem])

                    } else setInventory(newItems)
                }
            }
        }
        async function delete_item(id: number, idCampaign: number) {
            let check = false
            const response = await axios.delete(`api/nova_aetas/campaigns/${idCampaign}/inventory/${id}`)
            if (response.data[0]?.id) {
                check = true
                if (inventory && check) {
                    const newItems = inventory.map((el, i) => {
                        if (i === index) {
                            return { ...el, changing: false, name: 'vuoto', id: 0 }
                        }
                        return el
                    })
                    setInventory(newItems)
                }
            }
        }
        async function patch_item(id: number, idCampaign: number, item: string) {
            let check = false
            const response = await axios.patch(`api/nova_aetas/campaigns/${idCampaign}/inventory/${id}`, {
                item: item.trim(),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (response.data[0]?.item) {
                check = true
                const new_item = response.data[0].item
                if (inventory && check) {
                    const newItems = inventory.map((el, i) => {
                        if (i === index) {
                            return { ...el, changing: false, name: new_item }
                        }
                        return el
                    })
                    setInventory(newItems)
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
                if (inventory) {
                    const newItems = inventory?.map((el, i) => {
                        if (i === index) {
                            return { ...el, changing: false, }
                        }
                        return el
                    })
                    setInventory(newItems)
                }
            }
        }

    }, 3000)



    return (
        <section className=' flex flex-col justify-center m-0 p-3 w-full md:w-[70%]'>
            <Table striped bordered hover responsive='md' className='w-full m-auto'>
                <thead>
                    <tr>
                        <th className=''><Inventory_title /></th>
                    </tr>
                </thead>
                <tbody>
                    {inventory && inventory.map((el, i) => (
                        <tr key={'inventory_' + i}>
                            <td className=' hover:cursor-pointer' onClick={() => changing(i)}>{el.changing ? <input type='text' onChange={(event) => handleSubmit(event.currentTarget.value, el.campaign_id, el.id, i)} defaultValue={el.name}></input> : <p className={`${el.name === 'vuoto'&& 'text-amber-400'}`}>{el.name}</p> }</td>
                        </tr>

                    ))}
                </tbody>
            </Table>
        </section>
    )
}

export default memo(Inventory_nova_aetas)