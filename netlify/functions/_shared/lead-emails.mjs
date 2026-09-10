const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const baseEmail = ({ preheader, title, body }) => `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;background:#080809;color:#fff;font-family:Raleway,Arial,sans-serif">
<div style="display:none;max-height:0;overflow:hidden">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#080809;padding:32px 16px"><tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;border:1px solid #303235;background:#111211">
<tr><td style="padding:30px 34px;border-bottom:3px solid #D8FF57"><div style="font-size:24px;font-weight:900;color:#fff">Fernando <span style="color:#D8FF57">Parreiras</span></div><div style="margin-top:7px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#aaa">Tecnologia · IA · Negócios · Pessoas</div></td></tr>
<tr><td style="padding:34px">${body}</td></tr>
<tr><td style="padding:22px 34px;border-top:1px solid #303235;font-size:12px;color:#85888c"><a href="https://fernandoparreiras.com.br" style="color:#D8FF57;text-decoration:none">fernandoparreiras.com.br</a> · <a href="https://fernandoparreiras.com.br/privacidade" style="color:#aaa">Privacidade</a></td></tr>
</table></td></tr></table></body></html>`;

const button = (label, url) => `<a href="${url}" style="display:inline-block;background:#D8FF57;color:#080809;padding:13px 20px;font-size:13px;font-weight:900;text-decoration:none">${escapeHtml(label)}</a>`;

export const buildRespondentEmail = ({ formType, name }) => {
  if (formType === 'newsletter') {
    return {
      subject: 'Sua inscrição na Carta do Fernando está confirmada',
      html: baseEmail({
        preheader: 'Inscrição confirmada. A próxima Carta chegará no seu e-mail.',
        title: 'Carta do Fernando',
        body: `<p style="margin:0 0 12px;font-size:24px;font-weight:800">Inscrição confirmada.</p><p style="margin:0 0 24px;color:#c9cbce;line-height:1.7">A próxima Carta do Fernando chegará neste e-mail com ideias curtas e aplicáveis sobre tecnologia, IA, negócios e pessoas.</p>${button('Ler os artigos mais recentes', 'https://fernandoparreiras.com.br/artigos')}<p style="margin:24px 0 0;color:#85888c;font-size:12px;line-height:1.6">Se não foi você, responda a este e-mail. Você poderá cancelar o recebimento a qualquer momento.</p>`,
      }),
      text: 'Sua inscrição na Carta do Fernando está confirmada.\n\nA próxima Carta chegará neste e-mail.\n\nArtigos: https://fernandoparreiras.com.br/artigos\nPrivacidade: https://fernandoparreiras.com.br/privacidade',
    };
  }

  const greeting = name ? `Olá, ${name.split(' ')[0]}.` : 'Olá.';
  return {
    subject: 'Recebi sua mensagem — Fernando Parreiras',
    html: baseEmail({
      preheader: 'Sua mensagem chegou. Vou ler o contexto antes de responder.',
      title: 'Mensagem recebida',
      body: `<p style="margin:0 0 12px;font-size:24px;font-weight:800">${escapeHtml(greeting)} Sua mensagem chegou.</p><p style="margin:0 0 24px;color:#c9cbce;line-height:1.7">Vou ler o contexto com atenção e responder pelo contato informado. Se fizer sentido envolver Tech Human, Trustyu/FORGE ou outra frente, eu mesmo encaminho a conversa.</p>${button('Conhecer meu trabalho', 'https://fernandoparreiras.com.br/negocios')}<p style="margin:24px 0 0;color:#85888c;font-size:12px;line-height:1.6">Para complementar a mensagem, basta responder a este e-mail ou acessar <a href="https://fernandoparreiras.com.br/contato" style="color:#D8FF57">a página de contato</a>.</p>`,
    }),
    text: `${greeting} Sua mensagem chegou.\n\nVou ler o contexto com atenção e responder pelo contato informado.\n\nConheça meu trabalho: https://fernandoparreiras.com.br/negocios\nContato: https://fernandoparreiras.com.br/contato\nPrivacidade: https://fernandoparreiras.com.br/privacidade`,
  };
};

export const buildInternalEmail = ({ reference, formType, email, name, interest, company, phone, message, sourcePath }) => {
  const title = formType === 'newsletter' ? 'Nova inscrição — Carta do Fernando' : 'Novo contato — Site Fernando Parreiras';
  const rows = [
    ['Referência', reference], ['Origem', sourcePath], ['Nome', name || 'Não informado'],
    ['E-mail', email], ['Telefone', phone || 'Não informado'], ['Interesse', interest],
    ['Empresa / cargo', company || 'Não informado'], ['Contexto', message || 'Não informado'],
  ];
  const htmlRows = rows.map(([label, value]) => `<tr><td style="padding:9px;color:#85888c;vertical-align:top">${escapeHtml(label)}</td><td style="padding:9px;color:#fff;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join('');
  return {
    subject: `[${reference}] ${title}`,
    html: baseEmail({ preheader: title, title, body: `<h1 style="margin:0 0 18px;font-size:24px">${title}</h1><table style="width:100%;border-collapse:collapse">${htmlRows}</table>` }),
    text: [title, ...rows.map(([label, value]) => `${label}: ${value}`)].join('\n'),
  };
};
