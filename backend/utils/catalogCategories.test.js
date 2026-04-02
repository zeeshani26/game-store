const {
  buildCategoryFilterQuery,
  combineSearchAndCategory,
} = require("./catalogCategories");

describe("buildCategoryFilterQuery Action", () => {
  it("matches category exactly case-insensitively", () => {
    const q = buildCategoryFilterQuery("Action");
    expect(q.category).toBeDefined();
    expect(q.category.$regex).toBeInstanceOf(RegExp);
    expect(q.category.$regex.test("Action")).toBe(true);
    expect(q.category.$regex.test("action")).toBe(true);
    expect(q.category.$regex.test("Action 2")).toBe(false);
  });
});

describe("combineSearchAndCategory", () => {
  it("merges search with category filter for non-$or filters", () => {
    const search = { name: { $regex: /war/i, $options: "i" } };
    const cat = buildCategoryFilterQuery("Action");
    const out = combineSearchAndCategory(search, cat);
    expect(out.name).toEqual(search.name);
    expect(out.category).toEqual(cat.category);
  });
});
