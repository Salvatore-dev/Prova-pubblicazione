"use client";
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function Correction() {
    type MyIMput = {
        message: string,
        id: number
    }
    const [input, setInput] = useState<string>('')
    const [array, setArray] = useState<MyIMput[]>([])
    const [sideMenu, setSideMenu] = useState(false)
    let counter = useRef<number>(0)
    const addHandler = () => {
        counter.current++
        setArray(prev => ([...prev, { message: input, id: counter.current }]))
        setInput('')
    }
    const delHandler = (id: number) => {
        setArray(prev => ([...prev.filter(el => (el.id !== id))]))
    }

    let itemIncrement = 1
    const menuHandler = () => {
        setSideMenu(prev => !prev)
    }

    return (
        <>
            <div className=' bg-slate-800 flex items-center justify-around gap-2'>
                <Link className=' bg-slate-700 text-yellow-200 text-lg font-medium p-2 border rounded-md' href={`/`}>Home</Link>
                <Link className=' bg-slate-700 text-yellow-200 text-lg font-medium p-2 border rounded-md' href={`/lezione`}>Lezione Main</Link>
                <Link className=' bg-slate-700 text-yellow-200 text-lg font-medium p-2 border rounded-md' href={`/lezione/m1`}>Lezione Step2</Link>
            </div>
            <AnimatePresence>
                <motion.div
                    initial={{ translateX: -2000, opacity: 0 }}
                    animate={sideMenu ? { translateX: 0, opacity: 1 } : { translateX: -350 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute  h-full w-[350px] bg-violet-300`}>
                    ciao
                </motion.div>

            </AnimatePresence>
            <div className=' flex justify-end'>
                <button onClick={menuHandler} className=' m-2 border-4 border-violet-700 bg-violet-200 rounded-full px-3 py-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>

            <div className='p-5 flex gap-4 items-center justify-center'>
                <label htmlFor="input">Say It! </label>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className=' h-11 border-violet-400 focus:outline-none text-black focus:border-violet-600 bg-violet-100 border-2 rounded-xl' id='input'
                    type="text"
                    placeholder='type your message!' />

                <button onClick={addHandler} className='bg-violet-400 active:bg-violet-600 p-3 rounded-xl click:bg-violet-600'>Add</button>
            </div>
            <div className='flex flex-col items-center gap-3'>
                <AnimatePresence>
                    {array.length > 0 ? array.map((el, i) => (
                        <motion.div
                            className='rounded-xl bg-violet-300 w-fit p-3 flex gap-2' key={el.id + 1}
                            initial={{ translateY: -60 * (array.length) }}
                            animate={{ translateY: 0 }}
                            transition={{ duration: 2 }}
                            exit={{ translateY: -60 * array.length, opacity: 0 }}

                        >
                            {itemIncrement *= 2}
                            <h1>{el.message}</h1>
                            <button onClick={() => delHandler(el.id)} className='bg-red-500 border-2 border-red-300 rounded-full px-3 py-3'></button>
                        </motion.div>
                    )) : ''}
                </AnimatePresence>
            </div>

        </>
    )
}
