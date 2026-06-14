import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Recycle, Leaf, Zap, Building2, ShieldCheck } from 'lucide-react';
import './FutureVision.css';

const futureProducts = [
  { label: "Wall Panels", icon: <Building2 size={16} /> },
  { label: "Smart Roofing Systems", icon: <Zap size={16} /> },
  { label: "Infrastructure Materials", icon: <Recycle size={16} /> },
  { label: "Climate-Tech Construction Solutions", icon: <Leaf size={16} /> }
];

const cardsData = [
  {
    id: 0,
    title: "Closed-Loop Manufacturing",
    icon: <Recycle size={24} />,
    value: "75% Waste Diverted",
    desc: "Every single tile manufactured is designed to be 100% recyclable, ensuring zero construction waste reaches the landfill.",
    color: "var(--color-accent-green)",
    glow: "rgba(150, 206, 77, 0.25)"
  },
  {
    id: 1,
    title: "Carbon-Lock Materials",
    icon: <Leaf size={24} />,
    value: "-1.5kg CO₂ per Tile",
    desc: "Locks carbon permanently out of the atmosphere and into building products, replacing high-emission cement materials.",
    color: "#4FA56A",
    glow: "rgba(79, 165, 106, 0.25)"
  },
  {
    id: 2,
    title: "Thermal Insulation",
    icon: <Zap size={24} />,
    value: "3x Cooling Efficiency",
    desc: "Smart composite tiles reflecting solar heat, dramatically lowering indoor cooling costs and electricity consumption.",
    color: "#a3e635",
    glow: "rgba(163, 230, 53, 0.25)"
  }
];

const FutureVision = () => {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section className="section-padding future-section">
      <div className="fv-bg-gradient" />

      <div className="container">
        <div className="future-layout">

          {/* ── Left Content ── */}
          <div className="future-content">
            <motion.div
              className="future-badge"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              🌱 Future Vision
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Building India's{' '}
              <span className="text-gradient">Circular Materials</span>{' '}
              Company
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="section-desc"
            >
              Roof tiles are just the beginning. We are scaling our technology to create a comprehensive suite of sustainable building materials.
            </motion.p>

            {/* Grid of future products */}
            <motion.ul
              className="future-list"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              {futureProducts.map((product, index) => (
                <motion.li
                  key={index}
                  className="future-list-item"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <span className="future-list-icon">{product.icon}</span>
                  <span className="future-list-label">{product.label}</span>
                  <ArrowRight size={16} className="list-chevron" />
                </motion.li>
              ))}
            </motion.ul>

            {/* Micro stats banner */}
            <motion.div
              className="fv-stats-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="fv-stat">
                <span className="fv-stat-value">50K+</span>
                <span className="fv-stat-label">Tonnes Diverted</span>
              </div>
              <div className="fv-stat">
                <span className="fv-stat-value">12K+</span>
                <span className="fv-stat-label">Homes Outfitted</span>
              </div>
              <div className="fv-stat">
                <span className="fv-stat-value">Zero</span>
                <span className="fv-stat-label">Landfill Policy</span>
              </div>
            </motion.div>

            <motion.button
              className="btn-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.85 }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Read Our Vision
              <ArrowRight size={16} />
            </motion.button>
          </div>

          {/* ── Right Visual (3D Perspective Card Deck) ── */}
          <motion.div
            className="future-visual-deck"
            initial={{ opacity: 0, scale: 0.88, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Ambient decorative background glow */}
            <div className="deck-glow-orb" />
            <div className="deck-radial-lines" />

            <div className="perspective-container">
              <div className="perspective-stack">
                {cardsData.map((card, index) => {
                  // Cycle indexing: activeCard is index 0, followed by index 1, index 2
                  const diff = (index - activeCard + 3) % 3;
                  const isActive = diff === 0;

                  return (
                    <motion.div
                      key={card.id}
                      className={`perspective-card ${isActive ? 'active' : ''}`}
                      style={{
                        '--accent-color': card.color,
                        boxShadow: isActive ? `0 30px 60px -15px ${card.glow}` : '0 10px 30px -10px rgba(0,0,0,0.4)',
                        zIndex: 3 - diff,
                        cursor: isActive ? 'default' : 'pointer'
                      }}
                      animate={{
                        x: diff * 28,
                        y: -diff * 28,
                        z: -diff * 40,
                        scale: 1 - diff * 0.05,
                        opacity: 1 - diff * 0.3,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 140,
                        damping: 18
                      }}
                      onClick={() => {
                        if (!isActive) setActiveCard(index);
                      }}
                      whileHover={isActive ? { y: -12, transition: { duration: 0.2 } } : { y: -diff * 28 - 6 }}
                    >
                      {/* Top line header */}
                      <div className="card-header">
                        <span className="card-icon-wrap" style={{ color: card.color }}>
                          {card.icon}
                        </span>
                        <div className="card-header-titles">
                          <span className="card-title-pre">WasteCraft Pillar</span>
                          <h4 className="card-title-name">{card.title}</h4>
                        </div>
                      </div>

                      {/* Main Metric Value */}
                      <div className="card-body">
                        <div className="card-metric-value" style={{ color: card.color }}>
                          {card.value}
                        </div>
                        <p className="card-metric-desc">
                          {card.desc}
                        </p>
                      </div>

                      {/* Card Footer Indicator */}
                      <div className="card-footer-indicator">
                        <span className="card-num">0{card.id + 1}</span>
                        <span className="card-dots-graphic" />
                        <span className="card-tag"><ShieldCheck size={12} /> Verified</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Click to flip tip */}
            <div className="deck-interaction-hint">
              <span>Click background cards to shuffle stack</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FutureVision;
