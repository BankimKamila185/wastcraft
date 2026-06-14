import React, { useState } from 'react';
import PremiumProductScroll from '../components/PremiumProductScroll';
import ProductSpecs from '../components/ProductSpecs';
import ProductComparison from '../components/ProductComparison';
import SampleModal from '../components/SampleModal';

const ProductDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="product-detail-page">
      <PremiumProductScroll onRequestSample={() => setIsModalOpen(true)} />
      <ProductSpecs />
      <ProductComparison />
      <SampleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ProductDetail;
