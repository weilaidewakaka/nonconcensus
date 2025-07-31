import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import Link from 'next/link'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import PostList from '@/components/PostList'
import { getCategorySlug } from '@/lib/slugMapping'
import { generatePostSEO } from '@/lib/seo'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: '文章未找到 | 非共识之路',
      description: '您访问的文章不存在或已被删除',
    }
  }

  return generatePostSEO(post)
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  // 获取其他文章作为推荐
  const allPosts = getAllPosts()
  const otherPosts = allPosts
    .filter(p => p.slug !== post.slug)
    .slice(0, 3)

  // 生成面包屑导航数据
  const breadcrumbItems = [
    { name: '首页', url: 'https://www.nonconsensus.me' },
    { name: post.categories.primary, url: `https://www.nonconsensus.me/category/${getCategorySlug(post.categories.primary)}` },
    { name: post.title, url: `https://www.nonconsensus.me/post/${post.slug}` },
  ]

  return (
    <>
      <ArticleJsonLd post={post} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <div className="space-y-12">
      {/* Article Header */}
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight font-serif">
          {post.title}
        </h1>
      </header>

      {/* Article Content */}
      <article 
        className="prose prose-lg max-w-none
                   prose-headings:text-foreground prose-p:text-foreground
                   prose-strong:text-foreground prose-code:text-foreground
                   prose-blockquote:border-accent prose-blockquote:text-muted
                   prose-a:text-accent hover:prose-a:text-accent/80
                   prose-pre:bg-border/30 prose-pre:border prose-pre:border-border
                   prose-code:bg-border/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                   prose-h1:hidden"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Article Meta Info */}
      <footer className="space-y-4 pt-8 border-t border-border">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <div className="flex items-center gap-2">
            <span>作者:</span>
            <span className="text-foreground">{post.author}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>发布:</span>
            <time className="text-foreground">
              {post.date ? (() => {
                const date = new Date(post.date);
                return isNaN(date.getTime()) ? post.date : format(date, 'yyyy年MM月dd日');
              })() : ''}
            </time>
          </div>
          
          <div className="flex items-center gap-2">
            <span>阅读时间:</span>
            <span className="text-foreground">{post.readingTime} 分钟</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 text-muted text-sm">
          <div className="flex items-center gap-2">
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
        </div>
      </footer>

      {/* More Articles */}
      {otherPosts.length > 0 && (
        <section className="space-y-8 pt-12 border-t border-border">
          <h2 className="text-2xl font-semibold font-serif">阅读更多</h2>
          <PostList posts={otherPosts} showCategories={false} />
        </section>
      )}
      </div>
    </>
  )
}