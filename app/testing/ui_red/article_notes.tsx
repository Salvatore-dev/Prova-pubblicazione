import React from 'react'

import style from '@/app/testing/ui_red/article.notes.module.css'

import { regex_link } from '@/app/(ReD)/lib/data_red'

function Article_notes({ notes }: { notes: string[] }) {
  const Notes = notes
  return (
    <section className={style.notes}>{
      Notes.map((note, i) => (
        <Note_single key={'foot_note' + i} note={note} />
      ))
    }</section>
  )
}


function Note_single({ note }: { note: string }) {
  const Note = note.trim()
  const { text_simple, note_number } = get_note_text(Note)
  //console.log(text_simple, note_number);
  //const regex_link = /\[(.+?)\]\((https:\/\/www\.[^\)]+)\)/;
  const match_link = regex_link.exec(text_simple)

  const regex_citetion = />\s*"(.*?)"\s+cite="(.*?)"/
  const match_citation = regex_citetion.exec(text_simple)

  if (match_link || match_citation) {
    if (match_citation && match_link) {
      // entrambe vere
      const matchText_link = match_link[0]
      const startIndex_link = match_link.index; // Indice di inizio della corrispondenza
      const endIndex_link = startIndex_link + matchText_link.length; // Indice di fine della corrispondenza
      //console.log("Corrispondenza trovata:", matchText);
      //console.log("Inizio:", startIndex);
      //console.log("Fine:", endIndex);
      const visibleText_link = match_link[1];
      //console.log("Testo visibile:", visibleText);
      const url_link = match_link[2];
      //console.log("URL:", url)

      //citazione
      const fullMatch_text = match_citation[0]; // La corrispondenza completa
      const startIndex_citation = match_citation.index
      const endIndex_citation = startIndex_citation + fullMatch_text.length
      const citation_text = match_citation[1]; // La citazione tra i doppi apici
      const cite_ref = match_citation[2]; // Il contenuto dell'attributo cite
      // console.log("Corrispondenza trovata:", fullMatch_text);
      // console.log("Citazione:", quotedText);
      // console.log("URL di cite:", cite_ref);
      // console.log('indice citation: ' + startIndex_citation + ', indice link: ' + startIndex_link);

      if (startIndex_citation < startIndex_link) {
        return (
          <div>
            <span><sup>{note_number}</sup>{text_simple.substring(0, startIndex_citation)}</span>
            <span>
              <blockquote cite={cite_ref}>
                <span>{`"${citation_text.replace(">", '')}".`}</span>
              </blockquote>
            </span>
            <span>{text_simple.substring(endIndex_citation, startIndex_link)}</span>
            <a target='_blank' href={url_link} > {' ' + visibleText_link}</a>
            <span>{text_simple.substring(endIndex_link)}</span>
          </div>
        )
      } else if (startIndex_citation > startIndex_link) {
        return (
          <div >
            <span><sup>{note_number}</sup>{text_simple.substring(0, startIndex_link)}</span>
            <a target='_blank' href={url_link} > {' ' + visibleText_link}</a>
            <span>{text_simple.substring(endIndex_link, startIndex_citation)}</span>
            <span>
              <blockquote cite={cite_ref} >
                <span>{`"${citation_text.replace(">", '')}".`}</span>
              </blockquote>
            </span>
            <span>{text_simple.substring(endIndex_citation)}</span>
          </div>
        )
      }

    } else if (!match_citation && match_link) {
      const matchText_link = match_link[0]
      const startIndex_link = match_link.index; // Indice di inizio della corrispondenza
      const endIndex_link = startIndex_link + matchText_link.length; // Indice di fine della corrispondenza
      const visibleText_link = match_link[1];
      const url_link = match_link[2];
      return (
        <div >
          <span><sup>{note_number}</sup>{text_simple.substring(0, startIndex_link)}</span>
          <a target='_blank' href={url_link}> {' ' + visibleText_link}</a>
          <span>{text_simple.substring(endIndex_link)}</span>
        </div>
      )
    } else if (!match_link && match_citation) {
      const fullMatch_text = match_citation[0]; // La corrispondenza completa
      const startIndex_citation = match_citation.index
      const endIndex_citation = startIndex_citation + fullMatch_text.length
      const citation_text = match_citation[1]; // La citazione tra i doppi apici
      const cite_ref = match_citation[2]; // Il contenuto dell'attributo cite
      return (
        <div >
          <span><sup>{note_number}</sup>{text_simple.substring(0, startIndex_citation)}</span>
          <span>
            <blockquote cite={cite_ref} >
              <span>{`"${citation_text.replace(">", '')}".`}</span>
            </blockquote>
          </span>
          <span>{text_simple.substring(endIndex_citation)}</span>
        </div>
      )
    }
  }

  return (
    <div>
      <p><sup>{note_number}</sup>{text_simple}</p>
    </div>
  )
}

function get_note_text(text: string): { text_simple: string, note_number: string } {
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