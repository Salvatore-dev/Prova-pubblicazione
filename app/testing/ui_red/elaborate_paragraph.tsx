"use client"
import React from 'react'

const regex_note = /\[\^\d+\].$/;

function Elaborate_paragraph({text}: {text: string}) {
    
    const text_to_elaborate = text.trim()
    
    if (text_to_elaborate.startsWith('>')) {
        const cite = text_to_elaborate.substring(text_to_elaborate.search('cite=')+5, text_to_elaborate.length).trim()
        //console.log(cite);
        
        const citation = text_to_elaborate.substring(0, text_to_elaborate.search('cite=')).trim()
        if (regex_note.test(citation)) {
            const{text_simple, note}= get_note_text(citation)
            return(
                <blockquote cite={cite} ><p>{text_simple.replace('>', '')}<sup>{note}</sup>.</p></blockquote>
            )
        }else return (
            <p>correggere citazione: {text_to_elaborate}</p>
        )
        
    }
    if (regex_note.test(text_to_elaborate)) {
        //const note = text_to_elaborate.substring(text_to_elaborate.search(regex_note)+2, text_to_elaborate.length -2) 
        //const text_simple = text_to_elaborate.replace(regex_note, '')
        const{text_simple, note}= get_note_text(text_to_elaborate)
        return (
            <p>{text_simple}<sup>{note}</sup>.</p>
        )
    }
  return (
    <p className='bg-neutral-200'>{text}</p>
  )
}

function get_note_text(text:  string) : {text_simple: string, note: string} {
        const note = text.substring(text.search(regex_note)+2, text.length -2) 
        const text_simple = text.replace(regex_note, '')
        return {
            text_simple,
            note
        }
}

export default Elaborate_paragraph