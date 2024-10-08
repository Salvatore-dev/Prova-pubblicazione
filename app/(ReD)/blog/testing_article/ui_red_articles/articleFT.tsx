import React, { ReactComponentElement } from 'react'


function Article_FT({children}: {children: React.ReactNode }) {
  return (
    <div>
        <article className='md:w-[98%] m-auto'>
            {children}
        </article>
    </div>
  )
}

export default Article_FT