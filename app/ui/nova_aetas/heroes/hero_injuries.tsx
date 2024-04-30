"use clinet"

import React from 'react'
import { useState, useEffect, memo } from 'react'
import Image from 'next/image'

import { Injury } from '@/app/lib/Nova_aetas/definitions'

import axios from 'axios'
import { useDebouncedCallback } from 'use-debounce'

import popolini_icon from '@/public/image/nova_aetas/popolino.jpg'

import { Action_Type_Injuries } from '@/app/lib/Nova_aetas/definitions'

const default_name = 'vuoto'
const default_popolini = 0

const normal_length = 3

function setLength(normal: number, data: number): number {
    if (normal > data) {
        return normal - data + 1
    } else return 3
}

type Injury_hero ={
    id: number,
    name: {
        value: string,
        changing: boolean
    },
    popolini: {
        value: number | null,
        changing: boolean
    },
    hero_id: number
}

function Hero_injuries({data, id_hero}: {data: Injury[] | null | undefined, id_hero: number | undefined | null }) {
  
    const [injuries, setInjuries] = useState<Injury_hero[]|null>(null)
  
    useEffect(()=>{
        if (data && id_hero) {
            const item_empty : Injury_hero = {
                id: 0,
                name: {
                    value: default_name,
                    changing: false
                },
                popolini : {
                    value: default_popolini,
                    changing: false
                },
                hero_id: id_hero
            }
            if (data.length === 0) {
                const new_items : Injury_hero[] = new Array(normal_length).fill(item_empty)
                setInjuries(new_items)
            } else {
                const new_items : Injury_hero[] = new Array(setLength(normal_length, data.length)).fill(item_empty)
                const r :  Injury_hero[] = data.map(item=> {
                    return {
                        id: item.id,
                        name : {
                            value: item.name,
                            changing : false
                        },
                        popolini : {
                            value: item.popolini,
                            changing: false
                        },
                        hero_id : item.hero_id
                    }
                })
                setInjuries([...r, ...new_items])
            }
        }
    }, [data])

    function changing(index: number, type_value: string, set: boolean) {
        if (injuries) {
            const r : Injury_hero[] = [...injuries]
            if (type_value === Action_Type_Injuries.name) {
                
                const new_array = r.map((el, i)=> {
                    if(i === index){
                        return {
                            ...el,
                            name: {
                                value: el.name.value,
                                changing: set
                            }
                        }
                    }
                    return el
                })
                console.log('controllo', new_array);
                setInjuries(new_array)
            }

            if(type_value === Action_Type_Injuries.popolini){
                const new_array = r.map((el, i) => {
                    if (i === index) {
                        //console.log('controllo', i === index);
                        return {
                            ...el,
                            popolini: {
                                value: el.popolini.value,
                                changing: set
                            }
                        }
                    }
                    return el
                })
                console.log('controllo', new_array);

                setInjuries(new_array)
            }
        }
    }

    function lastInjury(injuries : Injury_hero[], length_array: number, item_empty: Injury_hero) : Injury_hero[] {
        const y = injuries.filter(el => el.id !== 0);
        if (y.length < length_array -1) {
            return [...injuries]
        } else return [...y, item_empty]
        
    }

    const hundleSendValue = useDebouncedCallback(async (value_imput: string, index_item: number, id_hero: number, type_value: string, index: number) =>{

        const default_name = 'vuoto'
        const default_popolini = 0
        if (injuries) {
            const item_empty : Injury_hero = {
                id: 0,
                name: {
                    value: default_name,
                    changing: false
                },
                popolini : {
                    value: default_popolini,
                    changing: false
                },
                hero_id : id_hero
            }
            const r : Injury_hero[] = [...injuries]
            if (type_value === Action_Type_Injuries.name) {
                if (index_item) {
                    if (value_imput === '') {
                        console.log(typeof r[index].popolini.value);
                        if (r[index].popolini.value === default_popolini) {
                            console.log('delete injury', index_item, type_value);
                            try {
                                const response = await axios.delete(`api/nova_aetas/heroes/${id_hero}/injuries/${index_item}`)
                                console.log(response.data[0]);
                                if (response.data[0]) {
                                    const t : Injury = response.data[0];
                                    const newInjury : Injury_hero[] = r.map(el=>{
                                        if (el.id === t.id) {
                                            return item_empty
                                        }
                                        return el
                                    })
                                    setInjuries(lastInjury(newInjury, normal_length, item_empty))
                                } else changing(index, type_value, false) 


                            } catch (error) {
                                console.log(error);
                                changing(index, type_value, false)
                            }
                        } else {
                            console.log('modifica name', default_name, id_hero, index_item, type_value);
                            try {
                                const response = await axios.patch(`api/nova_aetas/heroes/${id_hero}/injuries/${index_item}`, {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    value: default_name,
                                    case_value: type_value
                                })
                                console.log(response.data[0]);
                                if (response.data[0]) {
                                    const t : Injury = response.data[0];
                                    const newInjury : Injury_hero[] = r.map(el=>{
                                        if (el.id === t.id) {
                                            return {
                                                ...el,
                                                name: {
                                                    value: t.name,
                                                    changing: false
                                                }
                                            }
                                        }
                                        return el
                                    })
                                    console.log('controllo injuries modifica', newInjury);
                                    
                                    setInjuries(lastInjury(newInjury, normal_length, item_empty))
                                } else {
                                    changing(index, type_value, false) 
                                }
                            } catch (error) {
                                console.log(error);
                                changing(index, type_value, false)
                            }
                        }
                    } else {
                        console.log('modifica name', value_imput, id_hero, index_item, type_value);
                        try {
                            const response = await axios.patch(`api/nova_aetas/heroes/${id_hero}/injuries/${index_item}`, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                value: value_imput,
                                case_value: type_value
                            })
                            console.log(response.data[0]);
                            if (response.data[0]) {
                                const t : Injury = response.data[0];
                                const newInjury : Injury_hero[] = r.map(el=>{
                                    if (el.id === t.id) {
                                        return {
                                            ...el,
                                            name: {
                                                value: t.name,
                                                changing: false
                                            }
                                        }
                                    }
                                    return el
                                })
                                console.log('controllo injuries modifica', newInjury)
                                setInjuries(lastInjury(newInjury, normal_length, item_empty))
                            } else {
                                changing(index, type_value, false) 
                            }
                        } catch (error) {
                            console.log(error);
                            changing(index, type_value, false) 
                        }
                    }
                } else {
                    if (value_imput === '') {
                        console.log('annulla operazione');
                        changing(index, type_value, false)
                    } else {
                        console.log('creazione name', value_imput, id_hero, index_item, type_value);
                        // changing(index, type_value, false)
                        try {
                            const response = await axios.post(`api/nova_aetas/heroes/${id_hero}/injuries`, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                name: value_imput,
                                popolini: default_popolini
                            })
                            console.log(response.data[0]);
                            if (response.data[0]) {
                                const t : Injury = response.data[0];
                                const newInjury : Injury_hero[] = r.map((el, i)=>{
                                    if (i === index) {
                                        return {
                                            ...el,
                                            id: t.id,
                                            name: {
                                                value: t.name,
                                                changing: false
                                            },
                                            popolini: {
                                                value: t.popolini,
                                                changing: false
                                            },
                                            hero_id: t.hero_id

                                        }
                                    }
                                    return el
                                })
                                setInjuries(lastInjury(newInjury, normal_length, item_empty))
                            } else {
                                changing(index, type_value, false)
                            }
                            
                        } catch (error) {
                            console.log(error);
                            changing(index, type_value, false)
                        }
                    }
                }
            }

            if (type_value === Action_Type_Injuries.popolini) {
                if (index_item) {
                    if (value_imput === '') {
                        if (r[index].name.value === default_name) {
                            console.log('delete injury', index_item, type_value);
                            try {
                                const response = await axios.delete(`api/nova_aetas/heroes/${id_hero}/injuries/${index_item}`)
                                console.log(response.data[0]);
                                if (response.data[0]) {
                                    const t : Injury = response.data[0];
                                    const newInjury : Injury_hero[] = r.map(el=>{
                                        if (el.id === t.id) {
                                            return item_empty
                                        }
                                        return el
                                    })
                                    setInjuries(lastInjury(newInjury, normal_length, item_empty))
                                } else changing(index, type_value, false)
                            } catch (error) {
                                console.log(error);
                                changing(index, type_value, false)
                            }
                        } else {
                            console.log('modifica popolini', default_popolini, id_hero, index_item, type_value);
                            try {
                                const response = await axios.patch(`api/nova_aetas/heroes/${id_hero}/injuries/${index_item}`, {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    value: default_popolini,
                                    case_value: type_value
                                })
                                console.log(response.data[0]);
                                if (response.data[0]) {
                                    const t : Injury = response.data[0];
                                    console.log('controlla injuries', t);
                                    const newInjury : Injury_hero[] = r.map(el=>{
                                        if (el.id === t.id) {
                                            return {
                                                ...el,
                                                popolini: {
                                                    value: t.popolini,
                                                    changing: false
                                                }
                                            }
                                        }
                                        return el
                                    })
                                    console.log('controllo injuries modifica', newInjury)
                                    setInjuries(lastInjury(newInjury, normal_length, item_empty))
                                } else {
                                    changing(index, type_value, false) 
                                }
                            } catch (error) {
                                console.log(error);
                                changing(index, type_value, false) 
                            }
                        }
                    } else {
                        console.log('modifica popolini', value_imput, id_hero, index_item, type_value);
                        try {
                            const response = await axios.patch(`api/nova_aetas/heroes/${id_hero}/injuries/${index_item}`, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                value: value_imput,
                                case_value: type_value
                            })
                            console.log(response.data[0]);
                            if (response.data[0]) {
                                const t : Injury = response.data[0];
                                console.log('controlla injuries', t);
                                
                                const newInjury : Injury_hero[] = r.map(el=>{
                                    if (el.id === t.id) {
                                        return {
                                            ...el,
                                            popolini: {
                                                value: t.popolini,
                                                changing: false
                                            }
                                        }
                                    }
                                    return el
                                })
                                console.log('controllo injuries modifica', newInjury)
                                setInjuries(lastInjury(newInjury, normal_length, item_empty))
                            } else {
                                changing(index, type_value, false) 
                            }
                        } catch (error) {
                            console.log(error);
                            changing(index, type_value, false)
                        }
                    }
                } else {
                    if (value_imput === '') {
                        console.log('annulla operazione');
                        changing(index, type_value, false)
                    } else {
                        console.log('creazione injury', value_imput, id_hero, index_item, type_value);
                        try {
                            const response = await axios.post(`api/nova_aetas/heroes/${id_hero}/injuries`, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                name: default_name,
                                popolini: value_imput
                            })
                            console.log(response.data[0]);

                            if (response.data[0]) {
                                const t : Injury = response.data[0];
                                const newInjury : Injury_hero[] = r.map((el, i)=>{
                                    if (i === index) {
                                        return {
                                            ...el,
                                            id: t.id,
                                            name: {
                                                value: t.name,
                                                changing: false
                                            },
                                            popolini: {
                                                value: t.popolini,
                                                changing: false
                                            },
                                            hero_id: t.hero_id

                                        }
                                    }
                                    return el
                                })
                                setInjuries(lastInjury(newInjury, normal_length, item_empty))
                            } else {
                                changing(index, type_value, false)
                            }
                            
                        } catch (error) {
                            console.log(error);
                            changing(index, type_value, false)
                        }
                    }
                }
            }
        }
    }, 3000)
    return (
        <>
        {injuries && injuries.map((injury, index) => (
            <tr key={`Skills_hero_${index}`}>
                <td className=' w-28'>Ferita grave</td>
                <td className='flex gap-2 md:gap-5 items-center justify-between md:px-4' >
                    {!injury.name.changing ? <p className={`m-0 p-0 ${injury.name.value===default_name && ' text-amber-700'}`} onClick={() => changing(index, Action_Type_Injuries.name, true)}>{injury.name.value}</p> : <input type='text' defaultValue={injury.name.value} onChange={(e) => hundleSendValue(e.currentTarget.value, injury.id, injury.hero_id, Action_Type_Injuries.name, index)} />}
                    <div className='flex gap-2 items-center m-0'><div className='flex items-center text-xl m-0'>{`[`} <Image className={`w-5 md:w-8`} src={popolini_icon} alt={`icona_popolni`} width={30} /></div>{!injury.popolini.changing ? <p className={`m-0 text-center self-center ${injury.popolini.value === 0 && 'text-amber-700'}`} onClick={() => changing(index, Action_Type_Injuries.popolini, true)}>{injury.popolini.value || 0}</p> : <input type='number' className=' w-20' defaultValue={injury.popolini.value || 0} onChange={(e) => hundleSendValue(e.currentTarget.value, injury.id, injury.hero_id, Action_Type_Injuries.popolini, index)} />} <div className='text-xl m-0'>{`]`}</div></div>
                </td>
            </tr>
        ))}
    </>
  )
}

export default memo(Hero_injuries)