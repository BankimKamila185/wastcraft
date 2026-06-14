import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Home, Building2, Tractor, Warehouse, Users } from 'lucide-react';
import './Customers.css';

const customers = [
  { id: 1, icon: <HardHat size={32} />, title: "Builders & Contractors", type: "Primary" },
  { id: 2, icon: <Home size={32} />, title: "Homeowners", type: "Primary" },
  { id: 3, icon: <Building2 size={32} />, title: "Govt Housing Projects", type: "Primary" },
  { id: 4, icon: <Tractor size={32} />, title: "Farmers", type: "Secondary" },
  { id: 5, icon: <Warehouse size={32} />, title: "Warehouses & Factories", type: "Secondary" },
  { id: 6, icon: <Users size={32} />, title: "Eco-Conscious Consumers", type: "Secondary" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Customers = () => {
  return (
    <section className="section-padding customers-section">
      <div className="container">
        <div className="section-header text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Who We <span className="text-gradient">Create Value For</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-desc"
          >
            Delivering sustainable infrastructure solutions across B2B and B2C markets.
          </motion.p>
        </div>

        <motion.div 
          className="customers-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {customers.map((cust) => (
            <motion.div key={cust.id} variants={itemVariants} className="customer-card glass-card">
              <div className="customer-icon">
                {cust.icon}
              </div>
              <div className="customer-info">
                <span className="customer-type">{cust.type} Market</span>
                <h3>{cust.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Customers;
