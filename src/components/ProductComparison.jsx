import React from 'react';
import { Leaf, Flame, ShieldAlert, Award, AlertCircle, HelpCircle, HardHat } from 'lucide-react';
import './ProductComparison.css';

const ProductComparison = () => {
  return (
    <section className="comparison-section" id="comparison">
      <div className="container">
        <div className="comparison-header text-center">
          <span className="comparison-tag">Material Science</span>
          <h2>How We Stack Up</h2>
          <p className="comparison-subtitle">WasteCraft outperforms standard roofing materials across weight, strength, longevity, and environment.</p>
        </div>

        <div className="comparison-cards-grid">
          {/* 1. CLAY CARD (Competitor) */}
          <div className="comparison-card competitor-card">
            <div className="card-top">
              <div className="card-icon-wrapper">
                <Flame size={24} />
              </div>
              <h3>Clay Roof Tiles</h3>
              <p className="card-subtitle-text">Traditional kiln-fired clay</p>
            </div>
            
            <div className="card-specs-list">
              <div className="card-spec-item">
                <span className="spec-label-title">CO2 Footprint</span>
                <span className="spec-val-badge badge-red">High (Kiln Fired)</span>
              </div>
              <div className="card-spec-item">
                <span className="spec-label-title">Weight per Tile</span>
                <span className="spec-val-badge badge-grey">3.2 kg (Heavy)</span>
              </div>
              <div className="card-spec-item">
                <span className="spec-label-title">Impact Resistance</span>
                <span className="spec-val-badge badge-red">Fragile (Shatters)</span>
              </div>
              <div className="card-spec-item">
                <span className="spec-label-title">Lifespan Rating</span>
                <span className="spec-val-badge badge-grey">30 Years</span>
              </div>
              <div className="card-spec-item">
                <span className="spec-label-title">Water Absorption</span>
                <span className="spec-val-badge badge-red">10% - 15%</span>
              </div>
              <div className="card-spec-item">
                <span className="spec-label-title">Recyclability</span>
                <span className="spec-val-badge badge-red">None (Landfill)</span>
              </div>
            </div>
          </div>

          {/* 2. WASTECRAFT CARD (Highlighted Winner) */}
          <div className="comparison-card featured-winner-card">
            <div className="winner-ribbon">Winner</div>
            <div className="card-top">
              <div className="card-icon-wrapper winner-icon">
                <Leaf size={24} />
              </div>
              <h3>WasteCraft Eco-Tile</h3>
              <p className="card-subtitle-text">Next-gen recycled polymer</p>
            </div>
            
            <div className="card-specs-list">
              <div className="card-spec-item">
                <span className="spec-label-title">CO2 Footprint</span>
                <span className="spec-val-badge badge-green">Carbon Negative</span>
              </div>
              <div className="card-spec-item">
                <span className="spec-label-title">Weight per Tile</span>
                <span className="spec-val-badge badge-green">1.8 kg (Lightest)</span>
              </div>
              <div className="card-spec-item">
                <span className="spec-label-title">Impact Resistance</span>
                <span className="spec-val-badge badge-green">Unbreakable</span>
              </div>
              <div className="card-spec-item">
                <span className="spec-label-title">Lifespan Rating</span>
                <span className="spec-val-badge badge-green">50+ Years</span>
              </div>
              <div className="card-spec-item">
                <span className="spec-label-title">Water Absorption</span>
                <span className="spec-val-badge badge-green">&lt;0.1% (Impermeable)</span>
              </div>
              <div className="card-spec-item">
                <span className="spec-label-title">Recyclability</span>
                <span className="spec-val-badge badge-green">100% Circular</span>
              </div>
            </div>
          </div>

          {/* 3. CONCRETE CARD (Competitor) */}
          <div className="comparison-card competitor-card">
            <div className="card-top">
              <div className="card-icon-wrapper">
                <HardHat size={24} />
              </div>
              <h3>Concrete Tiles</h3>
              <p className="card-subtitle-text">Standard cement-aggregate composite</p>
            </div>
            
            <div className="card-specs-list">
              <div className="card-spec-item">
                <span className="spec-label-title">CO2 Footprint</span>
                <span className="spec-val-badge badge-red">Very High (Cement)</span>
              </div>
              <div className="card-spec-item">
                <span className="spec-label-title">Weight per Tile</span>
                <span className="spec-val-badge badge-red">4.5 kg (Very Heavy)</span>
              </div>
              <div className="card-spec-item">
                <span className="spec-label-title">Impact Resistance</span>
                <span className="spec-val-badge badge-grey">Prone to Cracking</span>
              </div>
              <div className="card-spec-item">
                <span className="spec-label-title">Lifespan Rating</span>
                <span className="spec-val-badge badge-grey">30 Years</span>
              </div>
              <div className="card-spec-item">
                <span className="spec-label-title">Water Absorption</span>
                <span className="spec-val-badge badge-red">8% - 12%</span>
              </div>
              <div className="card-spec-item">
                <span className="spec-label-title">Recyclability</span>
                <span className="spec-val-badge badge-grey">Downcycled aggregate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footnote callouts */}
        <div className="comparison-foot-cards">
          <div className="foot-card">
            <Award size={20} className="foot-icon green" />
            <div>
              <h5>Structural Load Relief</h5>
              <p>WasteCraft tiles save over 1,500 kg of dead weight on a standard residential building, allowing for lighter roof trusses and lower material construction costs.</p>
            </div>
          </div>
          <div className="foot-card">
            <ShieldAlert size={20} className="foot-icon green" />
            <div>
              <h5>Zero Transit Breakage</h5>
              <p>Traditional tiles suffer up to 10% scrap loss during shipping and installation. WasteCraft tiles are highly impact-resistant and do not shatter during transit.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductComparison;
