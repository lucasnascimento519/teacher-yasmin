'use client';

/**
 * Modal de contato em 2 passos:
 *  Passo 1: visitante informa nome, telefone e e-mail -> salvamos no banco.
 *  Passo 2: escolhe o motivo principal -> abrimos o WhatsApp com a mensagem pronta.
 * Regra de ouro: se o banco falhar, o visitante NUNCA fica travado; ele segue pro WhatsApp.
 */
import { useEffect, useState } from 'react';
import { GOALS, SITE } from '../site.config';
import { Alert, Button } from './ui';

// Máscara de telefone brasileiro: 81999998888 -> (81) 99999-8888
function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export default function LeadModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null); // id do contato salvo no passo 1

  // Fecha com a tecla Esc e trava a rolagem da página enquanto o modal está aberto
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  // PASSO 1: valida e salva o contato
  async function submitStep1(e: React.FormEvent) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '');
    if (name.trim().length < 2) return setError('Digite seu nome.');
    if (digits.length < 10) return setError('Digite seu telefone com DDD.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Digite um e-mail válido.');
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, phone, email }) });
      if (res.ok) setLeadId((await res.json()).id);
    } catch { /* falha no banco não bloqueia o visitante */ }
    setLoading(false);
    setStep(2);
  }

  // PASSO 2: grava o objetivo e abre o WhatsApp com a mensagem pronta
  function choose(goal: (typeof GOALS)[number]) {
    const text = `Olá, ${SITE.name}! Me chamo ${name.trim()}. ${goal.message}`;
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
    // Dispara o salvamento sem esperar (keepalive garante o envio mesmo saindo da página)
    fetch('/api/leads', {
      method: leadId ? 'PATCH' : 'POST', // sem id (banco falhou antes)? cria o contato já com o objetivo
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadId ? { id: leadId, goal: goal.label } : { name, phone, email, goal: goal.label }),
      keepalive: true,
    }).catch(() => {});
    window.location.href = url;
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Fechar">×</button>
        <div className="dots"><i className="on" /><i className={step === 2 ? 'on' : ''} /></div>

        {step === 1 ? (
          <form onSubmit={submitStep1} noValidate>
            <h2 id="modal-title">Vamos nos conhecer?</h2>
            <p className="sub">Deixe seus dados para a Teacher Yasmin saber com quem está falando.</p>
            <label className="field">Nome<input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Como você se chama?" /></label>
            <label className="field">Telefone<input value={phone} onChange={(e) => setPhone(maskPhone(e.target.value))} inputMode="tel" autoComplete="tel" placeholder="(81) 99999-9999" /></label>
            <label className="field">E-mail<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" placeholder="voce@email.com" /></label>
            {error && <Alert>{error}</Alert>}
            <Button type="submit" full loading={loading}>{loading ? 'Salvando…' : 'Avançar'}</Button>
            <p className="fine">Seus dados são usados só para a Teacher Yasmin entrar em contato com você.</p>
          </form>
        ) : (
          <div>
            <h2 id="modal-title">O que te trouxe até aqui?</h2>
            <p className="sub">Escolha a opção mais próxima. Você vai para o WhatsApp com a mensagem pronta.</p>
            {GOALS.map((g) => (
              <button key={g.id} className="goal" onClick={() => choose(g)}><b>{g.label}</b><span>{g.hint}</span></button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
