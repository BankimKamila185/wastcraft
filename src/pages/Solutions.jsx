import React from 'react';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import FutureVision from '../components/FutureVision';

const Solutions = () => {
  return (
    <div className="page-wrapper" style={{ paddingTop: '80px' }}>
      <Problem />
      <Solution />
      <FutureVision />
    </div>
  );
};

export default Solutions;
