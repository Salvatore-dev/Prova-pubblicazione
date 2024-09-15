import React from 'react'
// import NovaAetas from "./ui/nova_aetas/NovaAetas"
import NovaAetas from '../ui/nova_aetas/NovaAetas'
import { getUser } from '@/app/lib/dal'
async function Page() {
  const user = await getUser()
  return (
    <NovaAetas user={user?.name} />
  )
}

export default Page