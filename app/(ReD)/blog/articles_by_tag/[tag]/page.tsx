import React from 'react'
import { Article_module_type } from '@/app/(ReD)/lib/definitions'
import { Article_module } from '../../ui_get_setArticle/article_module';
import { get_articles_by_tag } from '@/app/(ReD)/lib/actions_ReD';
async function Page({params}: {params: {tag: string}}) {
    console.log('vedi ids', params.tag);
    const articles = await get_articles_by_tag(params.tag)
    console.log(articles);
  
    if (typeof articles === 'string') {
      return(
        <div>Nessun elemento trovato</div>
      )
    } else {
      return (
        <div className=' w-[95%] md:w-[85%] xl:w-[75%] m-auto flex flex-col gap-2 md:gap-16'>
            {articles && articles.map((article, id) => (
                <>
                <Article_module key={id} article={article} />
                <hr />
                </>
            ))}
        </div>
      )
    }
    
  
}

export default Page