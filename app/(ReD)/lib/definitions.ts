
export type Article_head_data = {
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

export type Last_articles = {
    slug: string;
    title: string;
    subtitle: string;
    section: string;
    image: string;
    modified_date: Date
}
export type Compare_metadata = {
    check: boolean,
    message: string,
    differences: string[]
}

export type Metadata_allArticle = {
    id: string,
    slug: string,
    author: string,
    title: string,
    subtitle: string,
    section: string,
    modified_date: Date
}
export type Links_content ={
    name: string,
    url: string
}