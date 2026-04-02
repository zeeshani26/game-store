import { normalizeCategoryLabelForDisplay } from "./categoryOptions";

export function filterProductsByCategory(products, category) {
  if (!category || category === "all") return products;
  if (!Array.isArray(products) || products.length === 0) return products;

  const needle = normalizeCategoryLabelForDisplay(category).toLowerCase();
  return products.filter((p) => {
    const cat = normalizeCategoryLabelForDisplay(p.category).toLowerCase();
    return cat === needle;
  });
}
