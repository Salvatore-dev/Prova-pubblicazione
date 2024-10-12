'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className=" w-[80%] m-auto my-8 bg-slate-400">
           <h2>Something went wrong!</h2>
        <button className=" bg-orange-400" onClick={() => reset()}>Try again</button> 
        </div>
        
      </body>
    </html>
  )
}