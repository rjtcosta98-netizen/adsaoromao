


import React, { lazy, Suspense } from 'react';
import { Hero } from './Hero';
import { EventsSection } from './EventsSection';
import { LatestResults } from './LatestResults';
import { Calendar } from './Calendar';

// Lazy load below-fold components for faster initial paint
const Standings = lazy(() => import('./Standings').then(m => ({ default: m.Standings })));
const PlayerVoting = lazy(() => import('./PlayerVoting').then(m => ({ default: m.PlayerVoting })));
const RecruitmentCTA = lazy(() => import('./RecruitmentCTA').then(m => ({ default: m.RecruitmentCTA })));
const NewsSection = lazy(() => import('./NewsSection').then(m => ({ default: m.NewsSection })));
const GallerySection = lazy(() => import('./GallerySection').then(m => ({ default: m.GallerySection })));
const StoreSection = lazy(() => import('./StoreSection').then(m => ({ default: m.StoreSection })));
const HistoryStats = lazy(() => import('./HistoryStats').then(m => ({ default: m.HistoryStats })));
const Sponsors = lazy(() => import('./Sponsors').then(m => ({ default: m.Sponsors })));
const Membership = lazy(() => import('./Membership').then(m => ({ default: m.Membership })));
const MemberArea = lazy(() => import('./MemberArea').then(m => ({ default: m.MemberArea })));
const SocialFeed = lazy(() => import('./SocialFeed').then(m => ({ default: m.SocialFeed })));

const LazyFallback = () => <div className="min-h-[200px]" />;

interface HomePageProps {
  onNavigate: (page: string, id?: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <EventsSection />
      <LatestResults />
      <Calendar />
      <Suspense fallback={<LazyFallback />}>
        <Standings />
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <RecruitmentCTA onNavigate={onNavigate} />
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <NewsSection onNavigate={onNavigate} />
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <GallerySection onNavigate={onNavigate} />
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <StoreSection onNavigate={onNavigate} />
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <HistoryStats onNavigate={onNavigate} backgroundImage="https://ik.imagekit.io/elementgroup/ADSR/485290403_3241159786022635_7223684553602815447_n.jpg" />
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <Sponsors onNavigate={onNavigate} />
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <Membership onNavigate={onNavigate} />
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <MemberArea />
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <SocialFeed />
      </Suspense>
    </>
  );
};
