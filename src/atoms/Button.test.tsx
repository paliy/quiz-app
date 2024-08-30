import { render, screen } from '@testing-library/react';
import Button from './Button';

const BUTTON_TEXT = 'Click me';

describe('Button Component', () => {
  test('renders the Button component', () => {
    render(<Button onClick={() => { }}>{BUTTON_TEXT}</Button>);
    const buttonElement = screen.getByText(BUTTON_TEXT);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>{BUTTON_TEXT}</Button>);
    const buttonElement = screen.getByText(BUTTON_TEXT);
    buttonElement.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});