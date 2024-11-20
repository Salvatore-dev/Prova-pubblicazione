import React from 'react'
import { PiTagSimpleBold } from "react-icons/pi";
import { LiaHashtagSolid } from "react-icons/lia";
import { PiTagSimpleFill } from "react-icons/pi";
import { PiTagSimpleLight } from "react-icons/pi";
import Link from 'next/link';

function Article_tags({ tags }: { tags: string[] }) {
  const Tags = tags
  return (
    <footer>
      <hr className='w-[95%] md:w-[90%] m-auto my-2' />
      <div className='w-[95%] md:w-[90%] m-auto my-0 p-0 flex items-start md:items-center'>
        <span className='italic text-base md:text-lg lg:text-xl font-bold mr-2 md:mr-4'>Tags: </span>
        <nav className="flex flex-wrap gap-2 md:gap-4">
        {Tags.map((tag, i) => (
          <div key={i} className='m-0 p-0 flex items-center text-sm md:text-base lg:text-lg'>
            <LiaHashtagSolid color='blue' />
            <Link className='underline md:no-underline md:hover:underline text-stone-800' title={`Cerca articoli correlati a ${tag}`} href={`../articles_by_tag/${tag.toLowerCase()}`} key={i}>{tag}</Link>
          </div>
        ))}
      </nav>
      </div>
      <hr className='w-[95%] md:w-[90%] m-auto my-2' />
    </footer>
  )
}

export default Article_tags