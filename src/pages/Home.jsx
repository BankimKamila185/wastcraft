import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import BentoGrid from '../components/BentoGrid';
import Partnerships from '../components/Partnerships';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="page-wrapper">
      <Hero />
      <AboutSection />
      <BentoGrid />
      <Partnerships />
      <Contact />
    </div>
  );
};

export default Home;
