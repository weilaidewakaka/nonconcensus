import { notFound } from 'next/navigation'
import { getPostsByTag, getAllTags } from '@/lib/posts'
import PostList from '@/components/PostList'

interface TagPageProps {
  params: {
    tag: string
  }
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export async function generateMetadata({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)
  
  return {
    title: `#${tag} | 非共识之路`,
    description: `查看所有标签为"${tag}"的文章`,
  }
}

export default function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)
  const posts = getPostsByTag(tag)
  
  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="space-y-8">
      {/* Tag Header */}
      <header className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold font-serif">
          #{tag}
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