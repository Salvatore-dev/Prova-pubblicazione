"use server"
import sql_Elephant from "@/app/lib/test/connectpostgre"
import { sql } from "@vercel/postgres"

type Article_head_data = {
  slug: string,
  author: string,
  title: string,
  subTitle: string,
  creationDate: Date,
  section: string,
  tags: string[],
  modifiedDate: Date,
  image: string[]
}

export async function AddMetadata_article(data: Article_head_data): Promise<string> {
  const { slug, author, title, subTitle, creationDate, section, tags, modifiedDate, image } = data;

  try {

          // 1. Verifica se lo slug esiste già
          const existingArticle = await sql_Elephant`SELECT * FROM articles WHERE slug = ${slug}`;
          console.log(existingArticle);
          
          if (existingArticle.length >= 1) {
            console.log('Slug esistente:', slug); // Log quando lo slug esiste
            return `Slug già esistente: ${slug}. Cambialo prima di continuare.`;
          }

    // Inizio della transazione
    await sql_Elephant.begin(async (sqlTransaction) => {

      // 2. Inserimento dell'articolo
        // inserisco solo le prime due stringhe di array image, source e alt. il resto e' sul file
      const New_article = await sqlTransaction`
        INSERT INTO articles (slug, author, title, subtitle, creation_date, section, modified_date, image)
        VALUES (${slug}, ${author}, ${title}, ${subTitle}, ${creationDate}, ${section}, ${modifiedDate}, ${JSON.stringify(image.slice(0,2))})
        RETURNING id;
      `;
      const articleId = New_article[0].id;

      // 3. Gestione dei tag con `ON CONFLICT`
      for (const tag of tags) {
        const tagResult = await sqlTransaction`
          INSERT INTO tags (tag_name) 
          VALUES (${tag}) 
          ON CONFLICT (tag_name) DO UPDATE SET tag_name = EXCLUDED.tag_name
          RETURNING id;
        `;

        const tagId = tagResult[0].id;
        console.log(tagId);
        

        // 4. Associazione del tag all'articolo
        const last_table = await sqlTransaction`
          INSERT INTO article_tags (article_id, tag_id) 
          VALUES (${articleId}, ${tagId});
        `;
        console.log(last_table);
        
      }
    });

    return 'tutto ok';  // Articolo e tag inseriti correttamente

  } catch (error) {
    console.error('Error inserting article:', error);
    return `errore inserimento: ${JSON.stringify(error)}`;  // Messaggio di errore
  }
}

export async function LastArticles() {

  try {
    const last_articles : Last_articles[] = await sql_Elephant`
    SELECT slug, title, subtitle, section, image
    FROM articles
    ORDER BY modified_date DESC
    LIMIT 15;
    `
    console.log(last_articles);

    if (last_articles.length >=1) {

      return last_articles
    } else return null
    
    
  } catch (error) {
    console.log(error);
    return null
  }
  
}

type Last_articles = {
  slug: string;
  title: string;
  subtitle: string;
  section: string;
  image: string;
}