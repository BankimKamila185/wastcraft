import React from 'react';
import { Ruler, Sparkles, Scale, ShieldCheck, Flame, Compass, Thermometer, Hammer } from 'lucide-react';
import './ProductSpecs.css';

const specData = [
  { icon: <Ruler size={22} />, title: "Dimensions", value: "400mm x 304mm", desc: "Technical interlocking modular tile footprint." },
  { icon: <Compass size={22} />, title: "Thickness", value: "29mm (Max)", desc: "Tapered profile for structural resilience and drainage." },
  { icon: <Scale size={22} />, title: "Unit Weight", value: "1.8 kg", desc: "Up to 50% lighter than traditional concrete or clay." },
  { icon: <ShieldCheck size={22} />, title: "Lifespan", value: "50+ Years", desc: "Designed for extreme weathering, backed by warranty." },
  { icon: <Flame size={22} />, title: "Fire Rating", value: "Class B1", desc: "Flame-retardant self-extinguishing polymer matrix." },
  { icon: <Hammer size={22} />, title: "Flexural Strength", value: ">15 MPa", desc: "Excellent load-bearing capabilities under deflection." },
  { icon: <Thermometer size={22} />, title: "Thermal Index", value: "0.18 W/m·K", desc: "High thermal reflectivity reduces sub-roof temperatures." },
  { icon: <Sparkles size={22} />, title: "Composition", value: "100% Recycled", desc: "Made entirely from post-consumer mixed polymers." }
];

const ProductSpecs = () => {
  return (
    <section className="specs-section" id="specs">
      <div className="container">
        <div className="specs-header text-center">
          <span className="specs-tag">Technical Details</span>
          <h2>Engineered to <span className="text-gradient">Outlast</span></h2>
          <p className="specs-subtitle">Rigorous lab testing ensures our tiles exceed national building standards while keeping tons of plastic out of nature.</p>
        </div>

        <div className="specs-layout">
          {/* Blueprint/Visual Illustration on Left */}
          <div className="specs-visual-card">
            <div className="blueprint-overlay"></div>
            <div className="blueprint-content">
              <span className="blueprint-label">Product Blueprint</span>
              <h3 className="blueprint-title">WasteCraft Eco-Tile</h3>
              <div className="blueprint-tile-diagram">
                <svg viewBox="0 0 460 470" width="100%" height="100%" className="blueprint-svg">
                  {/* Side Profile (Left) */}
                  <path d="M 50,60 L 50,420 L 79,420 L 79,390 L 60,330 L 60,150 L 79,90 L 59,90 L 59,60 Z" 
                        fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                  
                  {/* Height Dimension (400) */}
                  <line x1="30" y1="60" x2="30" y2="420" stroke="#0ea5e9" strokeWidth="1" />
                  <line x1="25" y1="60" x2="35" y2="60" stroke="#0ea5e9" strokeWidth="1" />
                  <line x1="25" y1="420" x2="35" y2="420" stroke="#0ea5e9" strokeWidth="1" />
                  <text x="18" y="240" fill="#ffffff" fontSize="12" fontFamily="monospace" fontWeight="600" textAnchor="middle" transform="rotate(-90 18 240)">400</text>
                  
                  {/* Width Dimension (29) */}
                  <line x1="50" y1="440" x2="79" y2="440" stroke="#0ea5e9" strokeWidth="1" />
                  <line x1="50" y1="435" x2="50" y2="445" stroke="#0ea5e9" strokeWidth="1" />
                  <line x1="79" y1="435" x2="79" y2="445" stroke="#0ea5e9" strokeWidth="1" />
                  <text x="64.5" y="458" fill="#ffffff" fontSize="12" fontFamily="monospace" fontWeight="600" textAnchor="middle">29</text>

                  {/* Front View / Top View (Right) */}
                  <path d="M 280,420 L 143,260 L 143,220 L 255,35 L 280,10 L 305,35 L 417,220 L 417,260 Z" 
                        fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                  
                  {/* Center seam line */}
                  <line x1="280" y1="10" x2="280" y2="420" stroke="#38bdf8" strokeWidth="1" strokeDasharray="1 3" />
                  
                  {/* Top Tab separating line */}
                  <line x1="255" y1="35" x2="305" y2="35" stroke="#38bdf8" strokeWidth="1" />
                  
                  {/* Screw hole */}
                  <circle cx="280" cy="27" r="3" fill="none" stroke="#38bdf8" strokeWidth="1" />
                  
                  {/* Right side overlap seam (dashed) */}
                  <line x1="417" y1="220" x2="417" y2="260" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="417" y1="220" x2="442" y2="185" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="417" y1="260" x2="442" y2="295" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
                  
                  {/* Top Tab slant label (30) */}
                  <line x1="280" y1="10" x2="292" y2="0" stroke="#0ea5e9" strokeWidth="1" />
                  <line x1="305" y1="35" x2="317" y2="25" stroke="#0ea5e9" strokeWidth="1" />
                  <line x1="288" y1="4" x2="309" y2="22" stroke="#0ea5e9" strokeWidth="1" />
                  <line x1="285" y1="8" x2="291" y2="0" stroke="#0ea5e9" strokeWidth="1" />
                  <line x1="306" y1="26" x2="312" y2="18" stroke="#0ea5e9" strokeWidth="1" />
                  <text x="312" y="10" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="600">30</text>
                  
                  {/* Bottom Width Dimension (304) */}
                  <line x1="143" y1="440" x2="417" y2="440" stroke="#0ea5e9" strokeWidth="1" />
                  <line x1="143" y1="435" x2="143" y2="445" stroke="#0ea5e9" strokeWidth="1" />
                  <line x1="417" y1="435" x2="417" y2="445" stroke="#0ea5e9" strokeWidth="1" />
                  <text x="280" y="458" fill="#ffffff" fontSize="12" fontFamily="monospace" fontWeight="600" textAnchor="middle">304</text>
                  
                  {/* Bottom Right Offset Dimension (2) */}
                  <line x1="417" y1="440" x2="425" y2="440" stroke="#0ea5e9" strokeWidth="1" />
                  <line x1="425" y1="435" x2="425" y2="445" stroke="#0ea5e9" strokeWidth="1" />
                  <text x="432" y="458" fill="#ffffff" fontSize="12" fontFamily="monospace" fontWeight="600" textAnchor="middle">2</text>
                </svg>
              </div>
              <div className="blueprint-notes">
                <div className="note-item">
                  <span className="note-dot"></span>
                  <span>Interlocking tabs align seamlessly for fast leak-proof installation.</span>
                </div>
                <div className="note-item">
                  <span className="note-dot"></span>
                  <span>Micro-structured channels promote efficient rainwater drainage.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid of Spec Cards on Right */}
          <div className="specs-grid">
            {specData.map((spec, i) => (
              <div key={i} className="spec-card-item">
                <div className="spec-icon-box">
                  {spec.icon}
                </div>
                <div className="spec-info-box">
                  <h4>{spec.title}</h4>
                  <span className="spec-value">{spec.value}</span>
                  <p className="spec-desc">{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecs;
