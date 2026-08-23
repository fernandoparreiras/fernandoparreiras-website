export const proofPoints = Object.freeze([
  {
    value: '28 anos',
    label: 'em tecnologia, produto e liderança',
    source: 'Tech Human',
    sourceUrl: 'https://www.techhuman.com.br/sobre-nos-tecnologia/'
  },
  {
    value: '+50',
    label: 'projetos nacionais e internacionais',
    source: 'Tech Human',
    sourceUrl: 'https://www.techhuman.com.br/sobre-nos-tecnologia/'
  },
  {
    value: '90%',
    label: 'dos clientes com mais de uma iniciativa',
    source: 'Tech Human',
    sourceUrl: 'https://www.techhuman.com.br/sobre-nos-tecnologia/'
  },
  {
    value: 'TECH + PEOPLE',
    label: 'tecnologia a serviço de pessoas e negócios',
    source: 'Tech Human',
    sourceUrl: 'https://www.techhuman.com.br/'
  }
]);

export const intentPaths = Object.freeze([
  {
    id: 'desafio-empresarial',
    eyebrow: 'Empresas',
    title: 'Transformar tecnologia e IA em resultado',
    description: 'Estruturar estratégia, produto, dados, IA, times ou execução digital.',
    href: '/solucoes/transformacao-tecnologia-ia',
    cta: 'Explorar esta rota',
    icon: 'building'
  },
  {
    id: 'decisao-executiva',
    eyebrow: 'CEOs e founders',
    title: 'Tomar decisões críticas com acompanhamento sênior',
    description: 'Advisory para tecnologia, produto, IA, estrutura, crescimento e prioridades.',
    href: '/solucoes/advisory-executivo',
    cta: 'Conhecer o advisory',
    icon: 'compass'
  },
  {
    id: 'governanca',
    eyebrow: 'Conselhos',
    title: 'Fortalecer governança e visão de longo prazo',
    description: 'Participação consultiva para organizações em evolução, transição ou escala.',
    href: '/solucoes/conselho',
    cta: 'Entender a atuação',
    icon: 'landmark'
  },
  {
    id: 'produto-ia',
    eyebrow: 'Venture e produto',
    title: 'Transformar conhecimento de mercado em produto de IA',
    description: 'Co-construção orientada por domínio, arquitetura, segurança e evidência.',
    href: 'https://forge.trustyu.ai/',
    cta: 'Conhecer Trustyu/FORGE',
    icon: 'sparkles',
    external: true
  },
  {
    id: 'palestra',
    eyebrow: 'Eventos e times',
    title: 'Levar clareza sobre IA, negócios e liderança ao palco',
    description: 'Keynotes, palestras e workshops adaptados ao contexto da audiência.',
    href: '/palestras',
    cta: 'Ver temas e formatos',
    icon: 'mic'
  }
]);

