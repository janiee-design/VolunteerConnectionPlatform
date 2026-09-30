import { useState, type FormEvent, type ChangeEvent } from 'react';
import type { Page } from '../types';
import logoImg from '../assets/logo.png';

interface Props {
  onRegister: (data: RegisterData) => Promise<void>;
  onNavigate: (page: Page) => void;
}

export interface RegisterData {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birthDate: string;
  password: string;
}

function maskCPF(v: string) {
  return v.replace(/\D/g, '').slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
}

function validateCPF(cpf: string) {
  const n = cpf.replace(/\D/g, '');
  if (n.length !== 11 || /^(\d)\1+$/.test(n)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += +n[i] * (10 - i);
  let r = (sum * 10) % 11;
  if (r === 10 || r === 11) r = 0;
  if (r !== +n[9]) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += +n[i] * (11 - i);
  r = (sum * 10) % 11;
  if (r === 10 || r === 11) r = 0;
  return r === +n[10];
}

export default function Register({ onRegister, onNavigate }: Props) {
  const [form, setForm] = useState<RegisterData>({ name: '', email: '', cpf: '', phone: '', birthDate: '', password: '' });
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);

  function update(field: keyof RegisterData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => { const c = { ...e }; delete c[field]; return c; });
  }

  function handleMasked(field: 'cpf' | 'phone', e: ChangeEvent<HTMLInputElement>) {
    const v = field === 'cpf' ? maskCPF(e.target.value) : maskPhone(e.target.value);
    update(field, v);
  }

  function validateStep1() {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().split(' ').length < 2) e.name = 'Digite seu nome completo.';
    if (!form.email.trim()) e.email = 'E-mail é obrigatório.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'E-mail inválido.';
    if (!form.cpf || form.cpf.replace(/\D/g, '').length !== 11) e.cpf = 'CPF incompleto.';
    else if (!validateCPF(form.cpf)) e.cpf = 'CPF inválido.';
    return e;
  }

  function validateStep2() {
    const e: Record<string, string> = {};
    if (!form.phone || form.phone.replace(/\D/g, '').length < 10) e.phone = 'Telefone inválido.';
    if (!form.birthDate) e.birthDate = 'Data de nascimento é obrigatória.';
    else {
      const age = (new Date().getFullYear()) - new Date(form.birthDate).getFullYear();
      if (age < 16) e.birthDate = 'Você deve ter pelo menos 16 anos.';
    }
    if (!form.password || form.password.length < 8) e.password = 'Senha deve ter pelo menos 8 caracteres.';
    else if (!/[A-Z]/.test(form.password)) e.password = 'Senha deve conter ao menos uma letra maiúscula.';
    else if (!/[0-9]/.test(form.password)) e.password = 'Senha deve conter ao menos um número.';
    if (form.password !== confirm) e.confirm = 'As senhas não coincidem.';
    return e;
  }

  function handleNext(e: FormEvent) {
    e.preventDefault();
    const errs = validateStep1();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStep(2);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validateStep2();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await onRegister(form);
    } finally {
      setLoading(false);
    }
  }

  const strengthScore = [
    form.password.length >= 8,
    /[A-Z]/.test(form.password),
    /[0-9]/.test(form.password),
    /[^A-Za-z0-9]/.test(form.password),
    form.password.length >= 12,
  ].filter(Boolean).length;

  const strengthColors = ['#E53E3E', '#E53E3E', '#F8B400', '#F8B400', '#48BB78'];
  const strengthLabels = ['', 'Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte'];

  return (
    <main style={{ minHeight: 'calc(100vh - 68px)', backgroundColor: '#F5F0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div className="animate-fade-in" style={{ width: '100%', maxWidth: '500px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: 'clamp(32px, 6vw, 48px)', boxShadow: '0 8px 40px rgba(28,26,62,0.12)' }}>
          {/* Logo & título */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <img src={logoImg} alt="Abraço Coletivo" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', marginBottom: '14px' }} />
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '22px', color: '#1C1A3E', marginBottom: '4px' }}>
              Criar conta gratuita
            </h1>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14px', color: '#777' }}>
              Comece sua jornada de voluntariado hoje
            </p>
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
            {[1, 2].map((s) => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: '5px',
                  borderRadius: '3px',
                  backgroundColor: s <= step ? '#F8B400' : '#E0D9CC',
                  transition: 'background 0.3s',
                }}
              />
            ))}
          </div>

          <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', fontWeight: 700, color: '#999', marginBottom: '20px' }}>
            Passo {step} de 2 — {step === 1 ? 'Dados pessoais' : 'Contato & senha'}
          </div>

          {step === 1 ? (
            <form onSubmit={handleNext} noValidate>
              <FormField label="Nome completo" type="text" value={form.name} onChange={(v) => update('name', v)} placeholder="Maria da Silva Santos" error={errors.name} icon="👤" autoComplete="name" />
              <FormField label="E-mail" type="email" value={form.email} onChange={(v) => update('email', v)} placeholder="maria@email.com" error={errors.email} icon="✉️" autoComplete="email" />
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>CPF</label>
                <div style={{ position: 'relative' }}>
                  <span style={iconWrap}>🪪</span>
                  <input
                    type="text"
                    value={form.cpf}
                    onChange={(e) => handleMasked('cpf', e)}
                    placeholder="000.000.000-00"
                    autoComplete="off"
                    inputMode="numeric"
                    style={{ ...inputStyle, paddingLeft: '44px', borderColor: errors.cpf ? '#E53E3E' : '#E0D9CC' }}
                    aria-invalid={!!errors.cpf}
                  />
                </div>
                {errors.cpf && <span style={errorStyle}>{errors.cpf}</span>}
              </div>
              <button type="submit" style={submitBtn}>Continuar →</button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Telefone / WhatsApp</label>
                <div style={{ position: 'relative' }}>
                  <span style={iconWrap}>📱</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleMasked('phone', e)}
                    placeholder="(11) 99999-0000"
                    inputMode="numeric"
                    style={{ ...inputStyle, paddingLeft: '44px', borderColor: errors.phone ? '#E53E3E' : '#E0D9CC' }}
                    aria-invalid={!!errors.phone}
                  />
                </div>
                {errors.phone && <span style={errorStyle}>{errors.phone}</span>}
              </div>

              <FormField label="Data de nascimento" type="date" value={form.birthDate} onChange={(v) => update('birthDate', v)} placeholder="" error={errors.birthDate} icon="📅" autoComplete="bday" />

              {/* Senha */}
              <div style={{ marginBottom: '8px' }}>
                <label style={labelStyle}>Senha</label>
                <div style={{ position: 'relative' }}>
                  <span style={iconWrap}>🔒</span>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    autoComplete="new-password"
                    style={{ ...inputStyle, paddingLeft: '44px', paddingRight: '44px', borderColor: errors.password ? '#E53E3E' : '#E0D9CC' }}
                    aria-invalid={!!errors.password}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} aria-label={showPass ? 'Ocultar' : 'Mostrar'} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && <span style={errorStyle}>{errors.password}</span>}
              </div>

              {/* Strength bar */}
              {form.password && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', backgroundColor: i <= strengthScore ? strengthColors[strengthScore - 1] : '#E0D9CC', transition: 'background 0.3s' }} />
                    ))}
                  </div>
                  <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '12px', fontWeight: 700, color: strengthColors[strengthScore - 1] || '#999' }}>
                    {strengthLabels[strengthScore]}
                  </span>
                </div>
              )}

              <FormField label="Confirmar senha" type={showPass ? 'text' : 'password'} value={confirm} onChange={setConfirm} placeholder="Repita a senha" error={errors.confirm} icon="✅" autoComplete="new-password" />

              <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{ ...submitBtn, flex: '0 0 auto', width: '44px', backgroundColor: '#F5F0E8', color: '#1C1A3E', boxShadow: 'none', fontSize: '18px' }}
                >
                  ←
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{ ...submitBtn, flex: 1, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                      <span className="animate-spin" style={{ width: '18px', height: '18px', borderTop: '2px solid #1C1A3E', borderRight: '2px solid rgba(28,26,62,0.3)', borderBottom: '2px solid rgba(28,26,62,0.3)', borderLeft: '2px solid rgba(28,26,62,0.3)', borderRadius: '50%', display: 'inline-block' }} />
                      Criando conta...
                    </span>
                  ) : 'Criar minha conta 🎉'}
                </button>
              </div>
            </form>
          )}

          <p style={{ textAlign: 'center', marginTop: '24px', fontFamily: 'Nunito, sans-serif', fontSize: '15px', color: '#666' }}>
            Já tem conta?{' '}
            <button onClick={() => onNavigate('login')} style={{ background: 'none', border: 'none', color: '#E87038', fontWeight: 800, cursor: 'pointer', fontFamily: 'Nunito, sans-serif', fontSize: '15px', textDecoration: 'underline' }}>
              Fazer login
            </button>
          </p>
        </div>

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'Nunito, sans-serif', fontSize: '14px' }}>
            ← Voltar ao início
          </button>
        </p>
      </div>
    </main>
  );
}

function FormField({ label, type, value, onChange, placeholder, error, icon, autoComplete }: {
  label: string; type: string; value: string; onChange: (v: string) => void;
  placeholder: string; error?: string; icon?: string; autoComplete?: string;
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
  fontSize: '16px',
  boxShadow: '0 4px 16px rgba(248,180,0,0.4)',
  cursor: 'pointer',
  transition: 'all 0.2s',
};
