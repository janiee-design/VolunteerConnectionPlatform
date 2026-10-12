import logoImg from '../assets/logo.png';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#1C1A3E',
        color: 'rgba(255,255,255,0.8)',
        padding: '48px 20px 24px',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <img src={logoImg} alt="Abraço Coletivo" style={{ width: '44px', height: '44px', borderRadius: '50%' }} />
            <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '17px', color: '#F8B400' }}>
              Abraço Coletivo
            </span>
          </div>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.6)' }}>
            Conectando pessoas que querem fazer a diferença com organizações que precisam de ajuda.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: 700, color: '#F8B400', marginBottom: '16px' }}>
            Navegação
          </h4>
          {['Início', 'Sobre o Projeto', 'Áreas de Atuação', 'ONGs Parceiras', 'Como Participar'].map((l) => (
            <div key={l} style={{ marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', cursor: 'default' }}>{l}</span>
            </div>
          ))}
        </div>

        {/* Contato */}
        <div>
          <h4 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: 700, color: '#F8B400', marginBottom: '16px' }}>
            Contato
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'rgba(255,255,255,0.65)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✉️</span>
              <span>contato@abracocoletivo.org.br</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📱</span>
              <span>(11) 99999-0000</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📍</span>
              <span>Santa Catarina, SC — Brasil</span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '20px',
          textAlign: 'center',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        © 2025 Abraço Coletivo · Projeto de Conclusão de Curso · Desenvolvido por Abraço Coletivo Team
      </div>
    </footer>
  );
}
