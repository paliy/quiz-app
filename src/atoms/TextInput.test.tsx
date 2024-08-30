import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';

const VALUE = 'Test value';
const PLACEHOLDER = 'Enter text';

describe('TextInput Component', () => {
  test('renders the TextInput with the correct value and placeholder', () => {
    render(
      <TextInput
        value={VALUE}
        onChange={() => { }}
        placeholder={PLACEHOLDER}
      />
    );

    const inputElement = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe(VALUE);
  });

  test('calls onChange handler with the correct value when input changes', () => {
    const handleChange = jest.fn();
    render(
      <TextInput
        value={VALUE}
        onChange={handleChange}
        placeholder={PLACEHOLDER}
      />
    );

    const inputElement = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'New value' } });

    expect(handleChange).toHaveBeenCalledWith('New value');
  });

  test('disables the input when disabled prop is true', () => {
    render(
      <TextInput
        value={VALUE}
        onChange={() => { }}
        disabled
        placeholder={PLACEHOLDER}
      />
    );

    const inputElement = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    expect(inputElement).toBeDisabled();
  });

  test('enables the input when disabled prop is false or not provided', () => {
    render(
      <TextInput
        value={VALUE}
        onChange={() => { }}
        placeholder={PLACEHOLDER}
      />
    );

    const inputElement = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    expect(inputElement).not.toBeDisabled();
  });
});
