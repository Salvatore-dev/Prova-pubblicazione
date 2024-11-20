"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Modal, Table, Form, Button, ModalBody } from 'react-bootstrap'
import { convertDateToItalianString, sort_Metadata_allArticles } from '@/app/(ReD)/lib/data_red'
import { All_tags, Metadata_allArticles } from '@/app/(ReD)/lib/definitions'
import { delete_tags, update_tag, get_articles_by_ids } from '@/app/(ReD)/lib/actions_ReD'


const Tags_panel = ({ data }: { data: All_tags[] }) => {
    const [tags, setTags] = useState(data)
    const [show_update, setShow_update] = useState(false);
    const handleClose_update = () => setShow_update(false);
    const handleShow_update = () => setShow_update(true);
    const [tag_to_update, setTag_to_update] = useState<number | undefined>(undefined)
    const [message_update, setMessage_update] = useState('')
    const [ascending_tags, setAscending_tags]= useState(false)
    const [key_tags, setKey_tags] = useState<string[]| null>(null)

    const [show_articles_for_tags, setShow_articles_for_tags] = useState(false)
    const handleClose_articles_for_tags = () => setShow_articles_for_tags(false);
    const handleShow_articles_for_tags = () => setShow_articles_for_tags(true);
    //const [message_get_articles, setMessage_get_articles] = useState('')
    const [articles, setArticles] = useState<Metadata_allArticles[] | null>(null)
    const [tag_show, setTag_show] = useState('')
    const [ascending_articles, setAscending_articles]= useState(false)
    const [key_article, setKey_article] = useState<string[]| null>(null)

    useEffect(()=>{
        if(data) {
            const k = Object.keys(data[0])
            setKey_tags(k)
        }
    },[data])

    useEffect(() => {
        if (!show_update) {
            setTag_to_update(undefined)
            setMessage_update('')
        }
    }, [show_update])

    useEffect(() => {
        if (!show_articles_for_tags) {
            setArticles(null)
            setTag_show('')
            setAscending_articles(false)
        }
    }, [show_articles_for_tags])

    async function action_tags(id_tags: number, lentg_tags: number) {
        if (lentg_tags === 0) {
            const result = await delete_tags(id_tags) as string | {
                id: number,
                tag_name: string
            }[]
            if (typeof result === 'string') {
                alert(result)
                return
            } else {
                console.log(result);
                setTags(tags.filter(el => el.tag_id !== result[0].id))
            }
        } else if (lentg_tags >= 0) {
            handleShow_update()
            setTag_to_update(id_tags)
        }
    }

    const send_update = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const keyword_entry = formData.get('update_keyword') as string
        console.log(keyword_entry);
        const tag = tags.filter(el => el.tag_id === tag_to_update)
        if (tag.length === 1) {
            const result = await update_tag(tag[0].tag_id, keyword_entry)
            if (typeof result === 'string') {
                setMessage_update(result)
            } else {
                console.log(result);
                const new_tags = tags.map(tag => {
                    if (tag.tag_id === result.id) return {
                        ...tag,
                        tag_name: result.tag_name
                    }
                    return tag
                })
                setTags(new_tags)
                handleClose_update()
            }
        }
    }

    async function get_articles_for_tags(ids: number[], tag: string) {
        console.log(ids);
        const result = await get_articles_by_ids(ids) as Metadata_allArticles[] | string
        if (typeof result === 'string') {
            // setMessage_get_articles(result)
            alert(result)
        } else {
            setArticles(result)
            const k = Object.keys(result[0])
            setKey_article(k)
            setTag_show(tag)
            handleShow_articles_for_tags()
        }
    }
    function handle_sort_articles(key: string){
        const k = key as keyof Metadata_allArticles
        if (articles) {
          setAscending_articles(prev=> !prev)
          const sorted = sort_Metadata_allArticles(articles, k, ascending_articles)
          setArticles(sorted)
        }
      }

      function handle_sort_tags(key: string){
        const k = key as keyof All_tags
        if (tags) {
          setAscending_tags(prev=> !prev)
          const sorted = sort_AllTags(tags, k, ascending_tags)
          setTags(sorted)
        }
      }
    return (
        <div className='w-[95%] m-auto mt-4'>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        {key_tags && key_tags.map(key=>(
                            <th key={`Key Tags: ${key}`}><button onClick={()=> handle_sort_tags(key)} className={`cursor-pointer no-underline m-0 p-0`}>{key}</button></th>
                        ))}
                        <th>Azione</th>
                    </tr>
                </thead>
                <tbody>
                    {tags && tags.map((tag, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{tag.tag_id}</td>
                            <td>{tag.tag_name}</td>
                            <td >
                                <button title='Vedi articoli' className=' hover:underline hover:cursor-pointer' onClick={() => get_articles_for_tags(tag.article_ids, tag.tag_name)}>
                                    {`N.` + tag.article_ids.length}
                                </button>
                            </td>
                            <td>
                                <button onClick={() => action_tags(tag.tag_id, tag.article_ids.length)}>{tag.article_ids.length === 0 ? 'Elimina' : 'Modifica'}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={show_update} onHide={handleClose_update}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica Keyword</Modal.Title>
                </Modal.Header>
                <Form onSubmit={send_update}>
                    <Modal.Body>
                        <Form.Group className={`mb-3`} controlId='update_keyword'>
                            <Form.Label>Cambia keyword</Form.Label>
                            <Form.Control type='text' placeholder='Digita modifica' name='update_keyword' autoFocus />
                        </Form.Group>
                        {message_update && <Modal.Dialog className='text-lg text-ReD-500 text-center'>{message_update}</Modal.Dialog>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='text-black bg-red-600' variant="secondary" onClick={handleClose_update}>
                            Chiudi
                        </Button>
                        <Button type="submit" variant="success" className='text-black bg-green-600'>
                            Salva
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal size='xl' keyboard scrollable show={show_articles_for_tags} onHide={handleClose_articles_for_tags}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {`Articoli associati a ${tag_show}`}
                    </Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                {key_article && key_article.map(key=>(
                                    <th key={`Key_article: ${key}`}><button onClick={()=>handle_sort_articles(key)} className={`cursor-pointer no-underline m-0 p-0`}>{key}</button></th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {articles && articles.map((art, i) => (
                                <tr key={`articles by tag_${i}`}>
                                    <td>{i+1}</td>
                                    <td>{art.id}</td>
                                    <td><Link href={`./new_article/${art.slug}.md`} title='Vedi articolo' className='m-0 p-0 font-bold no-underline hover:underline text-green-700'>{art.slug}</Link></td>
                                    <td>{art.author}</td>
                                    <td>{art.title}</td>
                                    <td>{art.subtitle}</td>
                                    <td>{art.section}</td>
                                    <td>{convertDateToItalianString(art.modified_date)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Modal.Footer>
                        <Button className='text-black bg-red-600' variant="secondary" onClick={handleClose_articles_for_tags}>
                            Chiudi
                        </Button>
                    </Modal.Footer>
                </ModalBody>
            </Modal>
        </div>
    )
}

function sort_AllTags(array: All_tags[], property: keyof All_tags, ascending = true) {
    return array.slice().sort((a,b)=>{
      if (a[property] < b[property]) {
        return ascending ? -1 : 1
      } else if (a[property]> b[property]){
        return ascending ? 1 : -1
      } else {
        return 0
      }
    })
  }

export default Tags_panel