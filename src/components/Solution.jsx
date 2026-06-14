import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Factory, Cpu, Home } from 'lucide-react';
import './Solution.css';

const steps = [
  {
    id: 1,
    icon: <Truck size={26} />,
    title: "Collect Plastic",
    desc: "Gather plastic waste from diverse sources.",
    color: "#96CE4D"
  },
  {
    id: 2,
    icon: <Factory size={26} />,
    title: "Process Plastic",
    desc: "Clean and prepare plastic for reuse.",
    color: "#6BBF2A"
  },
  {
    id: 3,
    icon: <Cpu size={26} />,
    title: "Manufacturing",
    desc: "Transform plastic into valuable items.",
    color: "#4CAF1A"
  },
  {
    id: 4,
    icon: <Home size={26} />,
    title: "Use Products",
    desc: "Implement products in infrastructure.",
    color: "#13271C"
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.3 }
  }
};

const stepVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.85 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 16,
      delay: i * 0.18
    }
  })
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
  }
};

const Solution = () => {
  return (
    <section className="solution-section section-padding">
      {/* decorative mesh */}
      <div className="sol-mesh-bg" />

      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <motion.div
            className="solution-badge"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "backOut" }}
          >
            ♻️ Our Process
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            WasteCraft's <span className="text-gradient">Recycling Cycle</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="section-desc"
          >
            Our closed-loop 4-step cycle transforms discarded plastics into premium building materials.
          </motion.p>
        </div>

        {/* Process flow */}
        <div className="process-flow">

          {/* Animated connecting line */}
          <motion.div
            className="process-line"
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Flowing shimmer on top of line */}
            <div className="line-shimmer" />
          </motion.div>

          {/* Steps */}
          <motion.div
            className="process-steps"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                custom={index}
                variants={stepVariants}
                className="process-step"
                whileHover="hovered"
              >
                {/* Step number badge */}
                <motion.div
                  className="step-number"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.18, type: "spring", stiffness: 200 }}
                >
                  {step.id}
                </motion.div>

                {/* Icon circle */}
                <motion.div
                  className="step-icon-wrapper"
                  variants={{
                    hovered: {
                      y: -10,
                      scale: 1.12,
                      backgroundColor: "var(--color-forest-green)",
                      color: "#ffffff",
                      boxShadow: "0 20px 40px rgba(150, 206, 77, 0.3)"
                    }
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {step.icon}

                  {/* Pulse ring */}
                  <motion.div
                    className="step-pulse-ring"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.4,
                      ease: "easeOut"
                    }}
                  />
                </motion.div>

                {/* Text */}
                <motion.h3
                  variants={{ hovered: { color: "var(--color-accent-green)" } }}
                >
                  {step.title}
                </motion.h3>
                <p>{step.desc}</p>

                {/* Connector arrow for mobile */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="step-arrow"
                    initial={{ opacity: 0, y: -5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.2 }}
                  >
                    ↓
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom label row */}
        <motion.div
          className="cycle-label-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <span className="cycle-label">
            <span className="cycle-dot" />
            Closed-Loop System
          </span>
          <span className="cycle-label">
            <span className="cycle-dot cycle-dot--orange" />
            Zero Landfill Target
          </span>
          <span className="cycle-label">
            <span className="cycle-dot cycle-dot--blue" />
            Carbon Positive
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Solution;
