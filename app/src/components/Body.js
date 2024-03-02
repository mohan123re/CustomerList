import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Table } from "./Table";
import { TopBody } from "./TopBody";
import BottomBody from "./BottomBody";
import "./Body.css";
const Body = () => {
  //states
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("sno");
  const [page, setPage] = useState(1);

  //fetch data
  useEffect(() => {
    async function fetch() {
      const response = await axios.get("http://localhost:5000/customers", {
        params: {
          searchData: search,
          sortData: sortBy,
          pageData: page,
        },
      });
      setData(response.data.results);
    }
    fetch();
  }, [search, sortBy, page]);

  //jsx
  return (
    <div>
      <TopBody
        search={search}
        sortBy={sortBy}
        handleSearch={(e) => setSearch(e.target.value)}
        handleSort={(e) => {
          setSortBy(e.target.value);
          setPage(1);
        }}
      />
      <Table data={data} />

      <BottomBody
        handleprevPage={() => setPage((prevPage) => prevPage - 1)}
        handlenextPage={() => setPage((prevPage) => prevPage + 1)}
        page={page}
        data={data}
      />
    </div>
  );
};

export default Body;
