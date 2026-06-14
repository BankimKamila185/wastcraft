import React from 'react';
import './Partnerships.css';

const partners = [
  "Municipal Corporations", "Waste Collectors", "Recycling Centers", 
  "Construction Companies", "NGOs", "Technology Partners",
  "Municipal Corporations", "Waste Collectors", "Recycling Centers", 
  "Construction Companies", "NGOs", "Technology Partners" // Duplicated for seamless scrolling
];

const Partnerships = () => {
  return (
    <section className="partnerships-section">
      <div className="container">
        <p className="partners-label">POWERED BY STRATEGIC PARTNERSHIPS</p>
      </div>
      
      <div className="marquee-container">
        <div className="marquee-content">
          {partners.map((partner, index) => (
            <div key={index} className="partner-logo">
              {partner}
            </div>
          ))}
          {/* Duplicate again for extra safety on wide screens */}
          {partners.map((partner, index) => (
            <div key={`dup-${index}`} className="partner-logo">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partnerships;
