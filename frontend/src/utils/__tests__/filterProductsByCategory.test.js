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

  it("filters by category case-insensitively without name fallbacks", () => {
    const mixed = [
      { _id: "2", category: "Action", name: "Some Action Game" },
      { _id: "3", category: "Racing", name: "Forza" },
    ];
    const out = filterProductsByCategory(mixed, "action");
    expect(out.map((p) => p._id)).toEqual(["2"]);
  });
});
