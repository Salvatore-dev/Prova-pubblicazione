"use client"
import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Button, Form } from 'react-bootstrap';
import { Metadata_allArticles, Links_content } from '@/app/(ReD)/lib/definitions';
import { convertDateToItalianString, sort_Metadata_allArticles } from '@/app/(ReD)/lib/data_red';
import { logout } from '@/app/actions/auth';
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
    if (param === '' && typeof data !== 'string') {
      setArticles(data)
    } else {
      if (data && typeof data !== 'string') {
        const filtered_articles = data.filter(el => convertDateToItalianString(el.modified_date).includes(param.toLowerCase()) || el.title.toLowerCase().includes(param.toLowerCase()) || el.subtitle.toLowerCase().includes(param.toLowerCase()) || el.section.toLowerCase().includes(param.toLowerCase())) as Metadata_allArticles[] // la filter esclude valori undefind
        //console.log(filtered_articles);
        if (filtered_articles.length === 0) {
          const r: Metadata_allArticles[] = [
            {
              id: `0`,
              slug: `Nullo`,
              author: `Nessuno`,
              title: `Non sono stati trovati articoli corrispondenti alla tua ricerca`,
              subtitle: `Prova a cercare qualcos'altro`,
              section: `Nessuna`,
              modified_date: new Date(Date.now())
            }
          ]
          setArticles(r)
        } else setArticles(filtered_articles)
      }
    }
  }
  function handle_sort(key: string) {
    const k = key as keyof Metadata_allArticles
    if (articles) {
      setAscending(prev => !prev)
      const sorted = sort_Metadata_allArticles(articles, k, ascending)
      setArticles(sorted)
    }
  }


  return (
    <div className="p-6 bg-gray-100">
      <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
        {/* Navbar */}
        <nav className="flex flex-wrap justify-around items-center gap-2 md:gap-4 bg-white shadow-md p-4 rounded-lg">
          {Links_to_page.map((link, i) => (
            <Link
              className="px-4 py-2 text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              key={`link_${i}`}
              href={link.url}
            >
              {link.name}
            </Link>
          ))}
          <button
            className="px-4 py-2 text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            onClick={() => setShow_table((value) => !value)}
          >
            {show_table ? 'Nascondi tabella articoli' : 'Vedi tabella articoli'}
          </button>
          <button
            className="px-4 py-2 text-center text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            onClick={() => logout()}
          >
            Esci dalla sezione
          </button>
        </nav>
      </div>

      {/* Form di ricerca e tabella */}
      {show_table && (
        <div className="mt-6 bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {/* Form di ricerca */}
            <Form className="w-full md:w-1/2">
              <Form.Control
                type="search"
                placeholder="Cerca articolo"
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                aria-label="Search"
                onChange={(e) => filter_articles(e.currentTarget.value)}
              />
            </Form>
          </div>

          {/* Tabella degli articoli */}
          {articles && (
            <div className="mt-4">
              <Table_all_articles
                data={articles}
                func={handle_sort}
                ascending={ascending}
              />
            </div>
          )}
        </div>
      )}
    </div>

  )
}

export default Navbar_dashboard