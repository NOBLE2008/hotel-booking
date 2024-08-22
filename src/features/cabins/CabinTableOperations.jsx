import React from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import { useSearchParams } from "react-router-dom";
import SortBy from "../../ui/sortBy";

export default function CabinTableOperations() {
  const [searchParam, setSearchParam] = useSearchParams();

  const currentFilter = searchParam.get("discount");
  const handleFilterClick = (filter) => {
    return () => {
      searchParam.set("discount", filter);
      setSearchParam(searchParam);
    };
  };
  return (
    <TableOperations>
      <Filter
        buttons={[
          {
            text: "All",
            click: handleFilterClick("all"),
            active: currentFilter === "all",
          },
          {
            text: "Discount",
            click: handleFilterClick("discount"),
            active: currentFilter === "discount",
          },
          {
            text: "No Discount",
            click: handleFilterClick("no-discount"),
            active: currentFilter === "no-discount",
          },
        ]}
      />
      <SortBy options={[
        { value: "name-asc", label: "Sort by name (A-Z)" },
        { value: "name-desc", label: "Sort by name (Z-A)" },
        { value: "regularPrice-asc", label: "Sort by price (Lowest first)" },
        { value: "regularPrice-desc", label: "Sort by price (Highest first)" },
        { value: "maxCapacity-asc", label: "Sort by capacity (Smaller first)" },
        { value: "maxCapacity-desc", label: "Sort by capacity (Larger first)" },
      ]}/>
    </TableOperations>
  );
}
