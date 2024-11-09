import React from 'react'
import Select_article_toSee from './ui_layout/select_article_toSee'

async function Page() {
  
  return (
    <div className=' min-h-screen w-[95%] m-auto mt-5'>
      <h1>Vedi articolo prima di inviarlo al database</h1>
      <Select_article_toSee />
    </div>
  )
}

export default Page