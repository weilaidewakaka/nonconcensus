import { getAllPosts } from '@/lib/posts'
import PaginatedPostList from '@/components/PaginatedPostList'

export default function HomePage() {
  const allPosts = getAllPosts()

  return (
    <div className="space-y-8">
      <PaginatedPostList posts={allPosts} postsPerPage={10} />
    </div>
  )
}