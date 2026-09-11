const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const subjectText = (value, maxLength = 80) => String(value ?? '')
  .replace(/[\r\n<>]/g, '')
  .trim()
  .slice(0, maxLength);

const firstNameFrom = (name) => String(name ?? '').trim().split(/\s+/)[0] || '';

const footerLink = (label, url, color = '#D8FF57') => `<a href="${escapeHtml(url)}" style="color:${color};text-decoration:none;font-weight:700">${escapeHtml(label)}</a>`;

const footer = () => `
<tr><td style="padding:26px 34px;border-top:1px solid #303235;background:#0D0E0D">
  <p style="margin:0 0 10px;font-size:12px;line-height:1.8;color:#C8CACB">
    ${footerLink('fernandoparreiras.com.br', 'https://fernandoparreiras.com.br/')}<span style="color:#55585B">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
    ${footerLink('LinkedIn', 'https://www.linkedin.com/in/fernandoparreiras/', '#FFFFFF')}<span style="color:#55585B">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
    ${footerLink('Instagram', 'https://www.instagram.com/parreiras.fernando', '#FFFFFF')}
  </p>
  <p style="margin:0 0 6px;font-size:10px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;color:#85888C">Conheça também</p>
  <p style="margin:0;font-size:11px;line-height:1.9;color:#9A9D9F">
    ${footerLink('Tech Human', 'https://techhuman.com.br/', '#C8CACB')}<span style="color:#55585B">&nbsp;·&nbsp;</span>
    ${footerLink('Trustyu', 'https://trustyu.ai/', '#C8CACB')}<span style="color:#55585B">&nbsp;·&nbsp;</span>
    ${footerLink('Needyu', 'https://needyu.ai/', '#C8CACB')}<span style="color:#55585B">&nbsp;·&nbsp;</span>
    ${footerLink('Jornada Cast', 'https://jornadacast.com.br/', '#C8CACB')}<span style="color:#55585B">&nbsp;·&nbsp;</span>
    ${footerLink('POR.life', 'https://por.life/', '#C8CACB')}
  </p>
  <p style="margin:14px 0 0;font-size:10px;color:#6F7275">Mensagem transacional enviada após uma solicitação no site. ${footerLink('Privacidade', 'https://fernandoparreiras.com.br/privacidade', '#85888C')}</p>
</td></tr>`;

const baseEmail = ({ preheader, title, body }) => `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only"><title>${escapeHtml(title)}</title></head>
<body bgcolor="#F3F3EF" style="margin:0;background:#F3F3EF;color:#FFFFFF;font-family:Raleway,Arial,sans-serif">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#F3F3EF" style="width:100%;background:#F3F3EF;padding:38px 16px"><tr><td align="center" bgcolor="#F3F3EF">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" bgcolor="#111211" style="width:100%;max-width:620px;border:1px solid #D8D9D4;background:#111211">
<tr><td style="padding:30px 34px;border-bottom:3px solid #D8FF57"><div style="font-size:24px;font-weight:900;color:#FFFFFF">Fernando <span style="color:#D8FF57">Parreiras</span></div><div style="margin-top:7px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#A5A7A9">Tecnologia · IA · Negócios · Pessoas</div></td></tr>
<tr><td style="padding:38px 34px;background:#111211">${body}</td></tr>
${footer()}
</table></td></tr></table></body></html>`;

const button = (label, url) => `<table role="presentation" cellspacing="0" cellpadding="0"><tr><td bgcolor="#D8FF57" style="background:#D8FF57"><a href="${escapeHtml(url)}" style="display:inline-block;background:#D8FF57;color:#080809;padding:14px 21px;font-size:13px;font-weight:900;text-decoration:none">${escapeHtml(label)}</a></td></tr></table>`;

const commonNextStep = 'Eu mesmo vou ler o que você enviou e responder pelo contato informado. Quando eu retornar, nossa conversa já começa pelo contexto compartilhado — sem fazer você repetir o caminho.';

