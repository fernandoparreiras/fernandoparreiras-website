// Add each published deck to this collection. Files can live in
// /public/presentations or point to an external presentation URL.
//
// {
//   title: 'Título da apresentação',
//   description: 'Uma breve descrição do conteúdo.',
//   category: 'Liderança',
//   year: '2026',
//   event: 'Nome do evento',
//   topics: ['Estratégia', 'Cultura'],
//   cover: '/presentations/capa.jpg',
//   presentationUrl: '/presentations/arquivo.pdf',
//   downloadUrl: '/presentations/arquivo.pdf'
// }

const presentations = [
  {
    title: 'AI Human First',
    description: 'Uma visão prática sobre fundamentos, ferramentas, riscos, governança e oportunidades da inteligência artificial no mundo corporativo — com a tese de que a IA amplifica, mas quem decide é o humano.',
    category: 'Inteligência Artificial',
    year: '2026',
    topics: ['Letramento em IA', 'Governança', 'Futuro do trabalho'],
    cover: '/presentations/ai-human-first-cover.svg',
    presentationUrl: '/presentations/ai-human-first.html',
    downloadUrl: '/presentations/ai-human-first.html'
  },
  {
    title: 'IA para Negócios',
    description: 'Letramento em IA para um público misto: fundamentos, as principais ferramentas do mercado (ChatGPT, Claude, Gemini), custos e tokens, casos reais por área e adoção responsável nas empresas.',
    category: 'Inteligência Artificial',
    year: '2026',
    topics: ['Letramento em IA', 'Ferramentas práticas', 'IA para empresas'],
    cover: '/presentations/ia-para-negocios-cover.svg',
    presentationUrl: '/presentations/ia-para-negocios.html',
    downloadUrl: '/presentations/ia-para-negocios.html'
  }
];

export default presentations;
