import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSearchParams } from "react-router-dom";
import { buildPaginationTo } from "../utils/paginationLinks";

const Paginate = ({ pages, page, keyword = "" }) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";

  return (
    pages > 1 && (
      <Pagination className="pagination-store justify-content-center flex-wrap">
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={buildPaginationTo(x + 1, { keyword, category, sort })}
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
