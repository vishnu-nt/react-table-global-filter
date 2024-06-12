interface Props {
  options: { value: string | number; label: string }[];
  onChange(value: string): void;
  value?: string | number;
  className?: string;
  defaultValue?: string;
}

const Select = ({
  className,
  defaultValue,
  options,
  value,
  onChange,
}: Props) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      value={value}
      className={`${className} bg-white px-2 border border-grey-1 rounded-md`}
    >
      {defaultValue && (
        <option disabled>
          {defaultValue}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} id={`option-${opt.value}`} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
