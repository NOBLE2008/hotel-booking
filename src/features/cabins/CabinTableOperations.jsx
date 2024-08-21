import React from "react";
import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import { useSearchParams } from "react-router-dom";

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
    </TableOperations>
  );
}
