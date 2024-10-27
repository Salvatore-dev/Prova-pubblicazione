"use client"
// components/MarkdownFileReader.tsx
import { useState } from 'react';
import matter from 'gray-matter';
import { Table, Button } from 'react-bootstrap';
import { AddMetadata_article } from '@/app/(ReD)/lib/actions_ReD';
import { Article_head_data, Metadata_allArticle } from '@/app/(ReD)/lib/definitions';
import Image from 'next/image';

export default function FileUploader() {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [metadata_article, setMetadata_article] = useState<Article_head_data | null>(null);
  const [result_send, setResult_send] = useState<string>('Pronto!')

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
        setMetadata_article(head_data);
      };

      reader.readAsText(file);
    }
  };
  async function Send_metadata() {
    if (metadata_article) {
      const response = await AddMetadata_article(metadata_article);
      setResult_send(response)
    }
    
  }

  return (
    <div className=' w-[95%] m-auto bg-slate-300 min-h-screen'>
      <h1>Carica un file Markdown</h1>
      <input className='bg-yellow-200' type="file" accept=".md" onChange={handleFileChange} />

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
            { metadata_article && (
              <tr>
                <td>{metadata_article.slug}</td>
                <td>{metadata_article.author}</td>
                <td>{metadata_article.title}</td>
                <td>{metadata_article.subTitle}</td>
                <td>{metadata_article.creationDate.toDateString()}</td>
                <td>{metadata_article.section}</td>
                <td>{metadata_article.tags.join(', ')}</td>
                <td>{metadata_article.modifiedDate.toDateString()}</td>
                <td><Image width={100} height={64} className=' h-16' src={'/'+metadata_article.image[0]} alt={metadata_article.image[1]} /></td>
                <td><Button variant='outline-warning' size='sm' onClick={()=>Send_metadata()} disabled={!metadata_article && true}>Inoltra articolo</Button></td>
                <td>{result_send}</td>
              </tr>
            )}
          </tbody>
        </Table>
    </div>
  );
}

