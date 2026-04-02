import { normalizeCategoryLabelForDisplay } from "./categoryOptions";

/**
 * Keep only products whose `category` matches the selected filter.
 * Case-insensitive. Treats Activision/Shooter legacy labels as Shooting.
 */
export function filterProductsByCategory(products, category) {
  if (!category || category === "all") return products;
  if (!Array.isArray(products) || products.length === 0) return products;

  const needle = normalizeCategoryLabelForDisplay(category).toLowerCase();
  return products.filter((p) => {
    const cat = normalizeCategoryLabelForDisplay(p.category).toLowerCase();
    if (cat === needle) return true;
    if (needle === "action") {
      const n = String(p.name || "")
        .replace(/\u00a0/g, " ")
        .trim()
        .toLowerCase();
      if (n.includes("god of war")) return true;
    }
    return false;
  });
}
