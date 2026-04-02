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
  it("merges API list, products, and extra display categories", () => {
    const out = buildCategoryFilterOptions(["Racing"], [
      { category: "Action" },
      { category: "Racing" },
    ]);
    expect(out).toEqual(["Action", "Fighting", "Horror", "Racing", "Sports"]);
  });
});

describe("normalizeCategoryLabelForDisplay", () => {
  it("maps legacy labels to Shooting", () => {
    expect(normalizeCategoryLabelForDisplay("Activision")).toBe("Shooting");
    expect(normalizeCategoryLabelForDisplay("Shooter")).toBe("Shooting");
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
