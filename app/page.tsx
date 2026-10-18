'use client';

/**
 * Página única (versão curta para celular): menu, hero, "o jeito dela",
 * quem é, chamada final e rodapé. Todo botão abre o modal de contato.
 * Textos ficam aqui; WhatsApp e Instagram ficam em app/site.config.ts.
 */
import { useState } from 'react';
import LeadModal from './components/LeadModal';
import { SITE } from './site.config';

// Foto responsiva: o celular baixa a versão de 800px; telas grandes/retina, a de 1600px (mais nítida)
function Photo({ n, alt, sizes, eager }: { n: number; alt: string; sizes: string; eager?: boolean }) {
  return (
    <img
      src={`/images/yasmin-${n}.jpg`}
      srcSet={`/images/yasmin-${n}-sm.jpg 800w, /images/yasmin-${n}.jpg 1600w`}
      sizes={sizes}
      alt={alt}
      width={1600}
      height={2133}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}

// Os 4 diferenciais (no celular viram um carrossel de deslizar, para a página não ficar longa)
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
          <button className="btn sm" onClick={openModal}>Falar com a Teacher</button>
        </div>
      </header>

      {/* HERO: o que aparece primeiro */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="badge">Aulas 100% online, individuais ou em grupo</span>
            <h1>Inglês sem pressa e sem medo de errar.</h1>
            <p className="lede">Mais de 10 anos ajudando adultos travados a transformar o inglês em liberdade, no ritmo de cada um.</p>
            <button className="btn" onClick={openModal}>Falar com a Teacher <span aria-hidden>→</span></button>
            <ul className="proof">
              <li><b>+10</b> anos de experiência</li>
              <li><b>B2</b> certificada Cambridge</li>
            </ul>
          </div>
          <div className="hero-photo">
            <Photo n={2} alt="Teacher Yasmin sorrindo, apoiada em uma mesa" sizes="(max-width: 820px) 80vw, 420px" eager />
            <div className="glass">Inglês na sua realidade, sem promessas mágicas</div>
          </div>
        </div>
      </section>

      {/* O JEITO DELA */}
      <section className="way">
        <div className="wrap">
          <h2>O jeito dela de ensinar</h2>
          <div className="cards">
            {CARDS.map((c) => (
              <article className="card" key={c.t}><h3>{c.t}</h3><p>{c.d}</p></article>
            ))}
          </div>
        </div>
      </section>

      {/* QUEM É */}
      <section className="about">
        <div className="wrap">
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

      {/* CHAMADA FINAL */}
      <section className="wrap">
        <div className="cta">
          <Photo n={1} alt="Teacher Yasmin sorrindo em uma livraria" sizes="96px" />
          <div>
            <h2>Vamos começar no seu ritmo?</h2>
            <button className="btn light" onClick={openModal}>Falar com a Teacher <span aria-hidden>→</span></button>
          </div>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">@teacheryasminlins</a>
        </div>
      </footer>

      {/* Botão fixo no canto (só celular) */}
      <button className="btn float" onClick={openModal}>Falar com a Teacher</button>
      {open && <LeadModal onClose={() => setOpen(false)} />}
    </main>
  );
}
