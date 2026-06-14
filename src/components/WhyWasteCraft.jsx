import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Globe, RefreshCcw, Zap } from 'lucide-react';
import './WhyWasteCraft.css';

const reasons = [
  {
    id: 1,
    icon: <Activity size={32} />,
    title: "Reduce Plastic Waste",
    desc: "Every tile we manufacture removes up to 2.5kg of unrecyclable plastic from our environment."
  },
  {
    id: 2,
    icon: <Globe size={32} />,
    title: "Sustainable Materials",
    desc: "Replacing carbon-heavy concrete and clay with low-emission, eco-friendly alternatives."
  },
  {
    id: 3,
    icon: <RefreshCcw size={32} />,
    title: "Circular Economy",
    desc: "Our products are designed to be 100% recycled again at the end of their decades-long lifespan."
  },
  {
    id: 4,
    icon: <Zap size={32} />,
    title: "Future Ready",
    desc: "Building infrastructure that is climate-resilient, lightweight, and engineered for tomorrow."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
};

const WhyWasteCraft = () => {
  return (
    <section className="section-padding why-section">
      <div className="container">
        <div className="section-header text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why <span className="text-gradient">WasteCraft?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-desc"
          >
            We aren't just making building materials; we're redefining how the world builds.
          </motion.p>
        </div>

        <motion.div 
          className="why-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {reasons.map((reason) => (
            <motion.div key={reason.id} variants={cardVariants} className="why-card">
              <div className="why-icon">{reason.icon}</div>
              <h3>{reason.title}</h3>
              <p>{reason.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyWasteCraft;
