import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call without logging sensitive info
    setTimeout(() => {
      setStatus('success');
      // Reset form to clear memory state
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      
      // Return to idle after a few seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section className="section-padding contact-section" id="contact">
      <div className="contact-bg"></div>
      <div className="container position-relative">
        <div className="contact-layout">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Partner With <span className="text-gradient">Us</span></h2>
            <p className="section-desc">
              Whether you're a developer looking for sustainable materials or an investor sharing our vision, we'd love to connect.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="item-label">General Inquiries</div>
                <a href="mailto:hello@wastecraft.in" className="item-value contact-link">
                  hello@wastecraft.in
                </a>
              </div>
              <div className="contact-item">
                <div className="item-label">Headquarters</div>
                <div className="item-value">Innovation Hub, Bengaluru, India</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-wrapper"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-form-card">
              {status === 'success' ? (
                <div className="success-state">
                  <CheckCircle size={48} className="success-icon" />
                  <h3>Message Sent!</h3>
                  <p>We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => handleChange(e.target)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Work Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => handleChange(e.target)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company" 
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={(e) => handleChange(e.target)}
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="message">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      placeholder="How can we help?"
                      rows="4"
                      value={formData.message}
                      onChange={(e) => handleChange(e.target)}
                    ></textarea>
                  </div>
                  
                  <div className="form-group full-width">
                    <button 
                      type="submit" 
                      className="submit-btn" 
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? 'Sending...' : (
                        <>Send Message <Send size={18} /></>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
