import { trackEvent } from '@/lib/analytics';

export function trackKnowledgeEvent(eventName, properties = {}) {
  const payload = {
    event: eventName,
    ...properties,
  };

  window.dispatchEvent(new CustomEvent('knowledge:analytics', { detail: payload }));
  trackEvent(eventName, properties);
}
