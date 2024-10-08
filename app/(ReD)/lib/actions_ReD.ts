"use server"

type Article_head_data = {
    slug: string,
    author : string,
    title: string,
    subTitle: string,
    creationDate: Date,
    section: string,
    tags : string[],
    modifiedDate: Date,
    image: string[]
  }
  
export async function AddMetadata_article(data: Article_head_data) : Promise<string> {
    const {slug, author, title, subTitle, creationDate, section, tags, modifiedDate, image} = data
    return 'ciao'
}