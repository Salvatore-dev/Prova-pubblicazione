
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