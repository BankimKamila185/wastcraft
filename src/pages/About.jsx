import React from 'react';
import { motion } from 'framer-motion';
import WhyWasteCraft from '../components/WhyWasteCraft';
import './Pages.css';

const About = () => {
  return (
    <div className="page-wrapper" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        <motion.div 
          className="about-header text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="page-title">About <span className="text-gradient">WasteCraft</span></h1>
          <p className="page-subtitle">Pioneering the circular economy in construction.</p>
        </motion.div>

        <div className="about-content">
          <motion.div 
            className="about-text glass-card"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>Who We Are</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
              WasteCraft is a climate-tech startup focused on transforming plastic waste into sustainable construction and infrastructure products.
            </p>
            <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>We combine:</p>
            <ul style={{ fontSize: '1.2rem', paddingLeft: '2rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              <li>Recycling</li>
              <li>Sustainable manufacturing</li>
              <li>Eco-friendly materials</li>
              <li>Climate innovation</li>
            </ul>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-forest-green)', fontWeight: '600' }}>
              ...to reduce plastic pollution and build a cleaner future.
            </p>
          </motion.div>
        </div>
      </div>
      
      <WhyWasteCraft />
    </div>
  );
};

export default About;
