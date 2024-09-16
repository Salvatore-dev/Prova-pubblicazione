import React from 'react'

const Lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nobis et placeat, repellendus eum provident illo accusamus, ex temporibus minima, natus neque cupiditate? Explicabo vitae doloremque similique harum hic nisi!`
function Page() {
  return (
    <>
      <section className=' w-[95%] md:w-[80%] lg:w-[70%] xl:w-[65%] m-auto'>
        <h1>ciao spazio disponibile per prove RED</h1>
        <div>
          <h3>
            Prove di aspetto testo
          </h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nobis et placeat, repellendus eum provident illo accusamus, ex temporibus minima, natus neque cupiditate? Explicabo vitae doloremque similique harum hic nisi!</p>
          <h4>Alcune impostazione del testo</h4>
          {[``,`antialiased`,'capitalize', `subpixel-antialiased`, `antialiased hover:subpixel-antialiased`, `italic`, `tracking-wide`, `tracking-widest`, `tracking-tight hover:tracking-wide`, `line-clamp-1 hover:line-clamp-none`, `leading-none`, `leading-snug`, `leading-relaxed`, `leading-10`].map((css, i)=>(
            <div key={i}>
            <Paragraph text={Lorem} css={css} />
            </div>
          ))}
              <h4>Alcune impostazione del testo: decorazioni</h4>
              {['underline hover:no-underline', 'overline', 'line-through', 'underline decoration-sky-500/30', 'underline decoration-pink-500/30', 'underline decoration-indigo-500 decoration-dashed decoration-4', 'underline decoration-double', 'underline decoration-wavy', 'underline decoration-from-font', 'underline hover:underline-offset-4'].map((css,i)=>(
                <div key={i}>
                  <Paragraph text={Lorem} css={css} />
                </div>
              ))}
        </div>
        <div>
        <h4>Alcune impostazione delle liste</h4>
          {['list-inside list-disc', 'list-outside list-disc', 'list-[upper-roman]', 'list-decimal'].map((css, i)=>(
            <div key={i}>
              <List_Types css={css} />
            </div>
          ))}
        </div>
      </section>

    </>
  )
}
// https://tailwindcss.com/docs/text-overflow  continua da qui
function List_Types({css}:{css:string}) {
  return(
    <ul className={`${css} bg-zinc-100 text-justify`}>
      <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, expedita quis repudiandae laudantium accusamus eius. Amet blanditiis reprehenderit expedita maiores eum harum itaque corrupti! Deserunt aut eligendi voluptatibus ut obcaecati!</li>
      <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus accusamus aperiam perferendis quisquam tenetur placeat ad consectetur ipsa odit labore. Dolorum, quas quam! Minus id maxime rerum maiores expedita praesentium.</li>
    </ul>
  )
}

function Paragraph({ text, css }: { text: string, css: string }) {
  return (
    <p className={`${css} bg-slate-50`}>1234 {text}</p>
  )
}
export default Page