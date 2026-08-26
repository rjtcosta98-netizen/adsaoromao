import React from 'react';
import { CalendarDays } from 'lucide-react';
import { Section, SectionInner, SectionHeading } from './ui/Section';

const AGE_GROUPS = [
  'Traquinas U8',
  'Benjamins U10',
  'Infantis U12',
  'Iniciados U14',
  'Juvenis U16',
  'Juniores U19',
  'Seniores',
];

export const UpcomingMatchesByLevel: React.FC = () => {
  return (
    <Section tone="light">
      <SectionInner>
        <SectionHeading
          eyebrow="Calendário"
          title="Próximos jogos por escalão"
          description="Informação dos jogos da nova época será atualizada em breve."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {AGE_GROUPS.map((group) => (
            <article
              key={group}
              className="group flex min-h-24 items-center justify-between gap-4 rounded-xl border border-bone-200 bg-bone px-4 py-4 transition-colors hover:border-gold-400/60 hover:bg-paper"
            >
              <div className="min-w-0">
                <p className="font-display text-lg font-bold uppercase leading-none text-navy-900">
                  {group}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-navy-900/40">
                  Brevemente disponível
                </p>
              </div>

              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gold-400/15 text-gold-600 transition-colors group-hover:bg-gold-400 group-hover:text-navy-900">
                <CalendarDays size={18} strokeWidth={2.5} />
              </span>
            </article>
          ))}
        </div>
      </SectionInner>
    </Section>
  );
};
