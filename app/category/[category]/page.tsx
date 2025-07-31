import { notFound } from 'next/navigation'
import { getPostsByCategory, getAllCategories } from '@/lib/posts'
import PostList from '@/components/PostList'
import { getCategorySlug, getCategoryFromSlug } from '@/lib/slugMapping'
import { generateCategorySEO } from '@/lib/seo'
import { BreadcrumbJsonLd } from '@/components/JsonLd'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category: getCategorySlug(category),
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = getCategoryFromSlug(params.category)
  const posts = getPostsByCategory(category)
  
  return generateCategorySEO(category, posts.length)
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryFromSlug(params.category)
  const posts = getPostsByCategory(category)
  
  if (posts.length === 0) {
    notFound()
  }

  // 生成面包屑导航数据
  const breadcrumbItems = [
    { name: '首页', url: 'https://www.nonconsensus.me' },
    { name: category, url: `https://www.nonconsensus.me/category/${params.category}` },
  ]

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <div className="space-y-8">
      {/* Category Header */}
      <header className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold font-serif">
          {category}
        </h1>
        <p className="text-muted">
          共找到 {posts.length} 篇相关文章
        </p>
      </header>

      {/* Posts List */}
      <PostList posts={posts} />
      </div>
    </>
  )
}