import * as React from 'react'

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import Article_FT from '@/app/(ReD)/blog/testing_article/ui_red_articles/articleFT';
import Article_head from '@/app/(ReD)/blog/testing_article/ui_red_articles/article_head'
import Article_body from '@/app/(ReD)/blog/testing_article/ui_red_articles/article_body'
import Article_tags from '@/app/(ReD)/blog/testing_article/ui_red_articles/article_tags';
import { Article_head_data } from '@/app/(ReD)/lib/definitions';


function Page({params}: {params: {slug: string}}) {

    const filePath = path.join(process.cwd(), 'app', '(ReD)', 'blog', 'testing_article', 'articles', `${params.slug}`);
    
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
    //  const imagePath = path.join(process.cwd(), 'public', 'image') + '/'
    //  console.log(imagePath);
     const sup_positionImages= '../../'
     
     const path_image = image[0]
     image[0] = sup_positionImages + path_image // serve per adeguare la path relative delle immagini nelle pagine dinamiche. valutare se non usare un modo doverso con un generatore di path.
  return (
    <>
    
    <hr />
    <Article_FT>
      <Article_head author={author} title={title} section={section} subTitle={subTitle} creationDate={creationDate} modifiedDate={modifiedDate} image_head={image} />
      <Article_body content={contentArray} path={sup_positionImages} />
      <Article_tags tags={tags} />
    </Article_FT>
  </>
  )
}

export default Page