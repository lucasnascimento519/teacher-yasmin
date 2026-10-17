/**
 * API que grava os contatos no banco (Supabase). Roda só no servidor,
 * então a chave secreta nunca chega ao navegador do visitante.
 *  - POST  /api/leads : cria o contato (passo 1 do modal: nome, telefone, e-mail)
 *  - PATCH /api/leads : grava o objetivo escolhido (passo 2) no mesmo contato
 */
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Cria a conexão com o banco usando as variáveis de ambiente da Vercel
function db() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY não configurados.');
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, goal } = await req.json();
    const digits = String(phone ?? '').replace(/\D/g, '');

    // Validação no servidor (nunca confie só na validação da tela)
    if (typeof name !== 'string' || name.trim().length < 2) return NextResponse.json({ error: 'Nome inválido.' }, { status: 400 });
    if (digits.length < 10 || digits.length > 13) return NextResponse.json({ error: 'Telefone inválido.' }, { status: 400 });
    if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 });

    const { data, error } = await db()
      .from('leads')
      .insert({ name: name.trim(), phone: digits, email: email.trim().toLowerCase(), goal: goal ?? null })
      .select('id')
      .single();
    if (error) throw error;
    return NextResponse.json({ id: data.id });
  } catch (err) {
    console.error('Erro ao salvar contato:', err);
    return NextResponse.json({ error: 'Não foi possível salvar.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, goal } = await req.json();
    if (typeof id !== 'string' || typeof goal !== 'string') return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
    const { error } = await db().from('leads').update({ goal }).eq('id', id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Erro ao salvar objetivo:', err);
    return NextResponse.json({ error: 'Não foi possível salvar.' }, { status: 500 });
  }
}
