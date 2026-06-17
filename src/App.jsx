import Navbar          from './components/Navbar';
import HeroSlider      from './components/HeroSlider';
import StatsBanner     from './components/StatsBanner';
import About           from './components/About';
import Services        from './components/Services';
import Booking         from './components/Booking';
import Devis           from './components/Devis';
import Portfolio       from './components/Portfolio';
import Talents         from './components/Talents';
import Testimonials    from './components/Testimonials';
import Partners        from './components/Partners';
import Contact         from './components/Contact';
import Footer          from './components/Footer';
import ScrollToTop     from './components/ScrollToTop';
import WhatsAppButton  from './components/WhatsAppButton';

export default function App() {
  return (
    <div className="min-h-screen bg-kg-black text-kg-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSlider />
        <StatsBanner />
        <About />
        <Services />
        <Booking />
        <Devis />
        <Portfolio />
        <Talents />
        <Testimonials />
        <Partners />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  );
}
