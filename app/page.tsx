import { getAllPosts } from '@/lib/posts'
import PaginatedPostList from '@/components/PaginatedPostList'
import { Metadata } from 'next'
import { seoConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: `${seoConfig.SITE_NAME} - 首页`,
  description: `${seoConfig.SITE_DESCRIPTION} | 最新文章和思考分享`,
  alternates: {
    canonical: seoConfig.SITE_URL,
  },
}

export default function HomePage() {
  const allPosts = getAllPosts()

  return (
    <div className="space-y-8">
      <PaginatedPostList posts={allPosts} postsPerPage={10} />
    </div>
  )
}