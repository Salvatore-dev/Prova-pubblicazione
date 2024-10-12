import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>La risorsa richiesta potrebbe essere inesistente</p>
      <Link href="/">Ritorna alla Home</Link>
    </div>
  )
}