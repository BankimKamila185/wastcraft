import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/product/roof-tile', label: 'Products', matches: '/product' },
  { path: '/solutions', label: 'Technology' },
  { path: '/projects', label: 'Impact' },
  { path: '/about', label: 'About Us' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [isHidden,   setIsHidden]     = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff     = currentY - lastY;

      // Mark as "scrolled" once past 60px (triggers darker bg)
      setIsScrolled(currentY > 60);

      // Hide when scrolling DOWN past the hero fold (>120px)
      // Reveal immediately when scrolling UP any amount
      if (currentY > 120) {
        if (diff > 6)  setIsHidden(true);   // scrolling down
        if (diff < -4) setIsHidden(false);  // scrolling up
      } else {
        setIsHidden(false); // always show near top
      }

      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu if navbar hides
  useEffect(() => {
    if (isHidden) setIsMobileMenuOpen(false);
  }, [isHidden]);

  return (
    <>
    <motion.div
      className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}
      animate={{ y: isHidden ? '-120%' : '0%' }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.nav
        className="navbar-island"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <Link to="/" className="island-logo">
          <img src="/logo-new.svg" alt="WasteCraft" className="island-logo-svg" />
        </Link>

        {/* Divider */}
        <div className="island-divider desktop-only" />

        {/* Nav Links */}
        <div className="island-links desktop-only">
          {navItems.map((item) => {
            const isActive = item.matches
              ? location.pathname.includes(item.matches)
              : location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`island-link ${isActive ? 'active' : ''}`}
              >
                {isActive && (
                  <motion.span
                    layoutId="island-active-bg"
                    className="island-link-bg"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="island-link-label">{item.label}</span>
                {isActive && <span className="island-link-dot" />}
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="island-divider desktop-only" />

        {/* CTA */}
        <div className="island-cta desktop-only">
          <motion.button
            className="island-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            id="navbar-partner-btn"
          >
            Partner With Us
            <span className="island-btn-icon">
              <ArrowUpRight size={14} />
            </span>
          </motion.button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="island-mobile-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isMobileMenuOpen ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </motion.nav>
    </motion.div>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-drawer-links">
              {navItems.map((item, i) => {
                const isActive = item.matches
                  ? location.pathname.includes(item.matches)
                  : location.pathname === item.path;

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, duration: 0.25 }}
                  >
                    <Link
                      to={item.path}
                      className={`mobile-drawer-link ${isActive ? 'active' : ''}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                      {isActive && <span className="mobile-active-pill" />}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="mobile-drawer-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <button className="island-btn w-full">
                Partner With Us <ArrowUpRight size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
