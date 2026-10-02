import { parseDockLead } from './_shared/docks-lead.mjs';
import { assertDocksConfiguration, docksStore, enqueueDock, processDock, referenceFor, UUID } from './_shared/docks-queue.mjs';
const json = (status, body) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
export function createDocksHandler({ storeFor = docksStore, configured = assertDocksConfiguration, process = processDock } = {}) {
  return async (request, context) => {
    if (request.method !== 'POST') return json(405, { ok: false });
    if (request.headers.get('origin') && request.headers.get('origin') !== new URL(request.url).origin) return json(403, { ok: false });
    let body, lead;
    try {
      const raw = await request.text();
      if (Buffer.byteLength(raw) > 16384) return json(413, { ok: false });
      body = JSON.parse(raw);
      if (body.website) return json(200, { ok: true });
      if (!UUID.test(body.submissionId || '')) throw new Error('invalid_payload');
      lead = parseDockLead(body);
      const attribution = {};
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
        const value = body.attribution?.[key];
        if (typeof value === 'string' && /^[A-Za-z0-9._+\-]{1,120}$/.test(value)) attribution[key] = value;
      }
      if (Object.keys(attribution).length) lead.attribution = attribution;
    } catch { return json(400, { ok: false, error: 'invalid_payload' }); }
    const reference = referenceFor(body.submissionId);
    try {
      configured();
      const store = storeFor(context);
      await enqueueDock(store, { submissionId: body.submissionId, lead });
      const result = await process(store, `jobs/${body.submissionId}`);
      if (result.receipts?.crm && result.receipts?.internal && result.receipts?.material) return json(200, { ok: true, reference });
      return json(502, { ok: false, reference, error: 'delivery_pending' });
    } catch (error) {
      return json(error.message === 'submission_conflict' ? 409 : 503, { ok: false, reference, error: error.message === 'submission_conflict' ? 'submission_conflict' : 'service_unavailable' });
    }
  };
}
export default createDocksHandler();
export const config = { path: '/api/docks' };
