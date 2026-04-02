/**
 * Categories shown in filters even when no product is tagged with them yet.
 */
const EXTRA_DISPLAY_CATEGORIES = ["Fighting", "Horror", "Sports"];

/** Legacy DB values that should appear as "Shooting" in the UI and filters. */
const LEGACY_SHOOTING_LABELS = ["Activision", "Shooter"];

function normalizeCatalogLabel(c) {
  const s = String(c || "").trim();
  if (!s) return null;
  if (LEGACY_SHOOTING_LABELS.includes(s)) return "Shooting";
  return s;
}

function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Mongo filter for catalog list when user picks a category (handles legacy labels).
 * Case-insensitive so "action" and "Action" both match.
 * Action also matches certain series-style names (e.g. "God of War") when mis-tagged in DB.
 */
function buildCategoryFilterQuery(category) {
  if (!category || category === "all") return {};
  const cat = String(category).trim();
  if (cat.toLowerCase() === "shooting") {
    return {
      category: {
        $regex: /^(Shooting|Activision|Shooter)$/i,
      },
    };
  }
  if (cat.toLowerCase() === "action") {
    return {
      $or: [
        { category: { $regex: /^Action$/i } },
        { name: { $regex: /God[\s\u00a0]+of[\s\u00a0]+War/i } },
      ],
    };
  }
  return {
    category: { $regex: new RegExp(`^${escapeRegex(cat)}$`, "i") },
  };
}

/**
 * Merge name search with category filter. Required when category uses $or (e.g. Action).
 */
function combineSearchAndCategory(search, categoryFilter) {
  const hasSearch = search && search.name;
  const hasCat =
    categoryFilter && Object.keys(categoryFilter).length > 0;
  if (hasSearch && hasCat) {
    if (categoryFilter.$or) {
      return { $and: [search, categoryFilter] };
    }
    return { ...search, ...categoryFilter };
  }
  if (hasSearch) return search;
  if (hasCat) return categoryFilter;
  return {};
}

function mergeCategoryList(distinctFromDb) {
  const set = new Set();
  (distinctFromDb || []).forEach((c) => {
    const n = normalizeCatalogLabel(c);
    if (n) set.add(n);
  });
  EXTRA_DISPLAY_CATEGORIES.forEach((c) => set.add(c));
  return Array.from(set).sort((a, b) =>
    String(a).localeCompare(String(b), undefined, { sensitivity: "base" })
  );
}

module.exports = {
  mergeCategoryList,
  EXTRA_DISPLAY_CATEGORIES,
  buildCategoryFilterQuery,
  combineSearchAndCategory,
  normalizeCatalogLabel,
};
