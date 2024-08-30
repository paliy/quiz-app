import React from 'react';

interface RadioButtonProps {
  name: string;
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const RadioButton = ({ name, options, selectedValue, onChange, disabled }: RadioButtonProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={selectedValue === option}
            onChange={handleChange}
            disabled={disabled}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
