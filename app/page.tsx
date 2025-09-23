"use client";

import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import ValuePropositionSection from '../components/ValuePropositionSection';
import BenefitsSection from '../components/BenefitsSection';
import SocialProofSection from '../components/SocialProofSection';
import CtaSection from '../components/CtaSection';

const HomePage = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <HeroSection />
      <ValuePropositionSection />
      <BenefitsSection />
      <SocialProofSection />
      <CtaSection />
    </>
  );
};

export default HomePage;
