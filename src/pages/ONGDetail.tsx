import { getONGById, getAreaById } from '../data/ongs';
import type { Page } from '../types';

interface Props {
  ongId: string;
  onNavigate: (page: Page, params?: Record<string, string>) => void;
}

export default function ONGDetail({ ongId, onNavigate }: Props) {
  const ong = getONGById(ongId);

  if (!ong) {
    return (
      <main style={{ minHeight: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFBF2' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>😕</div>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 700, color: '#1C1A3E', marginBottom: '8px' }}>ONG não encontrada</h2>
          <button onClick={() => onNavigate('ongs')} style={backBtn}>← Voltar para ONGs</button>
        </div>
      </main>
    );
  }

  const area = getAreaById(ong.area);

  return (
    <main style={{ minHeight: 'calc(100vh - 68px)', backgroundColor: '#FFFBF2', padding: 'clamp(32px, 5vw, 60px) 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Back */}
        <button
          onClick={() => onNavigate('ongs', { area: ong.area })}
          style={{ background: 'none', border: 'none', color: '#E87038', fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'pointer', marginBottom: '20px', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          ← Voltar às ONGs
        </button>

        {/* Hero card */}
        <div className="animate-fade-in" style={{ backgroundColor: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(28,26,62,0.10)', marginBottom: '24px' }}>
          {/* Cover */}
          <div style={{ position: 'relative', height: 'clamp(180px, 30vw, 280px)', backgroundColor: '#F5F0E8' }}>
            <img
              src={ong.image}
              alt={`Imagem de capa da ${ong.name}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,26,62,0.7) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                {area && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: 'rgba(248,180,0,0.9)', color: '#1C1A3E', borderRadius: '100px', padding: '4px 12px', fontSize: '13px', fontFamily: 'Nunito, sans-serif', fontWeight: 800, marginBottom: '8px' }}>
                    {area.icon} {area.name}
                  </span>
                )}
                <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 4vw, 30px)', color: '#fff', margin: 0 }}>
                  {ong.name}
                </h1>
              </div>
              <div style={{ textAlign: 'right' }}>
                {ong.openings > 0 && (
                  <div style={{ backgroundColor: '#F8B400', color: '#1C1A3E', borderRadius: '12px', padding: '8px 16px', fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: '14px' }}>
                    🎯 {ong.openings} vagas abertas
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info row */}
          <div style={{ padding: '20px 24px', display: 'flex', gap: '24px', flexWrap: 'wrap', borderBottom: '1px solid rgba(28,26,62,0.07)' }}>
            {[
              { icon: '📍', label: `${ong.city}, ${ong.state}` },
              { icon: '🙋', label: `${ong.volunteerCount} voluntários` },
              { icon: '📅', label: `Fundada em ${ong.founded}` },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Nunito, sans-serif', fontSize: '14px', color: '#555', fontWeight: 600 }}>
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div style={{ padding: '24px' }}>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '16px', color: '#333', lineHeight: 1.7 }}>
              {ong.description}
            </p>
          </div>
        </div>

        {/* Missão, Visão, Valores */}
        <div className="animate-fade-in stagger-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {[
            { color: '#F8B400', icon: '🎯', title: 'Missão', text: ong.mission },
            { color: '#E87038', icon: '🔭', title: 'Visão', text: ong.vision },
            { color: '#87CEEB', icon: '💎', title: 'Valores', text: ong.values },
          ].map(({ color, icon, title, text }) => (
            <div
              key={title}
              style={{
                backgroundColor: '#fff',
                borderRadius: '18px',
                padding: '22px 20px',
                borderTop: `3px solid ${color}`,
                boxShadow: '0 2px 12px rgba(28,26,62,0.06)',
              }}
            >
              <div style={{ fontSize: '22px', marginBottom: '8px' }}>{icon}</div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '15px', color: '#1C1A3E', marginBottom: '8px' }}>{title}</h3>
              <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14px', color: '#555', lineHeight: 1.6 }}>{text}</p>
            </div>
          ))}
        </div>

        {/* Contato */}
        <div className="animate-fade-in stagger-2" style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '28px 24px', boxShadow: '0 2px 12px rgba(28,26,62,0.06)', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '18px', color: '#1C1A3E', marginBottom: '20px' }}>
            Entre em contato
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { icon: '📍', label: 'Endereço', value: `${ong.address}, ${ong.city} - ${ong.state}` },
              { icon: '📱', label: 'Telefone', value: ong.phone },
              { icon: '✉️', label: 'E-mail', value: ong.email },
              ...(ong.website ? [{ icon: '🌐', label: 'Website', value: ong.website }] : []),
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '22px', flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: '12px', fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>{label}</div>
                  <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14px', color: '#1C1A3E', fontWeight: 600, wordBreak: 'break-word' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="animate-fade-in stagger-3" style={{ backgroundColor: '#1C1A3E', borderRadius: '20px', padding: '32px 28px', textAlign: 'center', boxShadow: '0 4px 24px rgba(28,26,62,0.2)' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🤝</div>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '22px', color: '#fff', marginBottom: '8px' }}>
            Quer ser voluntário aqui?
          </h2>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.65)', marginBottom: '24px' }}>
            Entre em contato com a {ong.name} e comece sua jornada de impacto!
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`mailto:${ong.email}`}
              style={{
                backgroundColor: '#F8B400',
                color: '#1C1A3E',
                textDecoration: 'none',
                borderRadius: '14px',
                padding: '13px 24px',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 800,
                fontSize: '15px',
                boxShadow: '0 4px 16px rgba(248,180,0,0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              ✉️ Enviar e-mail
            </a>
            <a
              href={`tel:${ong.phone}`}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '14px',
                padding: '13px 24px',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 800,
                fontSize: '15px',
                border: '2px solid rgba(255,255,255,0.2)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              📱 Ligar agora
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

const backBtn: React.CSSProperties = {
  marginTop: '16px',
  backgroundColor: '#F8B400',
  color: '#1C1A3E',
  border: 'none',
  borderRadius: '12px',
  padding: '12px 24px',
  fontFamily: 'Nunito, sans-serif',
  fontWeight: 800,
  fontSize: '15px',
  cursor: 'pointer',
};
