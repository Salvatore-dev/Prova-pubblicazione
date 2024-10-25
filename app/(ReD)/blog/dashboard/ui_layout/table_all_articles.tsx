"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { Metadata_allArticle } from '@/app/(ReD)/lib/definitions'
import { Table } from 'react-bootstrap'
import { convertDateToItalianString } from '@/app/(ReD)/lib/data_red'


function Table_all_articles({data}: {data: Metadata_allArticle[] | string}) {
  const [articles, setArticles] = useState<Metadata_allArticle[] | null>(null)
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
  }, [])
  
  return (
    <>
    {resultGet && <h1 className='text-center text-2xl text-red-600 font-semibold'>{resultGet}</h1>}
    { articles && 
    <Table striped bordered hover responsive className="w-full">
      <thead>
        <tr>
         {
          keywords && keywords.map(el=>(
            <th key={el}>{el}</th>
          ))
         }
        </tr>
      </thead>
      <tbody>
        {
          articles.map((article, i)=>(
            <tr key={`id article: ${i}`}>
              <td>{article.id}</td>
              <td>{article.slug}</td>
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