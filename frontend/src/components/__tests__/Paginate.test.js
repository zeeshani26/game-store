import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Paginate from "../Paginate";

function renderPaginate(props, initialPath = "/page/1?sort=price_asc") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Paginate pages={3} page={1} {...props} />
    </MemoryRouter>
  );
}

describe("Paginate", () => {
  it("renders pagination links with search separate from pathname (no ? in pathname)", () => {
    renderPaginate({ keyword: "" });
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const href = link.getAttribute("href");
      expect(href).toBeTruthy();
      const pathOnly = href.split("?")[0];
      expect(pathOnly).not.toContain("?");
      if (href.includes("?")) {
        expect(href).toMatch(/\?.*sort=price_asc/);
      }
    }
  });

  it("preserves sort on search routes", () => {
    renderPaginate(
      { keyword: "war" },
      "/search/war/page/1?sort=name&category=Action"
    );
    const linkToPage2 = screen.getAllByRole("link").find((a) =>
      a.getAttribute("href")?.includes("/page/2")
    );
    expect(linkToPage2).toBeTruthy();
    const href = linkToPage2.getAttribute("href");
    expect(href).toContain("/search/war/page/2");
    expect(href).toContain("sort=name");
    expect(href).toContain("category=Action");
  });
});
