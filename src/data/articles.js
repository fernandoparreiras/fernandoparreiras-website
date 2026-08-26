export const knowledgeTracks = [
  {
    id: 'lideranca-negocios',
    label: 'Negócios e liderança',
    shortLabel: 'Liderança',
    description: 'Decisões, cultura e execução para liderar organizações na era da IA.',
  },
  {
    id: 'carreira-ia',
    label: 'Carreira com IA',
    shortLabel: 'Carreira com IA',
    description: 'Repertório, autoria e prática para trabalhar melhor com inteligência artificial.',
  },
  {
    id: 'jovens-futuro',
    label: 'Jovens e futuro',
    shortLabel: 'Jovens',
    description: 'Primeiros passos, escolhas e experiências para quem está começando.',
  },
  {
    id: 'mudanca-carreira',
    label: 'Mudança de carreira',
    shortLabel: 'Transição',
    description: 'Métodos para mudar de direção sem desperdiçar a história já construída.',
  },
];

export const articles = [
  {
    slug: 'carreira-com-ia-nao-comeca-pela-ferramenta',
    title: 'Carreira com IA não começa pela ferramenta',
    excerpt: 'A vantagem não está em conhecer todos os aplicativos. Está em aprender a formular problemas, avaliar respostas e assumir autoria sobre o resultado.',
    track: 'carreira-ia',
    category: 'Trabalho e aprendizagem',
    format: 'Ensaio prático',
    tags: ['carreira com IA', 'autoria', 'aprendizagem'],
    readingMinutes: 8,
    publishedAt: '2026-08-25',
    updatedAt: '2026-08-25',
    featured: true,
    image: '/images/em-cena/fernando-parreiras-palestra-principal-1122.webp',
    imageAlt: 'Fernando Parreiras falando em um palco durante uma palestra.',
    nature: 'Análise profissional baseada em experiência de campo.',
    cta: {
      label: 'Conversar sobre mentoria de carreira',
      href: 'mailto:fernando@fernandoparreiras.com.br?subject=Mentoria%20de%20carreira%20com%20IA',
    },
    content: [
      {
        heading: 'A ferramenta é a parte que muda mais rápido',
        paragraphs: [
          'Quando alguém decide preparar a carreira para a inteligência artificial, a primeira reação costuma ser montar uma lista de ferramentas. É compreensível, mas é um ponto de partida frágil: interfaces mudam, produtos desaparecem e recursos antes raros viram itens básicos.',
          'Uma carreira não pode depender da memória de onde fica cada botão. Ela precisa se apoiar em capacidades que continuam úteis quando o software muda.',
        ],
      },
      {
        heading: 'O que realmente aumenta o seu valor',
        paragraphs: [
          'Profissionais valiosos conseguem transformar uma situação ambígua em um problema claro, oferecer contexto, escolher critérios e reconhecer quando uma resposta parece boa, mas não é suficiente.',
        ],
        bullets: [
          'Definir o problema antes de solicitar uma solução.',
          'Explicitar contexto, limites e critérios de qualidade.',
          'Comparar alternativas e verificar premissas importantes.',
          'Editar, decidir e assumir responsabilidade pelo resultado.',
        ],
      },
      {
        heading: 'Use IA para ampliar autoria, não para escondê-la',
        paragraphs: [
          'A IA pode acelerar pesquisa, organizar ideias, desafiar uma hipótese e produzir primeiras versões. O trabalho profissional começa justamente onde a resposta automática termina: julgamento, adequação ao contexto e consequência.',
          'A pergunta mais produtiva não é “qual ferramenta devo aprender?”, mas “que tipo de decisão quero ser capaz de tomar melhor?”. A resposta orienta uma prática mais durável.',
        ],
        quote: 'O diferencial não será usar IA. Será responder pelo que você decidiu fazer com ela.',
      },
      {
        heading: 'Um exercício para esta semana',
        paragraphs: [
          'Escolha uma tarefa recorrente do seu trabalho. Descreva o resultado esperado, os critérios de uma boa entrega e os riscos de errar. Só então use a IA em três papéis diferentes: pesquisadora, crítica e editora. Compare o que cada papel acrescentou e registre o que ainda exigiu sua decisão.',
        ],
      },
    ],
  },
  {
    slug: 'liderar-quando-a-ia-executa-mais',
    title: 'Liderar quando a IA executa mais',
    excerpt: 'Quanto mais a execução é automatizada, mais importantes se tornam direção, limites, critérios e responsabilidade.',
    track: 'lideranca-negocios',
    category: 'Liderança',
    format: 'Análise',
    tags: ['liderança', 'delegação', 'governança'],
    readingMinutes: 9,
    publishedAt: '2026-08-22',
    updatedAt: '2026-08-22',
    image: '/images/em-cena/fernando-parreiras-palco-1600.webp',
    imageAlt: 'Fernando Parreiras apresentando no palco diante de uma tela iluminada.',
    nature: 'Análise profissional e hipótese de trabalho.',
    cta: {
      label: 'Levar esta conversa para sua liderança',
      href: 'mailto:fernando@fernandoparreiras.com.br?subject=Palestra%20sobre%20lideran%C3%A7a%20e%20IA',
    },
    content: [
      {
        heading: 'Automação não elimina liderança',
        paragraphs: [
          'Quando uma equipe passa a produzir mais com IA, o trabalho de liderança não diminui. Ele muda de lugar. Menos energia é gasta para acompanhar cada tarefa e mais energia precisa ser dedicada a definir direção, restrições e sinais de qualidade.',
          'Sem esse desenho, velocidade apenas faz a organização errar mais cedo e em maior escala.',
        ],
      },
      {
        heading: 'Delegar exige um contrato claro',
        paragraphs: ['Uma boa delegação, para pessoas ou sistemas, responde antecipadamente a quatro perguntas.'],
        bullets: [
          'Qual resultado é esperado?',
          'Quais decisões podem ser tomadas com autonomia?',
          'Que evidências permitem considerar o trabalho concluído?',
          'Em quais situações a decisão precisa voltar para uma pessoa?',
        ],
      },
      {
        heading: 'A nova rotina de liderança',
        paragraphs: [
          'Líderes precisam observar menos o volume produzido e mais a qualidade das decisões. Isso inclui revisar premissas, proteger espaços de discordância e deixar explícito quem responde pelo impacto de cada escolha.',
          'A organização madura não trata supervisão humana como uma frase genérica. Ela define onde, quando e com quais informações essa supervisão acontece.',
        ],
        quote: 'Quanto maior a autonomia operacional, mais explícita deve ser a responsabilidade.',
      },
    ],
  },
  {
    slug: 'primeiro-portfolio-antes-do-primeiro-cargo',
    title: 'Primeiro portfólio antes do primeiro cargo',
    excerpt: 'Jovens não precisam esperar uma contratação para começar a demonstrar curiosidade, disciplina e capacidade de produzir valor.',
    track: 'jovens-futuro',
    category: 'Primeiros passos',
    format: 'Guia',
    tags: ['jovens', 'portfólio', 'primeiro emprego'],
    readingMinutes: 7,
    publishedAt: '2026-08-19',
    updatedAt: '2026-08-19',
    image: '/images/em-cena/fernando-parreiras-palestra-microfone-1600.webp',
    imageAlt: 'Fernando Parreiras sorrindo durante uma apresentação.',
    nature: 'Orientação de carreira baseada em experiência profissional.',
    cta: {
      label: 'Conversar sobre uma atividade para jovens',
      href: 'mailto:fernando@fernandoparreiras.com.br?subject=Forma%C3%A7%C3%A3o%20para%20jovens',
    },
    content: [
      {
        heading: 'Experiência também pode ser construída',
        paragraphs: [
          'A frase “não tenho experiência” costuma encerrar a conversa cedo demais. Antes do primeiro emprego, já é possível investigar um problema, produzir algo útil, receber crítica e melhorar uma entrega.',
          'Portfólio não significa apenas design ou programação. É qualquer evidência organizada de que você observou uma necessidade e foi capaz de agir.',
        ],
      },
      {
        heading: 'Um projeto pequeno é suficiente',
        paragraphs: ['Escolha uma necessidade real de uma escola, associação, pequeno negócio ou grupo comunitário.'],
        bullets: [
          'Converse com alguém afetado pelo problema.',
          'Registre o que você entendeu e o que ainda não sabe.',
          'Crie uma entrega pequena: pesquisa, roteiro, planilha, página ou melhoria de processo.',
          'Peça retorno, revise e explique o que aprendeu.',
        ],
      },
      {
        heading: 'A IA pode ajudar, mas não pode viver a experiência por você',
        paragraphs: [
          'Use IA para explorar perguntas, organizar material e revisar clareza. Preserve as conversas reais, as escolhas e o aprendizado. Na apresentação final, mostre o problema, o processo, as decisões e o que faria diferente.',
        ],
        quote: 'O primeiro portfólio não precisa provar que você sabe tudo. Precisa provar que você sabe aprender.',
      },
    ],
  },
  {
    slug: 'mudar-de-carreira-sem-jogar-a-historia-fora',
    title: 'Mudar de carreira sem jogar a história fora',
    excerpt: 'Uma transição consistente combina o que você já sabe fazer com novas evidências, novas relações e uma direção mais clara.',
    track: 'mudanca-carreira',
    category: 'Transição profissional',
    format: 'Guia',
    tags: ['transição', 'repertório', 'posicionamento'],
    readingMinutes: 10,
    publishedAt: '2026-08-16',
    updatedAt: '2026-08-16',
    image: '/images/em-cena/fernando-parreiras-palestra-techhuman-1600.webp',
    imageAlt: 'Fernando Parreiras falando ao público em um evento.',
    nature: 'Método de reflexão e planejamento profissional.',
    cta: {
      label: 'Conversar sobre mudança de carreira',
      href: 'mailto:fernando@fernandoparreiras.com.br?subject=Mudan%C3%A7a%20de%20carreira',
    },
    content: [
      {
        heading: 'Transição não precisa significar recomeçar do zero',
        paragraphs: [
          'Muitas pessoas tratam mudança de carreira como uma ruptura completa: abandonar o passado, aprender uma nova profissão e só então voltar a ter valor. Essa narrativa aumenta o risco e ignora competências transferíveis.',
          'Sua história contém formas de resolver problemas, compreender contextos, construir relações e entregar sob restrições. O desafio é traduzir esse repertório para um novo campo.',
        ],
      },
      {
        heading: 'Três inventários antes do movimento',
        bullets: [
          'Problemas que você já sabe resolver com consistência.',
          'Ambientes, temas e pessoas dos quais você quer se aproximar.',
          'Evidências que ainda faltam para que a nova direção pareça confiável.',
        ],
        paragraphs: [
          'O terceiro inventário transforma ansiedade em plano. Em vez de perguntar apenas “qual curso devo fazer?”, você passa a perguntar “qual prova pequena posso construir nos próximos 30 dias?”.',
        ],
      },
      {
        heading: 'Faça experimentos antes de fazer promessas',
        paragraphs: [
          'Converse com profissionais do novo campo, participe de um projeto limitado e produza uma entrega real. Experimentos revelam se a rotina desejada combina com você e criam linguagem para explicar a mudança.',
        ],
        quote: 'Uma boa transição não apaga o passado. Ela dá uma nova função a ele.',
      },
    ],
  },
  {
    slug: 'usar-ia-sem-perder-a-autoria',
    title: 'Usar IA sem perder a autoria',
    excerpt: 'Autoria não é digitar cada palavra. É definir intenção, escolher critérios, verificar o que importa e responder pela entrega.',
    track: 'carreira-ia',
    category: 'Prática profissional',
    format: 'Nota de campo',
    tags: ['IA no trabalho', 'autoria', 'qualidade'],
    readingMinutes: 6,
    publishedAt: '2026-08-12',
    updatedAt: '2026-08-12',
    image: '/images/em-cena/fernando-parreiras-palestra-principal-1122.webp',
    imageAlt: 'Fernando Parreiras durante uma palestra sobre tecnologia e negócios.',
    nature: 'Nota de campo e posição editorial.',
    cta: {
      label: 'Conhecer a formação IA sem Confusão',
      href: '/academy/ia-sem-confusao',
    },
    content: [
      {
        heading: 'Autoria é uma cadeia de decisões',
        paragraphs: [
          'É possível escrever todas as palavras de um texto e ainda assim repetir ideias sem examiná-las. Também é possível trabalhar com IA e preservar autoria. A diferença está na qualidade das decisões ao longo do processo.',
        ],
      },
      {
        heading: 'Um fluxo simples para preservar autoria',
        bullets: [
          'Comece registrando sua intenção e sua tese sem pedir uma resposta pronta.',
          'Use a IA para encontrar objeções, perguntas ausentes e estruturas alternativas.',
          'Confira fatos, referências e afirmações que sustentam a conclusão.',
          'Reescreva com sua voz e retire tudo que você não seria capaz de defender.',
        ],
      },
      {
        heading: 'A pergunta final',
        paragraphs: [
          'Antes de publicar ou entregar, pergunte: se alguém contestar este resultado, consigo explicar por que ele está assim? Se a resposta for não, ainda não há autoria suficiente.',
        ],
        quote: 'Autoria começa onde termina a aceitação automática.',
      },
    ],
  },
  {
    slug: 'primeira-oportunidade-procure-valor-nao-apenas-cargo',
    title: 'Na primeira oportunidade, procure valor — não apenas cargo',
    excerpt: 'O início da carreira acelera quando você aprende a observar necessidades, combinar recursos e deixar uma situação melhor do que encontrou.',
    track: 'jovens-futuro',
    category: 'Carreira',
    format: 'Ensaio',
    tags: ['jovens', 'oportunidades', 'valor'],
    readingMinutes: 6,
    publishedAt: '2026-08-08',
    updatedAt: '2026-08-08',
    image: '/images/em-cena/fernando-parreiras-palco-1600.webp',
    imageAlt: 'Fernando Parreiras conduzindo uma conversa no palco.',
    nature: 'Orientação profissional e reflexão.',
    cta: {
      label: 'Compartilhar com um jovem',
      href: 'https://wa.me/?text=Uma%20leitura%20para%20quem%20est%C3%A1%20come%C3%A7ando%20a%20carreira%3A%20https%3A%2F%2Ffernandoparreiras.com.br%2Fartigos%2Fprimeira-oportunidade-procure-valor-nao-apenas-cargo%2F',
    },
    content: [
      {
        heading: 'O cargo é uma descrição incompleta',
        paragraphs: [
          'No início da carreira, títulos parecem mapas seguros. Mas o aprendizado mais importante é perceber como uma organização cria valor: quem ela atende, que problemas enfrenta e como uma boa entrega muda o resultado.',
        ],
      },
      {
        heading: 'Observe antes de propor',
        paragraphs: ['Em uma nova oportunidade, procure responder a quatro perguntas.'],
        bullets: [
          'Quem depende deste trabalho?',
          'O que hoje consome tempo, gera erro ou produz frustração?',
          'Qual pequena melhoria seria percebida por essas pessoas?',
          'Como registrar o antes e o depois?',
        ],
      },
      {
        heading: 'Construa reputação por ciclos',
        paragraphs: [
          'Entenda, entregue, peça retorno e melhore. Repetido com consistência, esse ciclo constrói uma reputação mais forte do que a tentativa de parecer pronto desde o primeiro dia.',
        ],
        quote: 'Carreira começa quando você aprende a transformar atenção em contribuição.',
      },
    ],
  },
];

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug);
}

export function getTrack(trackId) {
  return knowledgeTracks.find((track) => track.id === trackId);
}

export function getSearchableArticleText(article) {
  const body = article.content.flatMap((section) => [
    section.heading,
    ...(section.paragraphs || []),
    ...(section.bullets || []),
    section.quote,
  ]);

  return [
    article.title,
    article.excerpt,
    article.category,
    article.format,
    ...article.tags,
    ...body,
  ].filter(Boolean).join(' ').toLocaleLowerCase('pt-BR');
}
