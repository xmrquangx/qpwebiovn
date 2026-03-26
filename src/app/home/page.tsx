import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import AdvantagesSection from './components/AdvantagesSection';
import PricingSection from './components/PricingSection';
import PortfolioSection from './components/PortfolioSection';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import ZaloFloat from './components/ZaloFloat';
import RankMathSchema from '@/components/RankMathSchema';
import {
  getPortfolioItems,
  getPricingPlans,
  getTestimonials,
  getProcessSteps,
  getFAQs,
} from '@/lib/wordpress/services';
import { getPageSEO } from '@/lib/wordpress/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO('home', '/');
}

export default async function HomePage() {
  const [portfolioItems, plans, testimonials, steps, faqs] = await Promise.all([
    getPortfolioItems(),
    getPricingPlans(),
    getTestimonials(),
    getProcessSteps(),
    getFAQs(),
  ]);

  return (
    <>
      <RankMathSchema wpPath="/" />
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <HeroSection />
        <AdvantagesSection />
        <PricingSection wpPlans={plans} />
        <PortfolioSection wpItems={portfolioItems} />
        <ProcessSection wpSteps={steps} />
        <TestimonialsSection wpTestimonials={testimonials} />
        <FaqSection wpFaqs={faqs} />
      </main>
      <Footer />
      <ZaloFloat />
    </>
  );
}