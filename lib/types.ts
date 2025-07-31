export interface Post {
  slug: string
  title: string
  author: string
  date: string
  categories: {
    primary: string
    secondary: string
    tertiary?: string
  }
  description: string
  cover?: string
  draft: boolean
  content: string
  readingTime: number
}

export interface Category {
  primary: string
  secondary: string
  tertiary?: string
  count: number
}

export interface PostMeta {
  slug: string
  title: string
  author: string
  date: string
  categories: {
    primary: string
    secondary: string
    tertiary?: string
  }
  description: string
  cover?: string
  draft: boolean
  readingTime: number
}