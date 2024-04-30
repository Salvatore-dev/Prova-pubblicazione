
import React from 'react'
import Image from 'next/image'

import destino from '@/public/image/nova_aetas/carta_destino.jpg'
import ricompensa from '@/public/image/nova_aetas/carta_ricompensa.jpg'

function Inventory_title() {
  return (
    <div className='flex items-center justify-center gap-4'>
        <div className='flex items-center'>
            <Image className='w-5 md:w-auto h-auto' src={destino} alt='icona carta destino' width={30} height={30} />
            <Image className='w-5 md:w-auto h-auto' src={ricompensa} alt='icona carta ricompensa' width={30} height={30} />
        </div>
        <p className='m-0 text-base md:text-lg font-bold'>Inventario</p>
        <div className='flex items-center'>
            <Image className='w-5 md:w-auto h-auto' src={ricompensa} alt='icona carta ricompensa' width={30} height={30} />
            <Image className='w-5 md:w-auto h-auto' src={destino} alt='icona carta destino' width={30} height={30} />
        </div>
    </div>
  )
}

export default Inventory_title