'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBoxProps {
  initialQuery?: string
  onSearch?: (query: string) => void
}

export default function SearchBox({ initialQuery = '', onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedQuery = query.trim()
    
    if (onSearch) {
      onSearch(trimmedQuery)
    } else {
      if (trimmedQuery) {
        router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`)
      }
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索文章..."
        className="w-full px-4 py-3 bg-background border border-border rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50
                   placeholder:text-muted transition-all"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:text-accent transition-colors"
        aria-label="搜索"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  )
}