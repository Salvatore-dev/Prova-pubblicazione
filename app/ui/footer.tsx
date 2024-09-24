import React from 'react'
import profile from '@/public/Salvatore-Tosich-logo.png'
import Image from 'next/image'



type LinksColumsContent = {
    title?: string,
    links: Array<{ name: string, url: string }>,
}

const ResourcesDevelop: LinksColumsContent = {
    title: "Risorse",
    links: [
        { name: 'Next', url: 'https://nextjs.org' },
        { name: 'React', url: 'https://reactjs.dev' },
        { name: 'Vercel', url: 'https://vercel.com/salos-projects' },
        { name: 'Auth.js', url: 'https://authjs.dev/' }
    ]
}

const followMe: LinksColumsContent = {
    title: "Seguimi su",
    links: [
        { name: "GitHub", url: "https://github.com/Salvatore-dev" },
        { name: 'Linkedin', url: 'https://www.linkedin.com/in/salvatore-tosich/' }
    ]
}
const documentation: LinksColumsContent = {
    title: "Documentazione",
    links: [
        { name: 'MDN', url: 'https://developer.mozilla.org/en-US/' },
        { name: 'W3 School', url: 'https://www.w3schools.com/' },
        { name: "Tailwind", url: 'https://tailwindcss.com/' },
        { name: 'Typescript', url: 'https://www.typescriptlang.org/' },
        {name: 'PostGreSQL Documentazione' , url:'https://www.postgresql.org/docs/current/'}
    ]
}
const SeveralLinks: LinksColumsContent = {
    title: 'Altri links',
    links: [
        { name: 'MongoDb', url: 'https://www.mongodb.com/it-it/cloud/atlas/register' },
        {name: 'ElephantSQL' , url:'https://customer.elephantsql.com/instance'},
        {name: 'Bootstrap per React',  url: 'https://react-bootstrap.github.io/docs/getting-started/introduction'},
        {name: 'Krea (genaratore immagini)', url: 'https://www.krea.ai/home'},
        {name: 'Imagine Art (generatore immagini)', url: 'https://www.imagine.art'},
        {name:'Markdown', url : 'https://www.markdownguide.org/'}
    ]
}

function Footer() {
    return (
        <footer className='pt-3 flex flex-col gap-2 w-full bg-amber-100 text-white'>
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-44 w-full">
                <div className='flex justify-center w-fit'>
                    <LogoInFooter />
                </div>
                <div className="flex flex-wrap md:w-[70%] md:justify-between gap-4 px-4">
                <LinksColums content={ResourcesDevelop} />
                <LinksColums content={documentation} />
                <LinksColums content={followMe} />
                <LinksColums content={SeveralLinks} />   
                </div>
                
            </div>
            <hr className=" pt-2" />
            <p className="text-sm text-gray-500 text-center py-2">2023 Salvo&apos;s. All Rights Reserved.
            </p>
        </footer>
    )
}

function LogoInFooter() {

    return <div className="mb-6 md:mb-0">
        <a href="https://salvatore-tosich-dev.vercel.app/" target='_blank' className="flex items-center no-underline">
            <Image
                src={profile}
                alt="Profile Logo"
                width={50} // Imposta la larghezza desiderata dell'immagine
                height={50} // Imposta l'altezza desiderata dell'immagine
                className="w-12 h-12 sm:w-14 sm:h-14 me-3 border rounded-full" // Classi CSS aggiuntive
            />
            <span className="self-center text-2xl text-gray-800 font-semibold whitespace-nowrap">SVT Web Developer</span>
        </a>
    </div>
}

function LinksColums({ content }: { content: LinksColumsContent }) {
    const { title, links } = content;

    return (
        <div className='flex flex-col item-start'>
            <h2 className="text-sm font-semibold text-gray-900 uppercase mb-2">{title}</h2>
            <ul className="text-gray-500 font-medium ml-1 p-0">
                {links.map((link, i) => (
                    <li key={'link' + title + '_' + i} className=" my-1">
                        <a href={link.url} target='_blank' className=" text-gray-700 no-underline hover:underline">{link.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Footer