export const offerCatalog = Object.freeze({
  'advisory-executivo': Object.freeze({
    slug: 'advisory-executivo',
    title: 'Advisory Executivo',
    shortTitle: 'Advisory',
    eyebrow: 'Decisão com contexto',
    summary: 'Acompanhamento sênior para founders, CEOs e executivos diante de decisões críticas de tecnologia, produto, IA, estrutura e crescimento.',
    buyer: 'Founders, CEOs, CTOs, CPOs e executivos responsáveis por transformação ou crescimento.',
    situations: [
      'A estratégia existe, mas as prioridades competem entre si.',
      'Tecnologia e produto precisam voltar a responder ao negócio.',
      'A empresa quer usar IA sem transformar operação e investimento em experimento.',
      'Uma decisão de estrutura, liderança, parceiro ou plataforma exige visão independente.'
    ],
    deliverables: [
      'Leitura executiva do desafio e dos riscos.',
      'Mapa de decisões, prioridades e dependências.',
      'Sessões recorrentes com preparação e encaminhamentos.',
      'Conexão com especialistas ou operações do ecossistema quando necessário.'
    ],
    format: 'Ciclo inicial de diagnóstico e priorização, seguido de cadência executiva definida conforme o contexto.',
    intent: 'advisory',
    cta: 'Solicitar diagnóstico executivo'
  }),
  conselho: Object.freeze({
    slug: 'conselho',
    title: 'Conselho Consultivo',
    shortTitle: 'Conselho',
    eyebrow: 'Governança e permanência',
    summary: 'Perspectiva independente para qualificar decisões, alinhar tecnologia ao negócio e acompanhar riscos e oportunidades de longo prazo.',
    buyer: 'Empresas em crescimento, transição, profissionalização, sucessão ou reposicionamento.',
    situations: [
      'A liderança precisa de contraponto e visão externa recorrente.',
      'Tecnologia, produto ou IA passaram a fazer parte da agenda do conselho.',
      'Crescimento e governança precisam avançar juntos.',
      'O negócio precisa transformar decisões estratégicas em acompanhamento disciplinado.'
    ],
    deliverables: [
      'Participação em reuniões e ciclos de preparação.',
      'Leitura de riscos, decisões e indicadores relevantes.',
      'Contribuição em tecnologia, produto, inovação, pessoas e IA.',
      'Registro de recomendações e pontos de acompanhamento.'
    ],
    format: 'Escopo, frequência, responsabilidades e potenciais conflitos definidos antes do início.',
    intent: 'conselho',
    cta: 'Conversar sobre o conselho'
  }),
  'transformacao-tecnologia-ia': Object.freeze({
    slug: 'transformacao-tecnologia-ia',
    title: 'Transformação em Tecnologia e IA',
    shortTitle: 'Tecnologia e IA',
    eyebrow: 'Tech Human',
    summary: 'Estratégia e execução para empresas que precisam transformar tecnologia, produto, dados, IA e liderança em capacidade real de negócio.',
    buyer: 'Empresas com desafios de direção, maturidade, execução, produto digital, dados, IA ou formação de times.',
    situations: [
      'A operação trava antes da tecnologia.',
      'Projetos digitais não chegam ao resultado esperado.',
      'IA aparece em pilotos desconectados de processo, dados e governança.',
      'O time precisa de direção, capacidade ou liderança sênior.'
    ],
    deliverables: [
      'Assessment e definição de problema.',
      'Estratégia e roadmap orientados ao negócio.',
      'Arquitetura, produto, dados, IA, squads ou delivery conforme a necessidade.',
      'Acompanhamento executivo e formação quando aplicável.'
    ],
    format: 'A Tech Human define a melhor porta de entrada depois de compreender o desafio; o site pessoal não substitui a proposta comercial.',
    intent: 'tech-human',
    cta: 'Falar sobre o desafio'
  })
});

export const ecosystemGroups = Object.freeze([
  {
    id: 'commercial',
    label: 'Operação comercial',
    description: 'Onde desafios empresariais e executivos se transformam em trabalho contratado.',
    items: [
      {
        name: 'TECH HUMAN',
        tag: 'Empresa B2B',
        description: 'Estratégia, tecnologia, produtos, dados, IA, liderança, Academy e execução digital.',
        audience: 'Empresas e times executivos',
        href: 'https://www.techhuman.com.br/',
        cta: 'Conhecer a Tech Human'
      },
      {
        name: 'Fernando Parreiras',
        tag: 'Atuação direta',
        description: 'Advisory executivo, conselho consultivo, palestras e conversas estratégicas selecionadas.',
        audience: 'Founders, CEOs, conselhos e eventos',
        href: '/solucoes',
        cta: 'Explorar soluções'
      }
    ]
  },
  {
    id: 'ventures',
    label: 'Produtos e ventures',
    description: 'Tecnologia e conhecimento de domínio organizados como produto, com maturidade explícita.',
    items: [
      {
        name: 'needyu.ai',
        tag: 'Produto no ar',
        status: 'No ar',
        description: 'Copilot de inteligência e produtividade para reuniões, com planos individuais e contexto Enterprise.',
        audience: 'Profissionais, times e empresas',
        href: 'https://needyu.ai/plans/',
        cta: 'Conhecer planos'
      },
      {
        name: 'Trustyu / FORGE',
        tag: 'Venture & AI product building',
        status: 'Framework no ar',
        description: 'Co-construção de produtos de IA com domínio, arquitetura, governança e evidência.',
        audience: 'Especialistas de mercado e empresas',
        href: 'https://forge.trustyu.ai/',
        cta: 'Conhecer a FORGE'
      }
    ]
  },
  {
    id: 'purpose',
    label: 'Formação, mídia e propósito',
    description: 'Iniciativas que distribuem conhecimento, valores, formação e comunidade.',
    items: [
      {
        name: 'POR.life',
        tag: 'Fé e trabalho',
        description: 'Princípios e framework para integrar vida, trabalho, empresas e propósito.',
        audience: 'Líderes, empresas e comunidades',
        href: 'https://por.life/',
        cta: 'Conhecer a iniciativa'
      },
      {
        name: 'Jornada Cast',
        tag: 'Podcast',
        description: 'Conversas e histórias sobre carreira, negócios, tecnologia, liderança e jornada.',
        audience: 'Profissionais e empreendedores',
        href: 'https://www.jornadacast.com.br/',
        cta: 'Ouvir episódios'
      },
      {
        name: 'SER Talks',
        tag: 'Conteúdo e palestras',
        description: 'Conversas sobre identidade, propósito, liderança e desenvolvimento humano.',
        audience: 'Pessoas, líderes e eventos',
        href: 'https://sertalks.life/',
        cta: 'Conhecer SER Talks'
      },
      {
        name: 'Zoe Seekers',
        tag: 'Conteúdo e comunidade',
        description: 'Reflexões e conteúdos sobre vida, fé, busca e transformação.',
        audience: 'Comunidade e público de conteúdo',
        href: 'https://www.youtube.com/@zoeseekers',
        cta: 'Acessar o canal'
      },
      {
        name: 'Essendi',
        tag: 'Formação',
        description: 'Cursos e mentorias para reinvenção e desenvolvimento pessoal e profissional.',
        audience: 'Profissionais e líderes',
        href: 'https://www.essendiprogram.com.br/',
        cta: 'Conhecer os programas'
      }
    ]
  }
]);

