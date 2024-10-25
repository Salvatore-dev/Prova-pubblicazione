"use client"
// components/MarkdownFileReader.tsx
import { useState, useEffect } from 'react';
import matter from 'gray-matter';
import { Table, Button } from 'react-bootstrap';
import { Article_head_data, Compare_metadata } from '@/app/(ReD)/lib/definitions';
import { getArticle, getArticle2, upDate_article } from '@/app/(ReD)/lib/actions_ReD';

//implementazione modifica articolo
// 1. confronto tra metadati statici e quelli dinamici
//1.2 creare una funzione che dato lo slug univoco mi restituisca i metadati in Db in formato Article_head_data
//1.3 confronto tra i due set di dati. In particolare devono essere coerenti lo slug, la data creazione, il resto in teoria puo essere aggiornato.
//1.3.1 i tags devono essere restituiti in formato stringa. quindi la funzione deve richiamare i tags associati all'articolo.
//1.4 i dati sono in confronto nella stessa tabella con opportuna visibilita tra differenze. implementare eventuali restrizioni su slug e data creazione. 
// 2. IMPLEMENTARE funzione up date
//    2.1 gestione dei casi, solo tags o anche altri metadata articolo
//    2.2 i tags devono essere in lowercase controlla coerenza con le chiamate.
//    2.3 gli arrai di tags se pur uguali devono essere ordinati prima di confrontarli come stringhe

const Modifing_article = () => {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [metadata_article, setMetadata_article] = useState<Article_head_data | null>(null);
  const [result_send, setResult_send] = useState<string>('Pronto!')
  const [metadata_article_DB, setMetadata_article_DB] = useState<Article_head_data | null>(null);
  const [message_update, setMessage_update] = useState<Compare_metadata>({
    check: false,
    message: 'Pronto!',
    differences: [] as string[], // Array per tenere traccia delle differenze
  })
  const [id_article, setId_article] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileText = event.target?.result as string;

        // Usa gray-matter per parsare il contenuto e il front matter
        const { content, data } = matter(fileText);
        setFileContent(content);

        const head_data = data as Article_head_data
        const r = head_data.tags.map(el=> el.toLowerCase()).sort()
            head_data.tags = r
        head_data.image = data.image.slice(0, 2)
        setMetadata_article(head_data);
        setResult_send('Pronto!')
      };

      reader.readAsText(file);
    }
  };

  async function updateMetadata() {
    if (metadata_article_DB && metadata_article) {
      // const newTags: string[] = metadata_article.tags.filter(tag =>
      //   !metadata_article_DB.tags.includes(tag)
      // );
      // const send_metadata = metadata_article
      // send_metadata.tags = newTags // invio per l'update solo i nuovi tags gli altri gia ci sono
      if (id_article){
        const response = await upDate_article(id_article, metadata_article, message_update.differences)
        setResult_send(response)
      }
        
      
    }
  }
  useEffect(() => {
    if (metadata_article) {
      const slug = metadata_article.slug
      getArticle2(slug)
        .then((response) => {
          console.log(response);
          if (typeof response === "string") {
            console.log(response);
            setResult_send(response)
          } else {
            const { metadata, id_article } = response
            setId_article(id_article)
            const r = metadata.tags.map(el=> el.toLowerCase()).sort()
            metadata.tags = r
            setMetadata_article_DB(metadata)
            setMessage_update(compareMetadata(metadata_article, metadata))
          }
        })
    }
  }, [metadata_article])

  return (
    <div className=' w-[95%] m-auto bg-slate-300 min-h-screen'>
      <h1>Carica un file Markdown e confronta</h1>
      <input className='bg-yellow-200' type="file" onChange={handleFileChange} accept=".md" />

      {fileContent && (
        <div>
          <h2>Contenuto del&apos;Articolo:</h2>
          <pre className=' font-mono'>{fileContent}</pre>

          <h2>Metadati Articolo:</h2>
          <pre className=' font-mono'>{JSON.stringify(metadata_article, null, 2)}</pre>
        </div>
      )}
      <Table striped='colums' responsive='md' bordered size='sm' variant='dark'>
        <thead>
          <tr>
            <th>Metadati</th>
            <th>slug</th>
            <th>autore</th>
            <th>titolo</th>
            <th>sottotitolo</th>
            <th>data creazione</th>
            <th>sezione di appartenenza</th>
            <th>parole chiave</th>
            <th>ultima modifica</th>
            <th>immagine</th>
            <th>Azione</th>
            <th>Risultato azione</th>
          </tr>
        </thead>
        <tbody>
          {metadata_article && (
            <tr>
              <td>File MD</td>
              <td>{metadata_article.slug}</td>
              <td>{metadata_article.author}</td>
              <td>{metadata_article.title}</td>
              <td>{metadata_article.subTitle}</td>
              <td>{metadata_article.creationDate.toDateString()}</td>
              <td>{metadata_article.section}</td>
              <td>{metadata_article.tags.join(', ')}</td>
              <td>{metadata_article.modifiedDate.toDateString()}</td>
              <td><img className=' h-16' src={metadata_article.image[0]} alt={metadata_article.image[1]} /></td>
              <td><Button variant='outline-warning' size='sm' disabled={true}>Inoltra articolo</Button></td>
              <td>{result_send}</td>
            </tr>
          )}
          {metadata_article_DB && (
            <tr>
              <td>DB</td>
              <td>{metadata_article_DB.slug}</td>
              <td>{metadata_article_DB.author}</td>
              <td>{metadata_article_DB.title}</td>
              <td>{metadata_article_DB.subTitle}</td>
              <td>{metadata_article_DB.creationDate.toDateString()}</td>
              <td>{metadata_article_DB.section}</td>
              <td>{metadata_article_DB.tags.join(', ')}</td>
              <td>{metadata_article_DB.modifiedDate.toDateString()}</td>
              <td><img className=' h-16' src={metadata_article_DB.image[0]} alt={metadata_article_DB.image[1]} /></td>
              <td><Button onClick={()=> updateMetadata()} variant={message_update.check ? 'outline-success' : 'outline-danger'} size='sm' disabled={!metadata_article_DB || !message_update.check}>{message_update.check ? 'Pronto per Update' : 'Impossibile continuare'}</Button></td>
              <td>{message_update.message}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}


function compareMetadata(obj_md: Article_head_data, obj_db: Article_head_data): Compare_metadata {
  const keys_md = Object.keys(obj_md);
  const keys_db = Object.keys(obj_db);


  const result = {
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
  const values_md = Object.values(obj_md).map(el => {
    if (typeof el === 'string') return el
    if (Array.isArray(el)) return el.toString().trim()
    if (el instanceof Date) return el.toISOString().trim()
  }) as string[];
  const values_db = Object.values(obj_db).map(el => {
    if (typeof el === 'string') return el
    if (Array.isArray(el)) return el.toString().trim()
    if (el instanceof Date) return el.toISOString().trim()
  }) as string[];
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


export default Modifing_article