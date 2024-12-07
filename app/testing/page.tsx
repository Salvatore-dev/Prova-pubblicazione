import React from 'react';
import LastArticle_byDate from '../(ReD)/blog/ui_get_setArticle/lastArticle_byDate';
import Articles_module_holder from '../(ReD)/blog/placeholders/articles_module_holder';
import { count_latest_articles } from '../(ReD)/lib/actions_ReD';


export default async function Page() {
  const count = await count_latest_articles()
  return (
    <>
    <LastArticle_byDate count_page={count} />
    {/* <Articles_module_holder /> */}
    </>
  );
}

