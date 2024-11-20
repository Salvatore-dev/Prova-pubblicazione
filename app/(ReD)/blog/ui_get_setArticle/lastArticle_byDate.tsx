"use client"
import React from 'react'
import { LastArticles } from '../../lib/actions_ReD'

import { Article_module_type } from '../../lib/definitions';
import { Article_module } from './article_module';

import { useEffect, useState } from 'react'

function LastArticle_byDate() {

    const [articles, setArticles] = useState<Article_module_type[] | null>(null)

    useEffect(() => {
        LastArticles().then((data) => {
            setArticles(data)
        })
    }, [])
    console.log(articles && articles[0].image, articles && typeof JSON.parse(articles[0].image)[0]);

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

export default LastArticle_byDate