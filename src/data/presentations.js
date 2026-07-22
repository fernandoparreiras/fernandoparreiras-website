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
    title: 'IA para Negócios — Human First',
    description: 'Uma visão prática sobre fundamentos, ferramentas, riscos, governança e oportunidades da inteligência artificial no mundo corporativo.',
    category: 'Inteligência Artificial',
    year: '2026',
    topics: ['Letramento em IA', 'Governança', 'Futuro do trabalho'],
    cover: '/presentations/ia-para-negocios-cover.svg',
    presentationUrl: '/presentations/ia-para-negocios.html',
    downloadUrl: '/presentations/ia-para-negocios.html'
  }
];

export default presentations;
