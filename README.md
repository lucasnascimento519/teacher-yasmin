# Teacher Yasmin — site

Landing page (Next.js) com modal de contato: salva nome/telefone/e-mail no Supabase e abre o WhatsApp com a mensagem do objetivo escolhido.

## Antes de publicar
1. Edite `app/site.config.ts`: troque `whatsapp` (55 + DDD + número, só dígitos) e `instagram`.
2. Supabase: crie um projeto, rode o conteúdo de `supabase.sql` no SQL Editor e copie a Project URL e a Secret key `sb_secret_...` (Project Settings > API Keys; se só houver as chaves antigas, use a `service_role`).
3. Na Vercel, crie as variáveis `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` (nomes exatos) antes do Deploy.

## Onde mexer teste
- Textos das seções: `app/page.tsx` · Opções do modal e mensagens do WhatsApp: `app/site.config.ts`
- Cores e fontes: topo de `app/globals.css` · Fotos: `public/images/`
