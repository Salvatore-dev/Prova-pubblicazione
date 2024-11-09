"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Metadata_allArticles } from '@/app/(ReD)/lib/definitions'
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { convertDateToItalianString } from '@/app/(ReD)/lib/data_red'

type KeyIn = (a: string)=> void
// ascending puo servire se devo mostrare una freccia acendente o discendente
function Table_all_articles({data, func, ascending}: {data: Metadata_allArticles[] | string, func: KeyIn, ascending : boolean}) {
  const [articles, setArticles] = useState<Metadata_allArticles[] | null>(null)
  const [resultGet, setResultGet] = useState<string | null>(null)
  const [keywords, setKeywords] = useState<string[] | null>(null)
  useEffect(()=>{
    if (typeof data === 'string'){
      setResultGet(data)
    } else {
      setArticles(data)
      const k = Object.keys(data[0])
     setKeywords(k)
    }
  }, [data])

  return (
    <>
    {resultGet && <h1 className='text-center text-2xl text-red-600 font-semibold'>{resultGet}</h1>}
    { articles && 
    <Table striped bordered hover responsive className="w-full">
      <thead>
        <tr>
         {
          keywords && keywords.map(el=>(
            <th onClick={()=> func(el)} key={el}><button  className='cursor-pointer no-underline m-0 p-0'>{el}</button></th>
          ))
         }
        </tr>
      </thead>
      <tbody>
        {
          articles.map((article, i)=>(
            <tr key={`id article: ${i}`}>
              <td>{article.id}</td>
              <td>
                <OverlayTrigger
                key={`top`}
                placement='top'
                overlay={
                  <Tooltip id={`tooltip-${'top'}`}>
                    <strong>Vedi articolo</strong>
                  </Tooltip>
                }
                >
                  <Link className='underline text-blue-700' href={`/blog/testing_article/${article.slug}`}>{article.slug}</Link>
                </OverlayTrigger>
            
                </td>
              <td>{article.author}</td>
              <td>{article.title}</td>
              <td>{article.subtitle}</td>
              <td>{article.section}</td>
              <td>{convertDateToItalianString(article.modified_date)}</td>
            </tr>
          ))
        }
      </tbody>
    </Table>

    }
    </>
  )
}

export default Table_all_articles