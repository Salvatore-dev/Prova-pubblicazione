import React, { Dispatch, SetStateAction } from 'react'

import New_campaign from './modals/new_campaign'

import axios from 'axios';

import { useState, useEffect, memo } from 'react';
import { Campaign } from '@/app/lib/Nova_aetas/definitions';

import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
// https://react-bootstrap.github.io/docs/forms/select/
function Select_campaign({SetId_campaign}: {SetId_campaign: Dispatch<SetStateAction<number>>}) {
    const [campaigns, setCampaigns] = useState<Campaign[]>([])

    useEffect(() => {
        async function getCampaigns() {

            const response = await axios.get(`api/nova_aetas/campaigns`)
            console.log('response: ', response.data);
            setCampaigns(response.data)
        }
        getCampaigns()
    }, [])
    function send_id_campaign(n : number | null) {
        if (n  !== null) {
            SetId_campaign(n)
        }
    }
    async function delete_campaign(id: number  | null) {
        if (id !== null) {
          const response = await axios.delete(`api/nova_aetas/campaigns/${id}`)
            console.log('delete_campaign: ', response.data);
            const campaing_deleted = response.data as Campaign[]
            if (campaing_deleted.length > 0) {
                const new_campaigns = campaigns.filter(c => c.campaign_id !== campaing_deleted[0].campaign_id)
                setCampaigns(new_campaigns)
            }
        }
        
        
    }
    return (
            <section>
                <div className='flex justify-around items-center bg-slate-400 h-16'>
                    <p className='m-0 text-2xl font-medium'>Seleziona Campagna</p>
                    <New_campaign addCampaign={setCampaigns} />
                </div>
                <ListGroup as={`ol`} numbered variant="flush">
                    {
                        campaigns.map((el, i) => (
                            <ListGroup.Item
                                key={"campaign_id_" + el.campaign_id}
                                as={`li`}
                                
                                
                                variant={i % 2 === 0 ? "primary" : "secondary"}
                                className=' cursor-pointer'
                            >
                            <div className='flex justify-between gap-3'>
                                <p>{el.name}</p>
                                <div className=' flex items-center gap-2'>
                                    <Button
                                    variant='success'
                                    onClick={()=> {
                                        send_id_campaign(el.campaign_id)
                                    }}
                                    >Seleziona</Button>
                                    <Button
                                    onClick={()=> delete_campaign(el.campaign_id)}
                                    variant='danger'
                                    >Cancella</Button>
                                </div>
                            </div>
                                
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </section>
    )
}

export default memo(Select_campaign)