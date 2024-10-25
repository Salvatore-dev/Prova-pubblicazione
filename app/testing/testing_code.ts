type Article_head_data = {
    slug: string,
    author: string,
    title: string,
    subTitle: string,
    creationDate: Date,
    section: string,
    tags: string[],
    modifiedDate: Date,
    image: string[]
}
const d =2
const r = 5

console.log(d+r);

type Compare_metadata = {
    check: boolean,
    message: string,
    differences: string[]
}

const article_md: Article_head_data = {
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

  const article_md2: Article_head_data = {
    slug: 'articolo-esempio2',
    author: 'Mario Rossi',
    title: 'Il mio primo articolo',
    subTitle: 'Un articolo di prova',
    creationDate: new Date('2023-01-01T10:00:00Z'), // Formato ISO
    section: 'Tecnologia',
    tags: ['tecnologia', 'programmazione'],
    modifiedDate: new Date('2024-10-01T12:00:00Z'), // Formato ISO
    image: ['image1.png', 'image2.png'],
  };

  function compareMetadata2(obj_md : Article_head_data, obj_db: Article_head_data) {

    const keys_md = Object.keys(obj_md)
    const keys_bd = Object.keys(obj_db)
    const values_md = Object.values(obj_md)
    const values_db = Object.values(obj_db)

    const result = {
        check : false,
        message : ''
    }
    if  (keys_md.length !== keys_bd.length) {
        result.message = 'i metadati non sono dello stesso numero'
        result.check = false
        return result
    } 
    for (let index = 0; index < keys_bd.length; index++) {
        const element_db = keys_bd[index];
        const element_md = keys_md[index]
        if (element_db !== element_md){
            result.message = `il campo ${element_db} non è presente in ${element_md}`
            result.check = false
            return result
        }
        
    }

    const differents = []
    for (let i = 0; i < keys_bd.length; i++) {
        if (values_md[i] !== values_db[i]) {
            differents.push(keys_bd[i])
        }

    }
    if (differents.length>0) {
        const message = `I valori: ${differents.toString()}; sono differenti. `
        result.message = message
        if (obj_db.slug !== obj_md.slug) {
            result.check = false
            result.message = message + `Non e/' possibile continuare, lo slug: ${obj_md.slug} deve essere lo stesso`
            return result
        }
        if (obj_db.creationDate !== obj_md.creationDate) {
            result.check = false
            result.message = message + `Non e/' possibile continuare, la data: ${obj_md.creationDate.toDateString()} deve essere lo stesso`
            return result
        }
        result.check = true
        return result
    } else {
        result.check = false
        result.message = 'i valori sono identici'
    }
}

function compareMetadata(obj_md: Article_head_data, obj_db: Article_head_data): Compare_metadata {
    const keys_md = Object.keys(obj_md) as (keyof Article_head_data)[];
    const keys_db = Object.keys(obj_db) as (keyof Article_head_data)[];
  
    const result: Compare_metadata = {
      check: false,
      message: '',
      differences: [] as string[], // Array per tenere traccia delle differenze
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
  
    // Controllo delle differenze nei valori
    const differents = [];
    for (let i = 0; i < keys_db.length; i++) {
      const key = keys_db[i];
  
      // Verifica che la chiave esista in entrambi gli oggetti
      if (!(key in obj_md) || !(key in obj_db)) {
        continue; // Salta la chiave se non esiste
      }
  
      // Confronto specifico per arrays (tags e image), rappresentati come stringhe
      if ((key === 'tags' || key === 'image') && typeof obj_md[key] === 'string' && typeof obj_db[key] === 'string') {
        const arrayMd = JSON.parse(obj_md[key] as string) as string[];
        const arrayDb = JSON.parse(obj_db[key] as string) as string[];
  
        if (arrayMd.length !== arrayDb.length || !arrayMd.every((val, idx) => val === arrayDb[idx])) {
          differents.push(key);
        }
      }
      // Confronto specifico per le date (creationDate e modifiedDate) usando toISOString
      else if (key === 'creationDate' || key === 'modifiedDate') {
        const valueMd = obj_md[key];
        const valueDb = obj_db[key];
    
        // Verifica se i valori sono stringhe e possono essere convertiti in date valide
        const dateMd = typeof valueMd === 'string' ? new Date(valueMd) : null;
        const dateDb = typeof valueDb === 'string' ? new Date(valueDb) : null;
    
        if (dateMd && !isNaN(dateMd.getTime()) && dateDb && !isNaN(dateDb.getTime())) {
            // Confronta le date utilizzando toISOString()
            if (dateMd.toISOString() !== dateDb.toISOString()) {
                differents.push(key);
            }
        } else {
            // Se i valori non sono stringhe valide per una data, li considera diversi
            differents.push(key);
        }
    }
    
      // Confronto generico per altri tipi di dati
      else if (obj_md[key] !== obj_db[key]) {
        differents.push(key);
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
  
      if (new Date(obj_md.creationDate).toISOString() !== new Date(obj_db.creationDate).toISOString()) {
        result.check = false;
        result.message = message + `Non è possibile continuare, la data di creazione: ${obj_md.creationDate} deve essere la stessa`;
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
  //console.log(compareMetadata2(article_md, article_md2));
  