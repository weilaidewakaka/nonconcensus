import { getAllPosts } from '@/lib/posts'
import { seoConfig } from '@/lib/seo'

const SITE_URL = seoConfig.SITE_URL
const SITE_NAME = seoConfig.SITE_NAME  
const SITE_DESCRIPTION = seoConfig.SITE_DESCRIPTION
const AUTHOR_NAME = seoConfig.AUTHOR_NAME
const AUTHOR_EMAIL = seoConfig.AUTHOR_EMAIL

export async function GET() {
  const posts = getAllPosts().slice(0, 20)
  const buildDate = new Date().toISOString()

  const atomEntries = posts.map(post => {
    const postUrl = `${SITE_URL}/post/${post.slug}`
    const pubDate = post.date ? new Date(post.date).toISOString() : new Date().toISOString()
    
    return `
    <entry>
      <title><![CDATA[${post.title}]]></title>
      <link href="${postUrl}" />
      <id>${postUrl}</id>
      <published>${pubDate}</published>
      <updated>${pubDate}</updated>
      <summary><![CDATA[${post.description}]]></summary>
      <author>
        <name>${post.author || AUTHOR_NAME}</name>
        <email>${AUTHOR_EMAIL}</email>
      </author>
      <category term="${post.categories.primary}" />
      ${post.categories.secondary ? `<category term="${post.categories.secondary}" />` : ''}
      ${post.categories.tertiary ? `<category term="${post.categories.tertiary}" />` : ''}
    </entry>`
  }).join('')

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title><![CDATA[${SITE_NAME}]]></title>
  <link href="${SITE_URL}" />
  <link href="${SITE_URL}/feed.xml" rel="self" />
  <id>${SITE_URL}</id>
  <updated>${buildDate}</updated>
  <subtitle><![CDATA[${SITE_DESCRIPTION}]]></subtitle>
  <icon>${SITE_URL}/icon.jpg</icon>
  <logo>${SITE_URL}/icon.jpg</logo>
  <author>
    <name>${AUTHOR_NAME}</name>
    <email>${AUTHOR_EMAIL}</email>
  </author>
  <generator>Next.js Blog</generator>
  ${atomEntries}
</feed>`

  return new Response(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}