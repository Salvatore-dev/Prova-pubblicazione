import { get_all_articles } from '../../lib/actions_ReD'
import { Metadata_allArticles } from '../../lib/definitions'
import Navbar_dashboard from './ui_layout/navbar_dashboard'

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const articles = (await get_all_articles()) as Metadata_allArticles[] | string;
  return (
    <section className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <h1 className="text-center text-2xl font-bold">
          Pannello di controllo amministratore
        </h1>
      </header>

      {/* Navbar */}
      <Navbar_dashboard data={articles} />

      {/* Main Content */}
      <main className="p-6">{children}</main>
    </section>
  );
}
