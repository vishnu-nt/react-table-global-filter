import { useMemo, useState } from "react";
import Table from "components/Table";
import { Column } from "src/types/Table";
import Filters, { IFilter } from "./Filters";
import useLazyQuery from "hooks/useLazyQuery";
import { getCountryList } from "../../services/countries";
import { Country } from "src/types/Country";

const columns: Column[] = [
  {
    header: "Country Name",
    accessorKey: "name",
  },
  {
    header: "Code",
    accessorKey: "abbreviation",
  },
  {
    header: "Capital",
    accessorKey: "capital",
  },
  {
    header: "Ph Code",
    accessorKey: "phone",
  },
  {
    header: "Population",
    accessorKey: "population",
  },
  {
    header: "Flag",
    accessorKey: "media.flag",
    cell: ({ cell }) => {
      return (
        <img
          src={cell.renderValue("media.flag")}
          alt=""
          className="w-8 mx-auto"
        />
      );
    },
  },
  {
    header: "Emblem",
    accessorKey: "media.emblem",
    cell: ({ cell }) => {
      return (
        <img
          src={cell.renderValue("media.flag")}
          alt=""
          className="w-8 mx-auto"
        />
      );
    },
  },
];

const defaultRows: Country[] = [];

function Home() {
  const { isLoading, data, execute, status } = useLazyQuery(getCountryList);
  const [filter, setFilter] = useState<IFilter>({
    population: undefined,
    countrySearchKey: "",
  });

  // Filter table data based on filter changes
  const filteredRows = useMemo(() => {
    if (filter.countrySearchKey || filter.population) {
      return data?.data.filter((country) => {
        const matchesPopulation = filter.population
          ? (country.population ?? 0) < Number(filter.population)
          : true;
        const matchesSearchKey = filter.countrySearchKey
          ? country.name
              .toLowerCase()
              .includes(filter.countrySearchKey.toLowerCase()) ||
            country.abbreviation
              .toLowerCase()
              .includes(filter.countrySearchKey.toLowerCase())
          : true;
        return matchesPopulation && matchesSearchKey;
      });
    }
    return data?.data;
  }, [filter, data]);

  return (
    <main className="container mx-auto">
      <header className="">
        <h1 className="font-semibold text-lg my-6">Countries Info</h1>
      </header>
      <Filters
        onFilterChange={setFilter}
        loadData={execute}
        isLoading={isLoading}
      />
      <Table
        isLoading={isLoading}
        columns={columns}
        rows={filteredRows ?? defaultRows}
        noDataText={status == "idle" ? "Click show all countries to load data" : "No countries found. Try filtering with another criteria"}
      />
    </main>
  );
}

export default Home;
