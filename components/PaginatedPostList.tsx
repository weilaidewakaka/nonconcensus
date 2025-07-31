'use client'

import { useState } from 'react'
import { PostMeta } from '@/lib/types'
import PostList from './PostList'
import Pagination from './Pagination'

interface PaginatedPostListProps {
  posts: PostMeta[]
  postsPerPage?: number
}

export default function PaginatedPostList({ 
  posts, 
  postsPerPage = 10 
}: PaginatedPostListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  
  const totalPages = Math.ceil(posts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = posts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-8">
      <PostList posts={currentPosts} />
      
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}