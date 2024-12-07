"use server"
import sql_Elephant from "@/app/lib/test/connectpostgre"
import { sql } from "@vercel/postgres"

import { getAdmin } from "@/app/lib/dal"

import { Article_head_data, Article_module_type } from "./definitions"

import { articlesForPage } from "./data_red"



interface Response_get_article {
  id_article: string,
  metadata: Article_head_data
}

export async function AddMetadata_article(data: Article_head_data): Promise<string> {
  const { slug, author, title, subTitle, creationDate, section, tags, modifiedDate, image } = data;
  const admin = await getAdmin()
  if (!admin) return `Utente non autorizzato`
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
        VALUES (${slug}, ${author}, ${title}, ${subTitle}, ${creationDate}, ${section}, ${modifiedDate}, ${JSON.stringify(image.slice(0, 2))})
        RETURNING id;
      `;
      const articleId = New_article[0].id;
      console.log('step 1 ', New_article);
      

      // 3. Gestione dei tag con `ON CONFLICT`
      for (const tag of tags) {
        const tagResult = await sqlTransaction`
            INSERT INTO tags (tag_name)
            VALUES (${tag.toLowerCase()})
            ON CONFLICT (tag_name) DO NOTHING
            RETURNING id;
          `;
          let tagId;
          if (tagResult.length > 0) {
            tagId = tagResult[0].id;
          } else {
            // Recupera l'id del tag esistente
            const existingTag = await sqlTransaction`
              SELECT id FROM tags
              WHERE tag_name = ${tag.toLowerCase()};
            `;
            tagId = existingTag[0].id;
          }
        console.log('step 2',tagId);

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

export async function LastArticles(page: number) {
  const offset = (page - 1) * articlesForPage;
  try {
    const last_articles: Article_module_type[] = await sql_Elephant`
    SELECT slug, title, subtitle, section, modified_date, image
    FROM articles
    ORDER BY modified_date DESC
    LIMIT ${articlesForPage} OFFSET ${offset};
    `
    console.log(last_articles);

    if (last_articles.length >= 1) {

      return {last_articles, page}
    } else return null


  } catch (error) {
    console.log(error);
    return null
  }

}

export async function getArticle(slug: string): Promise<Response_get_article | string> { // da cancellare sotto un refactoring

  try {
    const article = await sql_Elephant`
    SELECT * FROM articles
    WHERE articles.slug = ${slug};
    `
    //console.log(article);
    if (article.length > 0) {
      const { id, slug, author, title, subtitle, creation_date, section, modified_date, image } = article[0]

      const tags_id = await sql_Elephant`
      SELECT tag_id FROM article_tags
      WHERE article_tags.article_id = ${id};
      `
      //console.log(tags_id);
      if (tags_id.length > 0) {
        const tags_array = []
        for (const tag_id of tags_id) {
          const tag = await sql_Elephant`
          SELECT tag_name FROM tags
          WHERE tags.id = ${tag_id.tag_id};
          `
          //console.log(tag);
          if (tag.length > 0) tags_array.push(tag[0].tag_name)
          else return 'Non sono stati trovati i tags associati ad articolo'

        }
        //console.log(tags_array);

        const metadata: Article_head_data = {
          slug: slug,
          author: author,
          title: title,
          subTitle: subtitle,
          creationDate: creation_date,
          section: section,
          modifiedDate: modified_date,
          image: JSON.parse(image),
          tags: tags_array
        }
        const response: Response_get_article = {
          id_article: id as string,
          metadata: metadata
        }
        console.log(response);
        return response

      } else return "Non esistono tags associati all'articolo"

    } else return 'Slug inesistente. Attenzione! risetta lo slug!'

  } catch (error) {
    console.log('errore nel server. riprova', error);
    return 'errore nel server. riprova'!


  }
}

export async function getArticle2(slug: string): Promise<Response_get_article | string> {
  try {
    // Eseguire una query con LEFT JOIN per ottenere l'articolo e i relativi tag in un'unica operazione
    const articleWithTags = await sql_Elephant`
      SELECT articles.*, tags.tag_name 
      FROM articles 
      LEFT JOIN article_tags ON articles.id = article_tags.article_id
      LEFT JOIN tags ON article_tags.tag_id = tags.id
      WHERE articles.slug = ${slug};
    `;

    // Verificare se l'articolo esiste
    console.log(articleWithTags);

    if (articleWithTags.length > 0) {
      const { id, slug, author, title, subtitle, creation_date, section, modified_date, image } = articleWithTags[0];

      // Creare un array di tag, escludendo i valori nulli
      const tagsArray = articleWithTags.map(row => row.tag_name).filter(tag => tag !== null);

      // Verifica che l'immagine sia in formato JSON valido
      let parsedImage: string[];
      try {
        parsedImage = JSON.parse(image);
      } catch (err) {
        console.log('Errore nel parsing dell\'immagine:', err);
        return 'Errore nel formato dell\'immagine';
      }

      // Creare l'oggetto metadata conforme al tipo Article_head_data
      const metadata: Article_head_data = {
        slug: slug,
        author: author,
        title: title,
        subTitle: subtitle,
        creationDate: creation_date,
        section: section,
        tags: tagsArray,
        modifiedDate: modified_date,
        image: parsedImage

      };

      // Creare l'oggetto di risposta conforme al tipo Response_get_article
      const response: Response_get_article = {
        id_article: id as string,
        metadata: metadata
      };

      // Restituire la risposta
      return response;

    } else {
      return 'Slug inesistente. Attenzione! risetta lo slug!';
    }

  } catch (error) {
    console.log('Errore nel server. Riprova:', error);
    return 'Errore nel server. Riprova';
  }
}

export async function upDate_article(id_article: string, data: Article_head_data, info_update: string[]): Promise<string> {
  const admin = await getAdmin()
  if (!admin) return `Utente non autorizzato`
  
  const case_tag = 'tags';
  const check_tags = info_update.includes(case_tag);
  const { title, subTitle, modifiedDate, image, section, tags, author } = data;

  if (info_update.length === 0) return `Non risultano modifiche da eseguire. Nessun valore aggiornato`;

  let message = '';
  try {
    await sql_Elephant.begin(async (sqlTransaction) => {
      // Verifica se è necessario aggiornare i tag
      if (check_tags && tags.length > 0) {
        message += 'Aggiornamento dei tags: ';
        const article_tags_id_old = await sqlTransaction`
        SELECT tag_id FROM article_tags
        WHERE article_id = ${id_article}
        `
        //const tags_id_old = article_tags_id_old.map((row) => row.tag_id) as string[];
        // console.log('tags id old', tags_id_old);
        const tags_in_action = [] as {
          id: string,
          tag_name: string
        }[]
        for (const tag of tags) {
          // Inserisce il tag o lo recupera se già esistente
          const tagResult = await sqlTransaction`
            INSERT INTO tags (tag_name)
            VALUES (${tag.toLowerCase()})
            ON CONFLICT (tag_name) DO NOTHING
            RETURNING id;
          `;
          let tagId;

          if (tagResult.length > 0) {
            tagId = tagResult[0].id;
            message += `Tag '${tag}' inserito correttamente. `;
          } else {
            // Recupera l'id del tag esistente
            const existingTag = await sqlTransaction`
              SELECT id FROM tags
              WHERE tag_name = ${tag.toLowerCase()};
            `;
            tagId = existingTag[0].id;
            message += `Tag '${tag}' già esistente, associato all'articolo. `;
          }
          tags_in_action.push({
            id: tagId,
            tag_name: tag
          })

          // Associa il tag all'articolo
          await sqlTransaction`
            INSERT INTO article_tags (article_id, tag_id)
            VALUES (${id_article}, ${tagId})
            ON CONFLICT DO NOTHING;
          `;
        }
        // console.log('tags in action', tags_in_action);

        const article_tags_id_new = await sqlTransaction`
        SELECT tag_id FROM article_tags
        WHERE article_id = ${id_article}
        `
        const tags_id_new = article_tags_id_new.map((row) => row.tag_id) as string[];
        //console.log('tags id new', tags_id_new);
        const tags_id_inAction = tags_in_action.map(tag => tag.id)
        //console.log('tag id in action', tags_id_inAction);

        // Rimuove i tag non più associati
        const tags_to_remove = tags_id_new.filter((tagId) => {
          const isIncluded = tags_id_inAction.includes(tagId);
          // console.log(`Checking tagId: ${tagId}, included: ${isIncluded}`);
          return !isIncluded;
        });
        // console.log('tags to remove', tags_to_remove);

        if (tags_to_remove.length > 0) {
          for (const tag_id of tags_to_remove) {
            await sqlTransaction`
            DELETE FROM article_tags
            WHERE article_id = ${id_article} AND tag_id = ${tag_id};
            `
          }
          message += `I Seguenti tags_id sono stati rimossi: ${JSON.stringify(tags_to_remove)}.`
        }


        if (info_update.length === 1) {
          message += 'Nessun altro campo aggiornato.';
          return; // Esci dalla transazione se solo i tag sono stati aggiornati
        }
      }

      // Aggiorna gli altri campi dell'articolo
      await sqlTransaction`
        UPDATE articles
        SET title = ${title},
            subtitle = ${subTitle},
            modified_date = ${modifiedDate},
            image = ${JSON.stringify(image)},
            section = ${section},
            author = ${author}
        WHERE articles.id = ${id_article};
      `;
      message += ` I valori: ${JSON.stringify(info_update)} dell'articolo sono stati aggiornati correttamente.`;
    });

    return message;

  } catch (error) {
    console.log(error);
    return `Errore nell'aggiornamento dell'articolo: ${JSON.stringify(error)}`;
  }
}

