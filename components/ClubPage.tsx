'use client';

import React from 'react';
import { ClubHistory } from './ClubHistory';
import { ClubTimeline } from './ClubTimeline';
import { ClubVideo } from './ClubVideo';
import { ClubMuseum } from './ClubMuseum';
import { ClubStadium } from './ClubStadium';
import { ClubManagement } from './ClubManagement';

export const ClubPage: React.FC = () => {
  return (
    <>
      <ClubHistory />
      <ClubTimeline />
      <ClubVideo />
      <ClubMuseum />
      <ClubStadium />
      <ClubManagement />
    </>
  );
};