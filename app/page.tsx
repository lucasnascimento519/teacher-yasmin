'use client';

/**
 * Página única do site (landing page). Seções, de cima para baixo:
 * menu · hero · faixa "virada de chave" · pilares · sobre · chamada final · rodapé.
 * Todos os botões "Falar com a Teacher" abrem o mesmo modal de contato.
 * Para trocar uma foto, substitua o arquivo em public/images mantendo o nome.
 */
import { useState } from 'react';
import LeadModal from './components/LeadModal';
import { SITE } from './site.config';

const PILLARS = [
  { t: 'Segurança emocional primeiro', d: 'Aqui errar faz parte. Sem exposição e sem pressão: o aluno fala porque se sente seguro para isso.' },
  { t: 'O seu ritmo é respeitado', d: 'Nada de promessa de fluência em 3 meses. O processo respeita a rotina e a vida de quem é adulto.' },
  { t: 'Inglês da sua realidade', d: 'Reunião de negócios, entrevista, viagem, imigração: o conteúdo nasce do seu dia a dia e do seu trabalho.' },
  { t: 'Nada de curso de franquia', d: 'Não existe método de prateleira. Cada acompanhamento é pensado para a pessoa que está do outro lado.' },
];

export default function Home() {
  const [open, setOpen] = useState(false); // controla se o modal está aberto
  const openModal = () => setOpen(true);

  return (
    <main>
      <header className="nav">
        <div className="wrap">
          <span className="logo">{SITE.name}</span>
          <button className="btn" onClick={openModal}>Falar com a Teacher</button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div>
            <h1>Inglês sem pressa e sem medo de errar.</h1>
            <p className="lede">Mais de 10 anos guiando adultos que chegaram frustrados e travados. Aqui o inglês deixa de ser uma pendência angustiante e vira uma ferramenta de liberdade.</p>
            <div className="actions">
              <button className="btn" onClick={openModal}>Falar com a Teacher</button>
              <a className="btn ghost" href="#metodo">Conhecer a ideia</a>
            </div>
            <div className="facts"><span>Aulas 100% online</span><span>Individuais ou em grupo</span></div>
          </div>
          <div className="arch">
            <img src="/images/yasmin-2.jpg" alt="Teacher Yasmin sorrindo, apoiada em uma mesa" width={1000} height={1333} />
            <span className="chip b">Certificada B2 Cambridge</span>
            <span className="chip a">+10 anos de experiência</span>
          </div>
        </div>
      </section>

      {/* FAIXA: a virada de chave */}
      <section className="band" id="metodo">
        <div className="wrap">
          <div>
            <h2>O mercado promete mágica. A vida adulta não funciona assim.</h2>
            <p>Fluência em 3 meses e métodos que expõem o aluno ao erro costumam terminar em bloqueio e culpa.</p>
            <p>Depois de anos recebendo alunos nessa situação, a Teacher Yasmin entendeu que a virada de chave é a segurança emocional: um espaço onde seu ritmo é respeitado.</p>
          </div>
          <img src="/images/yasmin-4.jpg" alt="Teacher Yasmin escrevendo em um tablet" width={1000} height={1333} loading="lazy" />
        </div>
      </section>

      {/* PILARES */}
      <section className="pillars">
        <div className="wrap">
          <h2>Como o trabalho dela é diferente</h2>
          <div className="pillar-list">
            {PILLARS.map((p) => (
              <div className="pillar" key={p.t}><h3>{p.t}</h3><p>{p.d}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="about">
        <div className="wrap">
          <img src="/images/yasmin-3.jpg" alt="Teacher Yasmin sorrindo com um caderno azul sobre a mesa" width={1000} height={1333} loading="lazy" />
          <div>
            <h2>Quem é a Teacher Yasmin</h2>
            <p>Estuda inglês desde os 13 anos e atravessou diversas instituições de ensino ao longo de mais de uma década de sala de aula.</p>
            <p>Hoje as aulas são 100% online, individuais ou em grupo, com um foco claro: trazer o inglês para a realidade de cada aluno, no trabalho e na vida, com leveza e respeito ao tempo de cada um.</p>
            <div className="facts"><span>+10 anos ensinando</span><span>Certificada B2 Cambridge</span><span>Inglês desde os 13 anos</span></div>
          </div>
        </div>
      </section>

      {/* CHAMADA FINAL */}
      <section className="cta">
        <div className="wrap">
          <div>
            <h2>Pronto para começar no seu ritmo?</h2>
            <p>Conte um pouco sobre você e a conversa já começa no WhatsApp.</p>
            <button className="btn" onClick={openModal}>Falar com a Teacher</button>
          </div>
          <img src="/images/yasmin-1.jpg" alt="Teacher Yasmin sorrindo em uma livraria" width={1000} height={1333} loading="lazy" />
        </div>
      </section>

      <footer className="foot">
        <div className="wrap">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </footer>

      {/* Botão fixo no canto, só aparece no celular */}
      <button className="btn float" onClick={openModal}>Falar com a Teacher</button>

      {open && <LeadModal onClose={() => setOpen(false)} />}
    </main>
  );
}
