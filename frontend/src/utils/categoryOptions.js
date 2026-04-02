/** Shown in the filter even when no game uses this category yet (empty shelf). */
export const EXTRA_DISPLAY_CATEGORIES = ["Fighting", "Horror", "Sports"];

/** Legacy DB values that should display and filter as "Shooting". */
export function normalizeCategoryLabelForDisplay(label) {
  const s = String(label || "").trim();
  if (s === "Activision" || s === "Shooter") return "Shooting";
  return s;
}

/**
 * Categories present on the current product list (fallback when API omits `categories`).
 */
export function extractCategoriesFromProducts(products) {
  if (!Array.isArray(products)) return [];
  return products
    .map((p) => p && normalizeCategoryLabelForDisplay(p.category))
    .filter(Boolean);
}

/**
 * Dedupe and sort category strings for the filter dropdown.
 */
export function normalizeCategoryOptions(apiCategories) {
  if (!Array.isArray(apiCategories)) return [];
  return Array.from(
    new Set(
      apiCategories
        .map((c) => String(c).trim())
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

/**
 * Merge API categories (from list payload or /categories) with categories seen on loaded products.
 */
export function buildCategoryFilterOptions(apiCategories, products) {
  return normalizeCategoryOptions([
    ...(Array.isArray(apiCategories) ? apiCategories : []),
    ...extractCategoriesFromProducts(products),
    ...EXTRA_DISPLAY_CATEGORIES,
  ]);
}
