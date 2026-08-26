import React from 'react';

/*
 * SISTEMA DE SECÇÃO — AD SÃO ROMÃO
 *
 * A página só tem duas superfícies: `light` (paper) e `dark` (navy-900).
 * Antes existiam quatro cinzentos quase iguais (#fff, #f5f5f5, #f7f8fb,
 * gray-50, gray-100) que se liam como bandas acidentais. `bone` passou a
 * ser cor de cartão dentro de secções claras, nunca de secção inteira.
 *
 * A assinatura repetida do site é a RÉGUA DOURADA (`kicker-rule`) que
 * abre todos os cabeçalhos: barra de 3px em degradê ouro seguida de um
 * eyebrow condensado em maiúsculas. É o elemento que torna qualquer
 * screenshot reconhecível sem logótipo.
 *
 * REGRA DO OURO: sobre escuro o ouro é cor de texto; sobre claro é cor de
 * superfície (botões, chips, a régua). Ouro em texto grande sobre branco
 * lê-se azeitona e não passa contraste — nesse caso o acento é `navy-700`.
 * A única exceção é o eyebrow, pequeno e em `gold-600`, que passa AA.
 */

export type Tone = 'light' | 'dark';

interface SectionProps {
  tone?: Tone;
  id?: string;
  /** Costura de 1px no topo — usar quando a secção anterior tem o mesmo tom */
  seam?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  tone = 'light',
  id,
  seam = false,
  className = '',
  children,
}) => (
  <section
    id={id}
    className={[
      'section-y relative overflow-hidden',
      tone === 'dark' ? 'bg-navy-900 text-white' : 'bg-paper text-navy-900',
      seam ? (tone === 'dark' ? 'seam-dark' : 'seam-light') : '',
      className,
    ].filter(Boolean).join(' ')}
  >
    {children}
  </section>
);

/** Largura de conteúdo única em todo o site */
export const SectionInner: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => (
  <div className={`relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: Tone;
  align?: 'left' | 'center';
  /** Botão/link opcional alinhado à direita em desktop */
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  tone = 'light',
  align = 'left',
  action,
  className = '',
}) => {
  const centered = align === 'center';
  // Ouro puro não passa contraste sobre branco — sobre claro usa-se o ouro profundo.
  const eyebrowColor = tone === 'dark' ? 'text-gold-400' : 'text-gold-600';
  const titleColor = tone === 'dark' ? 'text-white' : 'text-navy-900';
  const bodyColor = tone === 'dark' ? 'text-white/65' : 'text-navy-900/60';

  return (
    <header
      className={[
        'mb-10 flex gap-6 md:mb-12',
        centered ? 'flex-col items-center text-center' : 'flex-col md:flex-row md:items-end md:justify-between',
        className,
      ].join(' ')}
    >
      <div className={centered ? 'max-w-2xl' : 'max-w-2xl'}>
        <div className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
          <span className="kicker-rule" aria-hidden="true" />
          <p className={`font-display text-[11px] font-semibold uppercase tracking-kicker ${eyebrowColor}`}>
            {eyebrow}
          </p>
        </div>

        <h2
          className={`mt-4 font-display text-[clamp(1.85rem,5vw,3rem)] font-bold uppercase leading-[0.92] ${titleColor}`}
        >
          {title}
        </h2>

        {description && (
          <p className={`mt-4 text-base leading-relaxed ${bodyColor}`}>{description}</p>
        )}
      </div>

      {action && <div className={`shrink-0 ${centered ? '' : 'md:pb-1'}`}>{action}</div>}
    </header>
  );
};
