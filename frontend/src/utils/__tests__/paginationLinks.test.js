import { buildPaginationTo } from "../paginationLinks";

describe("buildPaginationTo", () => {
  it("puts query only in search, never in pathname", () => {
    const to = buildPaginationTo(2, { sort: "price_asc", category: "Action" });
    expect(to.pathname).toBe("/page/2");
    expect(to.pathname).not.toContain("?");
    expect(to.search).toBe("?category=Action&sort=price_asc");
  });

  it("supports search keyword routes", () => {
    const to = buildPaginationTo(1, {
      keyword: "god",
      sort: "rating",
    });
    expect(to.pathname).toBe("/search/god/page/1");
    expect(to.search).toBe("?sort=rating");
  });

  it("omits search when no filters", () => {
    const to = buildPaginationTo(3, {});
    expect(to.pathname).toBe("/page/3");
    expect(to.search).toBeUndefined();
  });
});
