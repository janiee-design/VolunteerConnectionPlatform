import { useState, useMemo } from 'react';
import { ongs, areas, getAreaById } from '../data/ongs';
import type { Page } from '../types';

interface Props {
  areaFilter?: string;
  onNavigate: (page: Page, params?: Record<string, string>) => void;
}

export default function ONGsList({ areaFilter, onNavigate }: Props) {
  const [search, setSearch] = useState('');
  const [selectedArea, setSelectedArea] = useState(areaFilter || '');

  const filtered = useMemo(() => {
    return ongs.filter((o) => {
      const matchArea = !selectedArea || o.area === selectedArea;
      const q = search.toLowerCase();
      const matchSearch = !search || o.name.toLowerCase().includes(q) || o.city.toLowerCase().includes(q) || o.description.toLowerCase().includes(q);
      return matchArea && matchSearch;
    });
  }, [search, selectedArea]);

  const currentArea = selectedArea ? getAreaById(selectedArea) : null;

  return (
    <main style={{ minHeight: 'calc(100vh - 68px)', backgroundColor: '#FFFBF2', padding: 'clamp(40px, 6vw, 72px) 20px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div className="animate-fade-in" style={{ marginBottom: '36px' }}>
          <button
            onClick={() => onNavigate('areas')}
            style={{ background: 'none', border: 'none', color: '#E87038', fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'pointer', marginBottom: '12px', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            ← Voltar às áreas
          </button>

          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 38px)', color: '#1C1A3E', marginBottom: '8px' }}>
            {currentArea ? `ONGs de ${currentArea.name}` : 'Todas as ONGs'}
          </h1>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '16px', color: '#555' }}>
            {filtered.length === 0
              ? 'Nenhuma ONG encontrada.'
              : `${filtered.length} ${filtered.length === 1 ? 'ONG encontrada' : 'ONGs encontradas'}`}
          </p>
        </div>

        {/* Filtros */}
        <div
          className="animate-fade-in stagger-1"
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '32px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {/* Busca */}
          <div style={{ position: 'relative', flex: '1 1 240px', minWidth: '200px' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', pointerEvents: 'none' }}>🔍</span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, cidade..."
              style={{
                width: '100%',
                padding: '11px 16px 11px 44px',
                borderRadius: '12px',
                border: '2px solid #E0D9CC',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '15px',
                color: '#1C1A3E',
                backgroundColor: '#fff',
                outline: 'none',
              }}
            />
          </div>

          {/* Filtro de área */}
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            style={{
              padding: '11px 16px',
              borderRadius: '12px',
              border: '2px solid #E0D9CC',
              fontFamily: 'Nunito, sans-serif',
              fontSize: '15px',
              color: '#1C1A3E',
              backgroundColor: '#fff',
              cursor: 'pointer',
              outline: 'none',
              flex: '0 0 auto',
            }}
            aria-label="Filtrar por área"
          >
            <option value="">Todas as áreas</option>
            {areas.map((a) => (
              <option key={a.id} value={a.id}>{a.icon} {a.name}</option>
            ))}
          </select>

          {(search || selectedArea) && (
            <button
              onClick={() => { setSearch(''); setSelectedArea(''); }}
              style={{
                background: 'none',
                border: '2px solid #E87038',
                color: '#E87038',
                borderRadius: '12px',
                padding: '10px 16px',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Lista */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              backgroundColor: '#fff',
              borderRadius: '20px',
              boxShadow: '0 2px 12px rgba(28,26,62,0.06)',
            }}
          >
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 700, color: '#1C1A3E', marginBottom: '8px' }}>
              Nenhuma ONG encontrada
            </h3>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '15px', color: '#666' }}>
              Tente ajustar os filtros ou buscar por outro termo.
            </p>
            <button
              onClick={() => { setSearch(''); setSelectedArea(''); }}
              style={{ marginTop: '20px', backgroundColor: '#F8B400', color: '#1C1A3E', border: 'none', borderRadius: '12px', padding: '12px 24px', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}
            >
              Ver todas as ONGs
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filtered.map((ong, i) => {
              const area = getAreaById(ong.area);
              return (
                <article
                  key={ong.id}
                  className={`animate-fade-in stagger-${Math.min(i + 1, 6)}`}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 16px rgba(28,26,62,0.07)',
                    border: '1px solid rgba(28,26,62,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(28,26,62,0.14)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(28,26,62,0.07)'; e.currentTarget.style.transform = 'none'; }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden', backgroundColor: '#F5F0E8' }}>
                    <img
                      src={ong.image}
                      alt={`Imagem da ONG ${ong.name}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                      loading="lazy"
                    />
                    {area && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backgroundColor: 'rgba(28,26,62,0.85)',
                          color: '#fff',
                          borderRadius: '100px',
                          padding: '4px 10px',
                          fontSize: '12px',
                          fontFamily: 'Nunito, sans-serif',
                          fontWeight: 700,
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        {area.icon} {area.name}
                      </span>
                    )}
                    {ong.openings > 0 && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          backgroundColor: '#F8B400',
                          color: '#1C1A3E',
                          borderRadius: '100px',
                          padding: '4px 10px',
                          fontSize: '12px',
                          fontFamily: 'Nunito, sans-serif',
                          fontWeight: 800,
                        }}
                      >
                        {ong.openings} vagas
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '17px', color: '#1C1A3E', marginBottom: '8px' }}>
                      {ong.name}
                    </h2>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', color: '#888', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        📍 {ong.city}, {ong.state}
                      </span>
                      <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', color: '#888', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        🙋 {ong.volunteerCount} voluntários
                      </span>
                    </div>
                    <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14px', color: '#555', lineHeight: 1.6, marginBottom: '16px', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {ong.description}
                    </p>
                    <button
                      onClick={() => onNavigate('ong-detail', { id: ong.id })}
                      style={{
                        backgroundColor: '#1C1A3E',
                        color: '#F8B400',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '11px 20px',
                        fontFamily: 'Nunito, sans-serif',
                        fontWeight: 800,
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        width: '100%',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2E2C5A')}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#1C1A3E')}
                    >
                      Ver detalhes →
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
