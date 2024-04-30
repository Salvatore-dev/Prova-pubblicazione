import React from 'react'
import Image from 'next/image'
import experience from '@/public/image/nova_aetas/punti_esperienza.jpg'

function Hero_icon_title({title}: {title: string}) {
  return (
    <div className='flex items-start md:items-center flex-col md:flex-row gap-2 m-0'>
        <Image className=' m-0' src={experience} alt='icona legame' width={20} height={20} />
    <p className='m-0'>{title}</p>
</div>
  )
}

export default Hero_icon_title