const CONTACT_COPY = Object.freeze({
  'tech-human': Object.freeze({
    label: 'Transformação em tecnologia e IA',
    subject: 'Seu desafio merece uma rota clara',
    preheader: 'Recebi seu contexto sobre transformação em tecnologia e IA. O próximo passo começa pela clareza.',
    headline: 'Seu desafio merece uma rota clara.',
    opening: 'Obrigado por compartilhar onde tecnologia e IA precisam avançar. Antes de falar em solução, vou compreender a decisão, o resultado esperado e o que hoje impede o movimento.',
    ctaLabel: 'Conhecer transformação em tecnologia e IA',
    ctaUrl: 'https://fernandoparreiras.com.br/solucoes/transformacao-tecnologia-ia',
  }),
  advisory: Object.freeze({
    label: 'Advisory executivo',
    subject: 'Clareza para a próxima decisão',
    preheader: 'Recebi seu contexto de advisory. Vamos começar pela decisão que precisa avançar.',
    headline: 'Decisões melhores começam pelo contexto certo.',
    opening: 'Obrigado por dividir o momento que você está vivendo. Vou olhar para o desafio com perspectiva executiva, conectando decisão, riscos e capacidade real de execução.',
    ctaLabel: 'Conhecer o advisory executivo',
    ctaUrl: 'https://fernandoparreiras.com.br/solucoes/advisory-executivo',
  }),
  conselho: Object.freeze({
    label: 'Conselho consultivo',
    subject: 'Perspectiva para decisões que permanecem',
    preheader: 'Recebi seu contexto sobre conselho consultivo. Uma boa conversa começa pelas perguntas certas.',
    headline: 'Boas decisões ganham força com a perspectiva certa.',
    opening: 'Obrigado por compartilhar o contexto. Vou considerar o momento do negócio, as decisões em jogo e onde uma visão independente pode ampliar clareza e responsabilidade.',
    ctaLabel: 'Conhecer a atuação em conselho',
    ctaUrl: 'https://fernandoparreiras.com.br/solucoes/conselho',
  }),
  palestra: Object.freeze({
    label: 'Palestra ou workshop',
    subject: 'Uma conversa capaz de mover pessoas',
    preheader: 'Recebi sua mensagem sobre palestra ou workshop. Vamos começar pelo impacto que queremos provocar.',
    headline: 'Uma boa conversa pode mover uma sala inteira.',
    opening: 'Obrigado por me contar sobre a oportunidade. Vou analisar o público, o momento e o resultado esperado para que nossa conversa comece pelo impacto — não apenas pelo formato.',
    ctaLabel: 'Conhecer palestras e workshops',
    ctaUrl: 'https://fernandoparreiras.com.br/palestras',
  }),
  venture: Object.freeze({
    label: 'Produto ou venture de IA',
    subject: 'Uma boa ideia merece direção para ganhar forma',
    preheader: 'Recebi seu contexto sobre produto ou venture de IA. O primeiro passo é transformar hipótese em direção.',
    headline: 'Uma boa ideia merece direção para ganhar forma.',
    opening: 'Obrigado por compartilhar sua visão. Vou olhar para o problema, a proposta de valor e as condições reais de construção antes de pensarmos no próximo movimento.',
    ctaLabel: 'Conhecer negócios e ventures',
    ctaUrl: 'https://fernandoparreiras.com.br/negocios',
  }),
  formacao: Object.freeze({
    label: 'Formação ou programa para times',
    subject: 'Conhecimento que vira capacidade real',
    preheader: 'Recebi seu contexto sobre formação. Vamos conectar aprendizado, prática e resultado.',
    headline: 'Formação só importa quando muda a prática.',
    opening: 'Obrigado por compartilhar o que seu time precisa desenvolver. Vou considerar o contexto, o nível de maturidade e a mudança esperada para construir uma conversa útil desde o início.',
    ctaLabel: 'Explorar conteúdos e formação',
    ctaUrl: 'https://fernandoparreiras.com.br/conteudos',
  }),
  mentoria: Object.freeze({
    label: 'Mentoria',
    subject: 'Vamos dar forma ao seu próximo movimento',
    preheader: 'Recebi seu contexto de mentoria. Clareza começa quando experiência e intenção entram na mesma conversa.',
    headline: 'Seu próximo movimento merece clareza.',
    opening: 'Obrigado por confiar parte da sua jornada a esta conversa. Vou ler seu contexto com cuidado para compreender a decisão, a transição ou o desafio que você deseja trabalhar.',
    ctaLabel: 'Conhecer minha trajetória',
    ctaUrl: 'https://fernandoparreiras.com.br/sobre',
  }),
  parceria: Object.freeze({
    label: 'Parceria ou outra conversa',
    subject: 'Toda boa parceria começa por uma conversa bem feita',
    preheader: 'Recebi sua proposta de conversa. Vou compreender o contexto antes de pensar no próximo passo.',
    headline: 'Toda boa parceria começa por uma conversa bem feita.',
    opening: 'Obrigado por abrir essa possibilidade. Vou compreender o que nos aproxima, qual valor podemos construir e se existe um próximo passo responsável para os dois lados.',
    ctaLabel: 'Conhecer o ecossistema',
    ctaUrl: 'https://fernandoparreiras.com.br/negocios',
  }),
});

