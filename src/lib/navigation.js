export function normalizePathname(pathname = '/') {
  const normalized = pathname.replace(/\/+$/, '');
  return normalized || '/';
}

export function isAcademyPath(pathname) {
  const normalized = normalizePathname(pathname);
  return normalized === '/academy' || normalized.startsWith('/academy/');
}

export function shouldShowMobileCommercialCta(pathname) {
  const normalized = normalizePathname(pathname);
  return normalized !== '/contato' && !isAcademyPath(normalized);
}
