import type { Page } from '../types';
import logoImg from '../assets/logo.png';

interface Props {
  onNavigate: (page: Page) => void;
  user: { name: string } | null;
}

export default function Home({ onNavigate, user }: Props) {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1C1A3E 0%, #2E2C5A 50%, #1C1A3E 100%)',
          padding: 'clamp(60px, 10vw, 120px) 20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: 'rgba(248,180,0,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', backgroundColor: 'rgba(232,112,56,0.07)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'center' }}>
          <div className="animate-fade-in">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(248,180,0,0.15)',
                border: '1px solid rgba(248,180,0,0.3)',
                borderRadius: '100px',
                padding: '6px 14px',
                marginBottom: '24px',
              }}
            >
              <span style={{ fontSize: '12px' }}>🤝</span>
              <span style={{ color: '#F8B400', fontSize: '13px', fontWeight: 700, fontFamily: 'Nunito, sans-serif' }}>
                Voluntariado que transforma
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(32px, 5vw, 56px)',
                color: '#fff',
                lineHeight: 1.15,
                marginBottom: '20px',
              }}
            >
              Doe seu tempo.<br />
              <span style={{ color: '#F8B400' }}>Transforme vidas.</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(15px, 2vw, 18px)',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.7,
                marginBottom: '36px',
                maxWidth: '540px',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              O Abraço Coletivo conecta voluntários com ONGs que precisam de ajuda.
              Encontre sua área de atuação e comece a fazer a diferença hoje.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              {user ? (
                <button
                  onClick={() => onNavigate('areas')}
                  style={primaryBtn}
                >
                  Explorar Áreas →
                </button>
              ) : (
                <>
                  <button onClick={() => onNavigate('register')} style={primaryBtn}>
                    Quero ser voluntário →
                  </button>
                  <button onClick={() => onNavigate('login')} style={secondaryBtn}>
                    Já tenho conta
                  </button>
                </>
              )}
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '32px', marginTop: '48px', flexWrap: 'wrap' }}>
              {[
                { n: '8+', label: 'Áreas de atuação' },
                { n: '10+', label: 'ONGs cadastradas' },
              ].map(({ n, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '28px', color: '#F8B400' }}>{n}</div>
                  <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Logo grande */}
          <div className="animate-fade-in stagger-2 hero-logo">
            <img
              src={logoImg}
              alt="Abraço Coletivo"
              style={{
                width: 'clamp(140px, 18vw, 220px)',
                height: 'clamp(140px, 18vw, 220px)',
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 0 0 6px rgba(248,180,0,0.2), 0 20px 60px rgba(0,0,0,0.4)',
              }}
            />
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) { .hero-logo { display: none; } }
        `}</style>
      </section>

      {/* Como Participar */}
      <section id="como-participar" style={{ padding: 'clamp(60px, 8vw, 96px) 20px', backgroundColor: '#FFFBF2' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={sectionTag}>Como Funciona</span>
            <h2 style={sectionTitle}>Simples de começar,<br />poderoso na prática</h2>
            <p style={sectionSubtitle}>Em apenas 3 passos você já estará conectado com uma ONG e pronto para ajudar.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px' }}>
            {[
              { step: '01', icon: '📝', title: 'Crie sua conta', desc: 'Faça seu cadastro gratuito informando seus dados pessoais. É rápido e seguro.' },
              { step: '02', icon: '🎯', title: 'Escolha sua área', desc: 'Veja as áreas de voluntariado disponíveis e selecione aquela que mais combina com você.' },
              { step: '03', icon: '🤝', title: 'Conecte-se a uma ONG', desc: 'Encontre as ONGs da sua área, conheça seu trabalho e entre em contato para começar.' },
            ].map(({ step, icon, title, desc }, i) => (
              <div
                key={step}
                className={`animate-fade-in stagger-${i + 1}`}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '20px',
                  padding: '32px 28px',
                  boxShadow: '0 2px 20px rgba(28,26,62,0.07)',
                  border: '1px solid rgba(28,26,62,0.06)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: '20px', right: '20px', fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: '40px', color: 'rgba(248,180,0,0.12)', lineHeight: 1 }}>{step}</div>
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{icon}</div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '18px', color: '#1C1A3E', marginBottom: '10px' }}>{title}</h3>
                <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '15px', color: '#555', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button
              onClick={() => onNavigate(user ? 'areas' : 'register')}
              style={primaryBtn}
            >
              {user ? 'Ver áreas disponíveis →' : 'Começar agora →'}
            </button>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section id="sobre" style={{ padding: 'clamp(60px, 8vw, 96px) 20px', backgroundColor: '#F5F0E8' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={sectionTag}>Sobre o Projeto</span>
            <h2 style={sectionTitle}>Nossa missão, visão e valores</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              {
                color: '#F8B400',
                icon: '🎯',
                title: 'Missão',
                text: 'Aproximar pessoas motivadas a fazer o bem das organizações que mais precisam de apoio voluntário, criando pontes de solidariedade e transformação social.',
              },
              {
                color: '#E87038',
                icon: '🔭',
                title: 'Visão',
                text: 'Ser a principal plataforma de voluntariado do Brasil, onde qualquer pessoa encontra sua forma de contribuir para uma sociedade mais justa e humana.',
              },
              {
                color: '#87CEEB',
                icon: '💎',
                title: 'Valores',
                text: 'Solidariedade, inclusão, transparência, acessibilidade e o poder transformador da ação coletiva guiam cada decisão que tomamos.',
              },
            ].map(({ color, icon, title, text }) => (
              <div
                key={title}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '20px',
                  padding: '32px 28px',
                  borderTop: `4px solid ${color}`,
                  boxShadow: '0 2px 16px rgba(28,26,62,0.07)',
                }}
              >
                <div style={{ width: '52px', height: '52px', borderRadius: '14px', backgroundColor: color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '18px' }}>
                  {icon}
                </div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '20px', color: '#1C1A3E', marginBottom: '12px' }}>{title}</h3>
                <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '15px', color: '#555', lineHeight: 1.65 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impacto */}
      <section style={{ padding: 'clamp(60px, 8vw, 96px) 20px', backgroundColor: '#1C1A3E' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(26px, 4vw, 40px)', color: '#fff', marginBottom: '16px' }}>
            Cada hora doada conta uma história
          </h2>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '17px', color: 'rgba(255,255,255,0.65)', marginBottom: '48px' }}>
            Juntos, construímos um Brasil mais solidário.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
            {[
              { n: '8', label: 'Áreas de voluntariado', icon: '🌍' },
              { n: '44', label: 'ONGs cadastradas', icon: '🏢' },
              { n: '329', label: 'Voluntários ativos', icon: '🙋' },
              { n: '12k+', label: 'Horas doadas', icon: '⏰' },
            ].map(({ n, label, icon }) => (
              <div key={label} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '18px', padding: '28px 16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{icon}</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '34px', color: '#F8B400', marginBottom: '4px' }}>{n}</div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doações CTA */}
      <section style={{ padding: 'clamp(60px, 8vw, 96px) 20px', background: 'linear-gradient(135deg, #F8B400 0%, #E87038 100%)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>💛</div>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 36px)', color: '#1C1A3E', marginBottom: '16px', lineHeight: 1.2 }}>
            Não pode ser voluntário agora?<br />Doe e ainda assim faça a diferença!
          </h2>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '17px', color: 'rgba(28,26,62,0.75)', marginBottom: '32px', lineHeight: 1.65 }}>
            Qualquer valor ajuda o Abraço Coletivo a conectar mais pessoas e ONGs. R$ 10, R$ 25 ou o que você puder — tudo conta!
          </p>
          <button
            onClick={() => onNavigate('donate')}
            style={{
              backgroundColor: '#1C1A3E',
              color: '#F8B400',
              border: 'none',
              borderRadius: '14px',
              padding: '15px 32px',
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 800,
              fontSize: '17px',
              cursor: 'pointer',
              boxShadow: '0 6px 24px rgba(28,26,62,0.3)',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'none')}
          >
            Fazer uma doação →
          </button>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" style={{ padding: 'clamp(60px, 8vw, 96px) 20px', backgroundColor: '#FFFBF2' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <span style={sectionTag}>Fale Conosco</span>
          <h2 style={sectionTitle}>Tem alguma dúvida?</h2>
          <p style={{ ...sectionSubtitle, marginBottom: '40px' }}>
            Nossa equipe está pronta para ajudar você a dar o primeiro passo no voluntariado.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { icon: '✉️', title: 'E-mail', value: 'contato@abracocoletivo.org.br' },
              { icon: '📱', title: 'WhatsApp', value: '(11) 99999-0000' },
              { icon: '🌐', title: 'Redes Sociais', value: '@abracocoletivo' },
            ].map(({ icon, title, value }) => (
              <div
                key={title}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '18px',
                  padding: '24px 20px',
                  boxShadow: '0 2px 16px rgba(28,26,62,0.07)',
                  border: '1px solid rgba(28,26,62,0.06)',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{icon}</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '15px', color: '#1C1A3E', marginBottom: '4px' }}>{title}</div>
                <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14px', color: '#E87038', fontWeight: 600 }}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '48px' }}>
            <button onClick={() => onNavigate(user ? 'areas' : 'register')} style={primaryBtn}>
              {user ? 'Explorar ONGs →' : 'Começar minha jornada →'}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

const primaryBtn: React.CSSProperties = {
  backgroundColor: '#F8B400',
  color: '#1C1A3E',
  border: 'none',
  borderRadius: '14px',
  padding: '14px 28px',
  fontFamily: 'Nunito, sans-serif',
  fontWeight: 800,
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  boxShadow: '0 4px 16px rgba(248,180,0,0.35)',
};

const secondaryBtn: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#fff',
  border: '2px solid rgba(255,255,255,0.35)',
  borderRadius: '14px',
  padding: '14px 28px',
  fontFamily: 'Nunito, sans-serif',
  fontWeight: 700,
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'all 0.2s',
};

const sectionTag: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: 'rgba(248,180,0,0.12)',
  color: '#E87038',
  borderRadius: '100px',
  padding: '5px 14px',
  fontSize: '13px',
  fontFamily: 'Nunito, sans-serif',
  fontWeight: 700,
  marginBottom: '14px',
};

const sectionTitle: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 800,
  fontSize: 'clamp(26px, 4vw, 38px)',
  color: '#1C1A3E',
  lineHeight: 1.2,
  marginBottom: '14px',
};

const sectionSubtitle: React.CSSProperties = {
  fontFamily: 'Nunito, sans-serif',
  fontSize: '17px',
  color: '#555',
  lineHeight: 1.65,
  maxWidth: '560px',
  margin: '0 auto',
};
