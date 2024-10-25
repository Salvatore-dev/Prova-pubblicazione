

// let prova = 'https://www.youtube.com/watch?v=3mI9rm1IoUo'

// let prova2 = 'https://youtu.be/3mI9rm1IoUo'

// function getLink(string) {

//     if (string.includes('https://www.youtube.com')) {
//     let splitted = string.split(' ')
//     let link = ''
//     splitted.forEach(el => {
//         if (el.includes('https://www.youtube.com/')) link = el.replace('watch?v=', 'embed/')
//     });
//     if (link.charAt(link.length - 1) === '.') link = link.slice(0, -1)
//     return link
// }
//     return null
// }

// console.log(getLink(prova));


// function convertToISODate(dateString) {
//     // Definisci i mesi in italiano per convertirli in numeri
//     const mesi = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

//     // Dividi la stringa in giorno, mese (in italiano) e anno
//     const [giorno, meseItaliano, anno] = dateString.split('_');

//     // Trova l'indice del mese in italiano
//     const mese = mesi.indexOf(meseItaliano.toLowerCase().trim()) + 1;

//     // Aggiungi lo zero davanti ai mesi o giorni che sono numeri singoli
//     const meseISO = mese.toString().padStart(2, '0');
//     const giornoISO = giorno.trim().padStart(2, '0');

//     // Restituisci la stringa nel formato ISO 8601
//     return `${anno.trim()}-${meseISO}-${giornoISO}`;
// }

// // Esempio di utilizzo
// const data = "23_febbraio_2024";
// const data2= addDate1()
// console.log(data2);

// const dataISO = convertToISODate(data);
// console.log(dataISO);  // Output: 2024-09-12
// const dataISO2 = convertToISODate(data2)
// console.log(dataISO2);

// function addDate(): string {
//   return new Date().toLocaleString("it-IT", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//       timeZone: "Europe/Rome",
//   }).replaceAll(' ', '_');
// }

// function addDate1() {
//     return new Date().toLocaleString("it-IT", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//       timeZone: "Europe/Rome",
//     }).replaceAll(" ", "_");
//   }
// function addDate(): string {
//     return new Date().toLocaleString("it-IT", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "numeric",
//       minute: "2-digit",
//       second: "2-digit",
//       timeZone: "Europe/Rome",
//     });
//   }


//per testare le regex note red article
// const regex = /\[\^\d+\].$/;

// const string1 = "Questo è un esempio di citazione[^132323].";
// const string2 = "Questa non è una citazione corretta";
// console.log(regex.test(string1)); // true
// //console.log(string1.search(regex));
// const note = string1.substring(string1.search(regex) +2, string1.length-2)
// console.log(note);
// const transformed = string1.replace(regex, '');
// console.log( transformed );

// function prepare_array(contents, param_word) {
//     let body_article = contents
//     let notes = []
//     if (contents.includes(param_word)) {
//       body_article = contents.slice(0, contents.indexOf(param_word))
//       notes = contents.slice(contents.indexOf(param_word)+1)
//     }
//     return {
//       body_article: body_article,
//       notes: notes
//     }
//   }
// const Array_string = ['ciao', 'casa', 'albero', 'cigno', 'cavallo', 'leone', 'baracca']
// const param_word = 'leone'
// const { body_article, notes } = prepare_array(Array_string, param_word)

// console.log(body_article, notes);

// prove per regex link .md

// const text_t = 'This is the footnote.[title](https://www.example.com)'
// const text = "Questo è un esempio con l'URL (https://www.example.com) incluso nel testo.";
// const text_L = `sto sctivendo all'impoovviso prevedo un link [testo visibile del link](https://www.gli-animali-della-foresta.eu)`
// const regex_address_link = /\(https:\/\/www\.[^\)]+\)/;
// const regex_text_link = /\[.+?\]/;
// const regex_total = /\[(.+?)\]\((https:\/\/www\.[^\)]+)\)/;
// const match = regex_address_link.exec(text_L);
// const match2 = regex_text_link.exec(text_t)
// const match3 = regex_total.exec(text_L)

// if (match3) {
//   const matchText = match3[0]; // La corrispondenza trovata
//   const startIndex = match3.index; // Indice di inizio della corrispondenza
//   const endIndex = startIndex + matchText.length; // Indice di fine della corrispondenza
  
//   console.log("Corrispondenza trovata:", matchText);
//   console.log("Inizio:", startIndex);
//   console.log("Fine:", endIndex);
//    // Testo visibile del link
//    const visibleText = match3[1];
//    console.log("Testo visibile:", visibleText);
   
//    // URL del link
//    const url = match3[2];
//    console.log("URL:", url)
// }

// const condition_1 = false
// const condition_2 = true

// if (condition_1 || condition_2) {
//   console.log('Almeno una vera:', condition_1, condition_2);
  
//   if (condition_1 && condition_2) {
//     console.log('Entrambe vere:', condition_1, condition_2);
//   } else if (condition_1) {
//     console.log('Solo condizione 1 vera:', condition_1);
//   } else {
//     console.log('Solo condizione 2 vera:', condition_2);
//   }
  
