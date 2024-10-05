import React from 'react';
import Article_FT from './ui_red/articleFT';
import Article_head from './ui_red/article_head';
import Article_body from './ui_red/article_body';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type Article_head_data = {
  slug: string,
  author : string,
  title: string,
  subTitle: string,
  creationDate: Date,
  section: string,
  tags : string[],
  modifiedDate: Date,
  image: string[]
}

// Questo è un componente server-side per Next.js 13 App Router
export default async function Page() {
  // Costruisci il percorso assoluto del file markdown
  const filePath = path.join(process.cwd(), 'app', 'testing', 'article', 'aticle_1.md');
  
  // Leggi il file markdown
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Usa gray-matter per estrarre il frontmatter e il contenuto
  const { content, data } = matter(fileContents);

  const data_head = data as Article_head_data
  const {slug, author, title, subTitle, section, creationDate, modifiedDate, tags, image } = data_head

  // Divide il contenuto in paragrafi basati su diversi tipi di fine riga (Windows, Unix, ecc.)
  const contentArray = content.split(/\r\n|\r|\n/).filter(line => line.trim() !== '');
  //console.log(contentArray);
  console.log(data);
  

  return (
    <>
      <Article_FT>
        <Article_head title={title} section={section} subTitle={subTitle} modifiedDate={modifiedDate} image_head={image} />
        <Article_body content={contentArray} />
      </Article_FT>
    </>
  );
}

