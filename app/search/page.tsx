import { getAllPosts } from '@/lib/posts'
import SearchClient from '@/components/SearchClient'

export default function SearchPage() {
  const allPosts = getAllPosts()

  return (
    <SearchClient allPosts={allPosts} initialQuery="" />
  )
}