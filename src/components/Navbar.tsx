import { useState } from 'react';
import type { Page, User } from '../types';
import logoImg from '../assets/logo.png';

interface Props {
  currentPage: Page;
  user: User | null;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export default function Navbar({ currentPage, user, onNavigate, onLogout }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#1C1A3E',
        boxShadow: '0 2px 16px rgba(28,26,62,0.3)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => { onNavigate('home'); setMenuOpen(false); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
          aria-label="Ir para página inicial"
        >
          <img
            src={logoImg}
            alt="Logo Abraço Coletivo"
            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <span
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: '18px',
              color: '#F8B400',
              letterSpacing: '-0.3px',
            }}
          >
            Abraço Coletivo
          </span>
        </button>

        {/* Desktop nav */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          className="hidden-mobile"
        >
          <NavLink label="Início" active={currentPage === 'home'} onClick={() => onNavigate('home')} />
          {user && (
            <>
              <NavLink label="Áreas" active={currentPage === 'areas'} onClick={() => onNavigate('areas')} />
              <NavLink label="ONGs" active={currentPage === 'ongs'} onClick={() => onNavigate('ongs')} />
            </>
          )}
          <NavLink label="💛 Doar" active={currentPage === 'donate'} onClick={() => onNavigate('donate')} highlight />

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '8px' }}>
              <span style={{ color: '#87CEEB', fontFamily: 'Nunito, sans-serif', fontSize: '14px', fontWeight: 600 }}>
                Olá, {user.name.split(' ')[0]}!
              </span>
              <button
                onClick={onLogout}
                style={{
                  backgroundColor: '#E87038',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '8px 18px',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#C85E2A')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#E87038')}
              >
                Sair
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px', marginLeft: '8px' }}>
              <button
                onClick={() => onNavigate('login')}
                style={{
                  backgroundColor: 'transparent',
                  color: '#F8B400',
                  border: '2px solid #F8B400',
                  borderRadius: '10px',
                  padding: '7px 18px',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#F8B400'; e.currentTarget.style.color = '#1C1A3E'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#F8B400'; }}
              >
                Entrar
              </button>
              <button
                onClick={() => onNavigate('register')}
                style={{
                  backgroundColor: '#F8B400',
                  color: '#1C1A3E',
                  border: '2px solid #F8B400',
                  borderRadius: '10px',
                  padding: '7px 18px',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#E0A200')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#F8B400')}
              >
                Cadastrar
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          className="show-mobile"
          style={{
            background: 'none',
            border: 'none',
            color: '#F8B400',
            cursor: 'pointer',
            padding: '6px',
            display: 'none',
          }}
        >
          {menuOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="animate-slide-down"
          style={{
            backgroundColor: '#2E2C5A',
            padding: '16px 20px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <MobileLink label="Início" onClick={() => { onNavigate('home'); setMenuOpen(false); }} />
          {user && (
            <>
              <MobileLink label="Áreas de Voluntariado" onClick={() => { onNavigate('areas'); setMenuOpen(false); }} />
              <MobileLink label="Todas as ONGs" onClick={() => { onNavigate('ongs'); setMenuOpen(false); }} />
            </>
          )}
          <MobileLink label="💛 Fazer uma doação" onClick={() => { onNavigate('donate'); setMenuOpen(false); }} highlight />
          {user ? (
            <>
              <div style={{ color: '#87CEEB', padding: '12px 16px', fontSize: '14px', fontWeight: 600 }}>
                Logado como {user.name.split(' ')[0]}
              </div>
              <button
                onClick={() => { onLogout(); setMenuOpen(false); }}
                style={{
                  backgroundColor: '#E87038',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  marginTop: '8px',
                }}
              >
                Sair da conta
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button
                onClick={() => { onNavigate('login'); setMenuOpen(false); }}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  color: '#F8B400',
                  border: '2px solid #F8B400',
                  borderRadius: '10px',
                  padding: '10px',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                }}
              >
                Entrar
              </button>
              <button
                onClick={() => { onNavigate('register'); setMenuOpen(false); }}
                style={{
                  flex: 1,
                  backgroundColor: '#F8B400',
                  color: '#1C1A3E',
                  border: '2px solid #F8B400',
                  borderRadius: '10px',
                  padding: '10px',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 800,
                  fontSize: '15px',
                  cursor: 'pointer',
                }}
              >
                Cadastrar
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

function NavLink({ label, active, onClick, highlight }: { label: string; active: boolean; onClick: () => void; highlight?: boolean }) {
  if (highlight) {
    return (
      <button
        onClick={onClick}
        style={{
          backgroundColor: active ? '#E0A200' : '#F8B400',
          color: '#1C1A3E',
          border: 'none',
          borderRadius: '10px',
          padding: '7px 16px',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 800,
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'background 0.2s',
          marginLeft: '4px',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#E0A200')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = active ? '#E0A200' : '#F8B400')}
      >
        {label}
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: active ? '2px solid #F8B400' : '2px solid transparent',
        color: active ? '#F8B400' : 'rgba(255,255,255,0.75)',
        fontFamily: 'Nunito, sans-serif',
        fontWeight: active ? 700 : 600,
        fontSize: '15px',
        cursor: 'pointer',
        padding: '6px 14px',
        borderRadius: '8px',
        transition: 'all 0.2s',
      }}
      onMouseOver={(e) => { if (!active) e.currentTarget.style.color = '#fff'; }}
      onMouseOut={(e) => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
    >
      {label}
    </button>
  );
}

function MobileLink({ label, onClick, highlight }: { label: string; onClick: () => void; highlight?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: highlight ? 'rgba(248,180,0,0.12)' : 'none',
        border: highlight ? '1px solid rgba(248,180,0,0.3)' : 'none',
        color: highlight ? '#F8B400' : 'rgba(255,255,255,0.9)',
        fontFamily: 'Nunito, sans-serif',
        fontWeight: highlight ? 800 : 600,
        fontSize: '16px',
        cursor: 'pointer',
        padding: '12px 16px',
        borderRadius: '10px',
        textAlign: 'left',
        transition: 'background 0.2s',
        width: '100%',
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(248,180,0,0.15)')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = highlight ? 'rgba(248,180,0,0.12)' : 'transparent')}
    >
      {label}
    </button>
  );
}
