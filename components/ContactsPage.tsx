'use client';


import React from 'react';
import { ContactsHero } from './ContactsHero';
import { ContactsContent } from './ContactsContent';

export const ContactsPage: React.FC = () => {
  return (
    <>
      <ContactsHero />
      <ContactsContent />
    </>
  );
};
