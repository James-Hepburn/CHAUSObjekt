import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles.css';

import Landing from './components/Landing';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import WhoWeAreSection from './components/WhoWeAreSection';
import ShopSection from './components/ShopSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const Home: React.FC = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <ProductGrid />
      <WhoWeAreSection />
      <ShopSection />
      <ContactSection />
    </main>
    <Footer />
  </>
);

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/home" element={<Home />} />
  </Routes>
);

export default App;