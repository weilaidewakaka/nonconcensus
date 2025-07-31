import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { Post, PostMeta } from './types'

const postsDirectory = path.join(process.cwd(), 'posts')

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

function getAllPostFiles(dir: string = postsDirectory): string[] {
  const files: string[] = []
  
  if (!fs.existsSync(dir)) {
    return files
  }
  
  const items = fs.readdirSync(dir)
  
  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    
    if (stat.isDirectory()) {
      files.push(...getAllPostFiles(fullPath))
    } else if (item.endsWith('.md')) {
      files.push(fullPath)
    }
  }
  
  return files
}

export function getAllPosts(): PostMeta[] {
  const postFiles = getAllPostFiles()
  
  const posts = postFiles.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const slug = data.slug || path.basename(filePath, '.md')
    const readingTime = calculateReadingTime(content)
    
    return {
      slug,
      title: data.title || '',
      author: data.author || '',
      date: data.date || '',
      categories: data.categories || { primary: '', secondary: '' },
      description: data.description || '',
      cover: data.cover,
      draft: data.draft || false,
      readingTime,
    }
  })
  
  // 过滤草稿（生产环境）
  const filteredPosts = process.env.NODE_ENV === 'production' 
    ? posts.filter(post => !post.draft)
    : posts
  
  // 按日期排序
  return filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const postFiles = getAllPostFiles()
  
  // 首先尝试通过front matter中的slug匹配
  let postFile = null
  for (const file of postFiles) {
    const fileContents = fs.readFileSync(file, 'utf8')
    const { data } = matter(fileContents)
    const postSlug = data.slug || path.basename(file, '.md')
    if (postSlug === slug) {
      postFile = file
      break
    }
  }
  
  if (!postFile) {
    return null
  }
  
  const fileContents = fs.readFileSync(postFile, 'utf8')
  const { data, content } = matter(fileContents)
  
  const processedContent = await remark()
    .use(html)
    .process(content)
  const htmlContent = processedContent.toString()
  
  const readingTime = calculateReadingTime(content)
  
  return {
    slug,
    title: data.title || '',
    author: data.author || '',
    date: data.date || '',
    categories: data.categories || { primary: '', secondary: '' },
    description: data.description || '',
    cover: data.cover,
    draft: data.draft || false,
    content: htmlContent,
    readingTime,
  }
}

export function getPostsByCategory(category: string): PostMeta[] {
  const allPosts = getAllPosts()
  
  return allPosts.filter(post => 
    post.categories.primary === category ||
    post.categories.secondary === category ||
    post.categories.tertiary === category
  )
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts()
  const categories = new Set<string>()
  
  allPosts.forEach(post => {
    categories.add(post.categories.primary)
    if (post.categories.secondary) {
      categories.add(post.categories.secondary)
    }
    if (post.categories.tertiary) {
      categories.add(post.categories.tertiary)
    }
  })
  
  return Array.from(categories).sort()
}

