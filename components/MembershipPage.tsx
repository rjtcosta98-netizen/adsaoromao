'use client';

import React from 'react';
import { MembershipHero } from './MembershipHero';
import { MembershipBenefits } from './MembershipBenefits';
import { MembershipImpact } from './MembershipImpact';
import { MembershipPricing } from './MembershipPricing';
import { MembershipRegistration } from './MembershipRegistration';
import { MembershipLogin } from './MembershipLogin';

export const MembershipPage: React.FC = () => {
  return (
    <>
      <MembershipHero />
      <MembershipBenefits />
      <MembershipImpact />
      <MembershipPricing />
      <MembershipRegistration />
      <MembershipLogin />
    </>
  );
};