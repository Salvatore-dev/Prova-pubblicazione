"use client"

import React from 'react'

import { Dispatch, SetStateAction, useState, memo, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Hero, HERO } from '@/app/lib/Nova_aetas/definitions';
function New_hero({ addHero, id_campaign }: { addHero: Dispatch<SetStateAction<HERO[]>>, id_campaign: number | null | undefined }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const send_Data = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita il comportamento di default del form
        //console.log(e.currentTarget.campaign_name.value); // qui accedo al valore ma con errore di typescript

        const formData = new FormData(e.currentTarget);
        const name = formData.get("hero_name") as string;
        const player = formData.get('hero_player') as string
        const hero_class = formData.get('hero_class') as string
        //console.log(formData.get(`campaign_name`)); qui accedo al valore ma senza errore
        async function fetchData() {
            const Campaign_id = id_campaign as number
              const response = await axios.post(`api/nova_aetas/heroes`, {
                name: name,
                player: player,
                classe: hero_class,
                destiny: 1,
                campaign_id: Campaign_id,
                headers: {
                  "Content-Type": "application/json",
                }
              })
              if(response.data){
                const data = response.data as Hero[]
                
                const new_hero = data.map((el, i)=> {
                    return{
                        ...el,  injuries: null, skills: null, upgrades: null
                    }
                }) as HERO[]
              console.log(data[0])
              addHero(prev=> [...prev, new_hero[0]])
              }
              
            }
            fetchData()

            setShow(false);
        };
        return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    Crea Eroe
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crea Eroe</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={send_Data}>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="hero_name">
                                <Form.Label>Inserisci nome eroe</Form.Label>
                                <Form.Control type="text" placeholder="Nuovo eroe" name='hero_name' autoFocus />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="hero_player">
                                <Form.Label>Inserisci giocatore</Form.Label>
                                <Form.Control type="text" placeholder="Nome giocatore" name='hero_player' autoFocus />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="hero_class">
                                <Form.Label>Inserisci classe</Form.Label>
                                <Form.Control type="text" placeholder="Classe..." name='hero_class' autoFocus />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Chiudi
                            </Button>
                            <Button type="submit" variant="primary">
                                Salva
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        )
    }

export default New_hero