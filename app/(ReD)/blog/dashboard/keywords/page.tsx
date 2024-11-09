import React from 'react'
import { get_tags } from '@/app/(ReD)/lib/actions_ReD'
import { All_tags } from '@/app/(ReD)/lib/definitions'

import Tags_panel from '../ui_layout/tags_panel'

async function Page() {

const tags = await get_tags() as All_tags[] | string
 if (typeof tags === 'string') {
  //alert(tags)
  return <div>
    <h1>Tags</h1>
    <p>{tags}</p>
  </div>
 } else {
  return tags && <Tags_panel data={tags} />
 }
}

export default Page