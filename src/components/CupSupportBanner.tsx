import React from 'react';
import { Trophy, Megaphone } from 'lucide-react';

const SUPPORT_MESSAGES = [
  'Forca AD Sao Romao',
  'Juntos rumo as meias-finais',
  'Orgulho serrano em campo',
  'A Taca e nossa ambicao',
  'Apoio total do inicio ao fim',
];

export const CupSupportBanner: React.FC = () => {
  return (
    <div className="sticky top-16 z-[50] border-b border-yellow-400/40 bg-gradient-to-r from-navy-900/95 via-blue-900/95 to-navy-900/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex items-center gap-3 overflow-hidden">
        <div className="hidden sm:flex items-center gap-1.5 text-yellow-300 flex-shrink-0">
          <Trophy size={14} />
          <Megaphone size={13} />
        </div>

        <div className="cup-support-track min-w-max flex items-center gap-6 sm:gap-10">
          {SUPPORT_MESSAGES.concat(SUPPORT_MESSAGES).map((message, idx) => (
            <span
              key={`${message}-${idx}`}
              className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.14em] whitespace-nowrap ${
                idx % 2 === 0 ? 'text-yellow-300' : 'text-blue-200'
              }`}
            >
              {message}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
