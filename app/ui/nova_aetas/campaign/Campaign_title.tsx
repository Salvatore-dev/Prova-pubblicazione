import React from 'react'

import Sun_Nova_aetas from '@/public/image/nova_aetas/sole_nova_aetas.jpg'
import Image from 'next/image'

const title = 'Nova Aetas Renaissance - Scheda di campagna'
function Campaign_title() {
  return (
    <div className='flex flex-row items-center gap-2 md:gap-4 justify-center m-0 py-2'>
        <Image className=' w-11 md:w-16' src={Sun_Nova_aetas} alt='icona_Sole_Nova_aetas' width={50} />
        <p className='m-0 p-0 text-xl md:text-2xl lg:text-4xl text-center font-bold'>{title}</p>
        <Image className=' w-11 md:w-16' src={Sun_Nova_aetas} alt='icona_Sole_Nova_aetas' width={50} />
    </div>
  )
}

export default Campaign_title