import React from 'react'
import Image from 'next/image';

import logo from '@/public/memory-game/cards/header.svg'



function Header() {
    return (
        <section className="flex flex-row justify-between items-center bg-sky-600">
          <Image className=' w-[350px]' src={logo} alt='logo image' priority={true}></Image>
          <div className='text-center text-9xl text-white italic font-bold p-3 mr-2'>Cards...</div>
        </section>
      );
}

export default Header