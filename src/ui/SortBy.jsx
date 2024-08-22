import React from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

export default function SortBy({ options }) {
  const [searchParam, setSearchParam] = useSearchParams();

  const defaultValue = options.find((option) => {
    if (
      JSON.parse(searchParam.get(`sort`) || '{}')[option?.value?.split?.("-")[0]] === 1
    ) {
      return option?.value === `${option?.value.split("-")[0]}-asc`;
    }
    if (
      JSON.parse(searchParam.get(`sort`) || '{}')[option?.value?.split?.("-")[0]] === -1
    ) {
      return option?.value === `${option?.value.split("-")[0]}-desc`;
    }
  });
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
  return (
    <Select
      options={options}
      onChange={handleChange}
      defaultValue={defaultValue?.value}
    />
  );
}
