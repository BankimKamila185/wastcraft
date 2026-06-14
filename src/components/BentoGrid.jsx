import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Droplets, Sun, Home, HardHat, Building2, Wind, Scale, Trash2, Compass, Hammer, Briefcase, Package, Check } from 'lucide-react';
import './BentoGrid.css';

const markets = [
  { icon: <HardHat size={20} />, title: "Contractors", desc: "Lower breakage costs" },
  { icon: <Home size={20} />, title: "Homeowners", desc: "Cooler interiors" },
  { icon: <Building2 size={20} />, title: "Govt Projects", desc: "Sustainable infra" },
  { icon: <Compass size={20} />, title: "Architects", desc: "LEED & green credits" },
  { icon: <Hammer size={20} />, title: "Builders", desc: "Fast modular install" },
  { icon: <Briefcase size={20} />, title: "Corporates", desc: "ESG compliance goals" },
  { icon: <Package size={20} />, title: "Retailers", desc: "High-demand eco stock" }
];

const WaterDropletAnimation = () => {
  return (
    <div className="card-animation-layer">
      <motion.div
        initial={{ y: 55, x: 41, scale: 1, opacity: 0 }}
        animate={{
          y: [55, 145],
          opacity: [0, 1, 1, 0],
          scale: [0.8, 1, 0.8, 0.4]
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeIn"
        }}
        style={{
          position: 'absolute',
          width: '6px',
          height: '10px',
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          backgroundColor: '#2a6f97',
          left: 0,
          top: 0
        }}
      />
      <motion.div
        initial={{ y: 144, x: 31, scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.5, 3],
          opacity: [0, 0.6, 0]
        }}
        transition={{
          duration: 1.2,
          delay: 2.1,
          repeat: Infinity,
          repeatDelay: 1.0,
          ease: "easeOut"
        }}
        style={{
          position: 'absolute',
          width: '20px',
          height: '6px',
          borderRadius: '50%',
          border: '1.5px solid #2a6f97',
          left: 0,
          top: 0
        }}
      />
    </div>
  );
};

const SunGlowAnimation = () => {
  return (
    <div className="card-animation-layer">
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.35, 0.15]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#ffd700',
          filter: 'blur(12px)',
        }}
      />
    </div>
  );
};

const WindAnimation = () => {
  return (
    <div className="card-animation-layer">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ x: -60, y: 55 + i * 25, opacity: 0 }}
          animate={{
            x: [-60, 220],
            opacity: [0, 0.3, 0.3, 0]
          }}
          transition={{
            duration: 3,
            delay: i * 0.9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: '35px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #00b4d8, transparent)',
            borderRadius: '2px',
            left: 0,
            top: 0
          }}
        />
      ))}
    </div>
  );
};

const LightnessAnimation = () => {
  return (
    <div className="card-animation-layer">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ y: 220, x: 45 + i * 45, scale: 0.8, opacity: 0 }}
          animate={{
            y: [220, 20],
            opacity: [0, 0.4, 0.4, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 3.5 + i * 0.5,
            delay: i * 0.7,
            repeat: Infinity,
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'rgba(108, 117, 125, 0.25)',
            filter: 'blur(1px)',
            left: 0,
            top: 0
          }}
        />
      ))}
    </div>
  );
};

