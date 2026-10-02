import { timingSafeEqual } from 'node:crypto';
import { docksStore } from './_shared/docks-queue.mjs';
import { readEnv } from './_shared/email-delivery.mjs';
import { summarizeDocks } from './_shared/docks-report.mjs';
export default async (request, context) => {
  if (request.method !== 'GET') return new Response(null, { status: 405 });
  const expected = readEnv('FERNANDO_DOCKS_REPORT_TOKEN');
  const actual = request.headers.get('authorization')?.replace(/^Bearer /, '') || '';
  if (!expected || expected.length < 32) return new Response(null, { status: 503 });
  if (Buffer.byteLength(actual) !== Buffer.byteLength(expected) || !timingSafeEqual(Buffer.from(actual), Buffer.from(expected))) return new Response(null, { status: 401 });
  const store = docksStore(context);
  const jobs = [], events = [];
  const now = Date.now();
  for await (const page of store.list({ prefix: 'jobs/', paginate: true })) {
    for (const blob of page.blobs) { const job = await store.get(blob.key, { type: 'json' }); if (job && now - Date.parse(job.submittedAt) <= 30 * 86400000) jobs.push(job); }
  }
  for await (const page of store.list({ prefix: 'metrics/', paginate: true })) {
    for (const blob of page.blobs) if (now - Date.parse(blob.key.split('/')[1]) <= 30 * 86400000) events.push(await store.get(blob.key, { type: 'json' }));
  }
  return Response.json({ days: 30, groups: summarizeDocks(jobs, events.filter(Boolean)), note: 'Visualizações não são pessoas únicas; eventos anônimos são indicativos. Confirmação do provedor não prova abertura ou leitura. Reuniões e oportunidades ficam no CRM.' }, { headers: { 'Cache-Control': 'no-store' } });
};
export const config = { path: '/api/docks-report' };
