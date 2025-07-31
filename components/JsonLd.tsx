import { Post } from '@/lib/types'
import { seoConfig } from '@/lib/seo'

// 网站基础结构化数据
export function WebsiteJsonLd() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.SITE_NAME,
    description: seoConfig.SITE_DESCRIPTION,
    url: seoConfig.SITE_URL,
    author: {
      '@type': 'Person',
      name: seoConfig.AUTHOR_NAME,
      email: seoConfig.AUTHOR_EMAIL,
      url: seoConfig.SITE_URL,
      sameAs: [
        'https://okjk.co/DEmCji', // 即刻链接
      ],
      jobTitle: '产品经理',
      description: '产品经理、独立开发、对投资和加密货币、web3感兴趣',
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.SITE_NAME,
      url: seoConfig.SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${seoConfig.SITE_URL}/icon.jpg`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${seoConfig.SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'zh-CN',
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Person',
      name: seoConfig.AUTHOR_NAME,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  )
}

// 文章页面结构化数据
export function ArticleJsonLd({ post }: { post: Post }) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.cover ? [post.cover] : [`${seoConfig.SITE_URL}/icon.jpg`],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || seoConfig.AUTHOR_NAME,
      email: seoConfig.AUTHOR_EMAIL,
      url: seoConfig.SITE_URL,
      sameAs: [
        'https://okjk.co/DEmCji',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.SITE_NAME,
      url: seoConfig.SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${seoConfig.SITE_URL}/icon.jpg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${seoConfig.SITE_URL}/post/${post.slug}`,
    },
    url: `${seoConfig.SITE_URL}/post/${post.slug}`,
    isPartOf: {
      '@type': 'Blog',
      '@id': seoConfig.SITE_URL,
      name: seoConfig.SITE_NAME,
    },
    inLanguage: 'zh-CN',
    potentialAction: {
      '@type': 'ReadAction',
      target: [`${seoConfig.SITE_URL}/post/${post.slug}`],
    },
    // 文章分类作为关键词
    keywords: [
      post.categories.primary,
      ...(post.categories.secondary ? [post.categories.secondary] : []),
      ...(post.categories.tertiary ? [post.categories.tertiary] : []),
    ],
    // 阅读时间
    timeRequired: `PT${post.readingTime}M`,
    // 文章所属分类
    articleSection: post.categories.primary,
    about: {
      '@type': 'Thing',
      name: post.categories.primary,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  )
}

// 作者个人信息结构化数据
export function PersonJsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: seoConfig.AUTHOR_NAME,
    alternateName: seoConfig.AUTHOR_USERNAME,
    email: seoConfig.AUTHOR_EMAIL,
    url: seoConfig.SITE_URL,
    image: `${seoConfig.SITE_URL}/icon.jpg`,
    sameAs: [
      'https://okjk.co/DEmCji', // 即刻
    ],
    jobTitle: '产品经理',
    description: '产品经理、独立开发者，专注于产品设计、技术开发，对投资和加密货币、web3领域有深度思考',
    knowsAbout: [
      '产品设计',
      '独立开发',
      'vibecoding',
      '投资理念',
      'web3',
      '加密货币',
      '产品管理',
    ],
    alumniOf: {
      '@type': 'Organization',
      name: '产品经理',
    },
    owns: {
      '@type': 'WebSite',
      name: seoConfig.SITE_NAME,
      url: seoConfig.SITE_URL,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  )
}

// 面包屑导航结构化数据
export function BreadcrumbJsonLd({ 
  items 
}: { 
  items: Array<{ name: string; url: string }> 
}) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}