const DEFAULT_CONTACT_COPY = Object.freeze({
  label: 'Nova conversa',
  subject: 'Seu contexto chegou. A conversa começa daqui',
  preheader: 'Recebi sua mensagem e vou começar pelo contexto que você compartilhou.',
  headline: 'Sua mensagem abre uma conversa com contexto.',
  opening: 'Obrigado por compartilhar o que precisa avançar. Vou ler sua mensagem com atenção antes de responder.',
  ctaLabel: 'Conhecer meu trabalho',
  ctaUrl: 'https://fernandoparreiras.com.br/solucoes',
});

const getContactCopy = (interest) => CONTACT_COPY[interest] ?? DEFAULT_CONTACT_COPY;

export const buildRespondentEmail = ({ formType, name, interest }) => {
  if (formType === 'newsletter') {
    return {
      subject: 'Sua inscrição na Carta do Fernando está confirmada',
      html: baseEmail({
        preheader: 'Inscrição confirmada. A próxima Carta chegará no seu e-mail.',
        title: 'Carta do Fernando',
        body: `<p style="margin:0 0 8px;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#D8FF57">Inscrição confirmada</p><h1 style="margin:0 0 16px;font-size:26px;line-height:1.25;color:#FFFFFF">Ideias para transformar reflexão em movimento.</h1><p style="margin:0 0 26px;color:#C9CBCE;line-height:1.75">A próxima Carta do Fernando chegará neste e-mail com leituras curtas e aplicáveis sobre tecnologia, IA, negócios e pessoas.</p>${button('Ler os artigos mais recentes', 'https://fernandoparreiras.com.br/artigos')}<p style="margin:24px 0 0;color:#85888C;font-size:11px;line-height:1.6">Se não foi você, responda a este e-mail. Você poderá cancelar o recebimento a qualquer momento.</p>`,
      }),
      text: 'Sua inscrição na Carta do Fernando está confirmada.\n\nA próxima Carta chegará neste e-mail.\n\nArtigos: https://fernandoparreiras.com.br/artigos\nPrivacidade: https://fernandoparreiras.com.br/privacidade',
    };
  }

  const rawFirstName = firstNameFrom(name);
  const safeFirstName = subjectText(rawFirstName, 40);
  const greeting = rawFirstName ? `Olá, ${rawFirstName}.` : 'Olá.';
  const copy = getContactCopy(interest);
  const subject = safeFirstName ? `${safeFirstName}, ${copy.subject.charAt(0).toLocaleLowerCase('pt-BR')}${copy.subject.slice(1)}` : copy.subject;
  const plainFooter = 'Fernando Parreiras: https://fernandoparreiras.com.br/\nLinkedIn: https://www.linkedin.com/in/fernandoparreiras/\nInstagram: https://www.instagram.com/parreiras.fernando\n\nConheça também:\nTech Human: https://techhuman.com.br/\nTrustyu: https://trustyu.ai/\nNeedyu: https://needyu.ai/\nJornada Cast: https://jornadacast.com.br/\nPOR.life: https://por.life/';

  return {
    subject,
    html: baseEmail({
      preheader: copy.preheader,
      title: copy.label,
      body: `<p style="margin:0 0 8px;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#D8FF57">Mensagem recebida · ${escapeHtml(copy.label)}</p><h1 style="margin:0 0 18px;font-size:27px;line-height:1.25;color:#FFFFFF">${escapeHtml(copy.headline)}</h1><p style="margin:0 0 13px;color:#FFFFFF;font-size:15px;font-weight:700;line-height:1.7">${escapeHtml(greeting)}</p><p style="margin:0 0 18px;color:#C9CBCE;font-size:14px;line-height:1.75">${escapeHtml(copy.opening)}</p><div style="margin:0 0 27px;padding:16px 18px;border-left:3px solid #D8FF57;background:#181A18;color:#E7E8E5;font-size:13px;line-height:1.75">${escapeHtml(commonNextStep)}</div>${button(copy.ctaLabel, copy.ctaUrl)}`,
    }),
    text: `${greeting}\n\n${copy.headline}\n\n${copy.opening}\n\n${commonNextStep}\n\n${copy.ctaLabel}: ${copy.ctaUrl}\n\n${plainFooter}\nPrivacidade: https://fernandoparreiras.com.br/privacidade`,
  };
};

