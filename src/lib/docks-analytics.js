import { getAttribution, trackEvent } from './analytics.js';
export function trackDockEvent(name, presentation, properties = {}) {
  trackEvent(name, { presentation_slug: presentation.slug, event_id: presentation.eventId, ...properties });
  const body = JSON.stringify({ id: crypto.randomUUID(), event: name, presentationSlug: presentation.slug, campaign: getAttribution().utm_campaign || '' });
  void fetch('/api/docks-events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {});
}
