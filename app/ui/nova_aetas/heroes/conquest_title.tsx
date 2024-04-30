import React from 'react'

import Image from 'next/image'
import mente from '@/public/image/nova_aetas/mente.jpg'
import conquista from '@/public/image/nova_aetas/carta_conquista.jpg'
function Conquest_title_hero() {
  return (
    <div className='flex items-start md:items-center flex-col md:flex-row gap-2 m-0'>
      <div className='flex items-center justify-center'>
        <Image className='' src={conquista} alt='icona conquista' width={20} height={20} />
     
        <Image className='' src={mente} alt='icona mente' width={20} height={20} />
      </div>
        
        <p className='m-0 md:w-52'>Conquiste</p>
    </div>
  )
}

export default Conquest_title_hero