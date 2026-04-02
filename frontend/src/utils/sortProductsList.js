/**
 * Sort the current page of products to match the catalog sort controls.
 * Mirrors backend productRoutes sort so the grid updates even if the API
 * ignores `sort` (e.g. older deployments) — note: pagination is still determined
 * by the server; only the received slice is reordered.
 */
export function sortProductsList(products, sortKey) {
  if (!Array.isArray(products) || products.length === 0) return products;

  const list = [...products];
  const byCreatedDesc = (a, b) => {
    const ta = new Date(a.createdAt || 0).getTime();
    const tb = new Date(b.createdAt || 0).getTime();
    return tb - ta;
  };

  switch (sortKey) {
    case "price_asc":
      return list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    case "price_desc":
      return list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    case "rating":
      return list.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
    case "name":
      return list.sort((a, b) =>
        String(a.name || "").localeCompare(String(b.name || ""), undefined, {
          sensitivity: "base",
        })
      );
    default:
      return list.sort(byCreatedDesc);
  }
}
