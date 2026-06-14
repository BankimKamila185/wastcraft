import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Send, Package } from 'lucide-react';
import './SampleModal.css';

const colorOptions = [
  { id: 'green', name: 'Forest Green' },
  { id: 'red', name: 'Terracotta Red' },
  { id: 'slate', name: 'Slate Gray' },
  { id: 'charcoal', name: 'Charcoal Black' }
];

const projectOptions = [
  "Residential Roofing",
  "Commercial Facility",
  "Municipal / Infrastructure",
  "Architectural Mockup / Pilot",
  "Other"
];

const SampleModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    color: 'green',
    projectType: 'Residential Roofing',
    address: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate submission safely
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        color: 'green',
        projectType: 'Residential Roofing',
        address: ''
      });
    }, 1500);
  };

  const handleReset = () => {
    setStatus('idle');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-root">
          {/* Overlay Backdrop */}
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="modal-container-wrapper">
            <motion.div 
              className="modal-card glass-modal-card"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              {/* Close Button */}
              <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
                <X size={20} />
              </button>

              {status === 'success' ? (
                <div className="modal-success-state text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle size={56} className="modal-success-icon" />
                  </motion.div>
                  <h3>Sample Request Received</h3>
                  <p>Thank you for choosing sustainable materials. We have registered your request and will dispatch your custom WasteCraft Eco-Tile sample kit shortly.</p>
                  <button className="btn-primary w-full" onClick={handleReset}>Close Window</button>
                </div>
              ) : (
                <div className="modal-form-content">
                  <div className="modal-form-header">
                    <div className="modal-header-icon-box">
                      <Package size={22} />
                    </div>
                    <div>
                      <h3>Request an Eco-Tile Sample</h3>
                      <p>Experience the strength, weight, and texture of WasteCraft materials firsthand.</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="modal-form">
                    <div className="modal-form-grid">
                      <div className="form-group-modal">
                        <label htmlFor="name">Full Name</label>
                        <input 
                          type="text" 
                          id="modal-name" 
                          name="name" 
                          required 
                          placeholder="Alex Mercer"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group-modal">
                        <label htmlFor="email">Work Email</label>
                        <input 
                          type="email" 
                          id="modal-email" 
                          name="email" 
                          required 
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group-modal">
                        <label htmlFor="company">Company</label>
                        <input 
                          type="text" 
                          id="modal-company" 
                          name="company" 
                          placeholder="Apex Developers"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group-modal">
                        <label htmlFor="color">Color Variant</label>
                        <select 
                          id="modal-color" 
                          name="color" 
                          value={formData.color}
                          onChange={handleChange}
                        >
                          {colorOptions.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group-modal full-width">
                        <label htmlFor="projectType">Project Application</label>
                        <select 
                          id="modal-projectType" 
                          name="projectType" 
                          value={formData.projectType}
                          onChange={handleChange}
                        >
                          {projectOptions.map((opt, i) => (
                            <option key={i} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group-modal full-width">
                        <label htmlFor="address">Shipping Address</label>
                        <textarea 
                          id="modal-address" 
                          name="address" 
                          required 
                          rows="3" 
                          placeholder="Enter complete delivery details..."
                          value={formData.address}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="modal-submit-btn" 
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting' ? 'Processing...' : (
                        <>Request Sample Kit <Send size={16} /></>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SampleModal;
