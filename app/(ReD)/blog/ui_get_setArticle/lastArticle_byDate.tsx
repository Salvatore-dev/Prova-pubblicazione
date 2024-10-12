"use client"
import React from 'react'
import { LastArticles } from '../../lib/actions_ReD'
import Link from 'next/link';
import { Card as Card_F } from 'flowbite-react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

type Last_articles = {
    slug: string;
    title: string;
    subtitle: string;
    section: string;
    image: string;
}

import { useEffect, useState } from 'react'

function LastArticle_byDate() {

    const [articles, setArticles] = useState<Last_articles[] | null>(null)
    const getData = async () => {
        const response = await LastArticles()
        return response
    }
    useEffect(() => {
        LastArticles().then((data) => {
            setArticles(data)
        })
    }, [])
    console.log(articles && articles[0].image, articles && typeof JSON.parse(articles[0].image)[0]);

    return (
        <div className=' w-[90%] m-auto'>
            <Row xs={2} md={4} className="g-4">
                {articles && articles.map((a, i) => (

                    <Col key={i}>
                        <Card style={{}} bg='' border='dark'>
                            <Card.Img variant="top" src={JSON.parse(a.image)[0]} alt={JSON.parse(a.image)[1]} />
                            <Card.Header>{a.section}</Card.Header>
                            <Card.Body>
                                <Card.Link className='underline md:no-underline hover:underline text-blue-500' href='/'>
                                    <Card.Title>{a.title}</Card.Title>
                                </Card.Link>
                                <Card.Text className=' text-justify'>
                                    {a.subtitle}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>{`utima modifica 99 mese ANNO`}</Card.Footer>
                        </Card>
                    </Col>

                    // <Self_Card key={i} article={a} />
                ))}
            </Row>

        </div>
    )
}

function Self_Card({ article }: { article: Last_articles }) {
    const { image } = article
    const alt = JSON.parse(image)[1]
    const source = JSON.parse(image)[0]
    return (
        <figure className='m-0 p-0 flex justify-center'>
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={source} alt={alt} />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <Link href={`/`} className='underline md:no-underline hover:underline text-blue-500'>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{article.title}</h5>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700">{article.subtitle}</p>
                </div>

            </div>
        </figure>
    )
}

export default LastArticle_byDate