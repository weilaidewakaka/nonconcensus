import { Metadata } from 'next'
import { Post, PostMeta } from './types'

const SITE_URL = 'https://www.nonconsensus.me'
const SITE_NAME = '非共识之路'
const SITE_DESCRIPTION = '分享vibecoding技巧、投资理念、产品设计及开发过程、人生感悟等'
const AUTHOR_NAME = '未来的哇咔咔'
const AUTHOR_USERNAME = 'weilaidewakaka'
const AUTHOR_EMAIL = 'patrick.waiting@outlook.com'

// 网站基础SEO配置
export const baseSEO: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: [
    '非共识', 'nonconsensus', '非共识之路',
    'vibecoding', '独立开发', '产品设计', '产品经理',
    '投资理念', 'web3', '加密货币', '人生感悟',
    '技术分享', '创业', '思考'
  ],
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/icon.jpg',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: `@${AUTHOR_USERNAME}`,
    images: ['/icon.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': [
        { url: '/rss.xml', title: `${SITE_NAME} RSS Feed` }
      ],
      'application/atom+xml': [
        { url: '/feed.xml', title: `${SITE_NAME} Atom Feed` }
      ]
    }
  },
  other: {
    'contact:email': AUTHOR_EMAIL,
  },
}

// 生成文章页面的SEO metadata
export function generatePostSEO(post: Post): Metadata {
  const postUrl = `${SITE_URL}/post/${post.slug}`
  const title = `${post.title} | ${SITE_NAME}`
  
  return {
    title,
    description: post.description,
    keywords: [
      ...baseSEO.keywords as string[],
      post.categories.primary,
      ...(post.categories.secondary ? [post.categories.secondary] : []),
      ...(post.categories.tertiary ? [post.categories.tertiary] : [])
    ],
    authors: [{ name: post.author || AUTHOR_NAME }],
    openGraph: {
      type: 'article',
      locale: 'zh_CN',
      url: postUrl,
      siteName: SITE_NAME,
      title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author || AUTHOR_NAME],
      section: post.categories.primary,
      tags: [
        post.categories.primary,
        ...(post.categories.secondary ? [post.categories.secondary] : []),
        ...(post.categories.tertiary ? [post.categories.tertiary] : [])
      ],
      images: post.cover ? [
        {
          url: post.cover,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [
        {
          url: '/icon.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.description,
      creator: `@${AUTHOR_USERNAME}`,
      images: post.cover ? [post.cover] : ['/icon.jpg'],
    },
    alternates: {
      canonical: postUrl,
    },
  }
}

// 生成分类页面的SEO metadata
export function generateCategorySEO(category: string, postsCount: number): Metadata {
  const categoryUrl = `${SITE_URL}/category/${category}`
  const title = `${category} | ${SITE_NAME}`
  const description = `浏览所有关于"${category}"的文章，共${postsCount}篇精选内容`
  
  return {
    title,
    description,
    keywords: [
      ...baseSEO.keywords as string[],
      category,
      `${category}文章`,
      `${category}分类`
    ],
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      url: categoryUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: '/icon.jpg',
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: `@${AUTHOR_USERNAME}`,
      images: ['/icon.jpg'],
    },
    alternates: {
      canonical: categoryUrl,
    },
  }
}

// 生成搜索页面的SEO metadata
export function generateSearchSEO(): Metadata {
  const searchUrl = `${SITE_URL}/search`
  const title = `搜索文章 | ${SITE_NAME}`
  const description = `在${SITE_NAME}中搜索您感兴趣的内容，包括技术分享、投资理念、产品设计等话题`
  
  return {
    title,
    description,
    robots: {
      index: false, // 不索引搜索页面
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      url: searchUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: '/icon.jpg',
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: `@${AUTHOR_USERNAME}`,
      images: ['/icon.jpg'],
    },
    alternates: {
      canonical: searchUrl,
    },
  }
}

// 导出常量供其他地方使用
export const seoConfig = {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  AUTHOR_NAME,
  AUTHOR_USERNAME,
  AUTHOR_EMAIL,
}