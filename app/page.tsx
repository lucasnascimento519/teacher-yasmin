'use client';

/**
 * Página única: menu, hero, "o jeito dela", quem é, chamada final, rodapé.
 * Todo botão de contato abre o mesmo modal (LeadModal). Textos ficam aqui;
 * WhatsApp e Instagram em app/site.config.ts; componentes em components/ui.tsx.
 */
import { useState } from 'react';
import LeadModal from './components/LeadModal';
import { Badge, Button, Card } from './components/ui';
import { SITE } from './site.config';

/**
 * Foto responsiva e SEM corte: as fotos originais são 3:4 e a moldura também,
 * então a imagem aparece inteira. Celular baixa 800px; telas grandes, 1600px.
 */
function Photo({ n, alt, sizes, eager }: { n: number; alt: string; sizes: string; eager?: boolean }) {
  return (
    <figure className="frame">
      <img src={`/images/yasmin-${n}.jpg`} srcSet={`/images/yasmin-${n}-sm.jpg 800w, /images/yasmin-${n}.jpg 1600w`}
        sizes={sizes} alt={alt} width={1600} height={2133} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </figure>
  );
}

// Diferenciais (no celular viram carrossel de deslizar, para a página não ficar longa)
const CARDS = [
  { t: 'Segurança emocional', d: 'Errar faz parte. Sem exposição e sem pressão, você fala porque se sente seguro.' },
  { t: 'Seu ritmo, respeitado', d: 'Sem promessa de fluência em 3 meses. O processo cabe na sua rotina de adulto.' },
  { t: 'Inglês da sua vida', d: 'Reunião, entrevista, viagem, imigração: o conteúdo nasce do seu dia a dia.' },
  { t: 'Nada de franquia', d: 'Sem método de prateleira. Cada acompanhamento é pensado para você.' },
];

export default function Home() {
  const [open, setOpen] = useState(false); // modal aberto ou fechado
  const openModal = () => setOpen(true);

  return (
    <main>
      <header className="nav">
        <div className="wrap">
          <span className="logo">{SITE.name}</span>
          <Button size="sm" className="nav-cta" onClick={openModal}>Falar com a Teacher</Button>
        </div>
      </header>

      <section className="section hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <Badge tone="sand">Aulas 100% online, individuais ou em grupo</Badge>
            <h1>Inglês sem pressa e sem medo de errar.</h1>
            <p className="lede">Mais de 10 anos ajudando adultos travados a transformar o inglês em liberdade, no ritmo de cada um.</p>
            <Button onClick={openModal}>Falar com a Teacher <span aria-hidden>→</span></Button>
            <ul className="proof">
              <li><b>+10</b> anos de experiência</li>
              <li><b>B2</b> certificada Cambridge</li>
            </ul>
          </div>
          <Photo n={2} alt="Teacher Yasmin sorrindo, apoiada em uma mesa" sizes="(max-width: 820px) 90vw, 440px" eager />
        </div>
      </section>

      <section className="section way">
        <div className="wrap">
          <h2>O jeito dela de ensinar</h2>
          <div className="cards">
            {CARDS.map((c) => (<Card key={c.t}><h3>{c.t}</h3><p>{c.d}</p></Card>))}
          </div>
        </div>
      </section>

      <section className="section about">
        <div className="wrap about-grid">
          <div className="duo">
            <Photo n={3} alt="Teacher Yasmin sorrindo com um caderno azul" sizes="(max-width: 820px) 45vw, 260px" />
            <Photo n={4} alt="Teacher Yasmin escrevendo em um tablet" sizes="(max-width: 820px) 45vw, 260px" />
          </div>
          <div>
            <h2>Quem é a Teacher Yasmin</h2>
            <p>Estuda inglês desde os 13 anos e passou por diversas instituições de ensino. Depois de receber tantos alunos frustrados, entendeu que a virada de chave é a segurança emocional.</p>
          </div>
        </div>
      </section>

      <section className="wrap">
        <div className="cta">
          <div className="cta-photo"><Photo n={1} alt="Teacher Yasmin sorrindo em uma livraria" sizes="110px" /></div>
          <div>
            <h2>Vamos começar no seu ritmo?</h2>
            <Button variant="secondary" onClick={openModal}>Falar com a Teacher <span aria-hidden>→</span></Button>
          </div>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">@teacheryasminlins</a>
        </div>
      </footer>

      <Button className="float" onClick={openModal}>Falar com a Teacher</Button>
      {open && <LeadModal onClose={() => setOpen(false)} />}
    </main>
  );
}
