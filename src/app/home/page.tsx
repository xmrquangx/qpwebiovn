import React from 'react';
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
import { Organization, WebPage, SoftwareApplication } from './components/StructuredData';

export default function HomePage() {
  return (
    <>
      <Organization />
      <WebPage />
      <SoftwareApplication />
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <HeroSection />
        <AdvantagesSection />
        <PricingSection />
        <PortfolioSection />
        <ProcessSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
      <ZaloFloat />
    </>
  );
}