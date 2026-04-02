const {
  buildCategoryFilterQuery,
  combineSearchAndCategory,
} = require("./catalogCategories");

describe("buildCategoryFilterQuery Action", () => {
  it("uses $or for category Action or name match for series-style titles", () => {
    const q = buildCategoryFilterQuery("Action");
    expect(q.$or).toBeDefined();
    expect(q.$or.length).toBe(2);
  });
});

describe("combineSearchAndCategory", () => {
  it("wraps $or category filter with search in $and", () => {
    const search = { name: { $regex: /war/i, $options: "i" } };
    const cat = buildCategoryFilterQuery("Action");
    const out = combineSearchAndCategory(search, cat);
    expect(out.$and).toBeDefined();
    expect(out.$and[0]).toEqual(search);
    expect(out.$and[1]).toEqual(cat);
  });
});
