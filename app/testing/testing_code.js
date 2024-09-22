

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

function getArray() {
    return['ciao', '33232', 'kmaskskama', ''].map(el=>{
        if (el!='') {
            return el
        }
    })
}

console.log(getArray());
