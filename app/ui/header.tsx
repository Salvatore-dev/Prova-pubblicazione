import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/Salvatore-Tosich-logo.png'


function Header() {
  return (
    <header>
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <span className="flex items-center">
                <Image src={logo} width={70} height={70} className="mr-3 w-12 h-12 sm:w-14 sm:h-14" alt="Flowbite Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-700">Salvatore Tosich Web Developer</span>
            </span>
            <div className="flex items-center lg:order-2">
                <a href="#" className="text-gray-100 bg-gray-700 hover:bg-gray-500 focus:ring-4 focus:ring-gray-700 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none">Log in</a>
                <a href="#" className="text-gray-100 bg-gray-700 hover:bg-gray-500 focus:ring-4 focus:ring-gray-700 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none">Da assegnare eventualmente</a>
                <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-700 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button> 
                {/** bottone che si aziona solo sr dovo trasferire evventualemnte i link */}
            </div>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <Link href={"/"} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-300 lg:p-0" aria-current="page">Home</Link>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-300 lg:p-0">Skills</a>
                    </li>
                    <li>
                        <Link href={`/memory-game`} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-300 lg:p-0">Progetti personali</Link>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-300 lg:p-0">Certificazioni</a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-300 lg:p-0">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
  )
}

export default Header