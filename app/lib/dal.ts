import 'server-only'
import {cache} from 'react';
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import sql_Elephant from './test/connectpostgre';
import { decrypt } from '@/app/lib/session'

 
export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    redirect('/login')
  }
 
  return { isAuth: true, userId: session.userId, userRole: session.userRole }
})

export const getUser = cache(async ()=>{
  const session = await verifySession()
      if (!session) return null
      const user_id = session.userId as number
      try {
        const data = await sql_Elephant`
        SELECT name
        FROM users
        WHERE id = ${user_id}
        `
        const user = data[0] 
        console.log(user);
        if (!user) return null
        return user
      } catch (error) {
        console.log(error);
        return null
      }
})

export const getAdmin = cache(async ()=>{
  const session = await verifySession()
  if (!session) return null
      const user_id = session.userId as number
      try {
        const data = await sql_Elephant`
        SELECT name, role
        FROM users
        WHERE id = ${user_id}
        `
        const user = data[0] as {
          name: string,
          role: string
        } | null
        console.log(user);
        if (!user || user.role !== 'admin' ) return null
        return user
      } catch (error) {
        console.log(error);
        return null
      }

})

// di seguito un esempio da adattare. una funzione da chiamare in un eventuale file dto o in un lay auto che bisognao di dati utente 

// export const getUser = cache(async () => { 
//     const session = await verifySession()
//     if (!session) return null
   
//     try {
//       const data = await db.query.users.findMany({
//         where: eq(users.id, session.userId),
//         // Explicitly return the columns you need rather than the whole user object
//         columns: {
//           id: true,
//           name: true,
//           email: true,
//         },
//       })
   
//       const user = data[0]
   
//       return user
//     } catch (error) {
//       console.log('Failed to fetch user')
//       return null
//     }
//   })