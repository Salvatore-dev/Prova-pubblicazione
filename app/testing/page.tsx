import React from 'react'
import Article_FT from './ui_red/articleFT'
import Article_head from './ui_red/article_head'
import Elaborate_paragraph from './ui_red/elaborate_paragraph'
import fs from 'fs'
const matter = require('gray-matter');
import image_head from '@/public/image/napoli_citta.jpeg'
import Article_body from './ui_red/article_body'
function Page() {
  const fileContents = fs.readFileSync('./app/testing/article/aticle_1.md', 'utf8');

  // Usa gray-matter per estrarre il frontmatter e il contenuto
  const { content, data } = matter(fileContents);

  //console.log(data);
  //console.log(content, typeof content);
  
  const contentArray = content.split(/\r\n/) as string[]
  //console.log(contentArray);
  
  return (
    <div>
      <h1>Testing...</h1>
      <Article_FT>
        <Article_head image_head={image_head} />
        <Article_body content={contentArray} />
      </Article_FT>
      
      
    </div>
  )
}
// function prepare_content(str: string) {
//   const contentArray = str.split(/\r\n/).map(string=> string!='')

// }

export default Page