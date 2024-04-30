import React from 'react'

import image_nova_aetas from '@/public/image/nova_aetas/Nova_aetas_image.jpg'

import Image from 'next/image'
function Header_application() {
  return (
    <div className='relative h-auto w-full'>
        <Image 
        src={image_nova_aetas} 
        className='w-full h-auto'
        alt='Imagem Nova Aetas'
        />
        <div className='absolute bottom-1 right-2 text-center text-base text-green-900 font-bold'>Applicazione per uso privato</div>
    </div>
  )
}

export default Header_application