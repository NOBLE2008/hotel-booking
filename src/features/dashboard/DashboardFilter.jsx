import { useSearchParams } from "react-router-dom";
import Filter from "../../ui/Filter";

function DashboardFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = (value) => () => {
    // Update the filter value
    searchParams.set("last", value);
    setSearchParams(searchParams); // Update the search parameters in the URL
  };
  const last = searchParams.get("last");
  return (
    <Filter
      buttons={[
        {
          value: "7",
          text: "Last 7 days",
          click: handleClick("7"),
          active: last === "7",
        },
        {
          value: "30",
          text: "Last 30 days",
          click: handleClick("30"),
          active: last === "30",
        },
        {
          value: "90",
          text: "Last 90 days",
          click: handleClick("90"),
          active: last === "90",
        },
      ]}
    />
  );
}

export default DashboardFilter;