export const caseStudies = Object.freeze([
  {
    id: 'phygtl',
    client: 'Phygtl.world',
    category: 'Advisor em tecnologia',
    challenge: 'Apoiar a evolução tecnológica e a estruturação de soluções escaláveis para uma plataforma com ambição global.',
    role: 'Fernando, representando a Tech Human, atua como advisor em tecnologia.',
    work: 'Direcionamento estratégico e contribuição para decisões de evolução da plataforma.',
    sourceUrl: 'https://www.techhuman.com.br/clientes-solucoes-personalizadas'
  },
  {
    id: 'eunerd',
    client: 'Encontre um Nerd',
    category: 'CTO as a Service e conselho',
    challenge: 'Evoluir uma plataforma que conecta empresas a profissionais de tecnologia e qualificar decisões de alto impacto.',
    role: 'Tech Human atua como CTO as a Service e advisor no conselho.',
    work: 'Liderança tecnológica, estrutura moderna e orientação estratégica.',
    sourceUrl: 'https://www.techhuman.com.br/clientes-solucoes-personalizadas'
  },
  {
    id: 'seedz',
    client: 'Seedz',
    category: 'Scale-up de produto e tecnologia',
    challenge: 'Acompanhar uma startup do agronegócio em fase de escala e evolução de plataforma.',
    role: 'Fernando, representando a Tech Human, liderou tecnologia e produto durante o scale-up.',
    work: 'Direção de tecnologia e produto conectada ao crescimento da operação.',
    sourceUrl: 'https://www.techhuman.com.br/clientes-solucoes-personalizadas'
  },
  {
    id: 'sicoob',
    client: 'Sicoob Credicom',
    category: 'Inovação e transformação',
    challenge: 'Engajar times para a importância de inovação, agilidade e transformação digital.',
    role: 'Atuação de Fernando pela Tech Human junto às equipes.',
    work: 'Sensibilização e formação para apoiar uma agenda de transformação.',
    sourceUrl: 'https://www.techhuman.com.br/clientes-solucoes-personalizadas'
  }
]);

export const talkTopics = Object.freeze([
  {
    title: 'IA para negócios sem confusão',
    description: 'Como separar tendência, experimento e capacidade real para decidir onde a IA gera resultado.'
  },
  {
    title: 'TECH + PEOPLE',
    description: 'Por que transformação tecnológica depende de liderança, cultura, clareza e desenvolvimento humano.'
  },
  {
    title: 'Da carreira ao legado',
    description: 'Decisões, princípios e responsabilidade na construção de uma jornada profissional que permanece.'
  },
  {
    title: 'Produtos e ventures de IA com governança',
    description: 'Do conhecimento de domínio ao produto, com arquitetura, evidência e humanos nos pontos críticos.'
  }
]);

