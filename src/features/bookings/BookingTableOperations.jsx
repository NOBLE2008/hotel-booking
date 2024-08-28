import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import { useSearchParams } from "react-router-dom";

function BookingTableOperations() {
  const [ searchParam, setSearchParam ] = useSearchParams();
  const currentFilter = searchParam.get("status");
  const handleFilterClick = (filter) => {
    return () => {
      searchParam.set('status', filter);
      searchParam.set('page', 1)
      setSearchParam(searchParam);
    };
  };
  return (
    <TableOperations>
      <Filter
        filterField="status"
        buttons={[
          { text: "All", active: currentFilter === 'all', click: handleFilterClick('all')},
          { text: "Checked-out", active: currentFilter === 'checked-out', click: handleFilterClick('checked-out') },
          { text: "Checked-in", active: currentFilter === 'checked-in', click: handleFilterClick('checked-in') },
          { text: "Unconfirmed", active: currentFilter === 'unconfirmed', click: handleFilterClick('unconfirmed') },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
