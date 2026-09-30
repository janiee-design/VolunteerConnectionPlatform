import { useState, type FormEvent } from 'react';

const PRESET_AMOUNTS = [10, 25, 50, 100, 250];

type PayMethod = 'pix' | 'credit' | 'boleto';
type DonateStep = 'form' | 'loading' | 'success';

interface DonorData {
  name: string;
  email: string;
  anonymous: boolean;
  message: string;
}

export default function Donate() {
  const [amount, setAmount] = useState<number | ''>('');
  const [customActive, setCustomActive] = useState(false);
  const [method, setMethod] = useState<PayMethod>('pix');
  const [donor, setDonor] = useState<DonorData>({ name: '', email: '', anonymous: false, message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<DonateStep>('form');

  function selectPreset(v: number) {
    setAmount(v);
    setCustomActive(false);
    setErrors((e) => { const c = { ...e }; delete c.amount; return c; });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!amount || Number(amount) < 2) e.amount = 'Informe um valor mínimo de R$ 2,00.';
    if (!donor.anonymous) {
      if (!donor.name.trim()) e.name = 'Informe seu nome ou marque "Doe anonimamente".';
      if (!donor.email.trim()) e.email = 'E-mail é obrigatório.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donor.email)) e.email = 'E-mail inválido.';
    }
    return e;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStep('loading');
    await new Promise((r) => setTimeout(r, 1800));
    setStep('success');
  }

  if (step === 'loading') return <LoadingState />;
  if (step === 'success') return <SuccessState amount={Number(amount)} method={method} name={donor.anonymous ? '' : donor.name} onReset={() => { setStep('form'); setAmount(''); setDonor({ name: '', email: '', anonymous: false, message: '' }); }} />;

  return (
    <main style={{ minHeight: 'calc(100vh - 68px)', backgroundColor: '#FFFBF2', padding: 'clamp(40px, 6vw, 72px) 20px' }}>
      <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr minmax(0, 420px)', gap: '32px', alignItems: 'start' }}>

        {/* Left: context */}
        <div className="animate-fade-in">
          <span style={tagStyle}>💛 Faça a diferença</span>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', color: '#1C1A3E', lineHeight: 1.15, marginBottom: '16px' }}>
            Sua doação<br />transforma vidas
          </h1>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '17px', color: '#555', lineHeight: 1.7, marginBottom: '36px', maxWidth: '520px' }}>
            Cada real doado ajuda o Abraço Coletivo a conectar mais voluntários com ONGs que precisam de apoio. Qualquer valor faz diferença!
          </p>

          {/* Impact items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { amount: 'R$ 10', desc: 'paga materiais escolares para uma criança por um mês', icon: '📚' },
              { amount: 'R$ 25', desc: 'custeia o transporte de um voluntário por um mês', icon: '🚌' },
              { amount: 'R$ 50', desc: 'contribui com alimentos para uma família por uma semana', icon: '🍽️' },
              { amount: 'R$ 100', desc: 'ajuda a custear um evento de voluntariado completo', icon: '🎉' },
            ].map(({ amount, desc, icon }) => (
              <div key={amount} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '22px', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
                <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '15px', color: '#444', lineHeight: 1.5 }}>
                  <strong style={{ color: '#1C1A3E' }}>{amount}</strong> {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="animate-fade-in stagger-2">
          <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: 'clamp(28px, 5vw, 40px)', boxShadow: '0 8px 40px rgba(28,26,62,0.11)', border: '1px solid rgba(28,26,62,0.06)' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '20px', color: '#1C1A3E', marginBottom: '24px' }}>
              Escolha o valor
            </h2>

            <form onSubmit={handleSubmit} noValidate>
              {/* Preset amounts */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '12px' }}>
                {PRESET_AMOUNTS.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => selectPreset(v)}
                    style={{
                      padding: '12px 8px',
                      borderRadius: '12px',
                      border: `2px solid ${amount === v && !customActive ? '#F8B400' : 'rgba(28,26,62,0.12)'}`,
                      backgroundColor: amount === v && !customActive ? '#FFF8E1' : '#fff',
                      color: amount === v && !customActive ? '#1C1A3E' : '#444',
                      fontFamily: 'Nunito, sans-serif',
                      fontWeight: 800,
                      fontSize: '15px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    R$ {v}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => { setCustomActive(true); setAmount(''); }}
                  style={{
                    padding: '12px 8px',
                    borderRadius: '12px',
                    border: `2px solid ${customActive ? '#F8B400' : 'rgba(28,26,62,0.12)'}`,
                    backgroundColor: customActive ? '#FFF8E1' : '#fff',
                    color: '#444',
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  Outro valor
                </button>
              </div>

              {customActive && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '16px', color: '#1C1A3E' }}>R$</span>
                    <input
                      type="number"
                      min={2}
                      step="0.01"
                      value={amount}
                      onChange={(e) => { setAmount(e.target.value ? Number(e.target.value) : ''); setErrors((err) => { const c = { ...err }; delete c.amount; return c; }); }}
                      placeholder="0,00"
                      autoFocus
                      style={{ ...inputStyle, paddingLeft: '44px', borderColor: errors.amount ? '#E53E3E' : '#E0D9CC' }}
                    />
                  </div>
                </div>
              )}

              {errors.amount && <span style={errorStyle}>{errors.amount}</span>}

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(28,26,62,0.08)', margin: '22px 0' }} />

              {/* Payment method */}
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '15px', color: '#1C1A3E', marginBottom: '14px' }}>
                Forma de pagamento
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' }}>
                {([
                  { id: 'pix', label: 'PIX', sub: 'Pagamento instantâneo', icon: '⚡' },
                  { id: 'credit', label: 'Cartão de crédito', sub: 'Visa, Master, Elo', icon: '💳' },
                  { id: 'boleto', label: 'Boleto bancário', sub: 'Vence em 3 dias úteis', icon: '🏦' },
                ] as { id: PayMethod; label: string; sub: string; icon: string }[]).map(({ id, label, sub, icon }) => (
                  <label
                    key={id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 16px',
                      borderRadius: '14px',
                      border: `2px solid ${method === id ? '#F8B400' : 'rgba(28,26,62,0.1)'}`,
                      backgroundColor: method === id ? '#FFF8E1' : '#FAFAFA',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <input
                      type="radio"
                      name="method"
                      value={id}
                      checked={method === id}
                      onChange={() => setMethod(id)}
                      style={{ accentColor: '#F8B400', width: '18px', height: '18px', flexShrink: 0 }}
                    />
                    <span style={{ fontSize: '22px' }}>{icon}</span>
                    <div>
                      <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: '15px', color: '#1C1A3E' }}>{label}</div>
                      <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: '12px', color: '#888' }}>{sub}</div>
                    </div>
                  </label>
                ))}
              </div>

              {/* PIX key */}
              {method === 'pix' && (
                <div style={{ backgroundColor: '#F5F0E8', borderRadius: '14px', padding: '16px', marginBottom: '22px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '28px' }}>⚡</span>
                  <div>
                    <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', fontWeight: 700, color: '#666', marginBottom: '2px' }}>Chave PIX</div>
                    <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: '15px', fontWeight: 800, color: '#1C1A3E' }}>contato@abracocoletivo.org.br</div>
                    <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: '12px', color: '#888' }}>CNPJ: 00.000.000/0001-00</div>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(28,26,62,0.08)', margin: '22px 0' }} />

              {/* Donor info */}
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '15px', color: '#1C1A3E', marginBottom: '14px' }}>
                Seus dados <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', color: '#999', fontWeight: 600 }}>(para recibo)</span>
              </h3>

              {/* Anonymous toggle */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '18px' }}>
                <div
                  onClick={() => { setDonor((d) => ({ ...d, anonymous: !d.anonymous })); }}
                  style={{
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    backgroundColor: donor.anonymous ? '#F8B400' : '#D1D5DB',
                    position: 'relative',
                    transition: 'background 0.2s',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '3px',
                    left: donor.anonymous ? '22px' : '3px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                    transition: 'left 0.2s',
                  }} />
                </div>
                <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14px', fontWeight: 700, color: '#444' }}>
                  Doe anonimamente
                </span>
              </label>

              {!donor.anonymous && (
                <>
                  <FormField label="Seu nome" value={donor.name} onChange={(v) => setDonor((d) => ({ ...d, name: v }))} placeholder="Maria da Silva" error={errors.name} icon="👤" />
                  <FormField label="E-mail" value={donor.email} onChange={(v) => setDonor((d) => ({ ...d, email: v }))} placeholder="maria@email.com" error={errors.email} icon="✉️" type="email" />
                </>
              )}

              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Mensagem <span style={{ color: '#999', fontWeight: 600 }}>(opcional)</span></label>
                <textarea
                  value={donor.message}
                  onChange={(e) => setDonor((d) => ({ ...d, message: e.target.value }))}
                  placeholder="Deixe uma mensagem de incentivo para os voluntários..."
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#F8B400',
                  color: '#1C1A3E',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '15px',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 800,
                  fontSize: '17px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(248,180,0,0.45)',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#E0A200'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#F8B400'; e.currentTarget.style.transform = 'none'; }}
              >
                💛 Doar {amount ? `R$ ${Number(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'agora'}
              </button>

              <p style={{ textAlign: 'center', marginTop: '14px', fontFamily: 'Nunito, sans-serif', fontSize: '12px', color: '#aaa' }}>
                🔒 Pagamento 100% seguro · Seus dados são protegidos
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Depoimentos */}
      <div style={{ maxWidth: '1060px', margin: '56px auto 0' }}>
        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '22px', color: '#1C1A3E', marginBottom: '24px', textAlign: 'center' }}>
          O que dizem nossos doadores
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {[
            { name: 'Carlos Mendes', msg: 'Doe todo mês. Saber que estou ajudando crianças a estudar me enche de orgulho!', emoji: '😊' },
            { name: 'Ana Beatriz', msg: 'A plataforma é incrível. Consegui ser voluntária e ainda contribuo financeiramente.', emoji: '💪' },
            { name: 'Roberto Lima', msg: 'Transparência total sobre como o dinheiro é usado. Confio de olhos fechados!', emoji: '🙌' },
          ].map(({ name, msg, emoji }) => (
            <div
              key={name}
              style={{
                backgroundColor: '#fff',
                borderRadius: '18px',
                padding: '24px',
                boxShadow: '0 2px 16px rgba(28,26,62,0.07)',
                border: '1px solid rgba(28,26,62,0.06)',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{emoji}</div>
              <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '15px', color: '#444', lineHeight: 1.6, marginBottom: '14px' }}>
                "{msg}"
              </p>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14px', fontWeight: 700, color: '#888' }}>— {name}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .donate-grid { grid-template-columns: 1fr !important; } }`}</style>
    </main>
  );
}

