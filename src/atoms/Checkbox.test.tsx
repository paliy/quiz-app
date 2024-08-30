import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from './Checkbox';

const OPTIONS = ['Option 1', 'Option 2', 'Option 3'];
const SELECTED_VALUES = ['Option 1'];

describe('Checkbox Component', () => {
  test('renders all checkbox options', () => {
    render(
      <Checkbox
        name="test-checkbox"
        options={OPTIONS}
        selectedValues={[]}
        onChange={() => { }}
      />
    );

    OPTIONS.forEach(option => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
  });

  test('checks checkboxes based on selectedValues', () => {
    render(
      <Checkbox
        name="test-checkbox"
        options={OPTIONS}
        selectedValues={SELECTED_VALUES}
        onChange={() => { }}
      />
    );

    OPTIONS.forEach(option => {
      const checkbox = screen.getByLabelText(option) as HTMLInputElement;
      expect(checkbox.checked).toBe(SELECTED_VALUES.includes(option));
    });
  });

  test('calls onChange handler with correct arguments when clicked', () => {
    const handleChange = jest.fn();
    render(
      <Checkbox
        name="test-checkbox"
        options={OPTIONS}
        selectedValues={[]}
        onChange={handleChange}
      />
    );

    OPTIONS.forEach(option => {
      const checkbox = screen.getByLabelText(option) as HTMLInputElement;
      fireEvent.click(checkbox);

      expect(handleChange).toHaveBeenCalledWith(option, true);
    });
  });

  test('disables checkboxes when disabled prop is true', () => {
    render(
      <Checkbox
        name="test-checkbox"
        options={OPTIONS}
        selectedValues={[]}
        onChange={() => { }}
        disabled
      />
    );

    OPTIONS.forEach(option => {
      const checkbox = screen.getByLabelText(option) as HTMLInputElement;
      expect(checkbox).toBeDisabled();
    });
  });

  test('enables checkboxes when disabled prop is false or not provided', () => {
    render(
      <Checkbox
        name="test-checkbox"
        options={OPTIONS}
        selectedValues={[]}
        onChange={() => { }}
        disabled={false}
      />
    );

    OPTIONS.forEach(option => {
      const checkbox = screen.getByLabelText(option) as HTMLInputElement;
      expect(checkbox).not.toBeDisabled();
    });
  });
});
