import { useState, type FormEvent } from 'react';
import type { Page } from '../types';
import logoImg from '../assets/logo.png';

interface Props {
  onLogin: (email: string, password: string) => Promise<void>;
  onNavigate: (page: Page) => void;
}

export default function Login({ onLogin, onNavigate }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = 'E-mail é obrigatório.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'E-mail inválido.';
    if (!password) e.password = 'Senha é obrigatória.';
    else if (password.length < 6) e.password = 'Senha deve ter pelo menos 6 caracteres.';
    return e;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await onLogin(email, password);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: 'calc(100vh - 68px)', backgroundColor: '#F5F0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '460px' }}>
        {/* Card */}
        <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: 'clamp(32px, 6vw, 48px)', boxShadow: '0 8px 40px rgba(28,26,62,0.12)' }}>
          {/* Logo & título */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <img src={logoImg} alt="Abraço Coletivo" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', marginBottom: '16px' }} />
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '24px', color: '#1C1A3E', marginBottom: '6px' }}>
              Bem-vindo de volta!
            </h1>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '15px', color: '#777' }}>
              Entre na sua conta para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <Field
              label="E-mail"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="seu@email.com"
              error={errors.email}
              autoComplete="email"
              icon="✉️"
            />

            <div style={{ position: 'relative', marginBottom: '24px' }}>
              <label style={labelStyle}>Senha</label>
              <div style={{ position: 'relative' }}>
                <span style={iconWrap}>🔒</span>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  style={{ ...inputStyle, paddingLeft: '44px', paddingRight: '44px', borderColor: errors.password ? '#E53E3E' : '#E0D9CC' }}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'pwd-err' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? 'Ocultar senha' : 'Mostrar senha'}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#999' }}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <span id="pwd-err" style={errorStyle}>{errors.password}</span>}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...submitBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span className="animate-spin" style={{ width: '18px', height: '18px', borderTop: '2px solid #1C1A3E', borderRight: '2px solid rgba(28,26,62,0.3)', borderBottom: '2px solid rgba(28,26,62,0.3)', borderLeft: '2px solid rgba(28,26,62,0.3)', borderRadius: '50%', display: 'inline-block' }} />
                  Entrando...
                </span>
              ) : 'Entrar'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', fontFamily: 'Nunito, sans-serif', fontSize: '15px', color: '#666' }}>
            Não tem conta ainda?{' '}
            <button
              onClick={() => onNavigate('register')}
              style={{ background: 'none', border: 'none', color: '#E87038', fontWeight: 800, cursor: 'pointer', fontFamily: 'Nunito, sans-serif', fontSize: '15px', textDecoration: 'underline' }}
            >
              Cadastre-se aqui
            </button>
          </p>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'Nunito, sans-serif', fontSize: '14px', color: '#888' }}>
          <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', textDecoration: 'underline' }}>
            ← Voltar ao início
          </button>
        </p>
      </div>
    </main>
  );
}

function Field({
  label, type, value, onChange, placeholder, error, autoComplete, icon,
}: {
  label: string; type: string; value: string; onChange: (v: string) => void;
  placeholder: string; error?: string; autoComplete?: string; icon?: string;
}) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: 'relative' }}>
        {icon && <span style={iconWrap}>{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          style={{ ...inputStyle, paddingLeft: icon ? '44px' : '16px', borderColor: error ? '#E53E3E' : '#E0D9CC' }}
          aria-invalid={!!error}
        />
      </div>
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'Nunito, sans-serif',
  fontSize: '14px',
  fontWeight: 700,
  color: '#1C1A3E',
  marginBottom: '6px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '12px',
  border: '2px solid #E0D9CC',
  fontFamily: 'Nunito, sans-serif',
  fontSize: '15px',
  color: '#1C1A3E',
  outline: 'none',
  transition: 'border-color 0.2s',
  backgroundColor: '#FFFBF2',
};

const iconWrap: React.CSSProperties = {
  position: 'absolute',
  left: '14px',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '18px',
  pointerEvents: 'none',
};

const errorStyle: React.CSSProperties = {
  display: 'block',
  marginTop: '5px',
  fontFamily: 'Nunito, sans-serif',
  fontSize: '13px',
  color: '#E53E3E',
  fontWeight: 600,
};

const submitBtn: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#F8B400',
  color: '#1C1A3E',
  border: 'none',
  borderRadius: '14px',
  padding: '14px',
  fontFamily: 'Nunito, sans-serif',
  fontWeight: 800,
  fontSize: '17px',
  boxShadow: '0 4px 16px rgba(248,180,0,0.4)',
  transition: 'all 0.2s',
};
