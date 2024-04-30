"use client"

import React from 'react'
import { useState, useEffect, memo } from 'react'

import axios from 'axios'

import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

import { useDebouncedCallback } from 'use-debounce'

import { Mission, Missions_type } from '@/app/lib/Nova_aetas/definitions';


const normal_length = 4

type Data_Missions = {
  campaign: Set_missions[],
  hunt: Set_missions[],
  encounter: Set_missions[],
  exploration: Set_missions[]
}

interface Set_missions extends Mission {
  changing_name: boolean,
  changing_detail: boolean
}



function default_missions(
  id_campaign: number,
  default_length: number,
  all_missions: Mission[] | null,
  type: string
): Set_missions[] {

  function setLength(normal: number, data_length: number): number {
    if (normal > data_length) {
      return normal - data_length + 1
    } else return 3
  }

  function set_result(arr: Mission[]): Set_missions[] {
    return arr.map(el => { return { ...el, changing_name: false, changing_detail: false } })
  }

  const default_item: Mission = {
    id: 0,
    campaign_id: id_campaign,
    name: 'vuoto',
    type: type,
    complete: false,
    detail: 'vuoto'
  }
  if (all_missions) {
    const one_type_mission = all_missions.filter(mission => mission.type?.toLowerCase() === type.toLowerCase())
    const a = new Array(setLength(default_length, one_type_mission.length)).fill(default_item) as Mission[]
    if (one_type_mission.length > 0) {
      return set_result([...one_type_mission, ...a])
    } else {
      return set_result(a)
    }
  } else {
    return set_result(new Array(default_length).fill(default_item))
  }

}
function Missions_nova_aetas({ data, Campaign_id }: { data: Mission[] | null, Campaign_id: number | null | undefined }) {
  const [missions, setMissions] = useState<Data_Missions | null>(null)

  useEffect(() => {
    if (Campaign_id) {

      console.log("Missioni", data);
      const M: Data_Missions = {
        campaign: default_missions(Campaign_id, normal_length, data, Missions_type.campaign),
        hunt: default_missions(Campaign_id, normal_length, data, Missions_type.hunt),
        encounter: default_missions(Campaign_id, normal_length, data, Missions_type.encounter),
        exploration: default_missions(Campaign_id, normal_length, data, Missions_type.exploration)
      }
      console.log('controlla datai settati', M);
      setMissions(M)
    }

  }, [data])
  console.log("fuori funzione", missions);
  // useEffect(()=>{
  //   console.log('cambiamento');

  // }, [missions])
  function changing(index: number, type: string, data: string) {
    if (missions) {
      const new_data = { ...missions }
      // console.log( 'controlla changing',index, type, data );

      if (type.toLowerCase() === 'campaign') {
        if (data.toLowerCase() === 'detail') {
          //console.log('cambio nel detail');

          const newItems = missions.campaign.map((el, i) => {
            if (i === index) {
              return { ...el, changing_detail: true }
            }
            return el
          })
          new_data.campaign = [...newItems]
          // console.log("verifica",new_data.campaign[index].changing_detail);

          setMissions(new_data)
        }
        if (data.toLowerCase() === 'name') {
          // console.log('cambio nel name');

          const newItems = new_data.campaign.map((el, i) => {
            if (i === index) {
              return { ...el, changing_name: true }
            }
            return el
          })
          new_data.campaign = [...newItems]
          //console.log("verifica", new_data.campaign[index].changing_name);
          setMissions(new_data)
        }
      }

      if (type.toLowerCase() === 'hunt') {
        if (data.toLowerCase() === 'detail') {
          const newItems = missions.hunt.map((el, i) => {
            if (i === index) {
              return { ...el, changing_detail: true }
            }
            return el
          })
          new_data.hunt = [...newItems]
          setMissions(new_data)
        }
        if (data.toLowerCase() === 'name') {
          const newItems = missions.hunt.map((el, i) => {
            if (i === index) {
              return { ...el, changing_name: true }
            }
            return el
          })
          new_data.hunt = [...newItems]
          setMissions(new_data)
        }
      }

      if (type.toLowerCase() === 'encounter') {
        if (data.toLowerCase() === 'detail') {
          const newItems = missions.encounter.map((el, i) => {
            if (i === index) {
              return { ...el, changing_detail: true }
            }
            return el
          })
          new_data.encounter = [...newItems]
          setMissions(new_data)
        }
        if (data.toLowerCase() === 'name') {
          const newItems = missions.encounter.map((el, i) => {
            if (i === index) {
              return { ...el, changing_name: true }
            }
            return el
          })
          new_data.encounter = [...newItems]
          setMissions(new_data)
        }
      }

      if (type.toLowerCase() === 'exploration') {
        if (data.toLowerCase() === 'detail') {
          console.log('Detail clicked for exploration mission', index, '\nData is:\n', data);

          const newItems = missions.exploration.map((el, i) => {
            if (i === index) {
              return { ...el, changing_detail: true }
            }
            return el
          })
          new_data.exploration = [...newItems]
          setMissions(new_data)
        }
        if (data.toLowerCase() === 'name') {
          const newItems = missions.exploration.map((el, i) => {
            if (i === index) {
              return { ...el, changing_name: true }
            }
            return el
          })
          new_data.exploration = [...newItems]
          setMissions(new_data)
        }
      }
    }
  }
  type Type_value = 'name' | 'detail' | 'complete'
  function actual_array(type: Missions_type): Set_missions[] | undefined {
    const data = { ...missions } as Data_Missions
    if (type === Missions_type.campaign) {
      return [...data.campaign]
    }
    if (type === Missions_type.encounter) {
      return [...data.encounter]
    }
    if (type === Missions_type.exploration) {
      return [...data.exploration]
    }
    if (type === Missions_type.hunt) {
      return [...data.hunt]
    }

  }



  const handleSubmit = useDebouncedCallback((value: string | boolean, type_value: Type_value, id_campaign: number, id_item: number, index: number, type_mission: Missions_type) => {

    const default_value = 'vuoto'

    async function create_item(value: string, campaign_id: number, type: string, type_value: Type_value) {
      const new_data = { ...missions } as Data_Missions
      let check = false
      let name = default_value
      let detail = default_value
      if (type_value === 'detail') {
        detail = value.trim()
      } else if (type_value === 'name') {
        name = value.trim()
      }
      try {
        const response = await axios.post(`api/nova_aetas/campaigns/${campaign_id}/missions`, {
          name: name,
          type: type,
          detail: detail,
          headers: {
            "Content-Type": "application/json",
          }
        })
        console.log('risposta', response);
        if (response.data) {
          //check = true
          const new_id = response.data[0].id as number
          const new_name = response.data[0].name as string
          const new_detail = response.data[0].detail as string
          const new_type = response.data[0].type as string
          const new_campaign_id = response.data[0].campaign_id as number
          if (type_mission === Missions_type.campaign) {
            const newItems = new_data?.campaign.map((el, i) => {
              if (i === index) {
                if (new_name === default_value) {
                  return { ...el, id: new_id, name: new_name, detail: new_detail, type: new_type, campaign_id: new_campaign_id, changing_detail: false }
                } else {
                  return { ...el, id: new_id, name: new_name, detail: new_detail, type: new_type, campaign_id: new_campaign_id, changing_name: false }
                }
              }
              return el
            }) as Set_missions[]
            new_data.campaign = [...newItems]
            setMissions(new_data)
          }
          if (type_mission === Missions_type.encounter) {
            const newItems = new_data?.encounter.map((el, i) => {
              if (i === index) {
                if (new_name === default_value) {
                  return { ...el, id: new_id, name: new_name, detail: new_detail, type: new_type, campaign_id: new_campaign_id, changing_detail: false }
                } else {
                  return { ...el, id: new_id, name: new_name, detail: new_detail, type: new_type, campaign_id: new_campaign_id, changing_name: false }
                }
              }
              return el
            }) as Set_missions[]
            new_data.encounter = [...newItems]
            setMissions(new_data)
          }
          if (type_mission === Missions_type.exploration) {
            const newItems = new_data?.exploration.map((el, i) => {
              if (i === index) {
                if (new_name === default_value) {
                  return { ...el, id: new_id, name: new_name, detail: new_detail, type: new_type, campaign_id: new_campaign_id, changing_detail: false }
                } else {
                  return { ...el, id: new_id, name: new_name, detail: new_detail, type: new_type, campaign_id: new_campaign_id, changing_name: false }
                }
              }
              return el
            }) as Set_missions[]
            new_data.exploration = [...newItems]
            console.log('controlla qui', new_data.campaign[index]);

            setMissions(new_data)
          }
          if (type_mission === Missions_type.hunt) {
            const newItems = new_data?.hunt.map((el, i) => {
              if (i === index) {
                if (new_name === default_value) {
                  return { ...el, id: new_id, name: new_name, detail: new_detail, type: new_type, campaign_id: new_campaign_id, changing_detail: false }
                } else {
                  return { ...el, id: new_id, name: new_name, detail: new_detail, type: new_type, campaign_id: new_campaign_id, changing_name: false }
                }
              }
              return el
            }) as Set_missions[]
            new_data.hunt = [...newItems]
            setMissions(new_data)
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function delete_item(campaign_id: number, id_item: number) {
      const new_data = { ...missions } as Data_Missions
      let check = false
      try {
        const response = await axios.delete(`api/nova_aetas/campaigns/${campaign_id}/missions/${id_item}`)
        if (response.data[0].id) {
          const arr = actual_array(type_mission)?.map((el, i) => {
            if (el.id === response.data[0].id) {
              return {
                id: 0,
                campaign_id: id_campaign,
                name: 'vuoto',
                type: type_mission,
                complete: false,
                detail: 'vuoto',
                changing_name: false,
                changing_detail: false
              }
            }
            return el
          })
          if (arr) {
            if (type_mission === Missions_type.campaign) {
              new_data.campaign = [...arr]
              setMissions(new_data)
            }
            if (type_mission === Missions_type.encounter) {
              new_data.encounter = [...arr]
              setMissions(new_data)
            }
            if (type_mission === Missions_type.exploration) {
              new_data.exploration = [...arr]
              setMissions(new_data)
            }
            if (type_mission === Missions_type.hunt) {
              new_data.hunt = [...arr]
              setMissions(new_data)
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    async function patch_item(name: string, detail: string, complete: boolean, id_item: number, id_campaign: number) {
      const new_data = { ...missions } as Data_Missions;
      let check = false
      try {
        const response = await axios.patch(`api/nova_aetas/campaigns/${id_campaign}/missions/${id_item}`, {
          name: name,
          detail: detail,
          complete: complete,
          headers: {
            "Content-Type": "application/json",
          }
        })
        if (response.data) {
          const item = response.data[0] as  Mission;
          if (type_mission === Missions_type.campaign) {
            const new_items = new_data.campaign.map((el, i)=> {
              if(i === index){
                return{...item, changing_detail: false, changing_name : false};
              }
              return el
            }) as Set_missions[]
            new_data.campaign = [...new_items]
            setMissions(new_data)
          }
          if (type_mission === Missions_type.encounter) {
            const new_items = new_data.encounter.map((el, i)=> {
              if(i === index){
                return{...item, changing_detail: false, changing_name : false};
              }
              return el
            }) as Set_missions[]
            new_data.encounter = [...new_items]
            setMissions(new_data)
          }
          if (type_mission === Missions_type.exploration) {
            const new_items = new_data.exploration.map((el, i)=> {
              if(i === index){
                return{...item, changing_detail: false, changing_name : false};
              }
              return el
            }) as Set_missions[]
            new_data.exploration = [...new_items]
            setMissions(new_data)
          }
          if (type_mission === Missions_type.hunt) {
            const new_items = new_data.hunt.map((el, i)=> {
              if(i === index){
                return{...item, changing_detail: false, changing_name : false};
              }
              return el
            }) as Set_missions[]
            new_data.hunt = [...new_items]
            setMissions(new_data)
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (id_item) {
      if (value == '') {
        console.log('cancelazione esistente');
        const arr = actual_array(type_mission)
        if (arr) {
          const actual_item = arr[index]
          const { name, detail, complete, id, campaign_id } = actual_item
          if (type_value === 'detail' && name == default_value) {
            console.log('cancellazione', id_campaign, id);
            delete_item(id_campaign, id)
          }
          if (type_value === 'name' && detail == default_value) {
            console.log('cancellazione', id_campaign, id)
            delete_item(id_campaign, id)
          }
          if (type_value === 'name' && detail !== default_value) {
            console.log('modifica elemento', default_value, detail, complete, id, campaign_id);
            patch_item(default_value, detail, complete, id, campaign_id)
          }
          if (type_value === 'detail' && name !== default_value) {
            console.log('modifica elemento', default_value, name, complete, id, campaign_id);
            patch_item(name, default_value, complete, id, campaign_id)
          }
        }
      } else {
        console.log('modifica esistente');
        const arr = actual_array(type_mission)
        if (arr) {
          const actual_item = arr[index]
          const { name, detail, complete, id, campaign_id } = actual_item
          if (type_value === 'name' && typeof value === 'string') {
            patch_item(value.trim(), detail, complete, id, campaign_id)
          }
          if(type_value === 'detail' && typeof value === 'string') {
            patch_item(name, value.trim(), complete, id, campaign_id)
          }
          if (type_value === 'complete' && typeof value === 'boolean') {
            patch_item(name, detail, value, id, campaign_id)
          }
        }
      }
    } else {
      console.log('pronto per la creazione');
      if (value !== '') {
        if (typeof value === 'boolean') {
          console.log('si tratta del booleano', value); // annullare la modifica

        } else {
          const new_value = value.trim()
          create_item(new_value, id_campaign, type_mission, type_value);
        }
      } else {
        console.log('annullamento modifica');
        const new_data = {...missions} as Data_Missions
        if (type_mission === Missions_type.campaign) {
          const arr = new_data.campaign.map((el, i)=>{
            if (i === index) {
              return{
                ...el, changing_detail: false, changing_name: false
              }
            }
            return el
          })
          new_data.campaign = [...arr]
          setMissions(new_data)
        }
        if (type_mission === Missions_type.encounter) {
          const arr = new_data.encounter.map((el, i)=>{
            if (i === index) {
              return{
                ...el, changing_detail: false, changing_name: false
              }
            }
            return el
          })
          new_data.encounter = [...arr]
          setMissions(new_data)
        }
        if (type_mission === Missions_type.exploration) {
          const arr = new_data.exploration.map((el, i)=>{
            if (i === index) {
              return{
                ...el, changing_detail: false, changing_name: false
              }
            }
            return el
          })
          new_data.exploration = [...arr]
          setMissions(new_data)
        }
        if (type_mission === Missions_type.hunt) {
          const arr = new_data.hunt.map((el, i)=>{
            if (i === index) {
              return{
                ...el, changing_detail: false, changing_name: false
              }
            }
            return el
          })
          new_data.hunt = [...arr]
          setMissions(new_data)
        }
      }
    }
  }, 3000)

  return (
    <section className='flex flex-col m-0 gap-3 bg-slate-400 py-3 md:px-16 text-xs md:text-xl'>
      <div className=' flex flex-col xl:w-[80%] xl:m-auto gap-3 px-2'>
        <Table striped bordered hover responsive='md' className='w-full m-auto'>
          <thead>
            <tr>
              <th colSpan={2} className=' text-center'>Missioni di Campagna </th>
              <th className=' text-center'>icone</th>
            </tr>
          </thead>
          <tbody>
            {missions && missions.campaign.map((el, i) => (
              <tr key={"missions_campaign_" + i}>
                <td><Form.Check
                  onChange={(event) => handleSubmit(event.target.checked, 'complete', el.campaign_id, el.id, i, Missions_type.campaign)}
                  defaultChecked={el.complete}
                  type={`checkbox`}
                /></td>
                <td className=' hover:cursor-pointer' onClick={() => changing(i, 'campaign', 'name')}>{el.changing_name ? <input type='text' className=' text-xs md:text-xl w-[100px] md:w-auto' onChange={(event) => handleSubmit(event.currentTarget.value, 'name', el.campaign_id, el.id, i, Missions_type.campaign)
                } defaultValue={el.name}></input> : el.name}</td>
                <td className=' hover:cursor-pointer' onClick={() => changing(i, 'campaign', 'detail')}>{el.changing_detail ? <input className=' text-xs md:text-xl w-[100px] md:w-auto' type='text' onChange={(event) => handleSubmit(event.currentTarget.value, 'detail', el.campaign_id, el.id, i, Missions_type.campaign)
                } defaultValue={el.detail}></input> : el.detail}</td>
              </tr>

            ))}
          </tbody>
        </Table>
        <Table striped bordered hover responsive='md' className='w-full m-auto'>
          <thead>
            <tr>
              <th colSpan={2} className=' text-center'>Missioni di Caccia</th>
              <th className=' text-center'>Codice</th>
            </tr>
          </thead>
          <tbody>
            {missions && missions.hunt.map((el, i) => (
              <tr key={"missions_hunt_" + i}>
                <td><Form.Check
                  onChange={(event) => handleSubmit(event.target.checked, 'complete', el.campaign_id, el.id, i, Missions_type.hunt)}
                  defaultChecked={el.complete}
                  type={`checkbox`}
                /></td>
                <td className=' hover:cursor-pointer' onClick={() => changing(i, 'hunt', 'name')}>{el.changing_name ? <input className=' text-xs md:text-xl w-[100px] md:w-auto' type='text' onChange={(event) => handleSubmit(event.currentTarget.value, 'name', el.campaign_id, el.id, i, Missions_type.hunt)
                } defaultValue={el.name}></input> : el.name}</td>
                <td className=' hover:cursor-pointer' onClick={() => changing(i, 'hunt', 'detail')}>{el.changing_detail ? <input className=' text-xs md:text-xl w-[100px] md:w-auto' type='text' onChange={(event) => handleSubmit(event.currentTarget.value, 'detail', el.campaign_id, el.id, i, Missions_type.hunt)
                } defaultValue={el.detail}></input> : el.detail}</td>
              </tr>

            ))}
          </tbody>
        </Table>
      </div>
      <div className=' flex flex-col xl:w-[80%] xl:m-auto gap-3 px-2'>
        <Table striped bordered hover responsive='md' className='w-full m-auto'>
          <thead>
            <tr>
              <th colSpan={2} className=' text-center'>Missioni di Incontro</th>
              <th className=' text-center'>Codice</th>
            </tr>
          </thead>
          <tbody>
            {missions && missions.encounter.map((el, i) => (
              <tr key={"missions_encounter_" + i}>
                <td><Form.Check
                  type={`checkbox`}
                  onChange={(event) => handleSubmit(event.target.checked, 'complete', el.campaign_id, el.id, i, Missions_type.encounter)}
                  defaultChecked={el.complete}
                /></td>
                <td className=' hover:cursor-pointer' onClick={() => changing(i, 'encounter', 'name')}>{el.changing_name ? <input className=' text-xs md:text-xl w-[100px] md:w-auto' type='text' onChange={(event) => handleSubmit(event.currentTarget.value, 'name', el.campaign_id, el.id, i, Missions_type.encounter)
                } defaultValue={el.name}></input> : el.name}</td>
                <td className=' hover:cursor-pointer' onClick={() => changing(i, 'encounter', 'detail')}>{el.changing_detail ? <input className=' text-xs md:text-xl w-[100px] md:w-auto' type='text' onChange={(event) => handleSubmit(event.currentTarget.value, 'detail', el.campaign_id, el.id, i, Missions_type.encounter)
                } defaultValue={el.detail}></input> : el.detail}</td>
              </tr>

            ))}
          </tbody>
        </Table>
        <Table striped bordered hover responsive='md' className='w-full m-auto'>
          <thead>
            <tr>
              <th colSpan={2} className=' text-center'>Missioni di Esplorazione</th>
              <th className=' text-center'>Codice</th>
            </tr>
          </thead>
          <tbody>
            {missions && missions.exploration.map((el, i) => (
              <tr key={"missions_exploration_" + i}>
                <td><Form.Check
                  onChange={(event) => handleSubmit(event.target.checked, 'complete', el.campaign_id, el.id, i, Missions_type.exploration)}
                  defaultChecked={el.complete}
                  type={`checkbox`}
                /></td>
                <td className=' hover:cursor-pointer' onClick={() => changing(i, 'exploration', 'name')}>{el.changing_name ? <input className=' text-xs md:text-xl w-[100px] md:w-auto' type='text' onChange={(event) => handleSubmit(event.currentTarget.value, 'name', el.campaign_id, el.id, i, Missions_type.exploration)
                } defaultValue={el.name}></input> : el.name}</td>
                <td className=' hover:cursor-pointer' onClick={() => changing(i, 'exploration', 'detail')}>{el.changing_detail ? <input className=' text-xs md:text-xl w-[100px] md:w-auto' type='text' onChange={(event) => handleSubmit(event.currentTarget.value, 'detail', el.campaign_id, el.id, i, Missions_type.exploration)
                } defaultValue={el.detail}></input> : el.detail}</td>
              </tr>

            ))}
          </tbody>
        </Table>
      </div>
    </section>
  )
}

export default memo(Missions_nova_aetas)