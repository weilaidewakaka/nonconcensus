import { getAllPosts } from '@/lib/posts'
import { seoConfig } from '@/lib/seo'

const SITE_URL = seoConfig.SITE_URL
const SITE_NAME = seoConfig.SITE_NAME
const SITE_DESCRIPTION = seoConfig.SITE_DESCRIPTION
const AUTHOR_NAME = seoConfig.AUTHOR_NAME
const AUTHOR_EMAIL = seoConfig.AUTHOR_EMAIL

export async function GET() {
  const posts = getAllPosts().slice(0, 20) // 限制最新20篇文章
  const buildDate = new Date().toUTCString()
  
  const rssItems = posts.map(post => {
    const postUrl = `${SITE_URL}/post/${post.slug}`
    const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString()
    
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${AUTHOR_EMAIL} (${post.author || AUTHOR_NAME})</author>
      <category><![CDATA[${post.categories.primary}]]></category>
      ${post.categories.secondary ? `<category><![CDATA[${post.categories.secondary}]]></category>` : ''}
      ${post.categories.tertiary ? `<category><![CDATA[${post.categories.tertiary}]]></category>` : ''}
      <dc:creator><![CDATA[${post.author || AUTHOR_NAME}]]></dc:creator>
    </item>`
  }).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:webfeeds="http://webfeeds.org/rss/1.0">
  <channel>
    <title><![CDATA[${SITE_NAME}]]></title>
    <description><![CDATA[${SITE_DESCRIPTION}]]></description>
    <link>${SITE_URL}</link>
    <language>zh-CN</language>
    <managingEditor>${AUTHOR_EMAIL} (${AUTHOR_NAME})</managingEditor>
    <webMaster>${AUTHOR_EMAIL} (${AUTHOR_NAME})</webMaster>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <generator>Next.js Blog</generator>
    <image>
      <url>${SITE_URL}/icon.jpg</url>
      <title><![CDATA[${SITE_NAME}]]></title>
      <link>${SITE_URL}</link>
      <width>144</width>
      <height>144</height>
      <description><![CDATA[${SITE_NAME} Logo]]></description>
    </image>
    <icon>${SITE_URL}/icon.jpg</icon>
    <logo>${SITE_URL}/icon.jpg</logo>
    <webfeeds:icon>${SITE_URL}/icon.jpg</webfeeds:icon>
    <webfeeds:logo>${SITE_URL}/icon.jpg</webfeeds:logo>
    <webfeeds:accentColor>2563eb</webfeeds:accentColor>
    <media:thumbnail url="${SITE_URL}/icon.jpg" width="144" height="144"/>
    <copyright>Copyright © ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</copyright>
    <category><![CDATA[Technology]]></category>
    <category><![CDATA[Investment]]></category>
    <category><![CDATA[Product Design]]></category>
    <category><![CDATA[Life]]></category>
    <ttl>60</ttl>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}