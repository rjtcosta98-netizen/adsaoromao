

import React, { lazy, Suspense } from 'react';
import { Hero } from './Hero';
import { LatestMedia } from './LatestMedia';
import { ClubHighlights } from './ClubHighlights';
// import { LatestResults } from './LatestResults';
// import { Calendar } from './Calendar';
import { LivestreamSection } from './LivestreamSection';
import { LIVESTREAM_CONFIG } from '../constants';

// Lazy load below-fold components for faster initial paint
const Standings = lazy(() => import('./Standings').then(m => ({ default: m.Standings })));
const BestPlayersSection = lazy(() => import('./BestPlayersSection').then(m => ({ default: m.BestPlayersSection })));
const UpcomingMatchesByLevel = lazy(() => import('./UpcomingMatchesByLevel').then(m => ({ default: m.UpcomingMatchesByLevel })));
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
    /*
     * Ritmo da homepage: blocos claros e blocos escuros alternados de forma
     * deliberada. Antes havia quatro cinzentos claros quase iguais seguidos,
     * que se liam como bandas acidentais; agora as superfícies são só duas.
     *
     * A ordem também mudou: o calendário sobe acima da votação de melhor
     * jogador — quem chega ao site quer primeiro saber quando se joga.
     */
    <div className="relative">
      <Hero onNavigate={onNavigate} />
      {LIVESTREAM_CONFIG.enabled && <LivestreamSection />}
      <Suspense fallback={<LazyFallback />}>
        <UpcomingMatchesByLevel />
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <BestPlayersSection />
      </Suspense>
      <LatestMedia onNavigate={onNavigate} />
      <ClubHighlights onNavigate={onNavigate} />
      {/* <LatestResults /> */}
      {/* <Calendar /> */}
      <Suspense fallback={<LazyFallback />}>
        <Standings />
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
    </div>
  );
};
