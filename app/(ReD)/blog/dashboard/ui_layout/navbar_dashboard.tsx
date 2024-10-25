"use client"
import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Button, Form } from 'react-bootstrap';
import { Metadata_allArticle, Links_content } from '@/app/(ReD)/lib/definitions';


import Table_all_articles from './table_all_articles';


const Links_to_page: Links_content[] = [
  {
    name: `Vedi nuovo articolo`,
    url: '#link'
  },
  {
    name: `Agginungi articolo al DB`,
    url: '#link'
  },
  {
    name: `Modifica articolo`,
    url: '#link'
  }
]
const Navbar_dashboard = ({ data }: { data: Metadata_allArticle[] | string }) => {
  const [articles, setArticles] = useState<Metadata_allArticle[] | null>(null)
  const [resultGet, setResultGet] = useState<string | null>(null)
  const [search, setSearch] = useState<string>(`pronto`)
  const [show_table, setShow_table] = useState(false)
  useEffect(() => {
    if (typeof data === 'string') {
      setResultGet(data)
    } else {
      setArticles(data)
    }
  }, [])


  return (
    <div>
      <div className='flex flex-col md:flex-row justify-center  gap-2 items-center'>
        <nav className='flex justify-around items-center gap-1 md:gap-3'>
          {
            Links_to_page.map((link, i) => (
              <Link className='m-0 p-2 text-center no-underline text-white bg-zinc-900 rounded-lg' key={`link_${i}`} href={link.url}>{link.name}</Link>
            ))
          }
          <button className='m-0 p-2 text-center no-underline text-white bg-zinc-900 rounded-lg'
            onClick={() => setShow_table(value => !value)}
          >{show_table? 'Nascondi tabella articoli': 'Vedi tabella articoli'}</button>
        </nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Cerca articolo"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </div>
      {show_table && articles && <Table_all_articles data={articles} />}
    </div>
  )
}

export default Navbar_dashboard