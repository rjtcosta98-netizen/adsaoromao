import React, { useState, useCallback, useRef, useEffect } from 'react';
import { LOGO_URL } from '../constants';
import { Facebook, Instagram, Youtube, Mail, Wrench, X, Lock, Eye, EyeOff } from 'lucide-react';

interface MaintenancePageProps {
  onLaunch?: () => void;
}

export const MaintenancePage: React.FC<MaintenancePageProps> = ({ onLaunch }) => {
  const [mounted, setMounted] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showHiddenLogin, setShowHiddenLogin] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const logoClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const SECRET_PASSWORD = 'adsr2026';

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogoClick = useCallback(() => {
    if (logoClickTimeoutRef.current) clearTimeout(logoClickTimeoutRef.current);
    setLogoClickCount(prev => {
      const next = prev + 1;
      if (next >= 5) {
        setShowHiddenLogin(true);
        return 0;
      }
      return next;
    });
    logoClickTimeoutRef.current = setTimeout(() => setLogoClickCount(0), 2000);
  }, []);

  const handleLoginSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (loginPassword === SECRET_PASSWORD) {
      setShowHiddenLogin(false);
      onLaunch?.();
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  }, [loginPassword, onLaunch]);

  const handleCloseLogin = useCallback(() => {
    setShowHiddenLogin(false);
    setLoginPassword('');
    setLoginError(false);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none" style={{ background: '#05111f' }}>

      {/* Field lines background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <rect x="60" y="40" width="680" height="520" fill="none" stroke="white" strokeWidth="2"/>
          <line x1="400" y1="40" x2="400" y2="560" stroke="white" strokeWidth="1.5"/>
          <circle cx="400" cy="300" r="80" fill="none" stroke="white" strokeWidth="1.5"/>
          <circle cx="400" cy="300" r="4" fill="white"/>
          <rect x="60" y="190" width="110" height="220" fill="none" stroke="white" strokeWidth="1.5"/>
          <rect x="630" y="190" width="110" height="220" fill="none" stroke="white" strokeWidth="1.5"/>
          <rect x="60" y="240" width="50" height="120" fill="none" stroke="white" strokeWidth="1.5"/>
          <rect x="690" y="240" width="50" height="120" fill="none" stroke="white" strokeWidth="1.5"/>
          <path d="M 170 190 A 60 60 0 0 1 170 410" fill="none" stroke="white" strokeWidth="1.5"/>
          <path d="M 630 190 A 60 60 0 0 0 630 410" fill="none" stroke="white" strokeWidth="1.5"/>
          <circle cx="170" cy="300" r="4" fill="white"/>
          <circle cx="630" cy="300" r="4" fill="white"/>
        </svg>

        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(5,17,31,0.4) 0%, rgba(5,17,31,0.85) 70%, #05111f 100%)' }} />
      </div>

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 z-10" style={{ background: 'linear-gradient(90deg, #1d4ed8, #facc15, #1d4ed8)' }} />

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute rounded-full opacity-[0.06] blur-[100px]" style={{ width: 400, height: 400, top: '-10%', right: '-5%', background: '#1d4ed8', animation: 'orb-a 12s ease-in-out infinite' }} />
        <div className="absolute rounded-full opacity-[0.05] blur-[120px]" style={{ width: 500, height: 500, bottom: '-15%', left: '-10%', background: '#facc15', animation: 'orb-b 16s ease-in-out infinite' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg w-full">

        {/* Logo */}
        <div
          onClick={handleLogoClick}
          className="relative cursor-pointer mb-6 sm:mb-8"
          style={{ animation: mounted ? 'drop-in 0.7s cubic-bezier(0.16,1,0.3,1) both' : 'none' }}
        >
          <div className="absolute inset-0 rounded-full blur-[40px] opacity-40" style={{ background: 'radial-gradient(circle, #facc15, transparent 70%)' }} />
          <img
            src={LOGO_URL}
            alt="AD São Romão"
            draggable="false"
            className="relative z-10 object-contain drop-shadow-[0_0_30px_rgba(250,204,21,0.25)]"
            style={{ width: 80, height: 80 }}
          />
        </div>

        {/* Wrench badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 sm:mb-6 border"
          style={{
            background: 'rgba(250,204,21,0.06)',
            borderColor: 'rgba(250,204,21,0.2)',
            animation: mounted ? 'fade-up 0.7s 0.15s both' : 'none',
          }}
        >
          <Wrench size={12} className="text-yellow-400" style={{ animation: 'spin-slow 4s linear infinite' }} />
          <span className="text-yellow-400 text-[11px] font-bold tracking-[0.25em] uppercase">Em Manutenção</span>
        </div>

        {/* Headline */}
        <h1
          className="font-black text-white leading-none mb-4 sm:mb-5"
          style={{
            fontSize: 'clamp(2rem, 8vw, 3.5rem)',
            letterSpacing: '-0.03em',
            animation: mounted ? 'fade-up 0.8s 0.25s both' : 'none',
          }}
        >
          Voltamos
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #facc15 0%, #fbbf24 50%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            em breve.
          </span>
        </h1>

        {/* Body text */}
        <p
          className="text-white/40 leading-relaxed mb-8 sm:mb-10 max-w-xs"
          style={{
            fontSize: 'clamp(0.875rem, 3vw, 1rem)',
            animation: mounted ? 'fade-up 0.8s 0.35s both' : 'none',
          }}
        >
          O site está temporariamente indisponível para manutenção. Pedimos desculpa pelo inconveniente.
        </p>

        {/* Divider */}
        <div
          className="flex items-center gap-3 w-full max-w-xs mb-8 sm:mb-10"
          style={{ animation: mounted ? 'fade-up 0.8s 0.45s both' : 'none' }}
        >
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <span className="text-white/20 text-[10px] font-bold tracking-[0.2em] uppercase">Contacta-nos</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
        </div>

        {/* Social links */}
        <div
          className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-12"
          style={{ animation: mounted ? 'fade-up 0.8s 0.5s both' : 'none' }}
        >
          {[
            { href: 'https://facebook.com/adsaoromao', icon: Facebook, label: 'Facebook', color: '#3b82f6' },
            { href: 'https://instagram.com/adsaoromao', icon: Instagram, label: 'Instagram', color: '#ec4899' },
            { href: 'https://www.youtube.com/@ADS%C3%83OROM%C3%83O', icon: Youtube, label: 'YouTube', color: '#ef4444' },
            { href: 'mailto:adsr.romao@gmail.com', icon: Mail, label: 'Email', color: '#facc15' },
          ].map(({ href, icon: Icon, label, color }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              aria-label={label}
              className="group flex items-center justify-center rounded-xl border transition-all duration-300"
              style={{
                width: 48,
                height: 48,
                background: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = `${color}18`;
                (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              <Icon size={18} className="text-white/30 transition-colors duration-300 group-hover:text-white/80" />
            </a>
          ))}
        </div>

        {/* Footer */}
        <div style={{ animation: mounted ? 'fade-up 0.8s 0.6s both' : 'none' }}>
          <p className="text-white/15 text-[11px] mb-3">
            &copy; {new Date().getFullYear()} AD São Romão &bull; Desde 1962
          </p>
          <a
            href="https://elementgroup.pt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-70"
          >
            <span className="text-white/20 text-[11px] font-mono font-bold">{'</>'}</span>
            <span className="text-white/20 text-[11px]">Desenvolvido por</span>
            <span className="text-white/30 text-[11px] font-semibold">Elementgroup.pt</span>
          </a>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 z-10 overflow-hidden">
        <div className="h-full w-[200%]" style={{ background: 'linear-gradient(90deg, transparent, #1d4ed8, #facc15, #1d4ed8, transparent)', animation: 'bar-slide 3s linear infinite' }} />
      </div>

      {/* Hidden admin login modal */}
      {showHiddenLogin && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && handleCloseLogin()}
        >
          <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.75)' }} />
          <div
            className="relative w-full max-w-sm rounded-2xl border overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #0a1929, #051525)',
              borderColor: 'rgba(255,255,255,0.08)',
              animation: 'modal-in 0.3s ease-out both',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
            }}
          >
            <button onClick={handleCloseLogin} className="absolute top-4 right-4 p-1.5 rounded-full transition-colors z-10" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <X size={14} className="text-white/50" />
            </button>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 blur-[60px] opacity-30 rounded-full pointer-events-none" style={{ background: '#facc15' }} />

            <div className="relative p-8 pt-10">
              <div className="flex justify-center mb-5">
                <div className="relative">
                  <div className="absolute inset-0 blur-2xl opacity-40 scale-150 rounded-full" style={{ background: '#facc15' }} />
                  <div className="relative w-14 h-14 rounded-full border flex items-center justify-center" style={{ background: 'rgba(250,204,21,0.1)', borderColor: 'rgba(250,204,21,0.25)' }}>
                    <Lock size={22} className="text-yellow-400" />
                  </div>
                </div>
              </div>

              <h3 className="text-center text-base font-bold text-white mb-1">Acesso Administrativo</h3>
              <p className="text-center text-xs text-white/35 mb-6">Introduza a palavra-passe para aceder ao website</p>

              <form onSubmit={handleLoginSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="Palavra-passe"
                    autoFocus
                    className="w-full px-4 py-3 pr-12 rounded-xl text-white text-sm placeholder-white/25 focus:outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid ${loginError ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: loginError ? '0 0 0 3px rgba(239,68,68,0.15)' : undefined,
                      animation: loginError ? 'shake 0.5s ease-in-out' : undefined,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {loginError && <p className="text-red-400 text-xs text-center">Palavra-passe incorreta</p>}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #eab308, #facc15)',
                    color: '#05111f',
                    boxShadow: '0 4px 20px rgba(250,204,21,0.25)',
                  }}
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes drop-in {
          from { opacity: 0; transform: translateY(-20px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes orb-a {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-30px, 40px) scale(1.1); }
        }
        @keyframes orb-b {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(40px,-30px) scale(0.95); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes bar-slide {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0%); }
        }
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.94) translateY(-10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%,60% { transform: translateX(-5px); }
          40%,80% { transform: translateX(5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};
