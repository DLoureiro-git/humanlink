import Hero from '@/components/Hero';
import WhatIsIt from '@/components/WhatIsIt';
import Personalities from '@/components/Personalities';
import UseCases from '@/components/UseCases';
import Comparison from '@/components/Comparison';
import Features from '@/components/Features';
import WowSection from '@/components/WowSection';
import Demo from '@/components/Demo';
import PoweredByOpenClaw from '@/components/PoweredByOpenClaw';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  return (
    <main className="bg-background text-white min-h-screen">
      <Navbar />
      <Hero />
      <WhatIsIt />
      <Personalities />
      <UseCases />
      <Comparison />
      <Features />
      <WowSection />
      <Demo />
      <PoweredByOpenClaw />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
