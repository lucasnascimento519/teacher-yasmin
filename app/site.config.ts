/**
 * Configurações editáveis do site. Aqui ficam os dados que você
 * vai querer trocar sem mexer no resto do código.
 */
export const SITE = {
  name: 'Teacher Yasmin',
  // Número do WhatsApp dela, só dígitos, com 55 + DDD (ex: 5581999998888)
  whatsapp: '5581983462818',
  // Instagram dela
  instagram: 'https://instagram.com/teacheryasminlins',
};

/**
 * As 5 opções do passo 2 do modal. `label` e `hint` aparecem no cartão;
 * `message` é a frase enviada no WhatsApp. Pode editar os textos à vontade.
 */
export const GOALS = [
  { id: 'iniciante', label: 'Sou iniciante', hint: 'Quero entender como funciona', message: 'Sou iniciante e gostaria de saber mais sobre como funciona.' },
  { id: 'trabalho', label: 'Quero crescer no trabalho', hint: 'Uma promoção passa pelo inglês', message: 'Quero uma promoção no trabalho e gostaria de evoluir o meu inglês para isso.' },
  { id: 'viagem', label: 'Viagem ou imigração', hint: 'Me comunicar com segurança fora', message: 'Vou viajar ou morar fora e quero me comunicar com segurança.' },
  { id: 'trava', label: 'Eu estudo, mas travo ao falar', hint: 'Quero ganhar confiança', message: 'Já estudei inglês, mas travo na hora de falar e quero ganhar confiança.' },
  { id: 'conversar', label: 'Quero conversar primeiro', hint: 'Não sei por onde começar', message: 'Ainda não sei por onde começar e gostaria de conversar para entender o melhor caminho.' },
];
