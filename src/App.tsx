import React from 'react';
import './styles.css';

// ─── Page section components ──────────────────────────────────────────────────
import Navbar from './components/Navbar.tsx';
import HeroSection from './components/HeroSection.tsx';
import ProductGrid from './components/ProductGrid.tsx';
import WhoWeAreSection from './components/WhoWeAreSection.tsx';
import ShopSection from './components/ShopSection.tsx';
import ContactSection from './components/ContactSection.tsx';
import Footer from './components/Footer.tsx';

// ─── Root Application Component ───────────────────────────────────────────────
// Composes the full C.HAUS Objekt single-page website.
const App: React.FC = () => (
  <>
    {/* Fixed navigation bar */}
    <Navbar />

    <main>
      {/* 1. Full-height hero with headline and animated gift box */}
      <HeroSection />

      {/* 2. Featured product cards (services teaser) */}
      <ProductGrid />

      {/* 3. Studio story + 4-pillar value grid */}
      <WhoWeAreSection />

      {/* 4. Interactive gift box discount reveal */}
      <ShopSection />

      {/* 5. Contact form */}
      <ContactSection />
    </main>

    {/* Site-wide footer */}
    <Footer />
  </>
);

export default App;
