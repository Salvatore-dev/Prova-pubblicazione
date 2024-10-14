import * as React from 'react'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import Article_FT from './ui_red_articles/articleFT'
import Article_head from './ui_red_articles/article_head'
import Article_body from './ui_red_articles/article_body'
import Article_tags from './ui_red_articles/article_tags';
import { Article_head_data } from '../../lib/definitions';

  // Questo è un componente server-side per Next.js 13 App Router
export default async function Page() {
    // Costruisci il percorso assoluto del file markdown
    const filePath = path.join(process.cwd(), 'app', '(ReD)', 'blog', 'testing_article', 'articles', 'testing.md');
    
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
          <Article_head author={author} title={title} section={section} subTitle={subTitle} creationDate={creationDate} modifiedDate={modifiedDate} image_head={image} />
          <Article_body content={contentArray} />
          <Article_tags tags={tags}/>
        </Article_FT>
      </>
    );
  }