const AnimatedStatCard = ({ className, icon, endVal, suffix, prefix = "", label, desc, delay, startVal = 0, extraAnimation }) => {
  const [val, setVal] = React.useState(startVal);
  const cardRef = React.useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const duration = 1500; // ms

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // easeOutQuad
      const easedProgress = percentage * (2 - percentage);
      
      const current = startVal + (endVal - startVal) * easedProgress;
      setVal(Math.round(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setVal(endVal);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, startVal, endVal]);

  return (
    <motion.div 
      ref={cardRef}
      className={`bento-card ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, delay }}
      style={{ overflow: 'hidden' }}
    >
      {extraAnimation}
      {icon}
      <div className="impact-data">
        <span className="impact-val">
          {prefix}{val}{suffix}
        </span>
        <span className="impact-label">{label}</span>
        {desc && <p className="impact-desc">{desc}</p>}
      </div>
    </motion.div>
  );
};

const BentoGrid = () => {
  return (
    <section className="bento-section">
      <div className="container">
        
        <div className="bento-grid">
          
          {/* Card 1: Main Product Visual (Large) */}
          <motion.div 
            className="bento-card product-visual-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bento-content">
              <span className="bento-badge">Flagship Product</span>
              <h2>WasteCraft Eco-Tile</h2>
              <p>Unbreakable, lightweight, and engineered from 100% recycled polymers.</p>
              
              <ul className="product-specs-list">
                <li><Check size={16} className="spec-check-icon" /> 5x Stronger than concrete</li>
                <li><Check size={16} className="spec-check-icon" /> Class-A fire & UV rated</li>
                <li><Check size={16} className="spec-check-icon" /> 50+ Years maintenance-free</li>
                <li><Check size={16} className="spec-check-icon" /> 100% Waterproof & weather-proof</li>
                <li><Check size={16} className="spec-check-icon" /> 3x Lighter for fast structural setup</li>
                <li><Check size={16} className="spec-check-icon" /> Interlocking fit for easy installation</li>
              </ul>
            </div>
            <img src="/product-tile-2.png" alt="Eco Tile" className="bento-image-main" />
          </motion.div>

          {/* Card 2: The Core Problem (Wide) */}
          <motion.div 
            className="bento-card problem-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.1 }}
          >
            <div className="bento-content">
              <h3>The Plastic Crisis</h3>
              <p>India generates 9.4 million tonnes of plastic waste annually. We intercept this waste before it reaches rivers and landfills, transforming it into high-value infrastructure.</p>
              
              <div className="problem-stats-mini">
                <div className="mini-stat">
                  <span className="mini-val">40%</span>
                  <span className="mini-label">Uncollected Waste</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-val">4B+</span>
                  <span className="mini-label">Tonnes Globally</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Target Markets (Tall) */}
          <motion.div 
            className="bento-card markets-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.2 }}
          >
            <div className="bento-content">
              <h3>Built For Everyone</h3>
              <div className="market-list">
                {markets.map((m, idx) => (
                  <div key={idx} className="market-item">
                    <div className="market-icon">{m.icon}</div>
                    <div>
                      <h4>{m.title}</h4>
                      <span>{m.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 4: Impact Stat 1 (Water Used) */}
          <AnimatedStatCard
            className="impact-card-water"
            icon={<Droplets className="impact-icon animated-droplet" size={32} />}
            startVal={15}
            endVal={0}
            suffix=""
            label="Water Used in Production"
            desc="Our dry closed-loop process requires zero fresh water, saving 15L per tile."
            delay={0.3}
            extraAnimation={<WaterDropletAnimation />}
          />

          {/* Card 5: Impact Stat 2 (Temp Reduction) */}
          <AnimatedStatCard
            className="impact-card-temp"
            icon={<Sun className="impact-icon animated-sun" size={32} />}
            startVal={0}
            endVal={-5}
            suffix="°C"
            label="Indoor Temp Reduction"
            desc="High thermal reflectivity reduces roof temp, lowering indoor AC costs."
            delay={0.4}
            extraAnimation={<SunGlowAnimation />}
          />

          {/* Card 6: Carbon Footprint (New - Small) */}
          <AnimatedStatCard
            className="impact-card-co2"
            icon={<Wind className="impact-icon animated-wind" size={32} />}
            startVal={0}
            endVal={90}
            suffix="%"
            label="Lower Carbon Footprint"
            desc="Drastically lower manufacturing emissions than standard clay or concrete tiles."
            delay={0.45}
            extraAnimation={<WindAnimation />}
          />

          {/* Card 7: Weight (New - Small) */}
          <AnimatedStatCard
            className="impact-card-weight"
            icon={<Scale className="impact-icon animated-scale" size={32} />}
            startVal={1}
            endVal={3}
            suffix="x"
            label="Lighter than Concrete"
            desc="3x Lighter weight speeds up installation and reduces structural support load."
            delay={0.5}
            extraAnimation={<LightnessAnimation />}
          />

          {/* Card 8: Circular Economy (Wide) */}
          <motion.div 
            className="bento-card circular-card premium-split-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.55 }}
          >
            <div className="bento-content">
              <h3>100% Circular</h3>
              <p>At the end of their decades-long lifespan, our tiles can be melted down and remanufactured. Zero waste, infinite loops.</p>
            </div>
            <div className="split-card-visual-container">
              <div className="split-card-glow" />
              <div className="floating-icon-box">
                <Leaf size={32} className="split-card-icon circular-leaf-icon" />
              </div>
            </div>
          </motion.div>

          {/* Card 9: Landfill Mission (New - Wide) */}
          <motion.div 
            className="bento-card landfill-card premium-split-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.6 }}
          >
            <div className="split-card-visual-container">
              <div className="split-card-glow" />
              <div className="floating-icon-box">
                <Trash2 size={32} className="split-card-icon landfill-trash-icon" />
              </div>
            </div>
            <div className="bento-content">
              <h3>Zero Landfill Mission</h3>
              <p>By sourcing post-consumer polymers directly, we divert tons of municipal plastic trash away from local landfills daily.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
