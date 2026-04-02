import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/wordpress/types';
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export default function BlogCard({ post, className = '' }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <article className={`group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-300 ${className}`}>
      <Link href={`/tin-tuc/${post.slug}`} className="relative h-56 w-full overflow-hidden block bg-muted">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage.src}
            alt={post.featuredImage.alt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
            <span className="text-sm">Không có ảnh</span>
          </div>
        )}
        {post.categories && post.categories.length > 0 && (
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full shadow-sm">
              {post.categories[0].name}
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 font-medium">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
          <div className="flex items-center gap-1">
            <UserIcon className="w-4 h-4" />
            <span>{post.author.name}</span>
          </div>
        </div>

        <Link href={`/tin-tuc/${post.slug}`} className="block group-hover:text-primary transition-colors">
          <h3 className="text-xl font-bold mb-3 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.title }} />
        </Link>
        
        <div 
          className="text-muted-foreground line-clamp-3 text-sm mb-4 flex-grow prose-p:mb-0"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />

        <div className="mt-auto pt-4 border-t border-border/50">
          <Link 
            href={`/tin-tuc/${post.slug}`}
            className="text-primary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            Đọc tiếp
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
