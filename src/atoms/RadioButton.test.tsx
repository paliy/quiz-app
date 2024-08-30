import { render, screen, fireEvent } from '@testing-library/react';
import RadioButton from './RadioButton';

const OPTIONS = ['Option 1', 'Option 2', 'Option 3'];
const SELECTED_VALUE = 'Option 1';

describe('RadioButton Component', () => {
  test('renders all radio button options', () => {
    render(
      <RadioButton
        name="test-radio"
        options={OPTIONS}
        selectedValue=""
        onChange={() => { }}
      />
    );

    OPTIONS.forEach(option => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
  });

  test('selects the correct radio button based on selectedValue', () => {
    render(
      <RadioButton
        name="test-radio"
        options={OPTIONS}
        selectedValue={SELECTED_VALUE}
        onChange={() => { }}
      />
    );

    OPTIONS.forEach(option => {
      const radio = screen.getByLabelText(option) as HTMLInputElement;
      expect(radio.checked).toBe(option === SELECTED_VALUE);
    });
  });

  test('calls onChange handler with correct value when selected', () => {
    const handleChange = jest.fn();
    render(
      <RadioButton
        name="test-radio"
        options={OPTIONS}
        selectedValue=""
        onChange={handleChange}
      />
    );

    OPTIONS.forEach(option => {
      const radio = screen.getByLabelText(option) as HTMLInputElement;
      fireEvent.click(radio);

      expect(handleChange).toHaveBeenCalledWith(option);
    });
  });

  test('disables radio buttons when disabled prop is true', () => {
    render(
      <RadioButton
        name="test-radio"
        options={OPTIONS}
        selectedValue=""
        onChange={() => { }}
        disabled
      />
    );

    OPTIONS.forEach(option => {
      const radio = screen.getByLabelText(option) as HTMLInputElement;
      expect(radio).toBeDisabled();
    });
  });

  test('enables radio buttons when disabled prop is false or not provided', () => {
    render(
      <RadioButton
        name="test-radio"
        options={OPTIONS}
        selectedValue=""
        onChange={() => { }}
        disabled={false}
      />
    );

    OPTIONS.forEach(option => {
      const radio = screen.getByLabelText(option) as HTMLInputElement;
      expect(radio).not.toBeDisabled();
    });
  });
});