// } else {
//   console.log('Entrambe false:', condition_1, condition_2);
// }


/// gestire tre condizioni
// if (condition_1 || condition_2 || condition_3) {
//   console.log('Almeno una vera:', condition_1, condition_2, condition_3);
  
//   if (condition_1 && condition_2 && condition_3) {
//     console.log('Tutte e tre vere:', condition_1, condition_2, condition_3);
//   } else if (condition_1 && condition_2) {
//     console.log('Solo condizione 1 e 2 vere:', condition_1, condition_2);
//   } else if (condition_1 && condition_3) {
//     console.log('Solo condizione 1 e 3 vere:', condition_1, condition_3);
//   } else if (condition_2 && condition_3) {
//     console.log('Solo condizione 2 e 3 vere:', condition_2, condition_3);
//   } else if (condition_1) {
//     console.log('Solo condizione 1 vera:', condition_1);
//   } else if (condition_2) {
//     console.log('Solo condizione 2 vera:', condition_2);
//   } else {
//     console.log('Solo condizione 3 vera:', condition_3);
//   }
  
// } else {
//   console.log('Tutte false:', condition_1, condition_2, condition_3);
// }

const arr = ['ciao', 'hello', 'rione', 'giovaninastri']

const agg = '../'

const r = agg + arr[0]
arr[0] = r
console.log(arr);


const article_md = {
    slug: 'articolo-esempio',
    author: 'Mario Rossi',
    title: 'Il mio primo articolo',
    subTitle: 'Un articolo di prova',
    creationDate: new Date('2024-01-01T10:00:00Z'), // Formato ISO
    section: 'Tecnologia',
    tags: ['tecnologia', 'programmazione'],
    modifiedDate: new Date('2024-10-01T12:00:00Z'), // Formato ISO
    image: ['image1.png', 'image2.png'],
  };

  const article_md2 = {
    slug: 'articolo-esempio',
    author: 'Mario Rossi',
    title: 'Il mio primo articolo',
    subTitle: 'Un articolo di prova',
    creationDate: new Date('2024-01-01T10:00:00Z'), // Formato ISO
    section: 'Tecnologia',
    tags: ['tecnologia', 'programmazione!'],
    modifiedDate: new Date('2024-10-01T12:00:00Z'), // Formato ISO
    image: ['image1.png', 'image2.png'],
  };

function compareMetadata3(obj_md, obj_db) {
    const keys_md = Object.keys(obj_md);
    const keys_db = Object.keys(obj_db);
  
  
    const result = {
      check: false,
      message: '',
      differences: [], // Array per tenere traccia delle differenze
    };
  
    // Controllo se il numero di chiavi è diverso
    if (keys_md.length !== keys_db.length) {
      result.message = 'I metadati non hanno lo stesso numero di campi';
      return result;
    }
  
    // Controllo se le chiavi corrispondono
    const keysMatch = keys_md.every((key, index) => key === keys_db[index]);
    if (!keysMatch) {
      result.message = 'Le chiavi dei metadati non corrispondono';
      return result;
    }
    const values_md = Object.values(obj_md).map(el => {
      if(typeof el === 'string') return el
      if (Array.isArray(el)) return el.toString().trim()
      if (el instanceof Date) return el.toISOString().trim()  
    });
    const values_db = Object.values(obj_db).map(el => {
      if(typeof el === 'string') return el
      if (Array.isArray(el)) return el.toString().trim()
      if (el instanceof Date) return el.toISOString().trim()  
    });
    // Controllo delle differenze nei valori
    const differents = [];
    for (let i = 0; i < keys_db.length; i++) {
      if (values_md[i] !== values_db[i]) {
        differents.push(keys_db[i]);
      }
    }
  
    if (differents.length > 0) {
      // Differenze trovate, verifica dei campi critici: slug e creationDate
      const message = `I valori di ${differents.toString()} sono differenti. `;
      result.message = message;
      result.differences = differents;
  
      if (obj_md.slug !== obj_db.slug) {
        result.check = false;
        result.message = message + `Non è possibile continuare, lo slug: ${obj_md.slug} deve essere lo stesso`;
        return result;
      }
  
      if (new Date(obj_md.creationDate).getTime() !== new Date(obj_db.creationDate).getTime()) {
        result.check = false;
        result.message = message + `Non è possibile continuare, la data di creazione: ${obj_md.creationDate.toDateString()} deve essere la stessa`;
        return result;
      }
  
      // Se lo slug e la creationDate sono corretti, possiamo procedere con l'update
      result.check = true;
      return result;
    } else {
      // I valori sono identici, non è necessario procedere con l'update
      result.check = false;
      result.message = 'I valori sono identici, aggiornamento non necessario';
    }
  
    return result;
  }
  const w = ['']
  console.log(compareMetadata3(article_md, article_md2), w.length);
  
  
