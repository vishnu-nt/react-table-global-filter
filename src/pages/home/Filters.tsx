import Button from 'components/Buttons'
import Input from 'components/Form/Input'
import Select from 'components/Form/Select'
import { useEffect, useState } from 'react';

const populationFilters = [
  { value: 1_00_000, label: '< 1 M' },
  { value: 5_00_0000, label: '< 15 M' },
  { value: 10_00_000, label: '< 10 M' },
];

export interface IFilter {
  population?: number;
  countrySearchKey: string;
}

interface Props {
  onFilterChange(filter: IFilter): void;
  loadData(): void;
  isLoading?: boolean;
}

const Filters = ({ onFilterChange, loadData, isLoading }: Props) => {
  const [countrySearchKey, setCountrySearchKey] = useState("");
  const [populationLessThan, setPopulationLessThan] = useState<number>();

  // Debouncnig country name input
  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      onFilterChange({
        countrySearchKey: countrySearchKey,
        population: Number(populationLessThan),
      });
    }, 300);
    return () => clearTimeout(delayInputTimeoutId);
  }, [countrySearchKey, populationLessThan, onFilterChange]);

  const resetFilter = () => {
    setPopulationLessThan(undefined);
    setCountrySearchKey("");
  };

  return (
    <div className="flex justify-between py-4 !mt-0 !mb-6">
      <div className="flex">
        <Input value={countrySearchKey} onChange={e => setCountrySearchKey(e.target.value)} className="mr-4" placeholder="Country name" />
        <Select className="mr-4" defaultValue="Population" options={populationFilters} value={populationLessThan} onChange={value => setPopulationLessThan(Number(value))} />
        <Button onClick={resetFilter} variant="outline">Clear</Button>
      </div>
      <Button isLoading={isLoading} onClick={loadData}>Show all Countries</Button>
    </div>
  )
}

export default Filters