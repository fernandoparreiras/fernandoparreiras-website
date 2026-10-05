import presentations from './presentations.js';

export const DOCKS_INTERESTS = Object.freeze([
  { value: 'ia-empresas', label: 'Aplicar IA na empresa', offer: 'tech-human', offerLabel: 'Transformação em tecnologia e IA', url: '/solucoes/transformacao-tecnologia-ia/' },
  { value: 'lideranca', label: 'Liderança e advisory', offer: 'advisory', offerLabel: 'Advisory executivo', url: '/solucoes/advisory-executivo/' },
  { value: 'carreira', label: 'Formação e carreira', offer: 'mentoria', offerLabel: 'Formação e carreira', url: '/conteudos/' },
  { value: 'palestras', label: 'Levar uma palestra para minha equipe', offer: 'palestra', offerLabel: 'Palestras e workshops', url: '/palestras/' },
]);
export const DOCKS_ROLES = Object.freeze([
  { value: 'decisor', label: 'Responsável pela decisão' },
  { value: 'lider', label: 'Lidero uma equipe' },
  { value: 'especialista', label: 'Profissional ou especialista' },
  { value: 'estudante', label: 'Estudante ou em transição' },
]);
export const DOCKS_URGENCIES = Object.freeze([
  { value: 'agora', label: 'Agora: já existe uma iniciativa' },
  { value: '30-60', label: 'Nos próximos 30–60 dias' },
  { value: 'trimestre', label: 'Neste trimestre' },
  { value: 'exploracao', label: 'Ainda estou explorando' },
]);
export const DOCKS_GUIDE = Object.freeze([
  ['Escolha uma aplicação', 'Qual tarefa ou decisão pode melhorar? Descreva o resultado esperado e como você vai perceber a mudança.'],
  ['Defina a responsabilidade', 'Quem é o dono? Quem revisa o resultado e decide se ele pode ser usado?'],
  ['Conheça os dados', 'Que dado ele toca? Identifique informações pessoais, confidenciais e fontes que precisam de validação.'],
  ['Comece com um teste pequeno', 'Escolha um caso limitado, compare com o processo atual e registre o que funcionou e o que precisa mudar.'],
  ['Prepare a continuidade', 'Se parar, o que acontece? Combine uma alternativa, critérios para interromper e o próximo passo com sua equipe.'],
]);
export const getDock = (slug) => presentations.find((item) => item.slug === slug);
export const dockPath = (item) => `/docks/${item.slug}/`;
export const dockMetadata = (item) => ({ path: dockPath(item), title: `${item.title} | Docks — Fernando Parreiras`, description: item.description, type: 'website', schemaType: 'WebPage' });
