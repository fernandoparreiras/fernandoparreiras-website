import { docksStore, verifyCancelToken } from './_shared/docks-queue.mjs';
const html = (body, status = 200) => new Response(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>Complementos do Docks</title></head><body><main><h1>Complementos do Docks</h1>${body}<p><a href="/docks/">Voltar ao acervo</a></p></main></body></html>`, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' } });
export function createCancelHandler({ storeFor = docksStore } = {}) {
  return async (request, context) => {
    if (!['GET', 'POST'].includes(request.method)) return html('<p>Método não permitido.</p>', 405);
    try {
      const token = new URL(request.url).searchParams.get('token');
      const id = verifyCancelToken(token);
      if (!id) return html('<p>Este link não é válido.</p>', 400);
      const store = storeFor(context);
      const job = await store.get(`jobs/${id}`, { type: 'json' });
      if (!job) return html('<p>Este pedido não está mais na fila de complementos.</p>');
      if (request.method === 'GET') return html(`<p>Cancelar os dois complementos desta palestra e de pedidos anteriores deste e-mail?</p><form method="post"><button type="submit">Confirmar cancelamento</button></form><p>Você mantém o acesso às apresentações. Este cancelamento não altera a Carta do Fernando ou um pedido de conversa.</p>`);
      await store.setJSON(`cancelled/${job.recipientKey}`, { cancelledAt: new Date().toISOString() });
      return html('<p>Cancelamento registrado. Os próximos complementos não serão enviados.</p>');
    } catch { return html('<p>Não foi possível confirmar agora. Tente novamente ou escreva para fernando@fernandoparreiras.com.br.</p>', 503); }
  };
}
export default createCancelHandler();
export const config = { path: '/api/docks-cancel' };
