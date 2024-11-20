
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

export type Article_module_type = {
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

export type Metadata_allArticles = {
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

export type All_tags = {
    tag_id : number,
    tag_name : string,
    article_ids: number[]
  }

