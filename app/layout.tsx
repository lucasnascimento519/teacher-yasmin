/** Molde de todas as páginas: define <html>, fontes e o título que aparece na aba/compartilhamento. */
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Teacher Yasmin — Inglês no seu ritmo, com segurança',
  description: 'Aulas de inglês 100% online para adultos, individuais ou em grupo, com mais de 10 anos de experiência. Fale com a Teacher Yasmin pelo WhatsApp.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Fraunces (títulos, serifa suave e acolhedora) + Plus Jakarta Sans (texto) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
