'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { PostMeta } from '@/lib/types'
import { getCategorySlug } from '@/lib/slugMapping'

interface PostListProps {
  posts: PostMeta[]
  showCategories?: boolean
}

export default function PostList({ posts, showCategories = true }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted text-lg">暂无文章</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article
          key={post.slug}
          className="group border-b border-border pb-8 last:border-b-0"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Link href={`/post/${post.slug}`}>
                <h2 className="text-xl font-semibold transition-colors font-serif hover:text-accent">
                  {post.title}
                </h2>
              </Link>
              <time className="text-muted text-sm whitespace-nowrap ml-4">
                {post.date ? (() => {
                  const date = new Date(post.date);
                  return isNaN(date.getTime()) ? post.date : format(date, 'yyyy-MM-dd');
                })() : ''}
              </time>
            </div>
            
            {post.description && (
              <Link href={`/post/${post.slug}`}>
                <p className="text-muted leading-relaxed hover:text-foreground transition-colors">
                  {post.description}
                </p>
              </Link>
            )}
            
            <div className="flex items-center gap-4 text-sm">
              {showCategories && (
                <div className="flex items-center gap-2 text-muted">
                  <Link 
                    href={`/category/${getCategorySlug(post.categories.primary)}`}
                    className="hover:text-accent transition-colors"
                  >
                    {post.categories.primary}
                  </Link>
                  {post.categories.secondary && (
                    <>
                      <span>/</span>
                      <Link 
                        href={`/category/${getCategorySlug(post.categories.secondary)}`}
                        className="hover:text-accent transition-colors"
                      >
                        {post.categories.secondary}
                      </Link>
                    </>
                  )}
                  {post.categories.tertiary && (
                    <>
                      <span>/</span>
                      <Link 
                        href={`/category/${getCategorySlug(post.categories.tertiary)}`}
                        className="hover:text-accent transition-colors"
                      >
                        {post.categories.tertiary}
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}