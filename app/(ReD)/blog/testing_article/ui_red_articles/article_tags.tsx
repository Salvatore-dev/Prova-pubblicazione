import React from 'react'
import { PiTagSimpleBold } from "react-icons/pi";
import { LiaHashtagSolid } from "react-icons/lia";
import { PiTagSimpleFill } from "react-icons/pi";
import { PiTagSimpleLight } from "react-icons/pi";
import Link from 'next/link';

function Article_tags({tags}: {tags: string[]}) {
    const Tags = tags
  return (
    <>
    <hr className='md:w-[90%] m-auto my-2' />
    <footer className="flex item-center gap-4 md:w-[90%] m-auto">
        <span className='italic text-base md:text-lg font-bold'>Tags: </span>
        {Tags.map((tag, i)=>(
            <nav key={i}  className='flex items-center gap-2'>
                <LiaHashtagSolid/>
                <Link title={`Cerca articoli correlati a ${tag}`} href={`../app/tags/${tag.toLowerCase()}`} key={i}>{tag}</Link>
            </nav>
        ))}
        
    </footer>
    <hr className='md:w-[90%] m-auto my-2' />
    </>
  )
}

export default Article_tags