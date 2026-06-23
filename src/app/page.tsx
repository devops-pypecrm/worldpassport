import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import TopUniversities from '@/components/TopUniversities';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';

export default function Home() {
  return (
    <PageWrapper>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <TopUniversities />
      <Testimonials />
      <CTASection />
      <Footer />
    </PageWrapper>
  );
}
