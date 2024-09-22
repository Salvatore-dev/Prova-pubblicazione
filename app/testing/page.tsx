import React from 'react';
import Article_FT from './ui_red/articleFT';
import Article_head from './ui_red/article_head';
import Article_body from './ui_red/article_body';
import image_head from '@/public/image/napoli_citta.jpeg';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Questo è un componente server-side per Next.js 13 App Router
export default async function Page() {
  // Costruisci il percorso assoluto del file markdown
  const filePath = path.join(process.cwd(), 'app', 'testing', 'article', 'aticle_1.md');
  
  // Leggi il file markdown
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Usa gray-matter per estrarre il frontmatter e il contenuto
  const { content } = matter(fileContents);

  // Divide il contenuto in paragrafi basati su diversi tipi di fine riga (Windows, Unix, ecc.)
  const contentArray = content.split(/\r\n|\r|\n/).filter(line => line.trim() !== '');
  console.log(contentArray);
  

  return (
    <div>
      <h1>Testing...</h1>
      <Article_FT>
        <Article_head image_head={image_head} />
        <Article_body content={contentArray} />
      </Article_FT>
    </div>
  );
}

