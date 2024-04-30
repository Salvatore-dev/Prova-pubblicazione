
import React from 'react'
import Image from 'next/image'

import conquista from '@/public/image/nova_aetas/carta_conquista.jpg'

function Conquests_title() {
    return (
        <div className='flex items-center justify-center gap-4'>
            <div className='flex items-center'>
                <Image className='w-5 md:w-auto h-auto' src={conquista} alt='icona carta destino' width={30} height={30} />
            </div>
            <p className='m-0 text-base md:text-lg font-bold'>Conquiste</p>
            <div className='flex items-center'>
                <Image className='w-5 md:w-auto h-auto' src={conquista} alt='icona carta ricompensa' width={30} height={30} />
            </div>
        </div>
      )
}

export default Conquests_title