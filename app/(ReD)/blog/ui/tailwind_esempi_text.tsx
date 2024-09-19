import React from 'react'
type Tailwind_list_learning = {
    id: number,
    tailwindClass: string,
    description: string,
    cssProperty: string
  }
  const tailwind_text_1 : Tailwind_list_learning[] = [
    {
      id: 1,
      tailwindClass: "antialiased",
      description: "Applica un rendering del testo con antialiasing per bordi più lisci.",
      cssProperty: "font-smooth: antialiased;"
    },
    {
      id: 2,
      tailwindClass: "subpixel-antialiased",
      description: "Abilita l'antialiasing dei sottopixel per una maggiore nitidezza sui dispositivi ad alta risoluzione.",
      cssProperty: "font-smooth: auto;"
    },
    {
      id: 3,
      tailwindClass: "capitalize",
      description: "Trasforma la prima lettera di ogni parola in maiuscolo.",
      cssProperty: "text-transform: capitalize;"
    },
    {
      id: 4,
      tailwindClass: "antialiased hover:subpixel-antialiased",
      description: "Applica l'antialiasing del testo per default e cambia in antialiasing sottopixel quando l'elemento è in hover.",
      cssProperty: "font-smooth: antialiased; hover: font-smooth: auto;"
    },
    {
      id: 5,
      tailwindClass: "italic",
      description: "Rende il testo in corsivo.",
      cssProperty: "font-style: italic;"
    },
    {
      id: 6,
      tailwindClass: "tracking-wide",
      description: "Aumenta la spaziatura tra i caratteri.",
      cssProperty: "letter-spacing: 0.05em;"
    },
    {
      id: 7,
      tailwindClass: "tracking-widest",
      description: "Aumenta significativamente la spaziatura tra i caratteri.",
      cssProperty: "letter-spacing: 0.1em;"
    },
    {
      id: 8,
      tailwindClass: "tracking-tight hover:tracking-wide",
      description: "Applica una spaziatura stretta tra i caratteri per default, che si espande in spaziatura ampia quando l'elemento è in hover.",
      cssProperty: "letter-spacing: -0.05em; hover: letter-spacing: 0.05em;"
    },
    {
      id: 9,
      tailwindClass: "line-clamp-1 hover:line-clamp-none",
      description: "Mostra una sola riga di testo per default e rimuove il limite di righe quando l'elemento è in hover.",
      cssProperty: "display: -webkit-box; -webkit-line-clamp: 1; hover: -webkit-line-clamp: unset;"
    },
    {
      id: 10,
      tailwindClass: "leading-none",
      description: "Imposta l'altezza della linea al minimo senza spaziatura aggiuntiva.",
      cssProperty: "line-height: 1;"
    },
    {
      id: 11,
      tailwindClass: "leading-snug",
      description: "Imposta l'altezza della linea leggermente più grande per dare respiro tra le righe.",
      cssProperty: "line-height: 1.375;"
    },
    {
      id: 12,
      tailwindClass: "leading-relaxed",
      description: "Imposta un'altezza della linea più rilassata e ariosa.",
      cssProperty: "line-height: 1.625;"
    },
    {
      id: 13,
      tailwindClass: "leading-10",
      description: "Imposta un'altezza della linea fissa pari a 2.5rem.",
      cssProperty: "line-height: 2.5rem;"
    },
    {
      id: 14,
      tailwindClass : "truncate",
      description : "Impedisce che il testo vada a capo e troncare il testo eccedente con un'ellissi (…), se necessario",
      cssProperty : "overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
    },
    {
      id: 15,
      tailwindClass :"text-ellipsis",
      description :"Per troncare il testo eccedente con un'ellissi (…).",
      cssProperty :"text-overflow: ellipsis;"
    },
    {
      id: 16,
      tailwindClass :"text-clip",
      description: "Per troncare il testo al limite dell'area del contenuto",
      cssProperty: "text-overflow: clip;"
    },
    {
      id: 17,
      tailwindClass : "text-wrap",
      description : "Per disporre il testo eccedente su più righe in punti logici del testo. Puo' essere impostato ad un tag ARTICLE.",
      cssProperty : "white-space: wrap"
    },
    {
      id: 18,
      tailwindClass : "text-nowrap",
      description : "Per evitare che il testo vada a capo, consentendone la fuoriuscita se necessario. Puo' essere impostato su un tag ARTICLE.",
      cssProperty : "text-wrap: nowrap;"
    },
    {
      id: 19,
      tailwindClass: "text-balance",
      description: "per distribuire il testo in modo uniforme su ogni riga",
      cssProperty: "text-wrap: balance;"
    },
    {
      id: 20,
      tailwindClass: "text-pretty",
      description: "per disporre il testo eccedente su più righe in punti logici del testo. Puo' essere impostato su un tag ARTICLE.",
      cssProperty: "text-wrap: pretty;"
    },
    {
      id: 21,
      tailwindClass: "indent-1",
      description: "Imposta un'indentazione di 0.5rem. Si puo usare con HOVER e anche con valori arbitrari: -[50%].",
      cssProperty: "text-indent: 0.5rem"
    },
    {
      id: 22,
      tailwindClass: "hyphens-auto",
      description: "per consentire al browser di scegliere automaticamente i punti di sillabazione in base alla lingua. ci sono altri due valori olte AUTO, NONE e MANUAL",
      cssProperty: "hyphens: auto"
    },
    {
      id: 23,
      tailwindClass: "before:content-['Not_Hovering'] hover:before:content-['Hovering']",
      description: "Utilizzare le content-*utilità insieme ai modificatori variant beforee afterper impostare il contenuto degli pseudo-elementi ::beforee ::after. Out of the box, content-noneè l'unica utility di contenuto preconfigurata disponibile. E mentre puoi aggiungere altre utility personalizzando il tuo tema , in genere ha più senso usare semplicemente un valore arbitrario. Utilizzare la notazione tra parentesi quadre per definire al volo qualsiasi valore di contenuto arbitrario. si possono usa immagini o caratteri speciali. Nel caso vedi documentazione",
      cssProperty: "content: 'Not_Hovering'; hover:content: 'Hovering'."
    }
  ]
  
  const tailwind_decoration_text : Tailwind_list_learning[] = [
    {
      id: 1,
      tailwindClass: "underline hover:no-underline",
      description: "Sottolinea il testo per default, ma rimuove la sottolineatura quando l'elemento è in hover.",
      cssProperty: "text-decoration: underline; hover: text-decoration: none;"
    },
    {
      id: 2,
      tailwindClass: "overline",
      description: "Aggiunge una linea sopra il testo.",
      cssProperty: "text-decoration: overline;"
    },
    {
      id: 3,
      tailwindClass: "line-through",
      description: "Aggiunge una linea che attraversa il testo (barrato).",
      cssProperty: "text-decoration: line-through;"
    },
    {
      id: 4,
      tailwindClass: "underline decoration-sky-500/30",
      description: "Sottolinea il testo con una linea di colore azzurro chiaro (sky) con opacità del 30%.",
      cssProperty: "text-decoration: underline; text-decoration-color: rgba(14, 165, 233, 0.3);"
    },
    {
      id: 5,
      tailwindClass: "underline decoration-pink-500/30",
      description: "Sottolinea il testo con una linea di colore rosa (pink) con opacità del 30%.",
      cssProperty: "text-decoration: underline; text-decoration-color: rgba(236, 72, 153, 0.3);"
    },
    {
      id: 6,
      tailwindClass: "underline decoration-indigo-500 decoration-dashed decoration-4",
      description: "Sottolinea il testo con una linea color indaco, tratteggiata e con spessore di 4px.",
      cssProperty: "text-decoration: underline; text-decoration-color: #6366F1; text-decoration-style: dashed; text-decoration-thickness: 4px;"
    },
    {
      id: 7,
      tailwindClass: "underline decoration-double",
      description: "Sottolinea il testo con una linea doppia.",
      cssProperty: "text-decoration: underline; text-decoration-style: double;"
    },
    {
      id: 8,
      tailwindClass: "underline decoration-wavy",
      description: "Sottolinea il testo con una linea ondulata.",
      cssProperty: "text-decoration: underline; text-decoration-style: wavy;"
    },
    {
      id: 9,
      tailwindClass: "underline decoration-from-font",
      description: "Sottolinea il testo utilizzando la spaziatura e lo stile della decorazione derivati dal font stesso.",
      cssProperty: "text-decoration: underline; text-decoration-skip-ink: auto;"
    },
    {
      id: 10,
      tailwindClass: "underline hover:underline-offset-4",
      description: "Sottolinea il testo per default, e aumenta lo spazio tra il testo e la sottolineatura di 4px quando l'elemento è in hover.",
      cssProperty: "text-decoration: underline; hover: text-underline-offset: 4px;"
    }
  ]
  const tailwind_list_type : Tailwind_list_learning[] = [
    {
      id: 1,
      tailwindClass: "list-inside list-disc",
      description: "Applica uno stile di elenco puntato (disco) con i marker di lista posizionati all'interno del contenuto dell'elemento.",
      cssProperty: "list-style-type: disc; list-style-position: inside;"
    },
    {
      id: 2,
      tailwindClass: "list-outside list-disc",
      description: "Applica uno stile di elenco puntato (disco) con i marker di lista posizionati all'esterno del contenuto dell'elemento.",
      cssProperty: "list-style-type: disc; list-style-position: outside;"
    },
    {
      id: 3,
      tailwindClass: "list-[upper-roman]",
      description: "Applica uno stile di elenco con numerazione romana in maiuscolo.",
      cssProperty: "list-style-type: upper-roman;"
    },
    {
      id: 4,
      tailwindClass: "list-decimal",
      description: "Applica uno stile di elenco numerato con cifre decimali.",
      cssProperty: "list-style-type: decimal;"
    }
  ]
  
  const Lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nobis et placeat, repellendus eum provident illo accusamus, ex temporibus minima, natus neque cupiditate? Explicabo vitae doloremque similique harum hic nisi!`
function Tailwind_esempi_text() {
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
          {tailwind_text_1.map((item, i)=>(
            <div key={i}>
            <Paragraph {...item} />
            </div>
          ))}
              <h4>Alcune impostazione del testo: decorazioni</h4>
              {tailwind_decoration_text.map((item,i)=>(
                <div key={i}>
                  <Paragraph {...item} />
                </div>
              ))}
        </div>
        <div>
        <h4>Alcune impostazione delle liste</h4>
          {tailwind_list_type.map((item, i)=>(
            <div key={i}>
              <List_Types {...item} />
            </div>
          ))}
        </div>
      </section>

    </>
  )
}
function List_Types(props : Tailwind_list_learning) {
    return(
      <ul className={`${props.tailwindClass} bg-zinc-100 text-justify mb-2`}>
        <div>
          <h5 className=' text-lime-700'>N. {props.id}</h5>
          <p>{props.description}</p>
          <p className=' font-light'>Comando tailwind: <span className=' font-semibold'>{props.tailwindClass}</span>; corrisponde a css: <span className=' italic'>{props.cssProperty}</span></p>
        </div>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, expedita quis repudiandae laudantium accusamus eius. Amet blanditiis reprehenderit expedita maiores eum harum itaque corrupti! Deserunt aut eligendi voluptatibus ut obcaecati!</li>
        <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus accusamus aperiam perferendis quisquam tenetur placeat ad consectetur ipsa odit labore. Dolorum, quas quam! Minus id maxime rerum maiores expedita praesentium.</li>
      </ul>
    )
  }
  
  function Paragraph(props : Tailwind_list_learning) {
    return (
      <div>
        <div>
          <h5 className=' text-lime-700'>N. {props.id}</h5>
          <p className=' font-semibold'>{props.description}</p>
          <p className=' font-light'>Comando tailwind: <span className=' font-semibold'>{props.tailwindClass}</span>; corrisponde a css: <span className=' italic'>{props.cssProperty}</span></p>
        </div>
        <p className={`${props.tailwindClass} bg-neutral-100`}>{Lorem}</p>
      </div>
      
    )
  }

export default Tailwind_esempi_text