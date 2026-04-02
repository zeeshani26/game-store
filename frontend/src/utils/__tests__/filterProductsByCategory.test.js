import { filterProductsByCategory } from "../filterProductsByCategory";

const items = [
  { _id: "1", category: "Racing", name: "A" },
  { _id: "2", category: "Action", name: "B" },
  { _id: "3", category: "racing", name: "C" },
];

describe("filterProductsByCategory", () => {
  it("returns all products when category is empty or all", () => {
    expect(filterProductsByCategory(items, "")).toEqual(items);
    expect(filterProductsByCategory(items, "all")).toEqual(items);
  });

  it("filters by category case-insensitively", () => {
    const out = filterProductsByCategory(items, "Racing");
    expect(out.map((p) => p._id)).toEqual(["1", "3"]);
  });

  it("returns empty when nothing matches", () => {
    expect(filterProductsByCategory(items, "Sports")).toEqual([]);
  });

  it("treats Activision and Shooter as Shooting", () => {
    const mixed = [
      { _id: "a", category: "Activision", name: "CoD" },
      { _id: "b", category: "Shooter", name: "X" },
      { _id: "c", category: "Shooting", name: "Y" },
    ];
    const out = filterProductsByCategory(mixed, "Shooting");
    expect(out.map((p) => p._id)).toEqual(["a", "b", "c"]);
  });

  it("includes titles with god of war in the name under Action when category is mis-tagged", () => {
    const mixed = [
      { _id: "1", category: "Electronics", name: "Bundle God Of War Edition" },
      { _id: "2", category: "Action", name: "Some Action Game" },
      { _id: "3", category: "Racing", name: "Forza" },
    ];
    const out = filterProductsByCategory(mixed, "Action");
    expect(out.map((p) => p._id).sort()).toEqual(["1", "2"]);
  });
});
