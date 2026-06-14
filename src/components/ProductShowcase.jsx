import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, CloudRain, ThermometerSun, ShieldCheck, Leaf, Recycle } from 'lucide-react';
import './ProductShowcase.css';

const features = [
  { id: 1, icon: <Sun size={24} />, title: "UV Resistant", desc: "Formulated to withstand harsh sunlight without degrading." },
  { id: 2, icon: <CloudRain size={24} />, title: "Waterproof", desc: "Zero water absorption, preventing leaks and mold." },
  { id: 3, icon: <ThermometerSun size={24} />, title: "Heat Resistant", desc: "High thermal stability for extreme temperatures." },
  { id: 4, icon: <ShieldCheck size={24} />, title: "Durable", desc: "Outlasts traditional clay or concrete tiles." },
  { id: 5, icon: <Leaf size={24} />, title: "Eco-Friendly", desc: "Non-toxic and safe for rainwater harvesting." },
  { id: 6, icon: <Recycle size={24} />, title: "Sustainable", desc: "100% recyclable at the end of its lifecycle." }
];

const productImages = [
  "/product-tile.png",
  "/product-tile-2.png",
  "/product-tile-3.png"
];

const ProductShowcase = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <section className="section-padding product-showcase">
      <div className="container">
        <div className="section-header text-center text-white">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ color: 'var(--color-white)' }}
          >
            Engineered For <span className="text-gradient">Performance</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-desc"
            style={{ color: 'rgba(255,255,255,0.8)' }}
          >
            Meet the WasteCraft Recycled Roof Tile. Superior strength, premium aesthetics, zero compromise. Available in multiple sustainable tones.
          </motion.p>
        </div>

        <div className="product-layout">
          <div className="product-features-left">
            {features.slice(0, 3).map((feat, idx) => (
              <motion.div 
                key={feat.id} 
                className="feature-card align-right"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="feature-content">
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </div>
                <div className="feature-icon">{feat.icon}</div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="product-center-display"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <div className="showcase-3d-wrapper">
              <motion.div 
                className="roof-tile-image-wrapper"
                animate={{ rotateY: [0, 5, -5, 0], y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImageIndex}
                    src={productImages[activeImageIndex]} 
                    alt="WasteCraft Recycled Roof Tile" 
                    className="product-image"
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(4px)" }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </motion.div>
              <div className="shadow-ellipse"></div>
              
              <div className="product-thumbnails">
                {productImages.map((src, idx) => (
                  <button 
                    key={idx} 
                    className={`thumbnail-btn ${activeImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View color variant ${idx + 1}`}
                  >
                    <img src={src} alt={`Variant ${idx + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="product-features-right">
            {features.slice(3, 6).map((feat, idx) => (
              <motion.div 
                key={feat.id} 
                className="feature-card align-left"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="feature-icon">{feat.icon}</div>
                <div className="feature-content">
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
