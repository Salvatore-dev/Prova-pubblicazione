"use client"

import * as React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import { Offcanvas } from 'react-bootstrap';
import Image from 'next/image';
import logo from '@/public/Salvatore-Tosich-logo.png'

type LinksContent = {
    name: string,
    url: string
}
const linksHeader: LinksContent[] = [
    { name: "Home", url: "/" },
    { name: "Testing", url: "/testing" },
    { name: "Ricerca foto", url: "/photo_research" },
    { name: "ReD", url: "/blog"},
    {name : `Nova Aetas`, url: `/nova_aetas`},
    {name : "Signup", url : "/signup"},
    {name : "Login", url : "/login"},
]

function NewHeader() {
    return (
        <>
            {['sm'].map((expand) => (
                <Navbar key={expand} expand={expand} className=" bg-amber-100">
                    <Container fluid>
                        <Navbar.Brand
                            className='flex md:flex-row gap-2 font-bold flex-col justify-center items-center'
                            href=''>
                            <Image
                                alt=""
                                src={logo}
                                width="50"
                                height="50"
                                className=" rounded-full"
                            />{' '}
                            <span className='text-xs md:text-xl'>Salvatore Tosich Web Developer</span>
                            </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header className=' bg-amber-600 text-white opacity-70' closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Menu
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className='bg-slate-200 md:bg-amber-100 text-black opacity-70 md:opacity-100'>
                                <Nav className="justify-content-end flex-grow-1 pe-3 font-semibold lg:text-lg">
                                    {linksHeader.map((el, i) => (
                                        <Nav.Link href={el.url} key={'link_' + i}>{el.name}</Nav.Link>
                                    ))}
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}

        </>

    )
}

export default NewHeader