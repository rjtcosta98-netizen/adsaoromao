'use client';

import React from 'react';
import { SponsorsHero } from './SponsorsHero';
import { SponsorsList } from './SponsorsList';
import { SponsorsBenefits } from './SponsorsBenefits';
import { SponsorsForm } from './SponsorsForm';

export const SponsorsPage: React.FC = () => {
  return (
    <>
      <SponsorsHero />
      <SponsorsList />
      <SponsorsBenefits />
      <SponsorsForm />
    </>
  );
};