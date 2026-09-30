import type { Toast as ToastType } from '../types';

interface Props {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}

const icons = {
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const colors = {
  success: { bg: '#1C1A3E', accent: '#F8B400', icon: '#F8B400' },
  error:   { bg: '#C0392B', accent: '#FFD5D5', icon: '#FFD5D5' },
  info:    { bg: '#1C1A3E', accent: '#87CEEB', icon: '#87CEEB' },
};

export default function Toast({ toasts, onRemove }: Props) {
  return (
    <div
      aria-live="polite"
      aria-label="Notificações"
      style={{
        position: 'fixed',
        top: '80px',
        right: '16px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '360px',
        width: '100%',
      }}
    >
      {toasts.map((t) => {
        const c = colors[t.type];
        return (
          <div
            key={t.id}
            role="alert"
            className="animate-toast"
            style={{
              backgroundColor: c.bg,
              color: '#fff',
              borderRadius: '14px',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              boxShadow: '0 8px 32px rgba(28,26,62,0.25)',
              borderLeft: `4px solid ${c.accent}`,
              fontFamily: 'Nunito, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            <span style={{ color: c.icon, flexShrink: 0, marginTop: '1px' }}>
              {icons[t.type]}
            </span>
            <span style={{ flex: 1 }}>{t.message}</span>
            <button
              onClick={() => onRemove(t.id)}
              aria-label="Fechar notificação"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                padding: '0',
                lineHeight: 1,
                flexShrink: 0,
                fontSize: '18px',
              }}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
