import React from 'react'

import Image from 'next/image'
import experience_point from '@/public/image/nova_aetas/punti_esperienza.jpg'


function Experience_icon() {
  return (
    <div className='flex items-center justify-center gap-4'>
      <div className='flex items-center'>
        <Image className='w-5 md:w-auto h-auto' src={experience_point} alt='icona esperienza' width={30} height={30} />
      </div>
      <p className='m-0 text-base md:text-lg font-bold'>Esperienza</p>
      <div className='flex items-center'>
        <Image className='w-5 md:w-auto h-auto' src={experience_point} alt='icona esperienza' width={30} height={30} />
      </div>
    </div>
  )
}

export default Experience_icon