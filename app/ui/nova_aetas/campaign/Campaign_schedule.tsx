"use client"


import React from 'react'

import { useState, memo } from 'react'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Treasury_data from './treasury/Treasury'
import Inventory_nova_aetas from './inventory/Inventory_nova_aetas';
import { Campaign_data } from '@/app/lib/Nova_aetas/definitions'
import Conquests_nova_aetas from './conquests/conquests_nova_aetas';
import Missions_nova_aetas from './missions/missions_nova_aetas';
import Campaign_title from './Campaign_title';

function Campaign_schedule({ data }: { data: Campaign_data }) {
  const [campaignData, setcampaignData] = useState<Campaign_data>(data)
  return (
    <>
    <p className='text-red-600 text-center p-3 m-0 bg-yellow-300 opacity-70 text-lg font-semibold'><span>Avvertenze: </span><span>Clicca sul valore che vuoi modificare, digita il nuovo valore e aspetta 3 secondi. Buon divertimento!</span></p>
      <Campaign_title />
      <Tabs
        id='controlled-tab-campiagns'
        defaultActiveKey={`Tesoreria`}
        //activeKey={key}
        //onSelect={(k) => setKey(k)}
        variant='tabs'
        fill
        justify
        unmountOnExit ={false} 
        className='mb-3 bg-gray-300 text-lg md:text-xl font-bold'
      >
        <Tab
        className='bg-slate-400'
          eventKey={`Inventario`}
          title="Inventario / Conquiste"
        >
          <div className='flex flex-col md:flex-row items-start gap-2 w-[90%] m-auto justify-start'>
            <Inventory_nova_aetas data={campaignData.inventory} Campaign_id={campaignData.campaign?.campaign_id} />
            <Conquests_nova_aetas data={campaignData.conquests} Campaign_id={campaignData.campaign?.campaign_id} />
          </div>
          
        </Tab>
        <Tab
          eventKey={`Tesoreria`}
          title='Tesoreria'
        >
          <Treasury_data data={campaignData.treasury} Campaign_id={campaignData.campaign?.campaign_id} />
        </Tab>
        <Tab
          eventKey={`Missioni`}
          title='Missioni'
        >
          <Missions_nova_aetas data={campaignData.missions} Campaign_id={campaignData.campaign?.campaign_id} />
        </Tab>
      </Tabs>


    </>

  )
}

export default memo(Campaign_schedule)