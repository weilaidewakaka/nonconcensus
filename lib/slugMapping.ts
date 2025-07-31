/**
 * 分类中英文映射配置
 * 按一级分类和二级分类的层级关系整理
 */

// ==================== 分类对照 ====================

export const categorySlugMapping: Record<string, string> = {
  // 一级分类
  "人生": "life",
  "关于": "about", 
  "项目": "projects",
  "知识": "knowledge",

  // 二级分类 - 人生下的子分类
  "价值观": "values",
  "职业规划": "career-planning",

  // 二级分类 - 关于下的子分类
  "博客介绍": "blog-intro",

  // 二级分类 - 项目下的子分类
  "编程": "programming",

  // 二级分类 - 知识下的子分类
  "学习": "learning",
  "工具": "tools",
  "宏观": "macro",
  "投资": "investment",
  "价值投资": "value-investing",
  "脑科学": "neuroscience",
  "人工智能": "artificial-intelligence"
}

// ==================== 工具函数 ====================

// 获取分类的英文slug
export function getCategorySlug(category: string): string {
  return categorySlugMapping[category] || encodeURIComponent(category)
}

// 根据slug获取中文分类名
export function getCategoryFromSlug(slug: string): string {
  const entry = Object.entries(categorySlugMapping).find(([, englishSlug]) => englishSlug === slug)
  return entry ? entry[0] : decodeURIComponent(slug)
}