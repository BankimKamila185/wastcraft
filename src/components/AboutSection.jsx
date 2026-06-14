import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Building2, Leaf, ArrowRight, TrendingUp, Globe, Users } from 'lucide-react';
import './AboutSection.css';

const stats = [
  { value: '500+', label: 'Tonnes Recycled', icon: <Recycle size={18} /> },
  { value: '12K+', label: 'Eco-Tiles Produced', icon: <Building2 size={18} /> },
  { value: '30+', label: 'Partner Cities', icon: <Globe size={18} /> },
  { value: '98%', label: 'Client Satisfaction', icon: <TrendingUp size={18} /> },
];

const pillars = [
  {
    icon: <Recycle size={28} />,
    title: 'We Collect',
    desc: 'Sourcing post-consumer plastic waste from urban centres, rivers, and landfill sites before it does permanent damage.',
    color: '#A3CC5F',
  },
  {
    icon: <Building2 size={28} />,
    title: 'We Transform',
    desc: 'Our proprietary thermal-compression process converts mixed plastic into high-strength, weather-proof building tiles.',
    color: '#4FA56A',
  },
  {
    icon: <Leaf size={28} />,
    title: 'We Build',
    desc: 'Every product replaces conventional cement or wood — locking carbon out of the atmosphere and into your building.',
    color: '#A3CC5F',
  },
];

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('about-animate-in');
          }
        });
      },
      { threshold: 0.12 }
    );

    const els = sectionRef.current?.querySelectorAll('.about-reveal');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about-us" className="about-section" ref={sectionRef}>
      {/* Background decoration */}
      <div className="about-bg-orb about-bg-orb--1" />
      <div className="about-bg-orb about-bg-orb--2" />

      <div className="about-container">

        {/* ── TOP LABEL ── */}
        <div className="about-label about-reveal" style={{ '--d': '0ms' }}>
          <span className="about-label-dot" />
          WHO WE ARE
        </div>

        {/* ── SPLIT LAYOUT: left headline + right body ── */}
        <div className="about-intro-grid">
          <div className="about-intro-left about-reveal" style={{ '--d': '80ms' }}>
            <h2 className="about-heading">
              Turning plastic<br />
              waste into{' '}
              <span className="about-heading-accent">the future<br />of construction.</span>
            </h2>
            <div className="about-intro-text">
              <p className="about-body">
                WasteCraft was born from a single conviction — that India's plastic waste crisis
                and its housing shortage are <strong>two sides of the same solution.</strong>
              </p>
              <p className="about-body">
                Founded by engineers and environmentalists, we have built a closed-loop
                manufacturing system that intercepts plastic before it reaches waterways,
                reclaims its structural potential, and delivers premium building products.
              </p>
              <Link to="/about" className="about-cta-link">
                Read Our Full Story <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="about-intro-right about-reveal" style={{ '--d': '180ms' }}>
            <div className="about-stats-grid">
              {stats.map((s, i) => (
                <div key={i} className="about-stat-card">
                  <div className="about-stat-icon-wrap">{s.icon}</div>
                  <span className="about-stat-value">{s.value}</span>
                  <span className="about-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── WHAT WE DO: 3-pillar cards ── */}
        <div className="about-what-label about-reveal" style={{ '--d': '240ms' }}>
          <span className="about-label-dot" />
          WHAT WE DO
        </div>

        <div className="about-pillars about-reveal" style={{ '--d': '300ms' }}>
          {pillars.map((p, i) => (
            <div
              key={i}
              className="about-pillar-card"
              style={{ '--accent': p.color, '--i': i }}
            >
              <div className="pillar-icon-wrap">
                {p.icon}
              </div>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-desc">{p.desc}</p>
              <div className="pillar-step">{String(i + 1).padStart(2, '0')}</div>
            </div>
          ))}
          {/* Connecting line between cards */}
          <div className="pillar-connector" />
        </div>

      </div>
    </section>
  );
}
