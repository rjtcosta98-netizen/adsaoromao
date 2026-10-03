

import React, { lazy, Suspense } from 'react';
import { Hero } from './Hero';
import { LatestMedia } from './LatestMedia';
import { ClubHighlights } from './ClubHighlights';
// import { Calendar } from './Calendar';
import { LivestreamSection } from './LivestreamSection';
import { LIVESTREAM_CONFIG } from '../constants';

// Lazy load below-fold components for faster initial paint
const LatestResults = lazy(() => import('./LatestResults').then(m => ({ default: m.LatestResults })));
const Standings = lazy(() => import('./Standings').then(m => ({ default: m.Standings })));
const BestPlayersSection = lazy(() => import('./BestPlayersSection').then(m => ({ default: m.BestPlayersSection })));
const UpcomingMatchesByLevel = lazy(() => import('./UpcomingMatchesByLevel').then(m => ({ default: m.UpcomingMatchesByLevel })));
const RecruitmentCTA = lazy(() => import('./RecruitmentCTA').then(m => ({ default: m.RecruitmentCTA })));
const NewsSection = lazy(() => import('./NewsSection').then(m => ({ default: m.NewsSection })));
const EscaloesSection = lazy(() => import('./EscaloesSection').then(m => ({ default: m.EscaloesSection })));
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
    <div className="relative">
      <Hero onNavigate={onNavigate} />
      {LIVESTREAM_CONFIG.enabled && <LivestreamSection />}
      <Suspense fallback={<LazyFallback />}>
        <BestPlayersSection />
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <UpcomingMatchesByLevel />
      </Suspense>
      <LatestMedia onNavigate={onNavigate} />
      <ClubHighlights onNavigate={onNavigate} />
      <Suspense fallback={<LazyFallback />}>
        <LatestResults />
      </Suspense>
      {/* <Calendar /> */}
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
        <EscaloesSection onNavigate={onNavigate} />
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
    </div>
  );
};
