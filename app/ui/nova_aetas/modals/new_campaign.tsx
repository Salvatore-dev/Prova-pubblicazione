"use client"

import { Dispatch, SetStateAction, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Campaign } from '@/app/lib/Nova_aetas/definitions';

function New_campaign({addCampaign}: {addCampaign: Dispatch<SetStateAction<Campaign[]>>}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const send_Data = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita il comportamento di default del form
    //console.log(e.currentTarget.campaign_name.value); // qui accedo al valore ma con errore di typescript
    
    const formData = new FormData(e.currentTarget);
    const Campaign_name = formData.get("campaign_name") as string;
    //console.log(formData.get(`campaign_name`)); qui accedo al valore ma senza errore
    
    // const formDataObject: { [key: string]: any } = {};
    // formData.forEach((value, key) => {
    //   formDataObject[key] = value;
    // });
    // console.log(formDataObject); // qui creo oggetto che ha name e value

    async function fetchData(){
      const response = await axios.post(`api/nova_aetas/campaigns`, {
        campaign_name: Campaign_name,
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = response.data as Campaign[]
      console.log(data[0])
      addCampaign(prev=> [...prev, data[0]])
    }
    fetchData()

    setShow(false);
  };

  return (
    <>
      <Button variant="success" className='text-black bg-green-600' onClick={handleShow}>
        Crea Nuova  Campagna
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crea campagna</Modal.Title>
        </Modal.Header>
        <Form onSubmit={send_Data}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="campaign_name">
              <Form.Label>Inserisci nome</Form.Label>
              <Form.Control type="text" placeholder="Nuovo nome" name='campaign_name' autoFocus />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button className='text-black bg-red-600' variant="secondary" onClick={handleClose}>
              Chiudi
            </Button>
            <Button type="submit" variant="success" className='text-black bg-green-600'>
              Salva
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default New_campaign;
