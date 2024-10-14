import React from 'react'

import Elaborate_paragraph from './elaborate_paragraph'
import Article_notes from './article_notes'

const note_keyword = "NOTES"
function Article_body({content, path}: {content: string[], path? : string}) {
    const array_strings = content
   
    const {body_article, notes} = prepare_array(array_strings, note_keyword)

  return (
    <>
    <section aria-label='body of article' className='m-0 mx-auto p-0 pt-4 w-[95%] md:w-[80%] lg:w-[70%] xl:w-[65%] text-base md:text-lg xl:text-xl'>
    {body_article.map((string, i)=>(
        <Elaborate_paragraph key={i} data_text={string} path={path} />
    ))}
    </section>
    <hr className=' py-2 m-0 mx-auto p-0 pt-3 w-[95%] md:w-[80%] lg:w-[70%] xl:w-[65%]' />
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