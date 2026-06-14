import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play, Recycle, Shield, Droplets, Leaf } from 'lucide-react';
import './Hero.css';

const features = [
  { icon: <Recycle size={20} />, label: 'Made from', sub: 'Recycled Plastic' },
  { icon: <Shield size={20} />, label: 'UV, Heat &', sub: 'Weather Resistant' },
  { icon: <Droplets size={20} />, label: 'Waterproof &', sub: 'Durable' },
  { icon: <Leaf size={20} />, label: 'Low Carbon', sub: 'Footprint' },
];

export default function Hero() {
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hero-animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.hero-reveal');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero-section">
      {/* Full-bleed background image */}
      <div className="hero-bg-image" />

      {/* Left white gradient fade */}
      <div className="hero-left-fade" />

      {/* Top gradient overlay for text legibility */}
      <div className="hero-top-overlay" />

      {/* Bottom dark gradient for features bar */}
      <div className="hero-bottom-overlay" />

      {/* ─── CONTENT LAYER ─── */}
      <div className="hero-content-layer">

        {/* ── LEFT TEXT BLOCK ── */}
        <div className="hero-text-block">

          {/* Badge */}
          <div className="hero-badge hero-reveal" style={{ '--delay': '0ms' }}>
            <Leaf size={12} className="hero-badge-icon" />
            <span>SUSTAINABLE BUILDING MATERIALS</span>
          </div>

          {/* Headline */}
          <h1 className="hero-heading hero-reveal" style={{ '--delay': '80ms' }}>
            Beautiful.<br />
            Sustainable.<br />
            <span className="hero-heading-green">Built for Tomorrow.</span>
          </h1>

          {/* Subtext */}
          <p className="hero-sub hero-reveal" style={{ '--delay': '160ms' }}>
            WasteCraft transforms recycled plastic<br />
            into premium building materials<br />
            for a cleaner, stronger future.
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions hero-reveal" style={{ '--delay': '240ms' }}>
            <button className="hero-btn-primary" id="hero-explore-btn">
              Explore Products <ArrowRight size={16} />
            </button>
            <button
              className="hero-btn-secondary"
              id="hero-how-btn"
              onClick={() => document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="hero-play-circle">
                <Play size={13} fill="currentColor" />
              </span>
              See How It Works
            </button>
          </div>
        </div>

        {/* ── FLOATING BADGE (bottom-left of image) ── */}
        <div className="hero-floating-badge hero-reveal" style={{ '--delay': '320ms' }}>
          <p className="floating-badge-tagline">Stronger for Buildings,</p>
          <p className="floating-badge-tagline">Better for the Planet.</p>
          <div className="floating-badge-leaf">
            <Recycle size={14} />
          </div>
        </div>

        {/* ── FEATURES STRIP (bottom bar) ── */}
        <div className="hero-features-bar">
          {features.map((f, i) => (
            <div key={i} className="hero-feature-item">
              <span className="hero-feature-icon">{f.icon}</span>
              <div className="hero-feature-text">
                <span>{f.label}</span>
                <span>{f.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
