import { sortProductsList } from "../sortProductsList";

const items = [
  { _id: "1", name: "B", price: 30, rating: 4, createdAt: "2023-01-02T00:00:00.000Z" },
  { _id: "2", name: "A", price: 10, rating: 5, createdAt: "2023-01-01T00:00:00.000Z" },
  { _id: "3", name: "C", price: 20, rating: 3, createdAt: "2023-01-03T00:00:00.000Z" },
];

describe("sortProductsList", () => {
  it("sorts by price ascending", () => {
    const out = sortProductsList(items, "price_asc");
    expect(out.map((p) => p._id)).toEqual(["2", "3", "1"]);
  });

  it("sorts by price descending", () => {
    const out = sortProductsList(items, "price_desc");
    expect(out.map((p) => p._id)).toEqual(["1", "3", "2"]);
  });

  it("sorts by rating descending", () => {
    const out = sortProductsList(items, "rating");
    expect(out.map((p) => p._id)).toEqual(["2", "1", "3"]);
  });

  it("sorts by name", () => {
    const out = sortProductsList(items, "name");
    expect(out.map((p) => p._id)).toEqual(["2", "1", "3"]);
  });

  it("defaults to newest first", () => {
    const out = sortProductsList(items, "");
    expect(out.map((p) => p._id)).toEqual(["3", "1", "2"]);
  });
});
