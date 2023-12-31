import React from 'react'
import Image from 'next/image';

import logo from '@/public/memory-game/cards/logo2.png'



function Header() {
    return (
        <section className=" md:flex flex-row justify-between items-center bg-purple-900">
          <Image className=' max-w-full md:w-[350px]' src={logo} alt='logo image' priority={true}></Image>
          <div className=' hidden md:block text-center text-9xl text-gray-200 italic font-bold p-3 mr-2'>Cards...</div>
        </section>
      );
}

export default Header