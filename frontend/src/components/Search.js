import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
    } else {
      navigate("/");
    }
  };
  return (
    <Form
      onSubmit={submitHandler}
      className="d-flex search-bar-store my-2 my-lg-0 ms-lg-4 flex-grow-1"
      style={{ maxWidth: "420px" }}
    >
      <Form.Control
        type="search"
        name="q"
        placeholder="Search games, genres, publishers…"
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search games"
      />
      <Button type="submit" className="btn-search">
        Search
      </Button>
    </Form>
  );
};

export default Search;
