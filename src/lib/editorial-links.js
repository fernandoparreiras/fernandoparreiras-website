// Editorial text stays text; only explicit HTTPS citations become anchors.
export function editorialSegments(value) {
  const parts = [];
  let cursor = 0;
  for (const match of String(value).matchAll(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g)) {
    let url;
    try { url = new URL(match[2]); } catch { continue; }
    if (url.protocol !== 'https:' || url.username || url.password) continue;
    if (match.index > cursor) parts.push({ text: value.slice(cursor, match.index) });
    parts.push({ text: match[1], href: url.href });
    cursor = match.index + match[0].length;
  }
  if (cursor < value.length) parts.push({ text: value.slice(cursor) });
  return parts;
}

const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');

export function editorialHtml(value) {
  return editorialSegments(value).map((part) => part.href
    ? `<a href="${escape(part.href)}" rel="noopener noreferrer">${escape(part.text)}</a>`
    : escape(part.text)).join('');
}
