import { notFound } from 'next/navigation'
import { getPostsByCategory, getAllCategories } from '@/lib/posts'
import PostList from '@/components/PostList'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category)
  
  return {
    title: `${category} | 非共识之路`,
    description: `查看所有关于"${category}"的文章`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category)
  const posts = getPostsByCategory(category)
  
  if (posts.length === 0) {
    notFound()
  }

  return (
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
  )
}