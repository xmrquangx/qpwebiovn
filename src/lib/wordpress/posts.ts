/* ──────────────────────────────────────────────
 *  Posts Fetching (Blog & News)
 * ────────────────────────────────────────────── */

import { wpFetch } from './api';
import { WPPost, BlogPost } from './types';

function mapPost(post: WPPost): BlogPost {
  const embedded = post._embedded || {};
  let featuredImage = null;
  
  if (embedded['wp:featuredmedia'] && Array.isArray(embedded['wp:featuredmedia'])) {
    const media = embedded['wp:featuredmedia'][0] as any;
    if (media?.source_url) {
      featuredImage = {
        src: media.source_url,
        alt: media.alt_text || post.title.rendered,
      };
    }
  }

  const terms = embedded['wp:term'] as any[][] || [];
  const categories: { id: number; name: string; slug: string }[] = [];
  const tags: { id: number; name: string; slug: string }[] = [];

  if (terms.length > 0) {
    terms.forEach((termGroup) => {
      termGroup.forEach((term: any) => {
        if (term.taxonomy === 'category') {
          categories.push({ id: term.id, name: term.name, slug: term.slug });
        }
        if (term.taxonomy === 'post_tag') {
          tags.push({ id: term.id, name: term.name, slug: term.slug });
        }
      });
    });
  }

  let author = { name: 'Admin', avatar: '' };
  if (embedded['author'] && Array.isArray(embedded['author'])) {
    const wpAuthor = embedded['author'][0] as any;
    author = {
      name: wpAuthor.name || 'Admin',
      avatar: wpAuthor.avatar_urls?.['96'] || '',
    };
  }

  return {
    title: post.title.rendered,
    slug: post.slug,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    date: (post as any).date || '',
    modified: (post as any).modified || '',
    featuredImage,
    categories,
    tags,
    author
  };
}

/** Get list of posts */
export async function getPosts(params: { page?: number; per_page?: number } = {}): Promise<{ posts: BlogPost[], totalPages: number }> {
  try {
    const urlParams = new URLSearchParams({
      _embed: '1',
      per_page: (params.per_page || 10).toString(),
      page: (params.page || 1).toString(),
      status: 'publish'
    });

    // Instead of using wpFetch, we do a raw fetch to get headers for pagination
    const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://api.qpweb.io.vn';
    const finalUrl = `${WP_API_URL}/wp-json/wp/v2/posts?${urlParams.toString()}`;
    
    console.log(`[getPosts] Fetching: ${finalUrl}`);
    const res = await fetch(finalUrl, { cache: 'no-store' });
    
    if (!res.ok) {
      console.error(`[getPosts] Error ${res.status}`);
      return { posts: [], totalPages: 0 };
    }

    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
    const data = await res.json() as WPPost[];
    
    return {
      posts: data.map(mapPost),
      totalPages
    };
  } catch (err) {
    console.error(`[getPosts] Exception:`, err);
    return { posts: [], totalPages: 0 };
  }
}

/** Get a single post by slug */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await wpFetch<WPPost[]>('posts', { slug, _embed: '1' }, { tags: ['posts'] });
  if (!posts || posts.length === 0) return null;
  return mapPost(posts[0]);
}

/** Get related posts by category */
export async function getRelatedPosts(categories: number[], excludeSlug: string, count = 3): Promise<BlogPost[]> {
  try {
    const urlParams = new URLSearchParams({
      _embed: '1',
      per_page: count.toString(),
      categories: categories.join(','),
      status: 'publish'
    });
    
    const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://api.qpweb.io.vn';
    const finalUrl = `${WP_API_URL}/wp-json/wp/v2/posts?${urlParams.toString()}`;
    
    const res = await fetch(finalUrl, { cache: 'no-store' });
    if (!res.ok) return [];
    
    const data = await res.json() as WPPost[];
    return data.filter(p => p.slug !== excludeSlug).map(mapPost).slice(0, count);
  } catch {
    return [];
  }
}
