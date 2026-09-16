const SITE_URL = 'https://fernandoparreiras.com.br';

export const ARTICLE_SHARE_INTENTS = Object.freeze({
  'servico-e-o-novo-software': {
    discussion: 'Sua empresa ainda vende acesso a uma ferramenta ou já consegue assumir uma parte clara do resultado do cliente?',
    commercialCta: 'Leve esta discussão para sua liderança, conselho ou evento: converse com Fernando sobre estratégia, ofertas AI-native, advisory e palestras.',
    destination: '/contato/',
  },
  'profissional-ti-custo-total-da-ia': {
    discussion: 'Você consegue ligar custo de modelo, CI, evals, infraestrutura e trabalho humano ao resultado que o produto realmente entrega?',
    commercialCta: 'Leve esta discussão para sua carreira ou equipe: converse com Fernando sobre arquitetura, liderança e formação para trabalhar com IA.',
    destination: '/contato/',
  },
  'saber-quando-parar-uma-ia': {
    discussion: 'Qual evidência deveria interromper uma nova rodada de IA antes que atividade seja confundida com progresso?',
    commercialCta: 'Leve esta discussão para sua liderança ou equipe: converse com Fernando sobre julgamento, produto e transformação responsável com IA.',
    destination: '/contato/',
  },
  'dia-seguinte-primeira-venda': {
    discussion: 'Depois da primeira venda, o que precisa deixar de depender do fundador para que o negócio se torne repetível?',
    commercialCta: 'Se sua empresa precisa transformar uma primeira entrega em operação sustentável, converse com Fernando sobre estratégia, produto e execução.',
    destination: '/contato/',
  },
  'ai-native-product-lead-nova-profissao': {
    discussion: 'Na sua empresa, quem conecta problema, produto, código, avaliação e responsabilidade quando agentes de IA entram na execução?',
    commercialCta: 'Leve esta discussão para seu time ou evento: converse com Fernando sobre advisory, formação e palestras.',
    destination: '/contato/',
  },
  'valor-do-julgamento-com-ia': {
    discussion: 'Em um trabalho acelerado por IA, quais decisões você precisa aprender a não aprovar?',
    commercialCta: 'Para desenvolver julgamento profissional com IA em sua equipe, converse com Fernando sobre formação, advisory ou palestra.',
    destination: '/contato/',
  },
  'plano-de-90-dias-para-uma-transicao-profissional-com-ia': {
    discussion: 'Qual evidência concreta você poderia produzir nos próximos 90 dias para testar uma nova direção profissional?',
    commercialCta: 'Se você ou sua organização está desenhando uma transição profissional com IA, converse com Fernando.',
    destination: '/contato/',
  },
  'equipes-com-agentes-de-ia-ainda-precisam-de-responsabilidade-humana': {
    discussion: 'Quem pode autorizar, interromper e responder pelo trabalho dos agentes de IA na sua organização?',
    commercialCta: 'Converse com Fernando sobre transformação com IA, governança e desenho responsável da operação.',
    destination: '/solucoes/transformacao-tecnologia-ia',
  },
  'liderar-quando-toda-area-pode-criar-software': {
    discussion: 'Na sua organização, quem define quando um experimento criado por uma área passa a ser um sistema pelo qual a empresa precisa responder?',
    commercialCta: 'Leve esta discussão para sua liderança ou evento: converse com Fernando sobre transformação, governança e trabalho com IA.',
    destination: '/solucoes/transformacao-tecnologia-ia',
  },
  'competencias-que-sobrevivem-a-uma-mudanca-de-carreira': {
    discussion: 'Que competência da sua trajetória continua valiosa quando o cargo, o setor ou a ferramenta muda?',
    commercialCta: 'Para trabalhar reposicionamento, carreira e IA com pessoas ou equipes, converse com Fernando.',
    destination: '/contato/',
  },
  'faculdade-curso-certificacao-ou-projeto': {
    discussion: 'Neste momento, você precisa mais de fundamento, prática, credencial ou evidência pública?',
    commercialCta: 'Leve esta conversa sobre formação e futuro do trabalho para jovens, famílias, escolas ou empresas em uma palestra com Fernando.',
    destination: '/palestras',
  },
  'redesenhar-o-valor-que-voce-entrega-com-ia': {
    discussion: 'Se produzir ficou mais rápido, em qual problema, critério ou responsabilidade está o seu valor profissional?',
    commercialCta: 'Converse com Fernando sobre carreira, formação de equipes e transformação do trabalho com IA.',
    destination: '/contato/',
  },
  'produtividade-sem-direcao-acelera-o-desperdicio': {
    discussion: 'Que atividade sua empresa está acelerando sem ter confirmado se ela ainda merece existir?',
    commercialCta: 'Avalie com Fernando onde tecnologia e IA podem gerar resultado — e onde apenas acelerariam desperdício.',
    destination: '/solucoes/transformacao-tecnologia-ia',
  },
  'carreira-com-ia-nao-comeca-pela-ferramenta': {
    discussion: 'Que problema real você consegue compreender melhor antes mesmo de escolher uma ferramenta de IA?',
    commercialCta: 'Conheça a formação IA sem Confusão ou converse com Fernando sobre uma jornada para sua equipe.',
    destination: '/academy/ia-sem-confusao',
  },
  'liderar-quando-a-ia-executa-mais': {
    discussion: 'Se a IA executar mais etapas, como sua liderança tornará critérios, limites e responsabilidade mais visíveis?',
    commercialCta: 'Leve esta discussão para sua liderança, convenção ou evento em uma palestra com Fernando.',
    destination: '/palestras',
  },
  'primeiro-portfolio-antes-do-primeiro-cargo': {
    discussion: 'Que projeto pequeno pode mostrar como um jovem pensa, verifica, aprende e melhora uma entrega?',
    commercialCta: 'Converse com Fernando sobre palestras e experiências de formação para jovens, escolas e empresas.',
    destination: '/palestras',
  },
  'mudar-de-carreira-sem-jogar-a-historia-fora': {
    discussion: 'Qual parte da sua história pode ganhar uma nova função em vez de ser descartada na transição?',
    commercialCta: 'Para conversar sobre mudança de carreira, repertório e posicionamento com IA, fale com Fernando.',
    destination: '/contato/',
  },
  'usar-ia-sem-perder-a-autoria': {
    discussion: 'Quais decisões precisam continuar sendo suas para que o trabalho com IA ainda tenha autoria?',
    commercialCta: 'Conheça a formação IA sem Confusão ou leve essa conversa para sua equipe com Fernando.',
    destination: '/academy/ia-sem-confusao',
  },
  'primeira-oportunidade-procure-valor-nao-apenas-cargo': {
    discussion: 'Que contribuição um jovem consegue demonstrar antes mesmo de receber o primeiro cargo?',
    commercialCta: 'Leve esta conversa sobre carreira e futuro do trabalho para jovens, famílias, escolas ou empresas em uma palestra com Fernando.',
    destination: '/palestras',
  },
});

