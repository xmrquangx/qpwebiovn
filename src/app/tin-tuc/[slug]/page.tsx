import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getRelatedPosts } from '@/lib/wordpress/posts';
import { getSEOMeta } from '@/lib/wordpress/seo';
import BlogCard from '@/components/ui/BlogCard';
import { CalendarIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';

export const revalidate = 3600;

interface Params {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Params) {
  const { slug } = params;
  
  // Try SEO plugin data first
  const seoPath = `/tin-tuc/${slug}`;
  const seo = await getSEOMeta(seoPath);
  
  if (seo) {
    return {
      title: seo.title,
      description: seo.description,
      openGraph: {
        title: seo.ogTitle || seo.title,
        description: seo.ogDescription || seo.description,
        images: seo.ogImage ? [{ url: seo.ogImage }] : [],
      }
    };
  }

  // Fallback to fetch post data
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: 'Bài viết không tồn tại | WebAgency VN' };
  }

  return {
    title: `${post.title} | WebAgency VN`,
    description: post.excerpt.replace(/(<([^>]+)>)/gi, "").substring(0, 160) + '...',
    openGraph: {
      title: post.title,
      description: post.excerpt.replace(/(<([^>]+)>)/gi, "").substring(0, 160) + '...',
      images: post.featuredImage ? [{ url: post.featuredImage.src }] : [],
    }
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const categoryIds = post.categories.map((c: any) => c.id);
  const relatedPosts = categoryIds.length > 0 
    ? await getRelatedPosts(categoryIds, slug, 3) 
    : [];

  const formattedDate = new Date(post.date).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <main className="min-h-screen pt-24 pb-16">
      <article className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted-foreground mb-8">
          <Link href="/home" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span className="mx-2">/</span>
          <Link href="/tin-tuc" className="hover:text-primary transition-colors">Tin tức</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground truncate" dangerouslySetInnerHTML={{ __html: post.title }} />
        </nav>

        {/* Post Header */}
        <header className="mb-10 text-center">
          {post.categories && post.categories.length > 0 && (
            <div className="flex justify-center gap-2 mb-4">
              {post.categories.map(cat => (
                <span key={cat.id} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                  {cat.name}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-3xl md:text-5xl font-bold mb-6 font-display leading-tight" dangerouslySetInnerHTML={{ __html: post.title }} />
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              {post.author.avatar ? (
                <Image src={post.author.avatar} alt={post.author.name} width={24} height={24} className="rounded-full" />
              ) : (
                <UserIcon className="w-5 h-5" />
              )}
              <span className="font-medium text-foreground">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              <time dateTime={post.date}>{formattedDate}</time>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-md">
            <Image
              src={post.featuredImage.src}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        )}

        {/* Post Content */}
        {/* We use a prose class with styling for modern blog layout */}
        <div 
          className="prose prose-lg dark:prose-invert prose-p:text-muted-foreground prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-sm max-w-none mb-16 wp-content-wrapper"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 pt-6 border-t border-border mb-12">
            <TagIcon className="w-5 h-5 text-muted-foreground mr-1" />
            {post.tags.map(tag => (
              <span key={tag.id} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-muted/50 py-16 border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold font-display">Bài viết liên quan</h2>
              <Link href="/tin-tuc" className="hidden sm:inline-flex text-primary font-semibold hover:underline">
                Xem tất cả tin tức &rarr;
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map(rp => (
                <BlogCard key={rp.slug} post={rp} />
              ))}
            </div>
            
            <div className="mt-8 text-center sm:hidden">
              <Link href="/tin-tuc" className="inline-flex text-primary font-semibold hover:underline">
                Xem tất cả tin tức &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
