import React from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

export default function SortBy({ options }) {
  const [searchParam, setSearchParam] = useSearchParams();
  function handleChange(e) {
    // handle sort change
    const splittedValue = e.target.value.split("-");
    const field = splittedValue[0];
    const order = splittedValue[1];
    searchParam.set(
      `sort`,
      JSON.stringify({
        [field]: order === "asc" ? 1 : -1,
      })
    );
    setSearchParam(searchParam);
  }
  return <Select options={options} onChange={handleChange} />;
}
