import React from "react"
import Link from "next/link"
import { Last_articles } from "../../lib/definitions"

import { convertDateToItalianString } from "../../lib/data_red"


export function Article_module({ article }: { article: Last_articles }) {

    const { image, title, subtitle, modified_date, section, slug } = article
    const alt = JSON.parse(image)[1] as string
    const source = JSON.parse(image)[0] as string
    const lastDate = convertDateToItalianString(modified_date)

    return (
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            <div
                className="w-full md:w-1/3 h-48 md:h-auto bg-cover bg-center"
                style={{ backgroundImage: `url(${source})` }}
                aria-label={alt}
            ></div>
            <div className="flex flex-col justify-between p-4 w-full md:w-2/3">
                <div>
                    <h6 className="text-sm md:text-base text-gray-500">{section}</h6>
                    <Link href={`/blog/testing_article/${slug}`}>
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    </Link>
                    
                    <p className="italic text-gray-600">{subtitle}. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente rem, similique ullam, ducimus ad omnis inventore aut neque atque deserunt debitis eos magnam? Magnam eaque labore dolor blanditiis! Provident, voluptatibus.</p>
                </div>
                <div className="mt-4">
                    <time dateTime={modified_date.toISOString()} className="text-xs md:text-base text-gray-400">
                        Ultima modifica: {lastDate}
                    </time>
                </div>
            </div>
        </div>

    )

}