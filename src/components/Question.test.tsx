import { render, screen, fireEvent } from '@testing-library/react';
import Question from './Question';
import {
  mockBooleanQuestion,
  mockTextQuestion,
  mockLockedBooleanQuestion,
  mockUnsupportedQuestion
} from '../testConstants';

jest.mock('../utils/decodeHtmlEntities', () => ({
  decodeHtmlEntities: jest.fn((text) => text),
}));

describe('Question Component', () => {
  const mockOnAnswerChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders boolean question and handles selection', () => {
    render(
      <Question
        question={mockBooleanQuestion}
        submitted={false}
        onAnswerChange={mockOnAnswerChange}
      />
    );

    expect(screen.getByText(mockBooleanQuestion.question)).toBeInTheDocument();

    const trueOption = screen.getByLabelText('True');
    fireEvent.click(trueOption);

    expect(mockOnAnswerChange).toHaveBeenCalledWith(mockBooleanQuestion.question, 'True');
  });

  test('renders text input question and handles input change', () => {
    render(
      <Question
        question={mockTextQuestion}
        submitted={false}
        onAnswerChange={mockOnAnswerChange}
      />
    );

    expect(screen.getByText(mockTextQuestion.question)).toBeInTheDocument();

    const textInput = screen.getByPlaceholderText('Your answer here') as HTMLInputElement;
    fireEvent.change(textInput, { target: { value: 'My answer' } });

    expect(mockOnAnswerChange).toHaveBeenCalledWith(mockTextQuestion.question, 'My answer');
  });

  test('does not allow interaction when submitted', () => {
    render(
      <Question
        question={mockLockedBooleanQuestion}
        submitted={true}
        onAnswerChange={mockOnAnswerChange}
      />
    );

    const trueOption = screen.getByLabelText('True');
    expect(trueOption).toBeDisabled();
  });

  test('handles unsupported question type', () => {
    render(
      <Question
        question={mockUnsupportedQuestion}
        submitted={false}
        onAnswerChange={mockOnAnswerChange}
      />
    );

    expect(screen.getByText('Unsupported question type')).toBeInTheDocument();
  });
});
