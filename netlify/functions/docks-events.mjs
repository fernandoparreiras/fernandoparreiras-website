import { getDock } from '../../src/data/docks.js';
import { docksStore, UUID } from './_shared/docks-queue.mjs';
export const DOCK_EVENTS = new Set(['docks_presentation_view', 'docks_presentation_open', 'docks_presentation_download', 'docks_guide_download', 'docks_lead_start', 'docks_lead_complete', 'docks_lead_error']);
export default async (request, context) => {
  if (request.method !== 'POST') return new Response(null, { status: 405 });
  if (request.headers.get('origin') && request.headers.get('origin') !== new URL(request.url).origin) return new Response(null, { status: 403 });
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw) > 1024) return new Response(null, { status: 413 });
    const input = JSON.parse(raw);
    const presentation = getDock(input.presentationSlug);
    if (!presentation || !UUID.test(input.id || '') || !DOCK_EVENTS.has(input.event)) return new Response(null, { status: 400 });
    const campaign = input.campaign === presentation.eventId ? input.campaign : '';
    const day = new Date().toISOString().slice(0, 10);
    await docksStore(context).setJSON(`metrics/${day}/${input.id}`, { event: input.event, presentationSlug: presentation.slug, eventId: presentation.eventId, campaign }, { onlyIfNew: true });
    return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
  } catch { return new Response(null, { status: 503 }); }
};
export const config = { path: '/api/docks-events' };
