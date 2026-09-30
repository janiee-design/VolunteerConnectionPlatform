import { useState } from 'react';
import { areas } from '../data/ongs';
import type { Page } from '../types';

interface Props {
  onNavigate: (page: Page, params?: Record<string, string>) => void;
}

export default function Areas({ onNavigate }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <main style={{ minHeight: 'calc(100vh - 68px)', backgroundColor: '#FFFBF2', padding: 'clamp(40px, 6vw, 72px) 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div className="animate-fade-in" style={{ marginBottom: '48px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(248,180,0,0.12)',
              color: '#E87038',
              borderRadius: '100px',
              padding: '5px 14px',
              fontSize: '13px',
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 700,
              marginBottom: '14px',
            }}
          >
            🎯 Escolha sua área
          </span>
          <h1
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(26px, 4vw, 40px)',
              color: '#1C1A3E',
              marginBottom: '12px',
            }}
          >
            Áreas de Voluntariado
          </h1>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '17px', color: '#555', maxWidth: '560px', lineHeight: 1.65 }}>
            Selecione a área que mais combina com você e descubra as ONGs que precisam da sua ajuda.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {areas.map((area, i) => (
            <button
              key={area.id}
              onClick={() => onNavigate('ongs', { area: area.id })}
              onMouseEnter={() => setHovered(area.id)}
              onMouseLeave={() => setHovered(null)}
              className={`animate-fade-in stagger-${Math.min(i + 1, 6)}`}
              aria-label={`Ver ONGs de ${area.name}`}
              style={{
                backgroundColor: '#fff',
                border: `2px solid ${hovered === area.id ? area.color : 'rgba(28,26,62,0.08)'}`,
                borderRadius: '20px',
                padding: '28px 24px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                boxShadow: hovered === area.id ? `0 8px 32px ${area.color}30` : '0 2px 12px rgba(28,26,62,0.06)',
                transform: hovered === area.id ? 'translateY(-3px)' : 'none',
              }}
            >
              {/* Icon bubble */}
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '18px',
                  backgroundColor: area.color + '18',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginBottom: '18px',
                  transition: 'background 0.2s',
                  ...(hovered === area.id ? { backgroundColor: area.color + '30' } : {}),
                }}
              >
                {area.icon}
              </div>

              {/* Badge count */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '17px', color: '#1C1A3E', lineHeight: 1.2 }}>
                  {area.name}
                </h3>
                <span
                  style={{
                    backgroundColor: area.color + '20',
                    color: area.color === '#87CEEB' ? '#1C7ED6' : area.color,
                    borderRadius: '100px',
                    padding: '3px 10px',
                    fontSize: '12px',
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: 800,
                    flexShrink: 0,
                    marginLeft: '8px',
                  }}
                >
                  {area.count} ONGs
                </span>
              </div>

              <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14px', color: '#666', lineHeight: 1.55, marginBottom: '18px' }}>
                {area.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: area.color === '#87CEEB' ? '#1C7ED6' : area.color,
                  transition: 'gap 0.2s',
                }}
              >
                Ver ONGs
                <span style={{ fontSize: '16px' }}>→</span>
              </div>
            </button>
          ))}
        </div>

        {/* All ONGs shortcut */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button
            onClick={() => onNavigate('ongs', {})}
            style={{
              backgroundColor: '#1C1A3E',
              color: '#F8B400',
              border: '2px solid #1C1A3E',
              borderRadius: '14px',
              padding: '14px 28px',
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 800,
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#2E2C5A'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#1C1A3E'; }}
          >
            Ver todas as ONGs cadastradas
          </button>
        </div>
      </div>
    </main>
  );
}
