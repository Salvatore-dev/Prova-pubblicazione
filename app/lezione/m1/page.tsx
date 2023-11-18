'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import '@/app/lezione/motion.css';

import Link from 'next/link';

type Voice = {
  id: number;
  voice: string;
};

export default function M1() {
  const [voices, setVoices] = useState<Voice[]>([
    { id: 1, voice: 'first voice' },
    { id: 2, voice: 'second voice' },
    { id: 3, voice: 'third voice' },
    { id: 4, voice: 'third voice' },
    { id: 5, voice: 'third voice' },
  ]);

  function deleteVoice(id: number) {
    setVoices((state) => state.filter((voice) => voice.id !== id));
  }

  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate('div.box-animate', { opacity: 1, rotate: 360 }, { duration: 1 });
  });

  return (
    <div>
        <div className=' bg-slate-800 flex items-center justify-around gap-2'>
            <Link className=' bg-slate-700 text-yellow-200 text-lg font-medium p-2 border rounded-md' href={`/`}>Home</Link>
            <Link className=' bg-slate-700 text-yellow-200 text-lg font-medium p-2 border rounded-md' href={`/lezione`}>Lezione Main</Link>
            <Link className=' bg-slate-700 text-yellow-200 text-lg font-medium p-2 border rounded-md' href={`/correzione`}>Correzione Esercizio</Link>
        </div>
      <section ref={scope}>
        <div className="box box-animate">box ciao</div>
        <div className="box box-animate">box ciao</div>
        <div className="box box-animate">box ciao</div>
        <div className="box box-animate">box ciao</div>
      </section>

      <motion.div
        className="box flex justify-center items-center text-white"
        animate={{
          scale: [1, 2, 2, 0.3, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ['0%', '0%', '50%', '50%', '0%'],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        ciao
      </motion.div>

      <div className="flex flex-col gap-10">
        <AnimatePresence>
          {voices.map((voice: Voice, i) => (
            <motion.div
              initial={{ translateX: -2000, rotate: 360 }}
              animate={{ translateX: 0, rotate: 0 }}
              transition={{
                duration: 1,
                delay: 0.3 * i,
                layout: { duration: 0.1 },
              }}
              layout
              exit={{
                translateX: -2000,
                rotate: 360,
                transition: { ease: 'easeIn', duration: 0.3 },
              }}
              className="p-4 bg-gray-400 flex justify-between items-center"
              key={voice.id}
            >
              <div>{voice.voice}</div>
              <motion.div
                onClick={() => deleteVoice(voice.id)}
                className="p-2 bg-red-400 text-white cursor-pointer"
                whileHover={{
                  scale: 1.3,
                  rotate: 360,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
              >
                X
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
