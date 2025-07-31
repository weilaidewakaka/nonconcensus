import { getAllPosts } from '@/lib/posts'
import SearchClient from '@/components/SearchClient'
import { generateSearchSEO } from '@/lib/seo'

export const metadata = generateSearchSEO()

export default function SearchPage() {
  const allPosts = getAllPosts()

  return (
    <SearchClient allPosts={allPosts} initialQuery="" />
  )
}