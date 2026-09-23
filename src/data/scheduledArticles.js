import { radarArticles } from "./radarArticles.js";
import { radarSeptember10Articles } from "./radarSeptember10Articles.js";
import { isRadarArticleApproved } from "./radarPublicationApprovals.js";
import { sequoiaServicesArticle } from "./sequoiaServicesArticle.js";
import { aiCostCareerArticle } from "./aiCostCareerArticle.js";
import { fdeCareerArticle } from "./fdeCareerArticle.js";

export const scheduledArticles = [
  sequoiaServicesArticle,
  ...radarSeptember10Articles.filter(isRadarArticleApproved),
  ...radarArticles,
  aiCostCareerArticle,
  fdeCareerArticle,
  {
    slug: "plano-de-90-dias-para-uma-transicao-profissional-com-ia",
    title: "Um plano de 90 dias para uma transição profissional com IA",
    excerpt:
      "Transição consistente combina direção, experimentos e evidências. A IA pode acelerar o processo, mas não substitui a escolha nem a exposição ao mundo real.",
    track: "mudanca-carreira",
    category: "Transição profissional",
    format: "Plano prático",
    tags: ["transição", "plano de 90 dias", "carreira com IA"],
    readingMinutes: 11,
    publishedAt: "2026-09-26",
    updatedAt: "2026-09-26",
    scheduledAt: "2026-09-26T09:00:00-03:00",
    image: "/images/em-cena/fernando-parreiras-palestra-techhuman-1600.webp",
    imageAlt:
      "Fernando Parreiras falando ao público durante um evento profissional.",
    nature:
      "Plano de desenvolvimento profissional baseado em experimentação e evidências.",
    cta: {
      label: "Conversar sobre sua transição profissional",
      href: "mailto:fernando@fernandoparreiras.com.br?subject=Plano%20de%2090%20dias%20para%20transi%C3%A7%C3%A3o",
    },
    content: [
      {
        heading:
          "Noventa dias são um ciclo de aprendizagem, não uma promessa de reinvenção",
        paragraphs: [
          "Planos de mudança de carreira costumam falhar por dois extremos. Em um, a pessoa espera ter certeza antes de agir. No outro, rompe com tudo antes de descobrir se a nova rotina combina com sua realidade. Um ciclo de 90 dias cria uma terceira possibilidade: avançar o suficiente para produzir evidências sem transformar uma hipótese em aposta irreversível.",
          "A meta não é terminar o trimestre com uma nova identidade pronta. É chegar ao final com uma direção mais informada, uma entrega demonstrável, relações relevantes e critérios melhores para decidir o próximo movimento.",
        ],
      },
      {
        heading:
          "Dias 1 a 30: escolher um problema e mapear o ponto de partida",
        paragraphs: [
          "Comece pela interseção entre três elementos: problemas que você já sabe enfrentar, temas que deseja explorar e pessoas ou organizações que reconhecem valor nessa combinação. A IA pode ajudar a organizar o inventário, comparar descrições de atuação e formular perguntas, mas a matéria-prima precisa vir da sua história.",
        ],
        bullets: [
          "Liste dez situações em que seu trabalho melhorou uma decisão, uma operação ou uma experiência.",
          "Converse com cinco pessoas do campo desejado sobre problemas reais, não apenas sobre cargos.",
          "Escolha uma hipótese de contribuição que possa ser testada em poucas semanas.",
          "Defina o que você precisa aprender e o que já pode oferecer desde agora.",
        ],
      },
      {
        heading: "Dias 31 a 60: construir uma evidência pequena e pública",
        paragraphs: [
          "Transforme a hipótese em uma entrega observável. Pode ser um diagnóstico, um guia, uma automação limitada, uma análise, um protótipo ou a melhoria de um processo. Use IA como pesquisadora, crítica e editora. Preserve para você as decisões, as entrevistas, a verificação e a responsabilidade pelo resultado.",
          "Peça retorno a pessoas capazes de avaliar utilidade, não apenas acabamento. Registre o que mudou entre a primeira versão e a entrega revisada. Essa história de aprendizagem vale mais do que apresentar uma peça sem contexto.",
        ],
      },
      {
        heading:
          "Dias 61 a 90: testar posicionamento e escolher o próximo compromisso",
        paragraphs: [
          "Agora organize a evidência em uma narrativa simples: qual problema você observou, o que fez, quais critérios usou, o que aprendeu e onde ainda precisa evoluir. Compartilhe essa narrativa em conversas, candidaturas, comunidades ou propostas limitadas.",
          "Ao final do ciclo, decida entre aprofundar, ajustar ou abandonar a hipótese. Todas as três respostas são úteis quando surgem de experiência concreta. O desperdício é prolongar uma transição apenas imaginada.",
        ],
        quote:
          "Uma transição ganha força quando deixa de ser intenção e começa a produzir evidências.",
      },
      {
        heading: "A cadência semanal que sustenta o plano",
        bullets: [
          "Uma conversa de descoberta.",
          "Um bloco de prática ou produção deliberada.",
          "Uma revisão crítica do que foi criado com apoio de IA.",
          "Um registro público ou privado do aprendizado.",
          "Uma decisão explícita sobre a semana seguinte.",
        ],
        paragraphs: [
          "O plano funciona menos pela quantidade de tarefas e mais pela repetição desse ciclo. Em 90 dias, você não controla a resposta do mercado, mas pode controlar a qualidade das evidências que coloca diante dele.",
        ],
      },
      {
        heading: "Fontes e natureza do texto",
        paragraphs: [
          "1. [OCDE — Promoting Better Career Choices for Longer Working Lives](https://www.oecd.org/content/dam/oecd/en/publications/reports/2024/03/promoting-better-career-choices-for-longer-working-lives_a6eaa77a/1ef9a0d0-en.pdf). O relatório discute orientação, identificação de competências transferíveis, planejamento de caminhos e apoio a transições profissionais. Ele não valida um ciclo universal de 90 dias nem prevê o resultado de uma pessoa.",
          "2. [World Economic Forum — Future of Jobs Report 2025, skills outlook](https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/). Pesquisa internacional com empregadores sobre competências em transformação, incluindo pensamento analítico, resiliência, liderança, aprendizagem contínua e competências tecnológicas. Expectativas agregadas não garantem contratação ou progressão individual.",
          "A estrutura de 90 dias, as três etapas e a cadência semanal são uma síntese autoral de Fernando Parreiras para transformar intenção em experimentos e evidências. Não constituem protocolo clínico, educacional ou promessa de recolocação.",
        ],
      },
      {
        heading: "Nota editorial e de responsabilidade",
        paragraphs: [
          "Este texto oferece um método informativo de desenvolvimento profissional. Não substitui aconselhamento individual de carreira, psicológico, educacional, jurídico ou financeiro e não promete emprego, renda, promoção ou prazo de transição. Pesquisa e redação tiveram assistência de IA; Fernando Parreiras responde pela orientação editorial publicada e mantém interesse profissional e comercial em carreira, liderança, formação e transformação com IA.",
          "Corte das fontes e revisão factual: 23/09/2026. Versão preparada antes da primeira publicação pública, preservando a agenda original de 26/09/2026.",
        ],
      },
    ],
  },
  {
    slug: "equipes-com-agentes-de-ia-ainda-precisam-de-responsabilidade-humana",
    title:
      "Equipes com agentes de IA ainda precisam de responsabilidade humana",
    excerpt:
      "Automatizar etapas não transfere responsabilidade. Organizações precisam definir quem autoriza, acompanha, interrompe e responde pelo trabalho realizado por agentes.",
    track: "lideranca-negocios",
    category: "Governança e liderança",
    format: "Análise",
    tags: ["agentes de IA", "responsabilidade", "governança"],
    readingMinutes: 10,
    publishedAt: "2026-09-22",
    updatedAt: "2026-09-23",
    scheduledAt: "2026-09-22T09:00:00-03:00",
    image: "/images/em-cena/fernando-parreiras-palco-1600.webp",
    imageAlt:
      "Fernando Parreiras conduzindo uma apresentação sobre tecnologia e negócios.",
    nature:
      "Análise profissional sobre delegação, controle e responsabilidade organizacional.",
    cta: {
      label: "Conversar sobre governança e transformação com IA",
      href: "/solucoes/transformacao-tecnologia-ia",
    },
    content: [
      {
        heading: "A execução pode ser automática; a responsabilidade, não",
        paragraphs: [
          "Agentes de IA conseguem pesquisar, organizar informações, produzir documentos, operar ferramentas e encadear decisões. Isso amplia a capacidade de uma equipe, mas também cria uma tentação perigosa: tratar o sistema como se ele pudesse assumir a responsabilidade que antes pertencia a uma pessoa.",
          "Responsabilidade não é uma propriedade do software. É um contrato organizacional. Alguém precisa definir a finalidade, autorizar o acesso, estabelecer limites, observar sinais de desvio e responder pelas consequências.",
        ],
      },
      {
        heading: "Antes de delegar, desenhe o contrato operacional",
        paragraphs: [
          "Um agente não deveria receber apenas uma instrução. Deveria receber um espaço de atuação claramente delimitado. Quanto maior a autonomia, mais importante é tornar explícitas as condições de entrada, as evidências esperadas e os momentos de retorno para uma pessoa.",
        ],
        bullets: [
          "Objetivo: qual resultado o agente deve ajudar a produzir?",
          "Escopo: quais dados, ferramentas e decisões estão autorizados?",
          "Limites: o que nunca pode ser executado sem confirmação humana?",
          "Evidências: como a equipe reconstrói o que aconteceu e por quê?",
          "Interrupção: quem pode pausar o fluxo quando algo foge do esperado?",
        ],
      },
      {
        heading: "Supervisão humana precisa acontecer em pontos concretos",
        paragraphs: [
          "Dizer que existe “humano no circuito” é insuficiente quando ninguém sabe em qual momento essa pessoa participa. A supervisão pode acontecer antes da execução, na aprovação de ações sensíveis; durante o trabalho, na observação de exceções; e depois, na revisão de resultados e incidentes.",
          "A combinação correta depende do risco. Uma tarefa reversível e interna pode admitir mais autonomia. Uma ação que afeta clientes, dinheiro, direitos, reputação ou dados exige controles mais fortes e uma autoridade humana identificável.",
        ],
      },
      {
        heading: "Liderar agentes também é liderar o sistema ao redor deles",
        paragraphs: [
          "O desempenho do agente depende da qualidade do contexto, das ferramentas, das permissões, dos critérios e das pessoas que interpretam seu trabalho. Por isso, não basta escolher um modelo melhor. É preciso projetar a operação que transforma capacidade técnica em resultado confiável.",
          "Quando ocorre um erro, a pergunta madura não é apenas “por que a IA fez isso?”. É “que decisão de desenho permitiu que isso acontecesse e qual responsabilidade precisa ser corrigida?”.",
        ],
        quote:
          "Automação amplia a execução. Governança mantém a responsabilidade visível.",
      },
      {
        heading: "Fontes e natureza do texto",
        paragraphs: [
          "1. [NIST — AI Risk Management Framework Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/). O framework voluntário define governança contínua, responsabilidades organizacionais, documentação, supervisão e mecanismos de gestão de riscos ao longo do ciclo de vida. Não é uma lei nem prescreve um único desenho operacional.",
          "2. [NIST — Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf). O perfil propõe ações para governar, mapear, medir e administrar riscos específicos ou ampliados pela IA generativa. As recomendações precisam ser adaptadas ao contexto, à finalidade e à tolerância a risco de cada organização.",
          "O contrato operacional, os pontos de supervisão e as perguntas de liderança são síntese autoral de Fernando Parreiras. Eles traduzem princípios de governança para uma prática executiva e não substituem avaliação jurídica, regulatória, de segurança ou de risco específica.",
        ],
      },
      {
        heading: "Nota editorial e de responsabilidade",
        paragraphs: [
          "Este artigo é conteúdo informativo sobre liderança e governança de sistemas com IA. Não oferece aconselhamento jurídico, regulatório, trabalhista, de segurança ou de conformidade. Pesquisa e redação tiveram assistência de IA; Fernando Parreiras responde pela orientação editorial publicada e mantém interesse profissional e comercial em estratégia, arquitetura, governança, produtos e transformação com IA.",
          "Corte das fontes e revisão factual: 23/09/2026. Histórico de correções: fontes, limites das evidências e nota de responsabilidade adicionados antes da primeira publicação pública; a tese central foi preservada.",
        ],
      },
    ],
  },
  {
    slug: "competencias-que-sobrevivem-a-uma-mudanca-de-carreira",
    title: "Competências que sobrevivem a uma mudança de carreira",
    excerpt:
      "Cargos mudam mais rápido do que a capacidade de compreender problemas, mobilizar pessoas, decidir sob restrições e aprender com evidências.",
    track: "mudanca-carreira",
    category: "Repertório profissional",
    format: "Guia",
    tags: ["competências transferíveis", "transição", "repertório"],
    readingMinutes: 9,
    publishedAt: "2026-09-18",
    updatedAt: "2026-09-18",
    scheduledAt: "2026-09-18T09:00:00-03:00",
    image: "/images/em-cena/fernando-parreiras-palestra-microfone-1600.webp",
    imageAlt:
      "Fernando Parreiras conversando com uma audiência durante uma palestra.",
    nature: "Método de tradução de repertório para transições profissionais.",
    cta: {
      label: "Conversar sobre reposicionamento profissional",
      href: "mailto:fernando@fernandoparreiras.com.br?subject=Reposicionamento%20profissional",
    },
    content: [
      {
        heading: "Seu cargo é apenas uma embalagem temporária",
        paragraphs: [
          "Ao pensar em transição, muitas pessoas descrevem a própria experiência apenas por cargos, setores e ferramentas. Essa linguagem funciona dentro do ambiente conhecido, mas perde força quando o contexto muda. Um novo campo pode não reconhecer o título anterior, embora precise exatamente da capacidade construída por trás dele.",
          "O primeiro trabalho da transição é separar a embalagem da competência. Em vez de dizer apenas o que você era, explique que tipo de situação conseguia compreender, decidir e melhorar.",
        ],
      },
      {
        heading: "Quatro competências atravessam diferentes contextos",
        bullets: [
          "Leitura de contexto: perceber interesses, restrições e sinais que não aparecem no pedido inicial.",
          "Formulação de problemas: transformar ambiguidade em uma pergunta útil e um resultado observável.",
          "Coordenação: combinar pessoas, conhecimento e recursos para que uma decisão se torne entrega.",
          "Aprendizagem com evidências: testar, receber crítica e alterar o caminho sem defender o plano por orgulho.",
        ],
        paragraphs: [
          "Essas competências não eliminam a necessidade de aprender linguagem e práticas do novo campo. Elas reduzem, porém, a distância entre ser iniciante no contexto e ser iniciante em tudo.",
        ],
      },
      {
        heading: "Transforme experiência em episódios verificáveis",
        paragraphs: [
          "Competências genéricas como comunicação, liderança ou pensamento crítico dizem pouco sozinhas. Para torná-las confiáveis, escolha episódios concretos. Descreva o cenário, a restrição, a decisão, a sua contribuição e o que mudou depois.",
          "A IA pode ajudar a encontrar padrões entre esses episódios e a testar versões da narrativa. Não permita que ela invente resultados ou torne a história mais grandiosa. A força está na precisão com que você explica o que realmente aconteceu.",
        ],
      },
      {
        heading: "Construa uma ponte, não um salto",
        paragraphs: [
          "Escolha um projeto que use parte relevante do repertório anterior e exija uma competência do campo desejado. Essa combinação produz uma evidência de transição: algo que mostra continuidade e, ao mesmo tempo, movimento.",
          "A melhor pergunta não é “como abandono quem eu era?”. É “qual parte da minha história pode ganhar uma nova função?”.",
        ],
        quote:
          "Uma competência transferível só se torna visível quando é traduzida para um problema novo.",
      },
      {
        heading: "Fontes e natureza do texto",
        paragraphs: [
          "1. [World Economic Forum — Future of Jobs Report 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/digest/). Pesquisa com empregadores sobre transformações do trabalho e competências; suas projeções agregadas não determinam a trajetória de uma pessoa. 2. [OECD — Artificial intelligence and the changing demand for skills in the labour market](https://www.oecd.org/en/publications/artificial-intelligence-and-the-changing-demand-for-skills-in-the-labour-market_88684e36-en.html). Revisão sobre IA e demanda por competências; os efeitos variam por ocupação, organização e país.",
          "As quatro competências, o método de episódios verificáveis e a orientação de construir uma ponte são síntese autoral de Fernando Parreiras, não uma taxonomia universal nem promessa de contratação.",
        ],
      },
      {
        heading: "Nota editorial e de responsabilidade",
        paragraphs: [
          "Conteúdo informativo sobre carreira, sem aconselhamento individual ou garantia de emprego, promoção ou renda. Pesquisa e redação tiveram assistência de IA; Fernando Parreiras responde pela orientação editorial publicada. Corte das fontes e revisão factual: 18/09/2026.",
        ],
      },
    ],
  },
  {
    slug: "faculdade-curso-certificacao-ou-projeto",
    title: "Faculdade, curso, certificação ou projeto: onde investir primeiro?",
    excerpt:
      "Cada caminho compra uma coisa diferente. A melhor escolha começa pelo tipo de evidência, repertório e relação que você precisa construir agora.",
    track: "jovens-futuro",
    category: "Escolhas de formação",
    format: "Guia de decisão",
    tags: ["jovens", "formação", "primeiros projetos"],
    readingMinutes: 8,
    publishedAt: "2026-09-14",
    updatedAt: "2026-09-14",
    scheduledAt: "2026-09-14T09:00:00-03:00",
    image: "/images/em-cena/fernando-parreiras-palestra-principal-1122.webp",
    imageAlt: "Fernando Parreiras apresentando ideias em um palco.",
    nature:
      "Orientação educacional baseada em objetivos, evidências e experimentação.",
    cta: {
      label: "Conversar sobre uma formação para jovens",
      href: "mailto:fernando@fernandoparreiras.com.br?subject=Forma%C3%A7%C3%A3o%20e%20carreira%20para%20jovens",
    },
    content: [
      {
        heading: "A escolha certa depende do que está faltando",
        paragraphs: [
          "Quando alguém está começando, é comum procurar uma resposta universal: faculdade ou curso? Certificação ou projeto? A pergunta mais útil é outra: qual capacidade, relação ou evidência preciso construir nesta etapa?",
          "Formação não é apenas acumular conteúdos. É criar condições para compreender um campo, praticar com disciplina, receber crítica e mostrar que você consegue transformar aprendizado em contribuição.",
        ],
      },
      {
        heading: "O que cada caminho tende a oferecer",
        bullets: [
          "Faculdade: amplitude, fundamentos, tempo de maturação, relações e acesso a comunidades profissionais.",
          "Curso: foco em uma capacidade delimitada, com menor custo de tempo e aplicação mais rápida.",
          "Certificação: sinal padronizado de conhecimento em um método, tecnologia ou prática específica.",
          "Projeto: evidência de iniciativa, julgamento, execução e aprendizagem diante de uma situação concreta.",
        ],
        paragraphs: [
          "Nenhum desses caminhos garante competência sozinho. Também não são escolhas necessariamente excludentes. Uma boa composição pode combinar fundamento, prática e evidência em proporções diferentes ao longo do tempo.",
        ],
      },
      {
        heading: "Use três perguntas antes de investir",
        bullets: [
          "A pessoa ou oportunidade que desejo alcançar reconhece esse caminho como relevante?",
          "Terei oportunidades reais de praticar, receber retorno e revisar o que produzi?",
          "Ao terminar, conseguirei mostrar uma evidência além do certificado de conclusão?",
        ],
        paragraphs: [
          "Se as três respostas forem vagas, o investimento pode estar comprando sensação de movimento em vez de desenvolvimento. Pesquise pessoas que fizeram o percurso, observe as entregas esperadas e calcule não apenas o preço, mas também o tempo que deixará de ser usado em outras experiências.",
        ],
      },
      {
        heading: "Uma composição simples para os próximos 30 dias",
        paragraphs: [
          "Escolha um tema que desperte curiosidade, estude um fundamento, aplique-o em um projeto pequeno e converse com alguém que entenda do campo. Use IA para encontrar perguntas, simular objeções e revisar clareza — não para fabricar experiência.",
          "Ao final do mês, você terá informação melhor para decidir se precisa de uma formação longa, um curso específico, uma certificação reconhecida ou mais prática.",
        ],
        quote:
          "A melhor formação é aquela que muda a qualidade do que você consegue compreender, fazer e demonstrar.",
      },
      {
        heading: "Fonte e natureza do texto",
        paragraphs: [
          "1. [Ministério da Educação — Cadastro Nacional de Cursos e Instituições de Educação Superior](https://www.gov.br/mec/pt-br/politica-regulacao-supervisao-educacao-superior/cadastro-nacional-de-cursos-e-ies). Fonte oficial para consultar atos autorizativos, reconhecimento e indicadores de instituições e cursos superiores no Brasil. O cadastro não avalia cursos livres nem determina qual formação é adequada para uma pessoa.",
          "2. [OCDE — Education at a Glance 2025](https://doi.org/10.1787/1c0d9c79-en). Conjunto internacional de indicadores sobre educação, formação, conclusão e resultados. Comparações populacionais não predizem o retorno individual de um curso.",
          "3. [World Economic Forum — Future of Jobs Report 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/). Pesquisa com empregadores sobre tendências de trabalho e competências até 2030. As respostas expressam expectativas organizacionais e não garantem demanda, contratação ou renda para uma pessoa específica.",
          "Este é um guia autoral de decisão. As quatro alternativas foram organizadas como um exercício prático de Fernando Parreiras; não constituem uma classificação oficial nem uma recomendação educacional individualizada.",
        ],
      },
      {
        heading: "Nota editorial e de responsabilidade",
        paragraphs: [
          "Este texto combina referências institucionais com análise e orientação profissional do autor. O conteúdo é informativo, não substitui aconselhamento educacional ou profissional individual e não promete emprego, renda ou resultado acadêmico. Antes de contratar uma graduação, consulte a regularidade da instituição e do curso no e-MEC; para cursos livres e certificações, verifique emissor, escopo, custo e reconhecimento no contexto pretendido. Pesquisa e redação tiveram assistência de IA; Fernando Parreiras responde pela orientação editorial publicada.",
          "Corte das fontes: 14/09/2026. Histórico de correções: fontes, limites das evidências e nota de responsabilidade adicionados antes da primeira publicação pública.",
        ],
      },
    ],
  },
  {
    slug: "redesenhar-o-valor-que-voce-entrega-com-ia",
    title:
      "Você não precisa competir com a IA. Precisa redesenhar o valor que entrega",
    excerpt:
      "Competir por velocidade de produção é uma disputa estreita. O trabalho mais valioso começa na escolha do problema, nos critérios e na responsabilidade pelo resultado.",
    track: "carreira-ia",
    category: "Posicionamento profissional",
    format: "Ensaio prático",
    tags: ["carreira com IA", "valor profissional", "posicionamento"],
    readingMinutes: 9,
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-14",
    scheduledAt: "2026-09-10T09:00:00-03:00",
    image: "/images/em-cena/fernando-parreiras-palestra-techhuman-1600.webp",
    imageAlt: "Fernando Parreiras apresentando em um evento da Tech Human.",
    nature:
      "Análise profissional e exercício de reposicionamento para o trabalho com IA.",
    cta: {
      label: "Conversar sobre carreira e IA",
      href: "mailto:fernando@fernandoparreiras.com.br?subject=Redesenho%20de%20valor%20profissional%20com%20IA",
    },
    content: [
      {
        heading: "A comparação errada produz uma estratégia fraca",
        paragraphs: [
          "Quando uma tecnologia passa a produzir textos, análises, imagens e código em segundos, é natural perguntar como competir com ela. O problema é aceitar velocidade e volume como medidas completas de valor profissional.",
          "Se o seu papel é descrito apenas como produzir uma peça padronizada, parte dele provavelmente será automatizada. Isso não torna a pessoa irrelevante. Torna insuficiente uma descrição de trabalho baseada somente na etapa executada.",
        ],
      },
      {
        heading: "Valor profissional existe em quatro camadas",
        bullets: [
          "Escolha: perceber qual problema merece atenção e qual resultado importa.",
          "Contexto: compreender restrições, história, relações e consequências que não cabem em um comando curto.",
          "Critério: distinguir uma resposta plausível de uma resposta adequada à situação.",
          "Responsabilidade: assumir a decisão, explicar seus fundamentos e responder pelo impacto.",
        ],
        paragraphs: [
          "A IA pode participar de todas as camadas, mas não transforma automaticamente uma produção em decisão responsável. É nessa diferença que o profissional pode redesenhar sua contribuição.",
        ],
      },
      {
        heading: "Redesenhe o trabalho ao redor do resultado",
        paragraphs: [
          "Escolha uma atividade recorrente e retire dela a ferramenta e o cargo. Pergunte quem depende do resultado, o que caracteriza uma boa entrega, quais erros seriam caros e que decisões continuam exigindo conhecimento do contexto.",
          "Depois, distribua o fluxo entre automação e julgamento humano. Deixe a IA explorar alternativas, organizar materiais e produzir versões. Concentre sua atenção na formulação, na verificação, na conversa com as pessoas afetadas e na decisão final.",
        ],
      },
      {
        heading: "Faça um experimento de duas semanas",
        bullets: [
          "Registre como a atividade é realizada hoje e quanto retrabalho ela produz.",
          "Defina critérios de qualidade antes de usar IA.",
          "Automatize uma etapa limitada e mantenha visíveis as decisões humanas.",
          "Compare tempo, qualidade, risco e aprendizado — não apenas quantidade.",
          "Documente o novo papel que você passou a exercer no processo.",
        ],
        paragraphs: [
          "Essa documentação é matéria-prima para reposicionamento. Ela mostra que você não apenas aprendeu uma ferramenta: aprendeu a redesenhar uma entrega.",
        ],
        quote:
          "Seu valor não está em fazer mais rápido aquilo que deixou de precisar ser feito do mesmo jeito.",
      },
      {
        heading: "Fonte e natureza do texto",
        paragraphs: [
          "1. [Organização Internacional do Trabalho — Generative AI and Jobs: A Refined Global Index of Occupational Exposure](https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure). Working Paper 140, publicado em 20/05/2025. O estudo estima exposição potencial de tarefas e ocupações à IA generativa; não mede o valor de um profissional específico nem prevê demissões individuais.",
          "2. [NIST — Artificial Intelligence Risk Management Framework 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10). Framework voluntário para incorporar confiabilidade e gestão de riscos ao desenho, uso e avaliação de sistemas de IA. É uma referência organizacional, não um estudo de carreira.",
          "As quatro camadas de valor e o experimento de duas semanas são uma síntese autoral de Fernando Parreiras. Elas traduzem as referências para uma prática de reposicionamento e não são conclusões literais das fontes.",
        ],
      },
      {
        heading: "Nota editorial e de responsabilidade",
        paragraphs: [
          "Este texto combina referências sobre transformação do trabalho e gestão responsável de IA com análise e recomendações profissionais do autor. O conteúdo é informativo, não substitui orientação individual de carreira e não promete emprego, renda, produtividade ou resultado comercial. Pesquisa e redação tiveram assistência de IA; Fernando Parreiras responde pela orientação editorial publicada e mantém interesse profissional e comercial nos temas de estratégia, tecnologia, IA e desenvolvimento de lideranças.",
          "Corte das fontes: 14/09/2026. Histórico de correções: fontes, limites das evidências e nota de responsabilidade adicionados em 14/09/2026; o texto principal foi preservado.",
        ],
      },
    ],
  },
  {
    slug: "produtividade-sem-direcao-acelera-o-desperdicio",
    title: "Produtividade sem direção apenas acelera o desperdício",
    excerpt:
      "Produzir mais não corrige prioridades ruins. Antes de automatizar, líderes precisam esclarecer o resultado, os critérios e o que deveria deixar de ser feito.",
    track: "lideranca-negocios",
    category: "Execução e estratégia",
    format: "Análise prática",
    tags: ["produtividade", "liderança", "automação"],
    readingMinutes: 8,
    publishedAt: "2026-11-10",
    updatedAt: "2026-11-10",
    scheduledAt: "2026-11-10T09:00:00-03:00",
    image: "/images/em-cena/fernando-parreiras-palco-1600.webp",
    imageAlt:
      "Fernando Parreiras apresentando uma reflexão de negócios no palco.",
    nature:
      "Análise profissional baseada em desenho de operações e decisões executivas.",
    cta: {
      label: "Avaliar uma transformação com tecnologia e IA",
      href: "/solucoes/transformacao-tecnologia-ia",
    },
    content: [
      {
        heading:
          "A IA reduz o custo de produzir — inclusive o que não deveria existir",
        paragraphs: [
          "Grande parte da conversa sobre inteligência artificial começa pela produtividade: mais textos, análises, propostas, relatórios e código em menos tempo. O ganho pode ser real. Mas velocidade não transforma automaticamente uma atividade em valor.",
          "Quando a prioridade está errada, a automação aumenta o volume do desperdício. A empresa passa a gerar mais entregas que ninguém usa, mais informação que ninguém consegue avaliar e mais decisões cuja responsabilidade permanece difusa.",
        ],
      },
      {
        heading: "Antes de automatizar, esclareça o resultado",
        paragraphs: [
          "Escolha um fluxo que a organização deseja acelerar e faça uma pausa antes de selecionar a ferramenta. O objetivo é compreender por que o trabalho existe, para quem ele cria valor e qual decisão deveria melhorar quando a entrega fica pronta.",
        ],
        bullets: [
          "Quem utiliza o resultado e o que consegue fazer depois dele?",
          "Que parte do fluxo reduz risco, aumenta receita, evita retrabalho ou melhora uma experiência?",
          "Quais etapas permanecem apenas porque sempre foram realizadas?",
          "Que evidência permitiria afirmar que o novo processo ficou melhor?",
        ],
      },
      {
        heading: "Meça o sistema, não somente a velocidade da etapa",
        paragraphs: [
          "Uma automação pode reduzir o tempo de uma tarefa e, ao mesmo tempo, aumentar revisão, exceções ou confusão nas etapas seguintes. Por isso, métricas locais precisam ser acompanhadas por sinais do fluxo completo: tempo até a decisão, taxa de retrabalho, qualidade percebida, incidentes e capacidade de explicar o resultado.",
          "A pergunta executiva não é “quantas horas a IA economizou?”. É “o que a organização passou a decidir ou entregar melhor, com que risco e para quem?”.",
        ],
      },
      {
        heading: "Uma rotina simples para líderes",
        bullets: [
          "Pare uma atividade que não sustenta uma prioridade clara.",
          "Simplifique o fluxo antes de automatizá-lo.",
          "Defina critérios e limites antes de delegar para a IA.",
          "Compare qualidade e consequência, não apenas volume.",
          "Revise o desenho quando o ganho de uma área cria custo para outra.",
        ],
        paragraphs: [
          "Produtividade se torna vantagem quando libera atenção para decisões melhores. Sem direção, ela apenas ocupa o espaço mais rapidamente.",
        ],
        quote:
          "A pergunta não é quanto conseguimos produzir. É quanto do que produzimos realmente merecia existir.",
      },
      {
        heading: "Fontes e natureza do texto",
        paragraphs: [
          "1. [DORA — State of AI-assisted Software Development 2025](https://dora.dev/research/2025/dora-report/). A pesquisa descreve a IA como amplificadora das forças e disfunções do sistema organizacional; associação e contexto não estabelecem benefício universal para toda equipe ou ferramenta.",
          "2. [DORA — User-centric focus](https://dora.dev/capabilities/user-centric-focus/). A orientação conecta velocidade de desenvolvimento a necessidades, feedback e métricas de usuários e alerta para a produção acelerada de software de baixo valor quando a equipe otimiza apenas output. Os resultados representam o modelo e as amostras da pesquisa DORA.",
          "3. [NBER — Generative AI at Work](https://www.nber.org/papers/w31161). Estudo sobre a introdução de um assistente generativo entre agentes de atendimento, com ganho de produtividade no contexto observado. O recorte não demonstra que toda automação gera valor, nem que o mesmo efeito ocorrerá em outros fluxos, funções ou organizações.",
          "A rotina de liderança e as perguntas sobre resultado, retrabalho e consequência são síntese autoral de Fernando Parreiras, não conclusões literais das fontes nem promessa de redução de custos.",
        ],
      },
      {
        heading: "Nota editorial e de responsabilidade",
        paragraphs: [
          "Este artigo combina referências de pesquisa com análise executiva do autor. É conteúdo informativo e não constitui aconselhamento financeiro, operacional, jurídico ou de investimento, nem promete produtividade, economia ou resultado comercial. Pesquisa e redação tiveram assistência de IA; Fernando Parreiras responde pela orientação editorial publicada e mantém interesse profissional e comercial em estratégia, tecnologia, produtos e transformação com IA.",
          "Corte das fontes e revisão factual: 23/09/2026. Versão preparada antes da primeira publicação pública, preservando a agenda original de 10/11/2026.",
        ],
      },
    ],
  },
  {
    slug: "liderar-quando-toda-area-pode-criar-software",
    title: "Liderar quando toda área pode criar software",
    excerpt:
      "A IA ampliou quem consegue transformar uma ideia em software. A liderança precisa combinar autonomia, fronteiras claras e responsabilidade compartilhada.",
    track: "lideranca-negocios",
    category: "Liderança e transformação",
    format: "Ensaio prático",
    tags: ["liderança", "democratização da IA", "responsabilidade"],
    readingMinutes: 9,
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-24",
    scheduledAt: "2026-09-24T09:00:00-03:00",
    image: "/images/em-cena/fernando-parreiras-palco-1600.webp",
    imageAlt:
      "Fernando Parreiras conduzindo uma conversa sobre liderança, tecnologia e negócios.",
    nature:
      "Reflexão autoral sobre liderança, autonomia e responsabilidade na adoção de inteligência artificial.",
    cta: {
      label: "Conversar sobre liderança e transformação com IA",
      href: "/solucoes/transformacao-tecnologia-ia",
    },
    content: [
      {
        heading: "A autonomia chegou antes do desenho organizacional",
        paragraphs: [
          "Uma pessoa que conhece bem um processo já consegue montar uma automação, um agente ou uma pequena aplicação sem esperar o ciclo tradicional de desenvolvimento. Isso reduz a distância entre perceber um problema e testar uma resposta. Também muda uma relação antiga: a área de negócio deixa de depender integralmente de uma fila para transformar conhecimento em software.",
          "A mudança não elimina a liderança nem a tecnologia. Ela exige que ambas deixem claro onde termina um experimento pessoal e começa um sistema pelo qual a organização precisa responder.",
        ],
      },
      {
        heading: "Liderar é tornar a fronteira compreensível",
        paragraphs: [
          "Proibir tudo preserva a fila e empurra parte do trabalho para a sombra. Liberar tudo confunde iniciativa com autorização para operar. O papel da liderança é oferecer uma fronteira simples: o que pode ser testado, com quais dados, por quanto tempo e em que momento a solução precisa entrar em um caminho corporativo.",
          "Quanto mais reversível e interno for o experimento, maior pode ser a autonomia. Quando envolve clientes, dinheiro, direitos, dados sensíveis ou continuidade operacional, a decisão precisa de engenharia, governança e um responsável identificado.",
        ],
        bullets: [
          "Experimento: hipótese, dono, prazo e dados seguros.",
          "Uso interno recorrente: acesso, documentação, testes e suporte.",
          "Processo crítico: produto formal, operação observável e autoridade para interromper.",
        ],
      },
      {
        heading: "Negócio e TI passam a dividir a responsabilidade",
        paragraphs: [
          "A área de negócio conhece o problema, o contexto e o resultado esperado. Tecnologia conhece as fronteiras de identidade, dados, integração, segurança e operação. Nenhuma das duas consegue assumir sozinha o sistema completo.",
          "A parceria madura não começa com um pedido para TI executar nem termina quando a área consegue gerar código. Ela combina autoria sobre o problema com caminhos técnicos reutilizáveis. Assim, a empresa preserva a velocidade de quem está perto da dor e a capacidade de sustentar o que se torna importante.",
        ],
      },
      {
        heading: "As perguntas do líder mudam",
        bullets: [
          "Que problema real esta solução resolve e como saberemos se melhorou?",
          "Quem responde pelo uso, pelos dados e pelas consequências?",
          "O que pode ser desfeito sem impacto e o que exige revisão antes de operar?",
          "Que parte deveria virar uma capacidade compartilhada para outras equipes?",
          "Que evidência precisamos preservar para aprender ou interromper?",
        ],
        paragraphs: [
          "Essas perguntas deslocam a conversa de ferramenta para julgamento. Vibe coding pode romper a espera para experimentar. O valor duradouro aparece quando a organização também sabe escolher, integrar, operar e retirar.",
        ],
        quote:
          "Democratizar a capacidade de criar exige democratizar também a compreensão das consequências.",
      },
      {
        heading: "Fontes e natureza do texto",
        paragraphs: [
          "1. [DORA — Empowering teams to choose tools](https://dora.dev/capabilities/teams-empowered-to-choose-tools/). A orientação associa autonomia informada a melhor entrega quando combinada com visão sistêmica, feedback e responsabilidade; também alerta que liberdade sem restrições pode ampliar dívida técnica e fragilidade.",
          "2. [DORA — User-centric focus](https://dora.dev/capabilities/user-centric-focus/). A capacidade conecta criação de software a necessidades e resultados de usuários e descreve o risco de acelerar output sem impacto. Os achados são associações dentro do programa de pesquisa DORA, não causalidade universal.",
          "3. [NIST — AI Risk Management Framework Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/). O framework voluntário recomenda papéis, linhas de responsabilidade, documentação, monitoramento e supervisão ao longo do ciclo de vida de sistemas de IA. A aplicação concreta depende do risco, do setor e das obrigações da organização.",
          "As três fronteiras de uso e as perguntas do líder são síntese autoral de Fernando Parreiras para organizar autonomia e responsabilidade. Não constituem arquitetura obrigatória nem substituem avaliações técnicas, jurídicas, de segurança ou de conformidade.",
        ],
      },
      {
        heading: "Nota editorial e de responsabilidade",
        paragraphs: [
          "Este texto é conteúdo informativo sobre liderança, autonomia e governança na criação de software com IA. Não oferece aconselhamento jurídico, regulatório, trabalhista, de segurança ou de investimento. Pesquisa e redação tiveram assistência de IA; Fernando Parreiras responde pela orientação editorial publicada e mantém interesse profissional e comercial em estratégia, arquitetura, produtos e transformação com IA.",
          "Corte das fontes e revisão factual: 23/09/2026. Versão preparada antes da primeira publicação pública, preservando a agenda original de 24/09/2026.",
        ],
      },
    ],
  },
];
