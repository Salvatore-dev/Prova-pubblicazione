"use client"
import React from 'react'
import { LastArticles } from '../../lib/actions_ReD'
import { Suspense } from 'react';
import { Article_module_type } from '../../lib/definitions';
import { Article_module } from './article_module';
import Articles_module_holder from '../placeholders/articles_module_holder';
import Pagination_Set_articles from './pagination_set_articles';
import { useEffect, useState } from 'react'

function LastArticle_byDate({count_page}: {count_page: number}) {

    const [articles, setArticles] = useState<Article_module_type[] | null>(null)
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        setArticles(null)
        LastArticles(page).then((data) => {
            if (data) {
               setArticles(data.last_articles)
               setPage(data.page) 
            }
            
        })
    }, [page])
    console.log(articles && articles[0].image, articles && typeof JSON.parse(articles[0].image)[0]);

    return (
        <div className=' w-[95%] md:w-[85%] xl:w-[75%] m-auto flex flex-col gap-2 md:gap-16'>
            {!articles ? (
                // Mostra placeholder mentre i dati vengono caricati
                Array.from({ length: 12 }).map((_, index) => (
                    <div key={index}>
                        <Articles_module_holder />
                        <hr />
                    </div>
                ))
            ) : (
                // Mostra i dati reali una volta caricati
                articles.map((article, id) => (
                    <Suspense fallback={<Articles_module_holder />} key={id}>
                        <Article_module article={article} />
                        <hr />
                    </Suspense>
                ))
            )}
            {count_page>1 && <Pagination_Set_articles page={page} setPage={setPage} pages={count_page} />}
        </div>
    )
}

export default LastArticle_byDate