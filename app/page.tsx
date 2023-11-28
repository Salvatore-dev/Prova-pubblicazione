"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import StepOne from "./components/stepOne"
import StepTwo from "./components/stepTwo"
export default function Home() {
  return (
    <>
      <div className=' bg-slate-800 flex items-center justify-around gap-2'>
        <Link className=' bg-slate-700 text-yellow-200 text-lg font-medium p-2 border rounded-md' href={`/lezione`}>Lezione Main</Link>
        <Link className=' bg-slate-700 text-yellow-200 text-lg font-medium p-2 border rounded-md' href={`/lezione/m1`}>Lezione Step2</Link>
        <Link className=' bg-slate-700 text-yellow-200 text-lg font-medium p-2 border rounded-md' href={`/correzione`}>Correzione Esercizio</Link>
        <Link className=' bg-slate-700 text-yellow-200 text-lg font-medium p-2 border rounded-md' href={`/memory-game`}>Memory Game</Link>
      </div>
      <AnimatePresence>
        <div className='flex justify-between py-4 px-8'>

          <motion.div className=' bg-emerald-500 p-6'
            initial={{ translateX: -2000, translateY: 1000 }}
            animate={{ translateX: 0, translateY: 0, rotate: 360 }}
            transition={{ duration: 1, delay: 0 }}
          >elemento 1</motion.div>
          <motion.div className=' bg-blue-500 p-6'
            initial={{ translateX: -2000, translateY: 1000 }}
            animate={{ translateX: 0, translateY: 0, rotate: 360 * 2 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >elemento 2</motion.div>
          <motion.div className=' bg-indigo-500 p-6'
            initial={{ translateX: -2000, translateY: 1000 }}
            animate={{ translateX: 0, translateY: 0, rotate: 360 * 3 }}
            transition={{ duration: 2, delay: 1 }}
          >elemento 3</motion.div>
          <motion.div className=' bg-violet-500 p-6'
            initial={{ translateX: -2000, translateY: 1000 }}
            animate={{ translateX: 0, translateY: 0, rotate: 360 * 4 }}
            transition={{ duration: 2.5, delay: 1.5 }}
          >elemento 4</motion.div>

        </div>
      </AnimatePresence>

      <StepOne />
      <div className=" bg-slate-700 h-3"></div>
      <StepTwo />
    </>
  )
}