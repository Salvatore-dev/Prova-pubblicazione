"use client"
import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Button, Form } from 'react-bootstrap';
import { Metadata_allArticles, Links_content } from '@/app/(ReD)/lib/definitions';
import { convertDateToItalianString, sort_Metadata_allArticles } from '@/app/(ReD)/lib/data_red';

import Table_all_articles from './table_all_articles';
const pathDashboard = '/blog/dashboard'

const Links_to_page: Links_content[] = [
  {
    name: `Dashboard`,
    url: pathDashboard
  },
  {
    name: `Aggiungi articolo al DB`,
    url: '/blog/dashboard/new_article'
  },
  {
    name: `Modifica articolo`,
    url: '/blog/dashboard/update_article'
  },
  {
    name: `Keywords`,
    url: '/blog/dashboard/keywords'
  }
]
const Navbar_dashboard = ({ data }: { data: Metadata_allArticles[] | string }) => {
  const [articles, setArticles] = useState<Metadata_allArticles[] | null>(null)
  const [resultGet, setResultGet] = useState<string | null>(null)
  const [ascending, setAscending] = useState(true)
  const [show_table, setShow_table] = useState(false)
  useEffect(() => {
    if (typeof data === 'string') {
      setResultGet(data)
    } else {
      setArticles(data)
    }
  }, [])

  function filter_articles(param: string) {
    if (param=== ''&& typeof data !== 'string') {
      setArticles(data)
    } else {
      if (data && typeof data !== 'string') {
        const filtered_articles = data.filter(el=>convertDateToItalianString(el.modified_date).includes(param.toLowerCase()) || el.title.toLowerCase().includes(param.toLowerCase()) || el.subtitle.toLowerCase().includes(param.toLowerCase()) || el.section.toLowerCase().includes(param.toLowerCase())) as Metadata_allArticles[] // la filter esclude valori undefind
        //console.log(filtered_articles);
        if (filtered_articles.length === 0) {
          const r: Metadata_allArticles[] = [
            {
              id : `0`,
              slug : `Nullo`,
              author: `Nessuno`,
              title: `Non sono stati trovati articoli corrispondenti alla tua ricerca`,
              subtitle: `Prova a cercare qualcos'altro`,
              section: `Nessuna`,
              modified_date : new Date(Date.now())
            }
          ]
          setArticles(r)
        } else setArticles(filtered_articles)
      }
    }
  }
  function handle_sort(key: string){
    const k = key as keyof Metadata_allArticles
    if (articles) {
      setAscending(prev=> !prev)
      const sorted = sort_Metadata_allArticles(articles, k, ascending)
      setArticles(sorted)
    }
  }
 

  return (
    <div>
      <div className='flex flex-col md:flex-row justify-center  gap-2 items-center'>
        <nav className='flex justify-around items-center gap-1 md:gap-3'>
          {
            Links_to_page.map((link, i) => (
              <Link className={`m-0 p-2 text-center no-underline text-white bg-zinc-900 rounded-lg`} key={`link_${i}`} href={link.url}>{link.name}</Link>
            ))
          }
          <button className='m-0 p-2 text-center no-underline text-white bg-zinc-900 rounded-lg'
            onClick={() => setShow_table(value => !value)}
          >{show_table? 'Nascondi tabella articoli': 'Vedi tabella articoli'}</button>
        </nav>
        {show_table && 
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Cerca articolo"
            className="me-2"
            aria-label="Search"
            onChange={(e) => filter_articles(e.currentTarget.value)}
          />
        </Form>}
      </div>
      {show_table && articles && <Table_all_articles data={articles} func={handle_sort} ascending={ascending}/>}
    </div>
  )
}
// function sort_Metadata_allArticles(array: Metadata_allArticles[], property: keyof Metadata_allArticles, ascending = true) {
//   return array.slice().sort((a,b)=>{
//     if (a[property] < b[property]) {
//       return ascending ? -1 : 1
//     } else if (a[property]> b[property]){
//       return ascending ? 1 : -1
//     } else {
//       return 0
//     }
//   })
// }
export default Navbar_dashboard