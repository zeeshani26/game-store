/**
 * Build a react-router `to` object. Query must live in `search`, never in `pathname`,
 * or LinkContainer/react-router v6 will throw when resolving `useHref`.
 */
export function buildPaginationTo(pageNum, { keyword = "", category = "", sort = "" } = {}) {
  const p = new URLSearchParams();
  if (category) p.set("category", category);
  if (sort) p.set("sort", sort);
  const qs = p.toString();
  const pathname = keyword
    ? `/search/${keyword}/page/${pageNum}`
    : `/page/${pageNum}`;
  return {
    pathname,
    search: qs ? `?${qs}` : undefined,
  };
}