export async function get_all_articles() {

  try {
    const response = await sql_Elephant`
    SELECT id, slug, author, title, subtitle, section, modified_date
    FROM articles;
    `
    console.log(response);
    if (response && response.length > 0) {
      return response
    } else return `Errore nel server articoli non ottenuti`


  } catch (error) {
    console.log(error);
    return `Errore nel server articoli non ottenuti`
  }
}


export async function get_tags() {
  // richiamo i tags, il loro id, il nome e poi raggruppo in array i rifermenti agli articoli
  try {
    const tags = await sql_Elephant`
    SELECT 
        tags.id AS tag_id,
        tags.tag_name,
      COALESCE(ARRAY_AGG(article_tags.article_id) FILTER (WHERE article_tags.article_id IS NOT NULL), '{}') AS article_ids
    FROM 
      tags
    LEFT JOIN 
      article_tags 
    ON 
      tags.id = article_tags.tag_id
    GROUP BY 
      tags.id, tags.tag_name
    ORDER BY 
      tags.tag_name;
    `
    if (tags && tags.length > 0) {
      return tags
    } else return `Nessuna keyword trovata`
  } catch (error) {
    console.log(error);
    return `Errore nel server`
  }
}

export async function delete_tags(tag_id: number) {
  const admin = await getAdmin()
  if (!admin) return `Utente non autorizzato`
  try {
    const result = await sql_Elephant`
    DELETE FROM tags
    WHERE id = ${tag_id}
    RETURNING id, tag_name;
    `
    console.log(result);

    if (result && result.length > 0) {
      return result
    }
    return `Nessuna keyword trovata`
  } catch (error) {
    console.log(error);
    return `errore nel server`
  }
}

