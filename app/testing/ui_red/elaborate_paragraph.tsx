import React from 'react'
import { regex_note, regex_link, regex_image } from '@/app/(ReD)/lib/data_red';
//const regex_note = new RegExp(/\[\^\d+\].$/);
import image from '@/public/image/pexel/esempio-1.jpeg'

function Elaborate_paragraph({ data_text }: { data_text: string }) {

    const text_to_elaborate = data_text.trim()
    //console.log('text to elaborate', text_to_elaborate);


    if (text_to_elaborate.startsWith('>')) {
        const cite = text_to_elaborate.substring(text_to_elaborate.search('cite=') + 5, text_to_elaborate.length).trim()
        //console.log(cite);

        const citation = text_to_elaborate.substring(0, text_to_elaborate.search('cite=')).trim()
        if (regex_note.test(citation)) {
            const { text_simple, note_number } = get_note_text(citation)
            return (
                <blockquote cite={cite} ><p>{text_simple.replace('>', '')}<sup>{note_number}</sup>.</p></blockquote>
            )
        } else return (
            <p>correggere citazione: {text_to_elaborate}</p>
        )

    }
    if (regex_note.test(text_to_elaborate)) {
        //const note = text_to_elaborate.substring(text_to_elaborate.search(regex_note)+2, text_to_elaborate.length -2) 
        //const text_simple = text_to_elaborate.replace(regex_note, '')
        const { text_simple, note_number } = get_note_text(text_to_elaborate)
        return (
            <p>{text_simple}<sup>{note_number}</sup>.</p>
        )
    }
    if (text_to_elaborate.startsWith('!')) {
        const match_image = text_to_elaborate.match(regex_image)
        if (match_image) {
            const description = match_image[1]; // La stringa tra le parentesi quadre []
            const url = match_image[2]; // La stringa tra le parentesi tonde ()

            return (
                <figure>
                    <img src={url}
                        alt={description} />
                        <figcaption>{description}</figcaption>
                </figure>
            )
        }
    }
    return (
        <p className='bg-neutral-200'>{text_to_elaborate}</p>
    )
}

function get_note_text(text: string): { text_simple: string, note_number: string } {
    const note_number = text.substring(text.search(regex_note) + 2, text.length - 2)
    const text_simple = text.replace(regex_note, '')
    return {
        text_simple,
        note_number
    }
}

export default Elaborate_paragraph