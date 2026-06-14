import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './Impact.css';

const impactData = [
  { id: 1, value: 10000, suffix: "+", label: "KG Plastic Recycled" },
  { id: 2, value: 500, suffix: "+", label: "Products Manufactured" },
  { id: 3, value: 100, suffix: "+", label: "Customers" },
  { id: 4, value: 50, suffix: "+", label: "Tons CO₂ Reduced" }
];

// Custom hook for counting animation
const useCounter = (end, duration = 2000, startWhenInView = false) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (startWhenInView && !isInView) return;

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutQuart)
      const easePercentage = 1 - Math.pow(1 - percentage, 4);
      
      setCount(Math.floor(end * easePercentage));
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, isInView, startWhenInView]);

  return { count, ref };
};

const CounterItem = ({ data }) => {
  const { count, ref } = useCounter(data.value, 2500, true);
  
  return (
    <motion.div 
      ref={ref}
      className="impact-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="impact-number text-gradient">
        {count.toLocaleString()}{data.suffix}
      </div>
      <div className="impact-label">{data.label}</div>
    </motion.div>
  );
};

const Impact = () => {
  return (
    <section className="section-padding impact-section">
      <div className="impact-bg-overlay"></div>
      <div className="container position-relative">
        <div className="section-header text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ color: 'var(--color-forest-green)' }}
          >
            Measurable <span className="text-gradient">Impact</span>
          </motion.h2>
        </div>

        <div className="impact-grid">
          {impactData.map(item => (
            <CounterItem key={item.id} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
