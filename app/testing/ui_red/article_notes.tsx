import React from 'react'





function Article_notes({notes}: {notes: string[]}) {
  const Notes = notes
  return (
    <section className='mt-0'>{
      Notes.map((note, i)=>(
        <Note_single key={'foot_note'+ i} note={note} />
      ))
      }</section>
  )
}

const regex_note = new RegExp(/\[\^\d+\]:$/);

function Note_single({note}: {note: string}) {
  const Note = note.trim()
  const {text_simple, note_number}= get_note_text(Note)
  console.log(text_simple);
  

  return (
    <>
    <p className='text-xl'> <sup>{note_number}</sup>{text_simple}</p>
    </>
  )
}

function get_note_text(text:  string) : {text_simple: string, note_number: string} {
  let note_number = ''
  const regex_note = /\[\^\d+\]:/;
  const found = text.match(regex_note);
 // console.log(found);
  
  const text_simple = text.replace(regex_note, '')
  if (found) {
    const regex_number = /\d/
    const number = found[0].match(regex_number)
    if (number) {
      note_number = number[0]
    }
    
  }
  return {
      text_simple: text_simple.trim(),
      note_number: note_number
  }
}

export default Article_notes