import React from 'react'

import Elaborate_paragraph from './elaborate_paragraph'
import Article_notes from './article_notes'

const note_keyword = "NOTES"
function Article_body({content}: {content: string[]}) {
    const array_strings = content
   
    const {body_article, notes} = prepare_array(array_strings, note_keyword)

  return (
    <>
    <section className='m-0 p-0'>
    {body_article.map((string, i)=>(
        <Elaborate_paragraph key={i} data_text={string} />
    ))}
    </section>
    {notes.length>0 && <Article_notes notes={notes} />}
    </>
    
  )
}

function prepare_array(contents: string[], param_word: string) : {
  body_article : string[],
  notes: string[]
} {
  let body_article = contents
  let notes : string[] = []
  if (contents.includes(param_word)) {
    body_article = contents.slice(0, contents.indexOf(param_word))
    notes = contents.slice(contents.indexOf(param_word)+1)
  }
  return {
    body_article: body_article,
    notes: notes
  }
}
export default Article_body