const mediumByChannel = {
  email: 'email',
  whatsapp: 'messaging',
  copy: 'referral',
  native: 'share',
};

function trackedUrl(pathname, article, channel, placement) {
  const url = new URL(pathname, SITE_URL);
  url.searchParams.set('utm_source', channel);
  url.searchParams.set('utm_medium', mediumByChannel[channel] || 'social');
  url.searchParams.set('utm_campaign', 'conhecimento_compartilhamento');
  url.searchParams.set('utm_content', article.slug);
  url.searchParams.set('utm_term', placement);
  return url.toString();
}

function toHashtag(value) {
  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('');
  return normalized ? `#${normalized}` : '';
}

function getKeyIdea(article) {
  return article.content?.find((section) => section.quote)?.quote || article.excerpt;
}

function getHashtags(article, limit) {
  return [...new Set([...article.tags.map(toHashtag), '#FernandoParreiras'].filter(Boolean))]
    .slice(0, limit)
    .join(' ');
}

export function buildArticleShareKit(article) {
  const intent = ARTICLE_SHARE_INTENTS[article.slug];
  if (!intent) throw new Error(`Copy de compartilhamento não definida para ${article.slug}.`);

  const articlePath = `/artigos/${article.slug}/`;
  const keyIdea = getKeyIdea(article);
  const urls = Object.fromEntries(
    ['linkedin', 'whatsapp', 'email', 'instagram', 'copy', 'native'].map((channel) => [
      channel,
      {
        article: trackedUrl(articlePath, article, channel, 'artigo'),
        lead: trackedUrl(intent.destination, article, channel, 'cta_comercial'),
      },
    ]),
  );

  const linkedinText = `“${keyIdea}”\n\n${article.title}\n\n${article.excerpt}\n\nPara a discussão: ${intent.discussion}\n\nLeia o artigo: ${urls.linkedin.article}\n\n${intent.commercialCta}\n${urls.linkedin.lead}\n\n${getHashtags(article, 3)}`;
  const whatsappText = `Uma leitura para nossa conversa:\n\n*${article.title}*\n${article.excerpt}\n\nUma pergunta: ${intent.discussion}\n\nLeia: ${urls.whatsapp.article}\n\n${intent.commercialCta}\n${urls.whatsapp.lead}`;
  const emailSubject = `Leitura para discutirmos: ${article.title}`;
  const emailBody = `Olá,\n\nCompartilho uma leitura de Fernando Parreiras:\n\n${article.title}\n${article.excerpt}\n\nUma pergunta para nossa conversa:\n${intent.discussion}\n\nArtigo completo:\n${urls.email.article}\n\n${intent.commercialCta}\n${urls.email.lead}`;
  const instagramText = `${keyIdea}\n\n${article.title}\n\n${article.excerpt}\n\nQuero abrir esta conversa: ${intent.discussion}\n\nLeia o artigo: ${urls.instagram.article}\n\n${intent.commercialCta}\n${urls.instagram.lead}\n\n${getHashtags(article, 5)}`;
  const copyText = `${article.title}\n\n${article.excerpt}\n\nPara a discussão: ${intent.discussion}\n\n${urls.copy.article}\n\n${intent.commercialCta}\n${urls.copy.lead}`;
  const nativeText = `${article.title}\n\n${intent.discussion}\n\n${intent.commercialCta}\n${urls.native.lead}`;

  return {
    intent,
    linkedin: {
      text: linkedinText,
      articleUrl: urls.linkedin.article,
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urls.linkedin.article)}`,
    },
    whatsapp: {
      text: whatsappText,
      shareUrl: `https://wa.me/?text=${encodeURIComponent(whatsappText)}`,
    },
    email: {
      subject: emailSubject,
      body: emailBody,
      shareUrl: `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
    },
    instagram: { text: instagramText },
    copy: { text: copyText },
    native: {
      title: article.title,
      text: nativeText,
      url: urls.native.article,
    },
  };
}
