import Hero from '@/components/sections/Hero';
import Programs from '@/components/sections/Programs';
import Instructors from '@/components/sections/Instructors';
import { Schedule } from '@/components/sections/Schedule';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Hero />
      <Programs />
      <Instructors />
      <Schedule />
      <Testimonials />
      <FAQ />
      <WhatsAppButton />
      <Footer />
    </main>
  );
}