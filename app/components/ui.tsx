/**
 * Componentes reutilizáveis do Design System. Os estilos de cada um ficam
 * em app/globals.css (classes .btn, .badge, .card, .alert).
 */
import { ButtonHTMLAttributes, ReactNode } from 'react';

// Botão com 4 variantes e estado de carregamento (spinner + bloqueio de clique)
export function Button({
  variant = 'primary', size = 'md', loading = false, full = false, className = '', children, disabled, ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; size?: 'sm' | 'md'; loading?: boolean; full?: boolean;
}) {
  return (
    <button {...rest} disabled={disabled || loading} aria-busy={loading || undefined}
      className={`btn btn-${variant} btn-${size}${full ? ' btn-full' : ''}${className ? ' ' + className : ''}`}>
      {loading && <span className="spinner" aria-hidden />}
      {children}
    </button>
  );
}

// Etiqueta compacta (status, categoria, destaque)
export function Badge({ tone = 'brand', children }: { tone?: 'brand' | 'sand' | 'success'; children: ReactNode }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

// Cartão com borda sutil e sombra discreta
export function Card({ children }: { children: ReactNode }) {
  return <article className="card">{children}</article>;
}

// Aviso de feedback (erro, sucesso ou alerta); o role="alert" faz leitores de tela anunciarem
export function Alert({ tone = 'danger', children }: { tone?: 'danger' | 'success' | 'warning'; children: ReactNode }) {
  return <div role="alert" className={`alert alert-${tone}`}>{children}</div>;
}
