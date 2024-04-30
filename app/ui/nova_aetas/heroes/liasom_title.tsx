import React from 'react'
import Image from 'next/image'
import legame from '@/public/image/nova_aetas/legame.jpg'
function Liasom_title() {
  return (
    <div className='flex items-center gap-2 m-0'>
        <Image className='' src={legame} alt='icona legame' width={20} height={20} />
    <p className='m-0'>Legame</p>
</div>
  )
}

export default Liasom_title