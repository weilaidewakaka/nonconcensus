import { getAllPosts, getAllCategories } from '@/lib/posts'
import { getCategorySlug } from '@/lib/slugMapping'

const SITE_URL = 'https://www.nonconsensus.me'

export async function GET() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  // Generate URLs for all posts
  const postUrls = posts.map(post => ({
    url: `${SITE_URL}/post/${post.slug}`,
    lastModified: post.date ? new Date(post.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    changeFreq: 'monthly',
    priority: '0.8'
  }))

  // Generate URLs for all categories
  const categoryUrls = categories.map(category => ({
    url: `${SITE_URL}/category/${getCategorySlug(category)}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFreq: 'weekly',
    priority: '0.6'
  }))

  // Static pages
  const staticUrls = [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString().split('T')[0],
      changeFreq: 'daily',
      priority: '1.0'
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFreq: 'monthly',
      priority: '0.7'
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFreq: 'monthly',
      priority: '0.5'
    }
  ]

  const allUrls = [...staticUrls, ...postUrls, ...categoryUrls]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ url, lastModified, changeFreq, priority }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}