function LoadingState() {
  return (
    <main style={{ minHeight: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFBF2' }}>
      <div style={{ textAlign: 'center' }} className="animate-fade-in">
        <div style={{ width: '64px', height: '64px', borderTop: '5px solid #F8B400', borderRight: '5px solid rgba(248,180,0,0.2)', borderBottom: '5px solid rgba(248,180,0,0.2)', borderLeft: '5px solid rgba(248,180,0,0.2)', borderRadius: '50%', margin: '0 auto 24px', animation: 'spin 0.8s linear infinite' }} />
        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '20px', color: '#1C1A3E', marginBottom: '8px' }}>Processando sua doação...</h2>
        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '15px', color: '#888' }}>Aguarde um momento 💛</p>
      </div>
    </main>
  );
}

function SuccessState({ amount, method, name, onReset }: { amount: number; method: PayMethod; name: string; onReset: () => void }) {
  const methodLabels: Record<PayMethod, string> = { pix: 'PIX', credit: 'cartão de crédito', boleto: 'boleto' };
  return (
    <main style={{ minHeight: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFBF2', padding: '40px 20px' }}>
      <div className="animate-fade-in" style={{ textAlign: 'center', maxWidth: '480px', width: '100%' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '48px 40px', boxShadow: '0 8px 40px rgba(28,26,62,0.12)' }}>
          <div style={{ fontSize: '72px', marginBottom: '20px' }}>🎉</div>
          <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '26px', color: '#1C1A3E', marginBottom: '12px' }}>
            Doação confirmada!
          </h1>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '16px', color: '#555', lineHeight: 1.65, marginBottom: '28px' }}>
            {name ? `Obrigado, ${name.split(' ')[0]}! ` : 'Muito obrigado! '}
            Sua doação de{' '}
            <strong style={{ color: '#1C1A3E' }}>R$ {amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
            {' '}via {methodLabels[method]} foi recebida com amor! 💛
          </p>

          <div style={{ backgroundColor: '#F5F0E8', borderRadius: '16px', padding: '20px', marginBottom: '28px' }}>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '15px', color: '#444', lineHeight: 1.6, margin: 0 }}>
              {method === 'pix' && '⚡ Realize o pagamento via PIX para a chave: contato@abracocoletivo.org.br'}
              {method === 'credit' && '💳 Sua doação foi processada e aparecerá em sua fatura em até 2 dias úteis.'}
              {method === 'boleto' && '🏦 O boleto foi enviado para o seu e-mail. Pague em até 3 dias úteis.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
            <button
              onClick={onReset}
              style={{
                backgroundColor: '#F8B400',
                color: '#1C1A3E',
                border: 'none',
                borderRadius: '14px',
                padding: '14px',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 800,
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(248,180,0,0.4)',
              }}
            >
              Fazer outra doação 💛
            </button>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '13px', color: '#aaa' }}>
              Um recibo será enviado para o seu e-mail em breve.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function FormField({ label, value, onChange, placeholder, error, icon, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; error?: string; icon?: string; type?: string;
}) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: 'relative' }}>
        {icon && <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', pointerEvents: 'none' }}>{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ ...inputStyle, paddingLeft: icon ? '44px' : '16px', borderColor: error ? '#E53E3E' : '#E0D9CC' }}
          aria-invalid={!!error}
        />
      </div>
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}

const tagStyle: React.CSSProperties = {
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

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'Nunito, sans-serif',
  fontSize: '14px',
  fontWeight: 700,
  color: '#1C1A3E',
  marginBottom: '6px',
};

const errorStyle: React.CSSProperties = {
  display: 'block',
  marginTop: '5px',
  fontFamily: 'Nunito, sans-serif',
  fontSize: '13px',
  color: '#E53E3E',
  fontWeight: 600,
};
