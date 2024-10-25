import React from 'react'
import { regex_note, regex_link, regex_local_link, regex_image } from '@/app/(ReD)/lib/data_red';
import Link from 'next/link';

const css_tailwind_base_paragraph = 'antialiased text-justify py-1 leading-relaxed indent-4 hyphens-auto'

function Elaborate_paragraph({ data_text, path }: { data_text: string, path?: string }) {

    const text_to_elaborate = data_text.trim()
    //console.log('text to elaborate', text_to_elaborate);
    

    if (text_to_elaborate.startsWith('>')) {
        const cite = text_to_elaborate.substring(text_to_elaborate.search('cite=') + 5, text_to_elaborate.length).trim()
        //console.log(cite);
        const citation = text_to_elaborate.substring(0, text_to_elaborate.search('cite=')).trim()
        if (regex_note.test(citation)) {
            const { text_simple, note_number } = get_note_text(citation)
            return (
                <blockquote cite={cite} ><p className={`${css_tailwind_base_paragraph} italic w-[90%] m-auto text-sm md:text-base`}>{text_simple.replace('>', '')}<sup> {note_number}</sup>.</p></blockquote>
            )
        } else return (
            <p className={`${css_tailwind_base_paragraph}`}>correggere citazione: {text_to_elaborate}</p>
        )
    }

    if (regex_note.test(text_to_elaborate)) {
        //const note = text_to_elaborate.substring(text_to_elaborate.search(regex_note)+2, text_to_elaborate.length -2) 
        //const text_simple = text_to_elaborate.replace(regex_note, '')
        const { text_simple, note_number } = get_note_text(text_to_elaborate)
        return (
            <p className={`${css_tailwind_base_paragraph}`}>{text_simple}<sup>{note_number}</sup>.</p>
        )
    }

    if (text_to_elaborate.startsWith('![')) {
        const match_image = text_to_elaborate.match(regex_image)
        if (match_image) {
            const description = match_image[1]; // La stringa tra le parentesi quadre []
            let url = match_image[2]; // La stringa tra le parentesi tonde ()
            if (path&& !url.startsWith('https')) url = path + match_image[2] // nel caso delle chiamate in rotte dinamiche distanti di una cartella rispetto il default. nel caso rivedere metodo piu appropiato
            const endIndex_Image = match_image.length
            const match_link = regex_link.exec(text_to_elaborate.substring(endIndex_Image))
            if (match_link) {
                const visibleText_link = match_link[1];
                const url_link = match_link[2];
                return (
                    <figure className='my-4'>
                        <img src={url}
                            alt={description} />
                        <figcaption className=' rounded-b-sm bg-black text-white text-sm md:text-base p-1 text-right antialiased'>{description}<span><a className=' text-zinc-400 underline md:no-underline md:hover:underline' target='_blank' href={url_link} >{visibleText_link}</a></span></figcaption>
                    </figure>
                )
            } else return (
                <figure className='my-4'>
                    <img src={url}
                        alt={description} />
                    <figcaption className=' rounded-b-sm bg-black text-white p-1 text-sm md:text-base text-right antialiased'>{description}</figcaption>
                </figure>
            )
        }
    }
    const match_local_link = regex_local_link.exec(text_to_elaborate)
    if (!text_to_elaborate.startsWith('!') && match_local_link) {
        const matchText_link = match_local_link[0]
        const startIndex_link = match_local_link.index; // Indice di inizio della corrispondenza
        const endIndex_link = startIndex_link + matchText_link.length; // Indice di fine della corrispondenza
        const visibleText_link = match_local_link[1];
        const url_link = match_local_link[2];
        return(
            <p className={`${css_tailwind_base_paragraph}`}>{text_to_elaborate.substring(0, startIndex_link)}<span><Link className=' m-0 p-0 text-ReD-500 underline md:no-underline md:hover:underline' target='_blank' href={url_link}> {' ' + visibleText_link}</Link>{text_to_elaborate.substring(endIndex_link)}</span></p>
        )
    }
    return (
        <p className={`${css_tailwind_base_paragraph}`}>{text_to_elaborate}</p>
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