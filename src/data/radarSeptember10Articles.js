export const radarSeptember10Articles = [
  {
    slug: "saber-quando-parar-uma-ia",
    title: "Saber pedir que a IA continue é fácil. Difícil é saber quando parar",
    excerpt:
      "A maturidade no trabalho com IA não está em prolongar a conversa, mas em reconhecer quando a evidência acabou e a responsabilidade precisa voltar para uma pessoa.",
    track: "lideranca-negocios",
    category: "Liderança e julgamento",
    format: "Artigo especial",
    tags: ["liderança com IA", "julgamento", "agentes de IA"],
    readingMinutes: 8,
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-10",
    scheduledAt: "2026-09-10T13:46:00-03:00",
    image: "/images/em-cena/fernando-parreiras-palestra-principal-1122.webp",
    imageAlt: "Fernando Parreiras conduzindo uma conversa sobre tecnologia, liderança e negócios.",
    nature:
      "Ensaio autoral inspirado por um advisory e dois preprints recentes; as aplicações à liderança são interpretação profissional, não conclusão universal dos estudos.",
    cta: {
      label: "Conversar sobre liderança e transformação com IA",
      href: "/contato/",
    },
    content: [
      {
        heading: "A palavra mais perigosa pode ser ‘continue’",
        paragraphs: [
          "A IA apresenta uma resposta, nós encontramos uma imperfeição e pedimos outra rodada. Depois mais uma. A sensação é de avanço porque algo está sempre mudando. Só que movimento não é a mesma coisa que progresso.",
          "Tenho pensado que uma das competências mais importantes desta nova fase não será aprender a manter a IA trabalhando. Será saber interrompê-la quando já não existe evidência de que a próxima alteração melhora o resultado.",
          "Isso parece uma conversa sobre tecnologia, mas é sobretudo uma conversa sobre liderança. Quem lidera precisa definir o que é suficiente, qual risco é aceitável e em que momento a decisão deixa de ser uma busca e passa a ser uma responsabilidade.",
        ],
      },
      {
        heading: "Um estudo pequeno, uma pergunta grande",
        paragraphs: [
          "Um preprint publicado em 9 de setembro de 2026 estudou ciclos de correção de código feitos por modelos. O experimento usou 20 problemas, 40 submissões C++ por problema, dois modelos e até 100 turnos. Nas configurações avaliadas, os modelos identificaram pseudobugs em código correto e frequentemente danificaram o que funcionava em taxa igual ou superior à correção do que estava errado. Também apareceram ciclos em que mudanças eram colocadas e retiradas repetidamente. [Fonte](https://arxiv.org/abs/2609.10123).",
          "É importante não transformar esse recorte em sentença. São tarefas competitivas de arquivo único, dois modelos e um loop cego, sem histórico, sob objetivo ambíguo. O paper é um preprint, ainda sem revisão por pares registrada no arXiv. Ele não prova que toda revisão com IA piora software.",
          "Para mim, a contribuição está na pergunta: se o sistema não possui uma medida objetiva de melhoria, quem decide que chegou a hora de parar?",
        ],
      },
      {
        heading: "Concordância também pode nos enganar",
        paragraphs: [
          "Outro preprint do mesmo dia reuniu saídas de diferentes modelos para gerar requisitos de cibersegurança. Em 24 execuções, 12 configurações, quatro famílias de modelos e dez controles ISO/IEC 27002, a união recuperou os 72 requisitos do padrão de referência — e trouxe junto 111 alucinações. A fusão ajudou a ordenar a fila, não a transformar consenso em verdade. [Fonte](https://arxiv.org/abs/2609.10316).",
          "Vejo aqui uma lição útil para qualquer decisão: ouvir mais vozes pode ampliar o campo de possibilidades, mas não remove a obrigação de verificar. Dez respostas parecidas continuam podendo nascer do mesmo pressuposto errado.",
        ],
      },
      {
        heading: "Limites precisam acompanhar o efeito",
        paragraphs: [
          "Um advisory oficial do Open WebUI oferece um terceiro ângulo. Em uma configuração específica — redirects habilitados, embora o padrão fosse desabilitado — o sistema validava o endereço inicial, mas não reaplicava todos os controles ao destino após o redirecionamento. A faixa afetada era 0.9.5 a 0.11.0 e a versão corrigida é 0.11.1. [Fonte](https://github.com/open-webui/open-webui/security/advisories/GHSA-5x7x-4c3c-qf5w).",
          "Não há nisso uma acusação de incidente ou uma medida de prevalência. O caso me lembra que limites declarados no começo de uma jornada precisam sobreviver até a consequência real. Isso vale para software e vale para organizações.",
        ],
      },
      {
        heading: "Quatro perguntas antes de pedir outra rodada",
        paragraphs: [
          "Antes de escrever ‘continue’, eu gostaria de propor quatro perguntas. Elas não formam um método cientificamente validado; são um exercício de julgamento profissional.",
        ],
        bullets: [
          "Qual resultado objetivo esta nova rodada precisa melhorar?",
          "Que evidência me fará aceitar, rejeitar ou reverter a mudança?",
          "Qual limite de tempo, custo, risco ou alterações não deve ser ultrapassado?",
          "Quem assume a decisão se a resposta continuar inconclusiva?",
        ],
      },
      {
        heading: "Parar não é desistir",
        paragraphs: [
          "Em culturas que premiam velocidade, interromper pode parecer falta de ambição. Eu vejo de outra forma. Parar diante de uma regressão, de um ciclo ou de evidência insuficiente é preservar a capacidade de decidir.",
          "A IA consegue propor, comparar, reescrever e insistir sem cansaço. Nós precisamos oferecer algo que ela não assume por conta própria: contexto, consequência e responsabilidade.",
          "Talvez o profissional mais valioso não seja aquele que extrai o maior número de respostas de uma ferramenta. Talvez seja quem reconhece a resposta que ainda não merece virar ação.",
        ],
      },
      {
        heading: "Fonte e natureza do texto",
        paragraphs: [
          "1. [Open WebUI — GHSA-5x7x-4c3c-qf5w](https://github.com/open-webui/open-webui/security/advisories/GHSA-5x7x-4c3c-qf5w). Advisory oficial; condição específica, versões afetadas e correção descritas pela fonte. Não foi usado como evidência de exploração ativa.",
          "2. [Wang-Lin, Isopoussu e Mahon — If It's Not Buggy, Don't Fix It](https://arxiv.org/abs/2609.10123). Preprint v1, 09/09/2026. Um autor é da University of Warwick e realizou o trabalho durante estágio na UnlikelyAI; os outros autores são da UnlikelyAI.",
          "3. [Perez-Acuna, Martín e Yelmo — Ensembling LLMs for AI-Augmented Cybersecurity Software Requirements Generation](https://arxiv.org/abs/2609.10316). Preprint v1, 09/09/2026. Caso único, em inglês, sobre ISO/IEC 27002; artefatos disponíveis no [Zenodo](https://doi.org/10.5281/zenodo.21496481).",
          "As aplicações a liderança, carreira e tomada de decisão são interpretações autorais de Fernando Parreiras. Não são conclusões universais dos estudos nem relato de uma experiência pessoal específica.",
        ],
      },
      {
        heading: "Nota editorial e de responsabilidade",
        paragraphs: [
          "Este texto combina resultados atribuídos às fontes com análises e recomendações do autor. Pontos de vista pessoais e profissionais não devem ser confundidos com fatos comprovados; dados verificáveis exigem fonte, população, método e contexto. O conteúdo é informativo e não substitui avaliação técnica, jurídica ou financeira específica, nem promete resultados. O autor atua na Tech Human e na Trustyu, organizações com interesse comercial nos temas discutidos. Pesquisa, estrutura e redação tiveram assistência de IA; a publicação depende de confirmação autoral do artefato exato.",
          "Corte da pesquisa: 10/09/2026. Histórico de correções: versão inicial, sem correções materiais registradas.",
        ],
      },
    ],
  },
];
