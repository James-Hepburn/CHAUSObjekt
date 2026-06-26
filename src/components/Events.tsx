import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import FullStatue from '../assets/FullStatue.png';
import MayorStatue from '../assets/MayorStatue.png';
import AloneStatue from '../assets/AloneStatue.png';
import SmallerStatue from '../assets/SmallerStatue.png';
import Table from '../assets/Table.png';
import Menu from '../assets/Menu.png';
import Decor from '../assets/Decor.png';
import HongKong from '../assets/HongKong.png';

// ─── Reusable Zebra Stripe Divider ───
const StripeBar: React.FC = () => (
  <div
    style={{
      width: '100vw', 
      height: '30px',
      flexShrink: 0,
      background: 'repeating-linear-gradient(-45deg, #1a1a1a 0, #1a1a1a 10px, #f5f3ee 10px, #f5f3ee 20px)',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      marginTop: '60px',
    }}
    aria-hidden="true"
  />
);

const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Track viewport sizing dynamically to handle conditional layouts statefully
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pageContainerStyle: React.CSSProperties = {
    backgroundColor: '#f5f4f0', 
    color: '#000',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    minHeight: '100vh',
    paddingBottom: isMobile ? '60px' : '120px',
    position: 'relative',
  };

  const sectionStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: isMobile ? '80px 6% 20px 6%' : '80px 4% 20px 4%',
    boxSizing: 'border-box',
  };

  return (
    <div style={pageContainerStyle} id="events">
        {/* Back Button */}
        <button
          onClick={() => navigate('/home')} 
          style={{
            position: 'absolute',
            top: '30px',
            left: isMobile ? '6%' : '4%',
            background: 'none',
            border: 'none',
            color: '#1a1a1a',
            fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: 0,
            zIndex: 100,
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          ← Back
        </button>

        {/* ───────────────────────────────────────────────────────────────────────
            SECTION 1: Overview 
        ─────────────────────────────────────────────────────────────────────── */}
        <section style={sectionStyle}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
              gap: isMobile ? '40px' : '5%', 
              alignItems: 'start' 
            }}>
                
                {/* Left Column: Sculpture Image only */}
                <div>
                    <img 
                        src={FullStatue} 
                        alt="The Lilium Ball Sculpture" 
                        style={{
                            width: '100%',
                            height: 'auto', 
                            maxHeight: isMobile ? '550px' : '800px',
                            objectFit: 'cover', 
                            border: '1px solid #d1d0cb'
                        }}
                    />
                </div>

                {/* Right Column: Title, Info, and Narrative Footer stacked vertically */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%', 
                  justifyContent: 'space-between', 
                  minHeight: isMobile ? 'auto' : '650px',
                  gap: isMobile ? '30px' : '0'
                }}>
                    
                    {/* Top Half: Title & Metadata */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <h1 style={{ fontSize: isMobile ? '36px' : 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1, margin: 0, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                            THE LILIUM BALL<br />CHAPTER II:<br />Adagio
                        </h1>
                        
                        <div style={{ 
                          fontSize: '16px', 
                          lineHeight: 1.6, 
                          fontWeight: 400, 
                          paddingLeft: isMobile ? '0px' : '200px' 
                        }}>
                            <p style={{ margin: '0 0 20px 0', fontWeight: 500 }}>May 30, 2026</p>
                            <p style={{ margin: '0 0 30px 0' }}>Hong Kong-Canada Entrepreneurs<br />Association (HKECC)</p>
                            
                            <div style={{ marginTop: '20px' }}>
                                <p style={{ margin: 0, fontWeight: 500 }}>Role:</p>
                                <p style={{ margin: 0 }}>Event Design &amp;<br />Creative Support</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Half: Paragraph */}
                    <div style={{ marginTop: isMobile ? '0px' : 'auto', paddingTop: isMobile ? '10px' : '40px' }}>
                        <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: 1.4, fontWeight: 700, margin: 0 }}>
                            The Chapter 2 Lilium Ball celebrated Hong Kong culture, community, and entrepreneurship through an immersive gala experience. C.HAUS OBJEKT had the role to help create key visual and spatial elements that enhanced the atmosphere and storytelling of the event.
                        </p>
                    </div>

                </div>
            </div>

            <StripeBar />
        </section>

      {/* ───────────────────────────────────────────────────────────────────────
          SECTION 2: Featured Sculpture
          ─────────────────────────────────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <div 
          style={{ 
            display: isMobile ? 'flex' : 'grid',
            flexDirection: 'column', 
            gridTemplateColumns: isMobile ? undefined : 'repeat(12, 1fr)', 
            gap: isMobile ? '40px' : '30px 24px',
            position: 'relative' 
          }}
        >
          
          {/* Mobile-Only Header Placement */}
          {isMobile && (
            <div style={{ marginBottom: '10px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 10px 0', textTransform: 'uppercase', lineHeight: 1.1 }}>
                FEATURED<br />SCULPTURE
              </h2>
              <p style={{ fontSize: '16px', margin: 0, lineHeight: 1.4, fontWeight: 500 }}>
                3D Printed<br />Spray-paint
              </p>
            </div>
          )}

          {/* Column 1: Image 1 - Movement */}
          <div style={isMobile ? { width: '100%' } : { gridColumn: 'span 4', gridRow: '1' }}>
            <img 
                src={MayorStatue} 
                alt="Mayor Olivia Chow with the Lilium Ball Sculpture" 
                style={{
                    width: '100%',
                    height: 'auto', 
                    objectFit: 'cover', 
                    border: '1px solid #d1d0cb'
                }}
            />
            <p style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif", fontSize: isMobile ? '24px' : '40px', fontStyle: 'italic', letterSpacing: '0.05em', marginTop: '12px' }}>MOVEMENT</p>
          </div>

          {/* Desktop-Only Header Titles */}
          {!isMobile && (
            <div style={{ gridColumn: '5 / span 8', gridRow: '1', paddingTop: '10px' }}>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 800, margin: '0 0 15px 0', textTransform: 'uppercase', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
                FEATURED<br />SCULPTURE
              </h2>
              <p style={{ fontSize: '18px', margin: 0, lineHeight: 1.4, fontWeight: 500 }}>
                3D Printed<br />Spray-paint
              </p>
            </div>
          )}

          {/* Column 2: Image 2 - Stillness */}
          <div style={isMobile ? { width: '100%' } : { gridColumn: '5 / span 4', gridRow: '2', marginTop: '-100px' }}>
            <img 
                src={AloneStatue} 
                alt="The Lilium Ball Sculpture" 
                style={{
                    width: '100%',
                    height: 'auto', 
                    objectFit: 'cover', 
                    border: '1px solid #d1d0cb'
                }}
            />
            <p style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif", fontSize: isMobile ? '24px' : '40px', fontStyle: 'italic', letterSpacing: '0.05em', marginTop: '12px' }}>STILLNESS</p>
          </div>

          {/* Column 3: Image 3 - Slowness */}
          <div style={isMobile ? { width: '100%' } : { gridColumn: '9 / span 4', gridRow: '2 / span 2', marginTop: '300px' }}>
            <img 
                src={SmallerStatue} 
                alt="The Lilium Ball Sculpture (Smaller Version)" 
                style={{
                    width: '100%',
                    height: 'auto', 
                    objectFit: 'cover', 
                    border: '1px solid #d1d0cb'
                }}
            />
            <p style={{ fontFamily: "'Helvetica Neue', Helvetica, sans-serif", fontSize: isMobile ? '24px' : '40px', fontStyle: 'italic', letterSpacing: '0.05em', marginTop: '12px' }}>SLOWNESS</p>
          </div>

          {/* Column 1: Poised Text Block */}
          <div style={isMobile ? { width: '100%', marginTop: '10px' } : { gridColumn: 'span 5', gridRow: '3', marginTop: '40px' }}>
            <h3 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 800, margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '0.02em' }}>POISED</h3>
            <p style={{ fontSize: isMobile ? '15px' : '18px', lineHeight: 1.5, fontWeight: 700, textAlign: 'left', margin: 0 }}>
              Poised inhabits the suspended space between movement and stillness, where slowness, grace, and deliberate restraint gather into form. Like a breath held between notes, it exists in a state of quiet anticipation: calm yet charged, introspective yet unfolding. Within its stillness lies momentum, a quiet crescendo toward revelation. Each curve, each gesture follows an unspoken rhythm; one that asks not to be understood immediately, but felt.
            </p>
          </div>

        </div>
        <StripeBar />
      </section>

      {/* ───────────────────────────────────────────────────────────────────────
          SECTION 3: Guest Experience Design
          ─────────────────────────────────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', 
          gap: isMobile ? '30px' : '40px' 
        }}>
          
          {/* Massive Offset Editorial Title */}
          <div style={isMobile ? {} : { gridColumn: 'span 8' }}>
            <h2 style={{ fontSize: isMobile ? '38px' : 'clamp(40px, 8vw, 92px)', fontWeight: 800, lineHeight: 0.9, textTransform: 'uppercase', margin: 0, letterSpacing: '-0.03em' }}>
              GUEST<br />EXPERIENCE<br />DESIGN
            </h2>
          </div>

          {/* Left Summary Block */}
          <div style={isMobile ? {} : { gridColumn: 'span 5', marginTop: '20px' }}>
            <p style={{ fontSize: '15px', lineHeight: 1.4, fontWeight: 700, margin: 0 }}>
              As part of the Chapter II Lilium Ball, C.HAUS OBJEKT assisted in developing a cohesive table design that complemented the event's overall visual identity. Drawing inspiration from the elegance and symbolism of the lilium flower, each table setting was thoughtfully curated to enhance the guest experience while maintaining a sophisticated gala atmosphere.
            </p>
          </div>

          {/* Right Copy and Scope Blocks */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '30px', 
            marginTop: isMobile ? '10px' : '200px',
            ...(isMobile ? {} : { gridColumn: '6 / span 7' }) 
          }}>
            <p style={{ fontSize: '15px', lineHeight: 1.4, fontWeight: 700, margin: 0 }}>
              The design combined contemporary styling with refined floral arrangements, custom table numbers, printed menus, and coordinated event materials. Carefully selected textures, lighting, and decorative elements created an intimate and welcoming environment that encouraged connection and celebration throughout the evening.
            </p>

            <p style={{ fontSize: '15px', lineHeight: 1.4, fontWeight: 700, margin: 0 }}>
              Working closely with the event organizers, we ensured that every detail—from the centerpiece compositions to the printed collateral—aligned with the broader event aesthetic, creating a seamless visual experience across the venue.
            </p>

            {/* Scope of Work Bulleted List */}
            <div style={{ marginTop: '10px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 800, margin: '0 0 10px 0', textTransform: 'uppercase' }}>Scope of Work</h4>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '15px', fontWeight: 700, lineHeight: 1.6, listStyleType: 'disc' }}>
                <li>Table Styling &amp; Design Support</li>
                <li>Custom Table Number Design</li>
                <li>Printed Menu &amp; Event Materials</li>
                <li>Decorative Element Coordination</li>
                <li>Venue-Wide Visual Consistency</li>
              </ul>
            </div>
          </div>

        </div>
        <StripeBar />
      </section>

      {/* ───────────────────────────────────────────────────────────────────────
          SECTION 4: Table Setting Media Stack
          ─────────────────────────────────────────────────────────────────────── */}
      <section style={{ ...sectionStyle, maxWidth: '1000px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
            {/* Top Wide Layout View */}
            <img 
                src={Table} 
                alt="Table Setting" 
                style={{
                    width: '100%',
                    height: 'auto', 
                    objectFit: 'cover', 
                    border: '1px solid #d1d0cb'
                }}
            />
          
          {/* Bottom Split Row (Collapses into a fluid column chain on mobile) */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
            gap: '20px' 
          }}>
            <img 
                src={Menu} 
                alt="Table Setting Featuring Menu" 
                style={{
                    width: '100%',
                    height: 'auto', 
                    objectFit: 'cover', 
                    border: '1px solid #d1d0cb'
                }}
            />
            <img 
                src={Decor} 
                alt="Table Setting Featuring Floral Centerpiece" 
                style={{
                    width: '100%',
                    height: 'auto', 
                    objectFit: 'cover', 
                    border: '1px solid #d1d0cb',
                    marginTop: isMobile ? '10px' : '0px'
                }}
            />
          </div>

        </div>
        <StripeBar />
      </section>

      {/* ───────────────────────────────────────────────────────────────────────
          SECTION 5: Photography Backdrop
          ─────────────────────────────────────────────────────────────────────── */}
      <section style={sectionStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: isMobile ? '38px' : 'clamp(32px, 6vw, 68px)', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            PHOTOGRAPHY<br />BACKDROP
          </h2>
          
          <p style={{ fontSize: '14px', lineHeight: 1.4, fontWeight: 700, maxWidth: '500px', margin: 0 }}>
            As part of the Chapter II Lilium Ball, C.HAUS OBJEKT assisted in developing a cohesive table design that complemented the event's overall visual identity. Drawing inspiration from the elegance and symbolism of the lilium flower, each table setting was thoughtfully curated to enhance the guest experience while maintaining a sophisticated gala atmosphere.
          </p>
        </div>

        {/* Full width photography banner display */}
        <img 
            src={HongKong} 
            alt="Hong Kong Backdrop" 
            style={{
                width: '100%',
                height: 'auto', 
                objectFit: 'cover', 
                border: '1px solid #d1d0cb'
            }}
        />
      </section>

    </div>
  );
};

export default EventsPage;