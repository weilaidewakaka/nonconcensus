'use client'

import { useState, useEffect } from 'react'
import { PostMeta } from '@/lib/types'
import PostList from '@/components/PostList'
import SearchBox from '@/components/SearchBox'

interface SearchClientProps {
  allPosts: PostMeta[]
  initialQuery: string
}

function searchPosts(posts: PostMeta[], query: string): PostMeta[] {
  if (!query.trim()) {
    return []
  }
  
  const lowercaseQuery = query.toLowerCase()
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.categories.primary.toLowerCase().includes(lowercaseQuery) ||
    post.categories.secondary.toLowerCase().includes(lowercaseQuery) ||
    (post.categories.tertiary && post.categories.tertiary.toLowerCase().includes(lowercaseQuery))
  )
}

export default function SearchClient({ allPosts, initialQuery }: SearchClientProps) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<PostMeta[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (searchQuery: string) => {
    setIsLoading(true)
    setQuery(searchQuery)
    setHasSearched(true)
    
    // 模拟搜索延迟
    setTimeout(() => {
      const searchResults = searchPosts(allPosts, searchQuery)
      setResults(searchResults)
      setIsLoading(false)
    }, 200)
  }

  // 初始搜索
  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery)
    }
  }, [initialQuery])

  return (
    <div className="space-y-12">
      {/* Search Header */}
      <section className="text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold font-serif">
          搜索文章
        </h1>
        <p className="text-muted">
          在所有文章中搜索您感兴趣的内容
        </p>
      </section>

      {/* Search Box */}
      <section className="max-w-2xl mx-auto">
        <SearchBox 
          initialQuery={query}
          onSearch={handleSearch}
        />
      </section>

      {/* Search Results */}
      <section className="space-y-8">
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
              <span className="text-muted">搜索中...</span>
            </div>
          </div>
        )}

        {!isLoading && hasSearched && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold font-serif">
                搜索结果
                {query && (
                  <span className="text-muted font-normal ml-2">
                    关于 "{query}"
                  </span>
                )}
              </h2>
              <span className="text-muted text-sm">
                找到 {results.length} 篇文章
              </span>
            </div>

            {results.length > 0 ? (
              <PostList posts={results} />
            ) : (
              <div className="text-center py-12 space-y-4">
                <p className="text-muted text-lg">
                  没有找到相关文章
                </p>
                <p className="text-sm text-muted">
                  试试其他关键词，或者浏览所有文章
                </p>
              </div>
            )}
          </>
        )}

        {!hasSearched && (
          <div className="text-center py-12">
            <p className="text-muted">
              输入关键词开始搜索
            </p>
          </div>
        )}
      </section>
    </div>
  )
}