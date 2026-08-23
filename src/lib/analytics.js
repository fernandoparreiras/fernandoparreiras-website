const EVENT_NAME = /^[a-z][a-z0-9_]{2,48}$/;

function sanitizeProperties(properties) {
  return Object.fromEntries(
    Object.entries(properties)
      .filter(([key, value]) => EVENT_NAME.test(key) && ['string', 'number', 'boolean'].includes(typeof value))
      .map(([key, value]) => [key, typeof value === 'string' ? value.slice(0, 120) : value])
  );
}

export function trackEvent(name, properties = {}) {
  if (typeof window === 'undefined' || !EVENT_NAME.test(name)) return;

  const detail = {
    event: name,
    ...sanitizeProperties(properties)
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(detail);
  }

  window.dispatchEvent(new CustomEvent('fernando:analytics', { detail }));

  if (import.meta.env.DEV) {
    console.info('[analytics]', detail);
  }
}

export function getAttribution() {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    ['utm_source', 'utm_medium', 'utm_campaign'].flatMap((key) => {
      const value = params.get(key);
      return value ? [[key, value.slice(0, 100)]] : [];
    })
  );
}

