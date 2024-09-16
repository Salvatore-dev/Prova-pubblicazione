import cover from '@/public/image/pexel/pexels-photo-4792728.jpeg'
import Image from 'next/image';

function Presentation_Home() {
  return (
    <section className='relative min-h-screen '>
      <Image  src={cover} 
       placeholder="blur"
       quality={100}
       fill
      sizes="100vw"
      alt="Navbar image" className=' object-cover bg-center '/>
      <div className='absolute bottom-0 right-0 text-white md:text-slate-900'>
        <h1 className=' font-extrabold text-center  xl:text-slate-900'>Sito per sperimentazioni e utilità private.</h1>
        <p className=' font-medium text-xl text-justify mx-2  xl:text-slate-900'>
          Questo sito è stato creato per sperimentare nuove tecnologie e nuove soluzioni web.
        </p>
      </div>
    </section>
  )
}

export default Presentation_Home