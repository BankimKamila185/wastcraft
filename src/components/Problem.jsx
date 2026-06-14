import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, ThermometerSun, IndianRupee, Factory } from 'lucide-react';
import './Problem.css';

const stats = [
  {
    id: 1,
    icon: <AlertTriangle size={32} className="stat-icon" />,
    title: "Massive Plastic Pollution",
    value: "Rivers",
    suffix: "& Streets",
    desc: "Unmanaged plastic waste ends up choking landfills, rivers, and streets across India."
  },
  {
    id: 2,
    icon: <ThermometerSun size={32} className="stat-icon" />,
    title: "Extreme Heat",
    value: "High",
    suffix: "Electricity Bills",
    desc: "Rising temperatures cause hotter buildings, driving up cooling costs drastically."
  },
  {
    id: 3,
    icon: <IndianRupee size={32} className="stat-icon" />,
    title: "Expensive Materials",
    value: "Costly",
    suffix: "Construction",
    desc: "Traditional construction and infrastructure materials are becoming increasingly expensive."
  },
  {
    id: 4,
    icon: <Factory size={32} className="stat-icon" />,
    title: "Limited Solutions",
    value: "Low",
    suffix: "Recycling",
    desc: "There is a growing demand for eco-friendly products, but limited large-scale recycling solutions."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

const Problem = () => {
  return (
    <section className="section-padding problem-section">
      {/* Animated background orbs */}
      <div className="problem-bg-orb orb-1" />
      <div className="problem-bg-orb orb-2" />

      <div className="container">
        <div className="section-header text-center">
          <motion.div
            className="problem-badge"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "backOut" }}
          >
            ⚠️ The Challenge
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            India's <span className="text-gradient">Plastic Waste</span> Crisis
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="section-desc"
          >
            We are facing an unprecedented environmental challenge. Traditional disposal methods are failing.
          </motion.p>
        </div>

        <motion.div
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              variants={cardVariants}
              className="stat-card glass-card"
              whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
            >
              <motion.div
                className="stat-icon-wrapper"
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5, ease: "backOut" }}
              >
                {stat.icon}
              </motion.div>
              <div className="stat-content">
                <h3>{stat.title}</h3>
                <div className="stat-number">
                  <motion.span
                    className="value"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  >
                    {stat.value}
                  </motion.span>
                  <span className="suffix">{stat.suffix}</span>
                </div>
                <p>{stat.desc}</p>
              </div>
              <div className="card-glow" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
