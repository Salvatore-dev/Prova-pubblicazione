import React from 'react'

import Elaborate_paragraph from './elaborate_paragraph'

function Article_body({content}: {content: string[]}) {
    const array_strings = content

  return (
    <>
    {array_strings.map((string, i)=>(
        <Elaborate_paragraph key={i} data_text={string} />
    ))}
    </>
  )
}

export default Article_body