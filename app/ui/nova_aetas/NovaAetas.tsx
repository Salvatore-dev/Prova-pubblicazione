"use client"
import { useState, useEffect } from "react"
import axios from "axios"

import { Campaign_data, HERO } from "@/app/lib/Nova_aetas/definitions";

import { Button } from "react-bootstrap";

import Header_application from "./header_application";
import Select_campaign from "./Select_campaign";
import Schedule_heroes from "./heroes/schedule_heroes";

import Campaign_schedule from "./campaign/Campaign_schedule";


function NovaAetas() {
  const [data, setData] = useState<{ campaign_schedule: Campaign_data, heroes: HERO[] } | null>(null)
  const [id_campaign, setId_campaing] = useState<number>(0)
  useEffect(() => {
    async function get_data_campaign() {
      const response = await axios.get(`api/nova_aetas/campaigns/${id_campaign}`)
      console.log(response.data);
      setData(response.data)

    }
    if (id_campaign > 0) {
      get_data_campaign()
    }
  }, [id_campaign])
  return (
    <>
      <Header_application />
      {!data && <Select_campaign SetId_campaign={setId_campaing} />}
      {data &&
        <section>
          <div className="bg-slate-300 flex flex-row justify-around items-center py-2 m-0">
            <p className="m-0 text-lg font-medium">
              Campagna: {data?.campaign_schedule?.campaign?.name}
            </p>
            <Button variant="warning"
              onClick={() => setData(null)}
            >Esci</Button>

          </div>

          <Campaign_schedule data={data?.campaign_schedule} />
        </section>
      }
      {data?.heroes &&
        <section>
          <Schedule_heroes data={data?.heroes} id_campaign={data.campaign_schedule.campaign?.campaign_id} />

        </section>}


    </>

  )
}

export default NovaAetas