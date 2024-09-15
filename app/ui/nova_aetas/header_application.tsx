import React from 'react'
import image_nova_aetas from '@/public/image/nova_aetas/Nova_aetas_image.jpg'

import { Container, Button } from 'react-bootstrap'
import Image from 'next/image'
import { logout } from '@/app/actions/auth'

import { useState } from 'react'

function Header_application({user}: {user:string| null}) {

 
  return (
    <div className='relative h-auto w-full'>
        <Image 
        src={image_nova_aetas} 
        className='w-full h-auto'
        alt='Imagem Nova Aetas'
        />
        <div className='absolute top-1 right-2 text-center text-base text-white font-bold'>Applicazione per uso privato</div>
        <div className='flex flex-row items-center justify-around py-3 bg-green-950 text-white'>
          <p className=' text-lg font-medium'>Ciao <span className=' text-center text-xl font-semibold'>{user}</span>, Buon divertimento!</p>
          <button className=' bg-red-900 p-2 text-lg' onClick={()=> logout()}>Disconnettiti</button>
        </div>
    </div>
  )
}

export default Header_application