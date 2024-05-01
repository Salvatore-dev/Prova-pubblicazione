"use client"

import React from 'react'
import { useState, useEffect, memo } from 'react'
import Image from 'next/image'

import axios from 'axios'

import { useDebouncedCallback } from 'use-debounce'

import experience_icon from '@/public/image/nova_aetas/punti_esperienza.jpg'

import { Skill, Action_Type_Skills } from '@/app/lib/Nova_aetas/definitions'


const default_name = 'vuoto'
const default_experience = 0

type Skills_hero = {
    id: number;
    name: {
        value: string,
        changing: boolean
    },
    experience: {
        value: number,
        changing: boolean
    },
    id_hero: number
}
const normal_length = 12

function setLength(normal: number, data: number): number {
    if (normal > data) {
        return normal - data + 1
    } else return 3
}

function Hero_skills({ data, hero_id }: { data: Skill[] | null | undefined, hero_id: number | undefined | null }) {
    //console.log('controlla', data, hero_id);
    const [skills, setSkills] = useState<Skills_hero[] | null>(null)

    function changing(index: number, type_value: string, set: boolean) {
        if (skills) {
            const r: Skills_hero[] = [...skills]
            if (type_value === Action_Type_Skills.name) {
                console.log("controlla indice", index);

                const new_array = r.map((el, i) => {
                    if (i === index) {
                        console.log('controllo', i === index);

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
                setSkills(new_array)
            }
            if (type_value === Action_Type_Skills.experience) {
                const new_array = r.map((el, i) => {
                    if (i === index) {
                        console.log('controllo', i === index);

                        return {
                            ...el,
                            experience: {
                                value: el.experience.value,
                                changing: set
                            }
                        }
                    }
                    return el
                })
                console.log('controllo', new_array);

                setSkills(new_array)
            }
        }
    }
    useEffect(() => {
        if (data && hero_id) {
            const item_empty: Skills_hero = {
                id: 0,
                name: {
                    value: default_name,
                    changing: false
                },
                experience: {
                    value: default_experience,
                    changing: false
                },
                id_hero: hero_id
            }
            if (data.length === 0) {

                const new_items: Skills_hero[] = new Array(normal_length).fill(item_empty)
                setSkills(new_items)
            } else {
                const new_items: Skills_hero[] = new Array(setLength(normal_length, data.length)).fill(item_empty)
                const r: Skills_hero[] = data.map((item) => {
                    return {
                        id: item.id,
                        name: {
                            value: item.name,
                            changing: false
                        },
                        experience: {
                            value: item.experience,
                            changing: false
                        },
                        id_hero: item.hero_id

                    }
                })
                setSkills([...r, ...new_items])
            }
        }
    }, [data, hero_id])

function lastSkill(skills : Skills_hero[], length_array: number, item_empty: Skills_hero) : Skills_hero[] {
    const y = skills.filter(el => el.id !== 0);
    if (y.length < length_array -1) {
        return [...skills]
    } else return [...y, item_empty]
    
}
    const hundleSendValue = useDebouncedCallback(async (value_imput: string, index_item: number, id_hero: number, type_value: string, index: number) => {
        const default_name = 'vuoto'
        const default_experience = 0
        if (skills) {
            const item_empty: Skills_hero = {
                id: 0,
                name: {
                    value: default_name,
                    changing: false
                },
                experience: {
                    value: default_experience,
                    changing: false
                },
                id_hero: id_hero
            }
            const r: Skills_hero[] = [...skills]
            if (type_value === Action_Type_Skills.name) {
                if (index_item) {
                    if (value_imput === '') {
                        console.log(typeof r[index].experience.value);
                        
                        if (r[index].experience.value === default_experience) {
                            console.log('delete skills', index_item, type_value);
                            try {
                                const response = await axios.delete(`api/nova_aetas/heroes/${id_hero}/skills/${index_item}`)
                                console.log(response.data[0]);

                                if (response.data[0]) {
                                    const t : Skill = response.data[0];
                                    const newSkills : Skills_hero[] = r.map(el=>{
                                        if (el.id === t.id) {
                                            return item_empty
                                        }
                                        return el
                                    })
                                    setSkills(lastSkill(newSkills, normal_length, item_empty))
                                } else changing(index, type_value, false) 


                            } catch (error) {
                                console.log(error);
                                changing(index, type_value, false) 
                            }
                        } else {
                            console.log('modifica name', default_name, id_hero, index_item, type_value);
                            try {
                                const response = await axios.patch(`api/nova_aetas/heroes/${id_hero}/skills/${index_item}`, {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    value: default_name,
                                    case_value: type_value
                                })
                                console.log(response.data[0]);
                                if (response.data[0]) {
                                    const t : Skill = response.data[0];
                                    const newSkills : Skills_hero[] = r.map(el=>{
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
                                    setSkills(lastSkill(newSkills, normal_length, item_empty))
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
                            const response = await axios.patch(`api/nova_aetas/heroes/${id_hero}/skills/${index_item}`, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                value: value_imput,
                                case_value: type_value
                            })
                            console.log(response.data[0]);
                            if (response.data[0]) {
                                const t : Skill = response.data[0];
                                const newSkills : Skills_hero[] = r.map(el=>{
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
                                setSkills(lastSkill(newSkills, normal_length, item_empty))
                            } else {
                                changing(index, type_value, false) 
                            }
                        } catch (error) {
                            console.log(error);
                            changing(index, type_value, false) 
                        }
                    }
                } else {
                    if (value_imput == '') {
                        console.log('annulla operazione');
                        changing(index, type_value, false)
                    } else {
                        console.log('creazione name', value_imput, id_hero, index_item, type_value);
                        // changing(index, type_value, false)
                        try {
                            const response = await axios.post(`api/nova_aetas/heroes/${id_hero}/skills`, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                name: value_imput,
                                experience: default_experience
                            })
                            console.log(response.data[0]);
                            if (response.data[0]) {
                                const t : Skill = response.data[0];
                                const newSkills : Skills_hero[] = r.map((el, i)=>{
                                    if (i === index) {
                                        return {
                                            ...el,
                                            id: t.id,
                                            name: {
                                                value: t.name,
                                                changing: false
                                            },
                                            experience: {
                                                value: t.experience,
                                                changing: false
                                            },
                                            id_hero: t.hero_id

                                        }
                                    }
                                    return el
                                })
                                setSkills(lastSkill(newSkills, normal_length, item_empty))
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
            if (type_value === Action_Type_Skills.experience) {
                if (index_item) {
                    if (value_imput == '') {
                        if (r[index].name.value === default_name) {
                            //console.log(r[index].name.value);
                            console.log('delete skills', index_item, type_value);
                            try {
                                const response = await axios.delete(`api/nova_aetas/heroes/${id_hero}/skills/${index_item}`)
                                console.log(response.data[0]);
                                if (response.data[0]) {
                                    const t : Skill = response.data[0];
                                    const newSkills : Skills_hero[] = r.map(el=>{
                                        if (el.id === t.id) {
                                            return item_empty
                                        }
                                        return el
                                    })
                                    setSkills(lastSkill(newSkills, normal_length, item_empty))
                                } else changing(index, type_value, false)
                            } catch (error) {
                                console.log(error);
                                changing(index, type_value, false)
                            }
                        
                        } else {
                            console.log('modifica experience', default_experience, id_hero, index_item, type_value);
                            try {
                                const response = await axios.patch(`api/nova_aetas/heroes/${id_hero}/skills/${index_item}`, {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    value: default_experience,
                                    case_value: type_value
                                })
                                console.log(response.data[0]);
                                if (response.data[0]) {
                                    const t : Skill = response.data[0];
                                    const newSkills : Skills_hero[] = r.map(el=>{
                                        if (el.id === t.id) {
                                            return {
                                                ...el,
                                                experience: {
                                                    value: t.experience,
                                                    changing: false
                                                }
                                            }
                                        }
                                        return el
                                    })
                                    setSkills(lastSkill(newSkills, normal_length, item_empty))
                                } else {
                                    changing(index, type_value, false) 
                                }
                            } catch (error) {
                                console.log(error);
                                changing(index, type_value, false) 
                            }
                        }
                        //console.log('delete experience', index_item, type_value);
                        //changing(index, type_value, false)
                    } else {
                        console.log('modifica experience', value_imput, id_hero, index_item, type_value);
                        try {
                            const response = await axios.patch(`api/nova_aetas/heroes/${id_hero}/skills/${index_item}`, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                value: value_imput,
                                case_value: type_value
                            })
                            console.log(response.data[0]);
                            if (response.data[0]) {
                                const t : Skill = response.data[0];
                                const newSkills : Skills_hero[] = r.map(el=>{
                                    if (el.id === t.id) {
                                        return {
                                            ...el,
                                            experience: {
                                                value: t.experience,
                                                changing: false
                                            }
                                        }
                                    }
                                    return el
                                })
                                setSkills(lastSkill(newSkills, normal_length, item_empty))
                            } else {
                                changing(index, type_value, false) 
                            }
                        } catch (error) {
                            console.log(error);
                            changing(index, type_value, false)
                        }
                    }


                } else {
                    if (value_imput == '') {
                        console.log('annulla operazione');
                        changing(index, type_value, false)
                    } else {
                        console.log('creazione experinece', value_imput, id_hero, index_item, type_value);
                        // changing(index, type_value, false)
                    
                        try {
                            const response = await axios.post(`api/nova_aetas/heroes/${id_hero}/skills`, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                name: default_name,
                                experience: value_imput
                            })
                            console.log(response.data[0]);

                            if (response.data[0]) {
                                const t : Skill = response.data[0];
                                const newSkills : Skills_hero[] = r.map((el, i)=>{
                                    if (i === index) {
                                        return {
                                            ...el,
                                            id: t.id,
                                            name: {
                                                value: t.name,
                                                changing: false
                                            },
                                            experience: {
                                                value: t.experience,
                                                changing: false
                                            },
                                            id_hero: t.hero_id

                                        }
                                    }
                                    return el
                                })
                                setSkills(lastSkill(newSkills, normal_length, item_empty))
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
            {skills && skills.map((skill, index) => (
                <tr key={`Skills_hero_${index}`}>
                    <td className=' w-28'>Abilità</td>
                    <td className='flex gap-2 md:gap-5 items-center justify-between md:px-4' >
                        {!skill.name.changing ? <p className={`m-0 p-0 ${skill.name.value===default_name && ' text-amber-700'}`} onClick={() => changing(index, Action_Type_Skills.name, true)}>{skill.name.value}</p> : <input type='text' defaultValue={skill.name.value} onChange={(e) => hundleSendValue(e.currentTarget.value, skill.id, skill.id_hero, Action_Type_Skills.name, index)} />}
                        <div className='flex gap-2 items-center m-0'><div className='flex items-center text-xl m-0'>{`[`} <Image className={`w-5 md:w-8`} src={experience_icon} alt={`icona_esperienza`} width={30} /></div>{!skill.experience.changing ? <p className={`m-0 text-center self-center ${skill.experience.value === 0 && 'text-amber-700'}`} onClick={() => changing(index, Action_Type_Skills.experience, true)}>{skill.experience.value || 0}</p> : <input type='number' className=' w-20' defaultValue={skill.experience.value || 0} onChange={(e) => hundleSendValue(e.currentTarget.value, skill.id, skill.id_hero, Action_Type_Skills.experience, index)} />} <div className='text-xl'>{`]`}</div></div>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default memo(Hero_skills)