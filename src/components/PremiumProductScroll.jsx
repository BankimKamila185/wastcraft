import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './PremiumProductScroll.css';

const colors = [
  { id: 'green', name: 'Forest Green', value: '#1E3E2A', glow: 'rgba(150,206,77,0.22)', filter: 'hue-rotate(0deg) saturate(1) brightness(1)' },
  { id: 'red', name: 'Terracotta Red', value: '#A24B3B', glow: 'rgba(162,75,59,0.22)', filter: 'sepia(0.5) hue-rotate(315deg) saturate(2) brightness(0.9)' },
  { id: 'slate', name: 'Slate Gray', value: '#64748B', glow: 'rgba(100,116,139,0.25)', filter: 'grayscale(0.9) brightness(1.2)' },
  { id: 'charcoal', name: 'Charcoal Black', value: '#1E293B', glow: 'rgba(30,41,59,0.3)', filter: 'grayscale(1) brightness(0.45)' },
];

const PremiumProductScroll = ({ onRequestSample }) => {
  const containerRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 3D Transforms based on scroll
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, -5, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);
  
  // Text Opacity fades based on scroll sections
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 1]);

  // Text Y translations for smooth reveal
  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [50, 0, -50]);
  const y3 = useTransform(scrollYProgress, [0.7, 0.85], [50, 0]);

  return (
    <div className="premium-scroll-container" ref={containerRef}>
      <div className="sticky-viewport">
        {/* Background gradient that shifts subtly */}
        <motion.div 
          className="scroll-bg-glow"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]),
            background: `radial-gradient(circle, ${selectedColor.glow} 0%, rgba(10,31,24,0) 70%)`
          }}
        />

        {/* The 3D Product Image */}
        <div className="product-3d-wrapper">
          <motion.img 
            src="/product-tile.png" 
            alt="WasteCraft Tile" 
            className="product-3d-image"
            style={{ 
              rotateX, 
              rotateY, 
              scale,
              z: 100, // force hardware acceleration
              filter: `drop-shadow(0 30px 40px rgba(0,0,0,0.6)) ${selectedColor.filter}`
            }}
          />
        </div>

        {/* Floating Color Selector */}
        <div className="color-selector-floating">
          <span className="color-selector-label">Color: <strong>{selectedColor.name}</strong></span>
          <div className="color-dots">
            {colors.map(c => (
              <button
                key={c.id}
                className={`color-dot ${selectedColor.id === c.id ? 'active' : ''}`}
                style={{ backgroundColor: c.value }}
                onClick={() => setSelectedColor(c)}
                aria-label={`Select ${c.name}`}
              />
            ))}
          </div>
        </div>

        {/* Feature Text Sections */}
        <div className="scroll-text-container">
          <motion.div className="scroll-feature left-aligned" style={{ opacity: opacity1, y: y1 }}>
            <h2 className="premium-title">UV & Heat Resistant</h2>
            <p>Engineered with specialized UV stabilizers, our tiles block intense solar radiation, significantly reducing indoor temperatures and slashing electricity bills in extreme climates.</p>
          </motion.div>

          <motion.div className="scroll-feature right-aligned" style={{ opacity: opacity2, y: y2 }}>
            <h2 className="premium-title text-gradient-bright">Unbreakable Strength</h2>
            <p>Forged from high-density recycled polymers, these tiles offer impact resistance far superior to traditional clay or concrete. They will never crack, shatter, or corrode under heavy stress.</p>
          </motion.div>

          <motion.div className="scroll-feature center-aligned" style={{ opacity: opacity3, y: y3 }}>
            <h2 className="premium-title">100% Eco-Friendly</h2>
            <p>Every single tile diverts thousands of single-use plastics from our rivers and landfills. Build your legacy while cleaning the planet.</p>
            <button className="btn-primary mt-4" style={{ marginTop: '2rem' }} onClick={onRequestSample}>Request a Sample</button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PremiumProductScroll;
