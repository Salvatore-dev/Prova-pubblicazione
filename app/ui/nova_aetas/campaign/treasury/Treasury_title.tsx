import React from 'react'

import elementum from '@/public/image/nova_aetas/carta_reagente_elementum.jpg'
import pecunia from '@/public/image/nova_aetas/carta_reagente_pecunia.jpg'
import alchimia from '@/public/image/nova_aetas/carta_reagente_alchimia.jpg'
import popolino from '@/public/image/nova_aetas/popolino.jpg'

import Image from 'next/image'

function Treasury_title() {
  return (
    <div className='flex items-center justify-center gap-4'>
        <div className='flex items-center'>
            <Image className='w-5 md:w-auto h-auto' src={popolino} alt='icona popolino' width={30} height={30} />
            <Image className='w-5 md:w-auto h-auto' src={elementum} alt='icona elementum' width={30} height={30} />
            <Image className='w-5 md:w-auto h-auto' src={alchimia} alt='icona alchimia' width={30} height={30} />
            <Image className='w-5 md:w-auto h-auto' src={pecunia} alt='icona pecunia' width={30} height={30} />
        </div>
        <p className='m-0 text-base md:text-lg font-bold'>Tesoreria</p>
        <div className='flex flex-row-reverse items-center'>
            <Image className='w-5 md:w-auto h-auto' src={popolino} alt='icona popolino' width={30} height={30} />
            <Image className='w-5 md:w-auto h-auto' src={elementum} alt='icona elementum' width={30} height={30} />
            <Image className='w-5 md:w-auto h-auto' src={alchimia} alt='icona alchimia' width={30} height={30} />
            <Image className='w-5 md:w-auto h-auto' src={pecunia} alt='icona pecunia' width={30} height={30} />
        </div>
    </div>
  )
}


export default Treasury_title