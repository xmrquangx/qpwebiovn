/* ──────────────────────────────────────────────
 *  Data fetchers — one function per CPT
 *  Transform raw WP REST responses → frontend types
 * ────────────────────────────────────────────── */

import { wpFetch } from './api';
import type {
  WPPost,
  WPTerm,
  Service,
  PortfolioItem,
  PricingPlan,
  Addon,
  Testimonial,
  ProcessStep,
  FAQ,
} from './types';

/* ── Helpers ── */

/** Extract repeater values from ACF repeater field */
function repeaterToStrings(
  field: unknown,
  subFieldName: string,
): string[] {
  if (!Array.isArray(field)) return [];
  return field.map(
    (row: Record<string, unknown>) => String(row[subFieldName] ?? ''),
  );
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/* ═══════════════════════════════════════════════
 *  SERVICES
 * ═══════════════════════════════════════════════ */

export async function getServices(): Promise<Service[]> {
  const posts = await wpFetch<WPPost[]>('service', {
    orderby: 'menu_order',
    order: 'asc',
    per_page: '20',
  }, { tags: ['services'] });

  if (!posts) return [];

  return posts.map((p) => {
    const acf = p.acf || {};
    return {
      num: String(acf.service_num || ''),
      title: stripHtml(p.title.rendered),
      desc: String(acf.service_short_desc || ''),
      features: repeaterToStrings(acf.service_features, 'feature_item'),
      iconSvg: String(acf.service_icon_svg || ''),
      tag: String(acf.service_tag || ''),
      tagColor: String(acf.service_tag_color || 'bg-blue-100 text-blue-700'),
      color: String(acf.service_color || 'text-blue-brand'),
      bg: String(acf.service_bg || 'bg-blue-50'),
    };
  });
}

/* ═══════════════════════════════════════════════
 *  PORTFOLIO
 * ═══════════════════════════════════════════════ */

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const posts = await wpFetch<WPPost[]>('portfolio', {
    orderby: 'menu_order',
    order: 'asc',
    per_page: '50',
  }, { tags: ['portfolio'] });

  if (!posts) return [];

  return posts.map((p) => {
    const acf = p.acf || {};
    const imgField = acf.portfolio_image;
    const imgUrl =
      typeof imgField === 'string'
        ? imgField
        : typeof imgField === 'object' && imgField !== null
          ? String((imgField as Record<string, unknown>).url || '')
          : '';
    return {
      src: imgUrl,
      alt: stripHtml(p.title.rendered),
      title: stripHtml(p.title.rendered),
      tag: String(acf.portfolio_tag || ''),
      tagColor: String(
        acf.portfolio_tag_color || 'bg-blue-100 text-blue-700',
      ),
      client: String(acf.portfolio_client || ''),
      result: String(acf.portfolio_result || ''),
      tech: repeaterToStrings(acf.portfolio_tech, 'tech_item'),
      slug: p.slug,
    };
  });
}

export async function getPortfolioCategories(): Promise<string[]> {
  const terms = await wpFetch<WPTerm[]>('portfolio-cat', {}, { tags: ['portfolio-cat'] });
  if (!terms) return [];
  return terms.map((t) => t.name);
}

/* ═══════════════════════════════════════════════
 *  PRICING
 * ═══════════════════════════════════════════════ */

export async function getPricingPlans(): Promise<PricingPlan[]> {
  const posts = await wpFetch<WPPost[]>('goi-gia', {
    orderby: 'menu_order',
    order: 'asc',
  }, { tags: ['pricing'] });

  if (!posts) return [];

  return posts.map((p) => {
    const acf = p.acf || {};
    return {
      name: stripHtml(p.title.rendered),
      price: String(acf.pricing_price || ''),
      desc: String(acf.pricing_short_desc || ''),
      pages: String(acf.pricing_pages || ''),
      design: String(acf.pricing_design || ''),
      seo: String(acf.pricing_seo || ''),
      warranty: String(acf.pricing_warranty || ''),
      features: repeaterToStrings(acf.pricing_features, 'feature_item'),
      notIncluded: repeaterToStrings(
        acf.pricing_not_included,
        'not_included_item',
      ),
      popular: Boolean(acf.pricing_is_popular),
      cta: String(acf.pricing_cta || ''),
      num: String(acf.pricing_num || ''),
      color: String(acf.pricing_color || ''),
      bg: String(acf.pricing_bg || ''),
    };
  });
}

