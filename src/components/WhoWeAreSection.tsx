import React, { useEffect, useRef } from 'react';
import { Pillar } from '../types.ts';
import { HandHeart, Sparkles, Users, Gift } from 'lucide-react';

// ─── Pillars data ─────────────────────────────────────────────────────────────
const PILLARS: Pillar[] = [
  { icon: <HandHeart size={40} strokeWidth={1.2} />, title: 'Rooted in Culture', text: "At C.HAUS Objekt, we believe that the most meaningful gifts tell a story. Rooted in culture and crafted with intention, our pieces are designed to celebrate tradition, artistry, and connection. Each object is more than a product, it's a reflection of heritage, design, and heart." },
  { icon: <Sparkles size={40} strokeWidth={1.2} />, title: 'Crafted with Intention', text: "We specialize in creating one-of-a-kind gifts that fuse cultural inspiration with thoughtful craftsmanship. From the materials we use to the stories behind each design, every detail is considered to ensure you’re giving something truly unique and personal." },
  { icon: <Users size={40} strokeWidth={1.2} />, title: 'Built for Community', text: "In addition to our curated collection, we collaborate with organizations and companies to design custom cultural and brand-centered products that reflect their values, foster community, and strengthen company culture through meaningful design." },
  { icon: <Gift size={40} strokeWidth={1.2} />, title: 'Every Occasion', text: "C.HAUS Objekt is where culture meets creativity, bringing you objects of meaning for every occasion, from personal milestones to collective celebrations." },
];

// ─── Who We Are Section ───────────────────────────────────────────────────────
const WhoWeAreSection: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.pillar-card');
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    cards.forEach((card, i) => {
      card.classList.add('reveal');
      (card as HTMLElement).style.transitionDelay = `${i * 100}ms`;
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="who-we-are" className="who-section" aria-label="Who We Are">
      <div className="container">
        <div className="who-section__header">
          <h2 className="section-title section-title--white">
            Who{' '}
            <span className="text-accent">We</span>
            <br />
            Are
          </h2>
          <p className="who-section__intro">
            At C.HAUS Objekt, our mission is to craft meaningful gifts
            that tell a story. We celebrate culture, artistry, and connection
            through thoughtfully designed objects that honour heritage
            and inspire belonging. By blending traditional craftsmanship
            with modern design, we create unique pieces and collaborate
            with organizations to foster community, express identity, and
            make every gift a lasting reflection of heart and purpose.
          </p>
        </div>

        <div className="pillar-grid" ref={gridRef}>
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="pillar-card" role="article">
              <div className="pillar-card__icon">{pillar.icon}</div>
              <h3 className="pillar-card__title">{pillar.title}</h3>
              <p className="pillar-card__text">{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;