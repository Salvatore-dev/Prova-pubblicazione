import cover from '@/public/image/pexel/pexels-photo-4792728.jpeg'
import Image from 'next/image';
import rapidita from '@/public/image/nova_aetas/rapidita.jpg'

function NavBarBootstap() {
  return (
    <section className='relative min-h-screen '>
      <Image  src={cover} 
       placeholder="blur"
       quality={100}
       fill
      sizes="100vw"
      alt="Navbar image" className=' object-cover bg-center '/>
      <div className='absolute top-0 left-1 right-1'>
        <div className='text-white bg-slate-200 bg-transparent'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas commodi nisi voluptatem! Eum distinctio eos, voluptate repellat odio commodi quisquam, enim tempore nemo necessitatibus harum dolorum minus iste tenetur magni.
        </div>
      </div>
      <div className='absolute top-6 text-red'>
        ciaosasasas
        <Image src={rapidita} alt='icona' width={20} height={20}></Image>
      </div>
    </section>
  )
}

export default NavBarBootstap