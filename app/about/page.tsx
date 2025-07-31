import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于 | 非共识之路',
  description: '了解非共识之路博客作者 - 未来的哇咔咔，产品经理、独立开发者，专注于产品设计、投资理念和技术分享',
  alternates: {
    canonical: 'https://www.nonconsensus.me/about',
  },
}

export default function AboutPage() {
  redirect('/post/about')
}