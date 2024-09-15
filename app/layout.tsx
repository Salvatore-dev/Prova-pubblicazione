import type { Metadata } from 'next'
import Footer from './ui/footer';
import NewHeader from './ui/newHeader';
import { inter, lusitana, roboto } from '@/app/ui/fonts';
import logo from '@/app/icon.jpg'


import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
export const metadata: Metadata = {
  title: 'SVT Develop',
  description: 'Sito di esercitazioni e prove',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon.png"
          type="image/png"
          sizes="32x32"
        />
      </head>

    
      <body className={roboto.className + ''}>
        <header className=' sticky top-0 w-full z-[999] overflow-hidden'>
          <NewHeader />
        </header>


        <main className=''>{children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
