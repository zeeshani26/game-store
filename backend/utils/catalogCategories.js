function normalizeCatalogLabel(c) {
  const s = String(c || "").trim();
  return s || null;
}

function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildCategoryFilterQuery(category) {
  if (!category || category === "all") return {};
  const cat = String(category).trim();
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
  return Array.from(set).sort((a, b) =>
    String(a).localeCompare(String(b), undefined, { sensitivity: "base" })
  );
}

module.exports = {
  mergeCategoryList,
  buildCategoryFilterQuery,
  combineSearchAndCategory,
  normalizeCatalogLabel,
};
