"use client";
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react';

function StepTwo() {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className=' bg-slate-800'>
            <h1 className='text-center text-2xl font-semibold p-3'>Step Hamburgher Menu</h1>
            <AnimatePresence>
                {isOpen &&
                    <motion.div
                    initial= {{translateX: -300, opacity:0}}
                    animate={{ translateX: 0, opacity:1}}
                    transition={{duration: 1.5}}
                    exit={{translateX: -300, opacity:0, transition :  { ease: 'easeIn', duration: 2 }}}
                    className={`absolute  h-fit w-fit bg-slate-500`}
                    >
                        <Menu></Menu>
                    </motion.div>
            }
            </AnimatePresence>
            
            <div className=' flex justify-end'>
                <button onClick={() => setIsOpen(prev => !prev)} className=' m-2 border-4 border-violet-700 bg-violet-200 rounded-full px-3 py-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default StepTwo


function Menu() {
    return (
        <nav className='p-8' >
            <ul className='flex flex-col items-start'>
                <li className='text-center text-lg font-medium cursor-pointer p-1 font-sans'>Portfolio</li>
                <li className='text-center text-lg font-medium cursor-pointer p-1 font-sans'>About</li>
                <li className='text-center text-lg font-medium cursor-pointer p-1 font-sans'>Contact</li>
                <li className='text-center text-lg font-medium cursor-pointer p-1 font-sans'>Search</li>
            </ul>
        </nav>
    );
}