export async function update_tag(tag_id: number, keyword_update: string) {
  const admin = await getAdmin()
  if (!admin) return `Utente non autorizzato`
  if (keyword_update.length <= 2) return `La nuova keyword deve essere di almeno 3 caratteri!`
  try {
    const result = await sql_Elephant`
     UPDATE tags
        SET tag_name = ${keyword_update.toLowerCase()}
      WHERE tags.id = ${tag_id}
      RETURNING id, tag_name;
    `
    console.log(result);
    if (result && result.length > 0) {
      const data: {
        id: number,
        tag_name: string
      } = {
        id: result[0].id,
        tag_name: result[0].tag_name
      }
      return data
    } else return `Nessun tag modificato`


  } catch (error) {
    console.log(error);
    return `Errore nel server: ${JSON.stringify(error)}`
  }
}

export async function get_articles_by_ids(ids: number[]) {
  
  if(ids.length<=0) return `Nessun articolo richiesto. Controlla!`
  const article_ids = ids
  
  try {
    const articles = []
    for (const id of article_ids) {
      const result = await sql_Elephant`
      SELECT id, slug, author, title, subtitle, section, modified_date
      FROM articles
      WHERE id = ${id};
      `
      if (result && result.length > 0) {
        articles.push(result[0])
      }
    }
    console.log(articles);
    if (articles.length>0) {
      return articles
    } else return `Nessun articolo trovato!`
    
  } catch (error) {
    console.log(error);
    return `Errore nel server. Nessun Arrticolo ottenuto!`
  }
}

export async function get_articles_by_tag(tag:string) {
  const message_error = `Errore, per favore riprova!`

  if (!tag || typeof tag !== 'string') return message_error
   try {
    const result : Article_module_type[] = await sql_Elephant`
    SELECT 
      slug,
      title,
      subtitle,
      section,
      image,
     modified_date
    FROM 
      articles
    JOIN 
      article_tags ON articles.id = article_tags.article_id
    JOIN 
      tags ON article_tags.tag_id = tags.id
    WHERE 
      tags.tag_name = ${tag};
    `
    if (result && result.length>=1) {
      return result
    } else {
      return `Nessun articolo trovato!`
    }
   } catch (error) {
    console.log(error);
    return message_error
   }
  
}
export async function count_latest_articles() {
  try {
    const result = await sql_Elephant`
    SELECT COUNT(*) FROM articles;
    `
    console.log(result);
    const n = parseInt(result[0].count,10)
    if (Number.isNaN(n)) {
      return 0
    } else{
      return Math.ceil(n/articlesForPage)
    }
    
  } catch (error) {
    console.log(error);
    return 0
  }
}