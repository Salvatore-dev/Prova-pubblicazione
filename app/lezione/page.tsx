'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './motion.css';
import Link from 'next/link';

export default function () {
  const [showDiv, setShowDiv] = useState(true);

  return (
    <div>
        <div className=' bg-slate-800 flex items-center justify-around gap-2 mb-2'>
            <Link className=' bg-slate-700 text-yellow-200 text-lg font-medium p-2 border rounded-md' href={`/`}>Home</Link>
            <Link className=' bg-slate-700 text-yellow-200 text-lg font-medium p-2 border rounded-md' href={`/lezione/m1`}>Lezione Step2</Link>
            <Link className=' bg-slate-700 text-yellow-200 text-lg font-medium p-2 border rounded-md' href={`/correzione`}>Correzione Esercizio</Link>
        </div>
      <h2>Motion</h2>
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 3 }}
        className="box"
        id="box-1"
      ></motion.div>

      <AnimatePresence>
        {showDiv && (
          <motion.div
            initial={{ translateX: -2000 }}
            animate={{ translateX: 0 }}
            transition={{ duration: 1 }}
            exit={{
              translateX: -2000,
              transition: { ease: 'easeIn', duration: 3 },
            }}
            className="box"
            id="box-2"
          ></motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => setShowDiv((v) => !v)}>toggle show div</button>

      <div className="box" id="box-3"></div>

      <div style={{ height: '400px' }}></div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 3 }}
        className="box"
      />

      <div style={{ height: '400px' }}></div>

      <motion.div
        initial={{ translateX: -100, opacity: 0 }}
        whileInView={{ translateX: 0, opacity: 1 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
        className="box"
      />

      <div style={{ height: '400px' }}></div>
    </div>
  );
}
