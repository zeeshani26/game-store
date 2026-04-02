import {
  buildCategoryFilterOptions,
  extractCategoriesFromProducts,
  normalizeCategoryLabelForDisplay,
  normalizeCategoryOptions,
} from "../categoryOptions";

describe("extractCategoriesFromProducts", () => {
  it("collects category fields from products", () => {
    expect(
      extractCategoriesFromProducts([
        { category: "Racing" },
        { category: "Action" },
        { category: "Racing" },
      ])
    ).toEqual(["Racing", "Action", "Racing"]);
  });
});

describe("buildCategoryFilterOptions", () => {
  it("merges API list and products categories", () => {
    const out = buildCategoryFilterOptions(["Racing"], [
      { category: "Action" },
      { category: "Racing" },
    ]);
    expect(out).toEqual(["Action", "Racing"]);
  });
});

describe("normalizeCategoryLabelForDisplay", () => {
  it("trims and returns the input unchanged", () => {
    expect(normalizeCategoryLabelForDisplay("Activision")).toBe("Activision");
    expect(normalizeCategoryLabelForDisplay("  Shooter ")).toBe("Shooter");
    expect(normalizeCategoryLabelForDisplay("Shooting")).toBe("Shooting");
    expect(normalizeCategoryLabelForDisplay("Action")).toBe("Action");
  });
});

describe("normalizeCategoryOptions", () => {
  it("returns empty array for empty or invalid input", () => {
    expect(normalizeCategoryOptions([])).toEqual([]);
    expect(normalizeCategoryOptions(null)).toEqual([]);
    expect(normalizeCategoryOptions(undefined)).toEqual([]);
  });

  it("dedupes, trims, and sorts categories from the API", () => {
    const out = normalizeCategoryOptions(["Racing", " Action ", "Racing", "Action"]);
    expect(out).toEqual(["Action", "Racing"]);
  });

  it("drops empty strings", () => {
    expect(normalizeCategoryOptions(["", "  ", "Sports"])).toEqual(["Sports"]);
  });
});
