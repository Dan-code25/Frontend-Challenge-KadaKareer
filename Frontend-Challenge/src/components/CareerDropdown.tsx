type CareerDropdownProps = {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function CareerDropdown({
  categories,
  value,
  onChange,
}: CareerDropdownProps) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
