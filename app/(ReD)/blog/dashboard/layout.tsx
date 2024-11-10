import { get_all_articles } from '../../lib/actions_ReD'
import { Metadata_allArticles } from '../../lib/definitions'
import Table_all_articles from './ui_layout/table_all_articles'
import Navbar_dashboard from './ui_layout/navbar_dashboard'

export default async function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    const articles = await get_all_articles() as Metadata_allArticles[] | string
    return (
      <section className=''>
          <h1 className='text-center'>Pannello di controllo amministratore</h1>
        {/* Include shared UI here e.g. a header or sidebar */}
        <Navbar_dashboard data={articles} />
        {children}
      </section>
    )
  }