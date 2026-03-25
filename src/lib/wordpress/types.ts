/* ──────────────────────────────────────────────
 *  TypeScript types for WordPress REST responses
 * ────────────────────────────────────────────── */

/* --- Common WP fields ---- */
export interface WPRendered {
  rendered: string;
}

export interface WPPost {
  id: number;
  slug: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  featured_media: number;
  menu_order: number;
  meta: Record<string, unknown>;
  acf: Record<string, unknown>;
  _embedded?: Record<string, unknown>;
}

/* --- Taxonomy term ---- */
export interface WPTerm {
  id: number;
  name: string;
  slug: string;
  count: number;
}

/* ──────────────────────────────────────────────
 *  Frontend-friendly types (transformed from WP)
 * ────────────────────────────────────────────── */

export interface Service {
  num: string;
  title: string;
  desc: string;
  features: string[];
  iconSvg: string;
  tag: string;
  tagColor: string;
  color: string;
  bg: string;
}

export interface PortfolioItem {
  src: string;
  alt: string;
  title: string;
  tag: string;
  tagColor: string;
  client: string;
  result: string;
  tech: string[];
  slug: string;
}

export interface PortfolioDetail extends PortfolioItem {
  content: string;
  location: string;
  duration: string;
  year: string;
  challenge: string;
  solution: string;
  gallery: { src: string; alt: string; caption: string }[];
  testimonial: { text: string; author: string; role: string };
  demoUrl: string;
}


export interface PricingPlan {
  name: string;
  price: string;
  desc: string;
  pages: string;
  design: string;
  seo: string;
  warranty: string;
  features: string[];
  notIncluded: string[];
  popular: boolean;
  cta: string;
  num: string;
  color: string;
  bg: string;
}

export interface Addon {
  name: string;
  price: string;
  desc: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  alt: string;
  quote: string;
  stars: number;
  tag: string;
  tagColor: string;
  result: string;
  num: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  day: string;
  details: string[];
  iconSvg: string;
  color: string;
  bg: string;
  borderColor: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
