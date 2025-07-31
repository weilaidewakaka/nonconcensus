import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
  onPageChange?: (page: number) => void
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  basePath = '', 
  onPageChange 
}: PaginationProps) {
  if (totalPages <= 1) return null

  const prevPage = currentPage - 1
  const nextPage = currentPage + 1
  
  const getPageUrl = (page: number) => {
    if (page === 1) return basePath || '/'
    return `${basePath}?page=${page}`
  }

  const handlePageClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page)
    }
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      {/* Previous Page */}
      {prevPage >= 1 ? (
        onPageChange ? (
          <button
            onClick={() => handlePageClick(prevPage)}
            className="px-4 py-2 border border-border rounded-lg hover:bg-border/30 transition-colors"
          >
            上一页
          </button>
        ) : (
          <Link
            href={getPageUrl(prevPage)}
            className="px-4 py-2 border border-border rounded-lg hover:bg-border/30 transition-colors"
          >
            上一页
          </Link>
        )
      ) : (
        <span className="px-4 py-2 border border-border rounded-lg text-muted cursor-not-allowed">
          上一页
        </span>
      )}

      {/* Page Info */}
      <span className="text-muted text-sm">
        第 {currentPage} 页，共 {totalPages} 页
      </span>

      {/* Next Page */}
      {nextPage <= totalPages ? (
        onPageChange ? (
          <button
            onClick={() => handlePageClick(nextPage)}
            className="px-4 py-2 border border-border rounded-lg hover:bg-border/30 transition-colors"
          >
            下一页
          </button>
        ) : (
          <Link
            href={getPageUrl(nextPage)}
            className="px-4 py-2 border border-border rounded-lg hover:bg-border/30 transition-colors"
          >
            下一页
          </Link>
        )
      ) : (
        <span className="px-4 py-2 border border-border rounded-lg text-muted cursor-not-allowed">
          下一页
        </span>
      )}
    </div>
  )
}