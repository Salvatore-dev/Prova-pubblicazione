"use client"
 import {useState} from "react"
 import { motion, AnimatePresence } from "framer-motion";

function StepOne() {

  const[imputs, setImputs]= useState<string[]>([])
  const [text, setText]= useState<string>('')
  const [remove, setRemove]= useState<number>(0)

  function addText() {
    setImputs(prev=>[...prev, text])
    setText('')
  }
console.log("imputs:",imputs,"text:", text);

function removeItems() {
  console.log(" vedi",remove, typeof remove);

  const fil = imputs.filter((el,id)=>id !== (remove -1))
  setImputs(fil)
  setRemove(0)
  
}

  return (
    <div className=' bg-slate-800'>
      <h1 className='text-center text-2xl font-semibold p-3'>Step Imput</h1>
      <div className=' bg-slate-700 flex flex-row items-center justify-around gap-4 my-3'>
        <label className='flex items-center gap-2 text-lg' htmlFor="">
          Testo da inserire
          <input 
          value={text}
          onChange={(e)=> setText(e.target.value)} className='text-center text-black font-semibold text-lg' type="text" />
          <button onClick={addText} className=' bg-slate-200 text-slate-800 text-center text-base font-semibold p-1 border rounded-xl'>GO</button>
        </label>
        <label className='flex items-center gap-2 text-lg'  htmlFor="">
          Elemento da rimuovere
          <input
          value={remove.toString()}
          min={imputs.length === 0 ? 0 : 1 }
          //defaultValue={imputs.length}
          onChange={(e)=>setRemove(parseInt(e.target.value))}
          max={imputs.length}
           className=' text-center text-black font-semibold text-lg' 
           type="number" />
          <button onClick={removeItems} className=' bg-slate-200 text-slate-800 text-center text-base font-semibold p-1 border rounded-xl'>Remove</button>
        </label>
      </div>
      <div className=" bg-black p-1">
        <AnimatePresence>
          {imputs.length>=1 && imputs.map((el, i)=>(
            <motion.div
             initial={{ translateY: 1000, opacity: 0 }}
             animate={{ translateY: 0 , opacity: 1}}
             exit={{ translateY: 1000, opacity: 0, 
                      transition :  { ease: 'easeIn', duration: 2 }
                       }}

             transition={{ duration: 2, 
                layout: { duration: 2 } 
                }}
             layout
            className=" bg-slate-800 p-2 my-2" key={i+"elements"}>{el}</motion.div>
        ))}
        </AnimatePresence>
        
      </div>
    </div>
  )
}

export default StepOne