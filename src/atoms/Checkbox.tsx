import React from 'react';

interface CheckboxProps {
  name: string;
  options: string[];
  selectedValues: string[];
  onChange: (value: string, checked: boolean) => void;
  disabled?: boolean;
}

const Checkbox = ({ name, options, selectedValues, onChange, disabled }: CheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value, event.target.checked);
  };

  return (
    <div>
      {options.map((option) => (
        <label key={option}>
          <input
            type="checkbox"
            name={name}
            value={option}
            checked={selectedValues.includes(option)}
            onChange={handleChange}
            disabled={disabled}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default Checkbox;