export async function getAddons(): Promise<Addon[]> {
  const posts = await wpFetch<WPPost[]>('addon', {
    orderby: 'menu_order',
    order: 'asc',
  }, { tags: ['addons'] });

  if (!posts) return [];

  return posts.map((p) => {
    const acf = p.acf || {};
    return {
      name: stripHtml(p.title.rendered),
      price: String(acf.addon_price || ''),
      desc: String(acf.addon_short_desc || ''),
    };
  });
}

/* ═══════════════════════════════════════════════
 *  TESTIMONIALS
 * ═══════════════════════════════════════════════ */

export async function getTestimonials(): Promise<Testimonial[]> {
  const posts = await wpFetch<WPPost[]>('testimonial', {
    orderby: 'menu_order',
    order: 'asc',
  }, { tags: ['testimonials'] });

  if (!posts) return [];

  return posts.map((p) => {
    const acf = p.acf || {};
    const avatarField = acf.review_avatar;
    const avatarUrl =
      typeof avatarField === 'string'
        ? avatarField
        : typeof avatarField === 'object' && avatarField !== null
          ? String((avatarField as Record<string, unknown>).url || '')
          : '';
    return {
      name: stripHtml(p.title.rendered),
      role: String(acf.review_role || ''),
      company: String(acf.review_company || ''),
      avatar: avatarUrl,
      alt: stripHtml(p.title.rendered),
      quote: String(acf.review_quote || ''),
      stars: Number(acf.review_stars) || 5,
      tag: String(acf.review_tag || ''),
      tagColor: String(acf.review_tag_color || ''),
      result: String(acf.review_result || ''),
      num: String(acf.review_num || ''),
    };
  });
}

/* ═══════════════════════════════════════════════
 *  PROCESS STEPS
 * ═══════════════════════════════════════════════ */

export async function getProcessSteps(): Promise<ProcessStep[]> {
  const posts = await wpFetch<WPPost[]>('quy-trinh', {
    orderby: 'menu_order',
    order: 'asc',
  }, { tags: ['process'] });

  if (!posts) return [];

  return posts.map((p) => {
    const acf = p.acf || {};
    return {
      num: String(acf.step_num || ''),
      title: stripHtml(p.title.rendered),
      desc: String(acf.step_short_desc || ''),
      day: String(acf.step_day || ''),
      details: repeaterToStrings(acf.step_details, 'detail_item'),
      iconSvg: String(acf.step_icon_svg || ''),
      color: String(acf.step_color || ''),
      bg: String(acf.step_bg || ''),
      borderColor: String(acf.step_border_color || ''),
    };
  });
}

/* ═══════════════════════════════════════════════
 *  FAQs
 * ═══════════════════════════════════════════════ */

export async function getFAQs(
  category?: string,
): Promise<FAQ[]> {
  const params: Record<string, string | number> = {
    orderby: 'menu_order',
    order: 'asc',
  };
  // If category slug provided, fetch the term first then filter
  if (category) {
    const terms = await wpFetch<WPTerm[]>('faq-cat', {
      slug: category,
    });
    if (terms && terms.length > 0) {
      params['faq-cat'] = terms[0].id;
    }
  }

  const posts = await wpFetch<WPPost[]>('faq', params, { tags: ['faq'] });
  if (!posts) return [];

  return posts.map((p) => {
    const acf = p.acf || {};
    return {
      question: stripHtml(p.title.rendered),
      answer: String(acf.faq_answer || stripHtml(p.content.rendered)),
    };
  });
}
