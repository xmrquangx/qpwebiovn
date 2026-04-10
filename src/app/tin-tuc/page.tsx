import React from 'react';
import Link from 'next/link';
import { getPosts } from '@/lib/wordpress/posts';
import { getPageSEO } from '@/lib/wordpress/seo';
import BlogCard from '@/components/ui/BlogCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return await getPageSEO('tin-tuc', '/tin-tuc/');
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const { posts, totalPages } = await getPosts({ page: currentPage, per_page: 9 });

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
      {/* Header section */}
      <section className="bg-muted py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">Tin tức & <span className="text-primary">Kiến thức</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Khám phá những bài viết mới nhất về thế giới số, từ kinh nghiệm thiết kế website đến các chiến lược marketing đột phá.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            {/* Pagination Component - simple implementation */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {currentPage > 1 && (
                  <Link 
                    href={`/tin-tuc?page=${currentPage - 1}`}
                    className="px-4 py-2 border border-border rounded-md hover:bg-muted font-medium transition-colors"
                  >
                    Trang trước
                  </Link>
                )}
                
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNumber = i + 1;
                  // Show limited pages logic if we have many pages (e.g., > 5)
                  if (totalPages > 5) {
                    if (pageNumber !== 1 && pageNumber !== totalPages && Math.abs(pageNumber - currentPage) > 1) {
                      if (pageNumber === 2 || pageNumber === totalPages - 1) {
                        return <span key={pageNumber} className="px-3 py-2 text-muted-foreground">...</span>;
                      }
                      return null;
                    }
                  }

                  return (
                    <Link
                      key={pageNumber}
                      href={`/tin-tuc?page=${pageNumber}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-md border font-medium transition-colors ${
                        currentPage === pageNumber
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      {pageNumber}
                    </Link>
                  );
                })}

                {currentPage < totalPages && (
                  <Link 
                    href={`/tin-tuc?page=${currentPage + 1}`}
                    className="px-4 py-2 border border-border rounded-md hover:bg-muted font-medium transition-colors"
                  >
                    Trang tiếp
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4">Không tìm thấy bài viết nào</h2>
            <p className="text-muted-foreground mb-8">Xin lỗi, hiện tại không có bài viết nào trong chuyên mục này.</p>
            <Link href="/home" className="btn-primary">
              Về trang chủ
            </Link>
          </div>
        )}
      </section>
      </main>
      <Footer />
    </>
  );
}