export const buildInternalEmail = ({ reference, formType, email, name, interest, company, role, phone, message, sourcePath }) => {
  const copy = getContactCopy(interest);
  const title = formType === 'newsletter' ? 'Nova inscrição — Carta do Fernando' : `Novo contato — ${copy.label}`;
  const contactIdentity = subjectText(name || email, 80);
  const rows = [
    ['Referência', reference], ['Origem', sourcePath], ['Nome', name || 'Não informado'],
    ['E-mail', email], ['Telefone', phone || 'Não informado'], ['Interesse', formType === 'newsletter' ? interest : copy.label],
    ['Empresa', company || 'Não informado'], ['Cargo ou atuação', role || 'Não informado'], ['Contexto', message || 'Não informado'],
  ];
  const htmlRows = rows.map(([label, value]) => `<tr><td style="padding:10px 8px;color:#85888C;vertical-align:top;border-bottom:1px solid #252725">${escapeHtml(label)}</td><td style="padding:10px 8px;color:#FFFFFF;white-space:pre-wrap;border-bottom:1px solid #252725">${escapeHtml(value)}</td></tr>`).join('');
  const responseButton = formType === 'contact' ? `${button('Responder ao contato', `mailto:${email}`)}<div style="height:20px;line-height:20px">&nbsp;</div>` : '';
  return {
    subject: formType === 'newsletter' ? `[${reference}] ${title}` : `[${reference}] ${copy.label} — ${contactIdentity}`,
    html: baseEmail({
      preheader: `${title}: ${contactIdentity}`,
      title,
      body: `<p style="margin:0 0 8px;font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#D8FF57">Lead recebido · ${escapeHtml(reference)}</p><h1 style="margin:0 0 22px;font-size:25px;line-height:1.3;color:#FFFFFF">${escapeHtml(title)}</h1>${responseButton}<table role="presentation" style="width:100%;border-collapse:collapse;font-size:12px">${htmlRows}</table>`,
    }),
    text: [title, ...rows.map(([label, value]) => `${label}: ${value}`)].join('\n'),
  };
};
