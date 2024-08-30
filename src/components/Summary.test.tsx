import { render, screen, fireEvent } from '@testing-library/react';
import Summary from './Summary';
import { mockQuestions, mockAnswers, mockAnswersIncorrect } from '../testConstants';

jest.mock('react-confetti', () => () => <div data-testid="confetti-mock" />);

describe('Summary Component', () => {
  const mockOnRestart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the summary with correct information', () => {
    render(
      <Summary
        questions={mockQuestions}
        answers={mockAnswers}
        onRestart={mockOnRestart}
      />
    );

    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText('Correct: 2')).toBeInTheDocument();
    expect(screen.getByText('Wrong: 0')).toBeInTheDocument();
    expect(screen.getByText('Questions Answered: 2')).toBeInTheDocument();
    expect(screen.getByText('Final Score: 100.00%')).toBeInTheDocument();
    expect(screen.getByText('Restart Quiz')).toBeInTheDocument();
  });

  test('displays confetti when the number of correct answers is 2 or more', () => {
    render(
      <Summary
        questions={mockQuestions}
        answers={mockAnswers}
        onRestart={mockOnRestart}
      />
    );

    expect(screen.getByTestId('confetti-mock')).toBeInTheDocument();
  });

  test('does not display confetti if the number of correct answers is less than 2', () => {
    render(
      <Summary
        questions={mockQuestions}
        answers={mockAnswersIncorrect}
        onRestart={mockOnRestart}
      />
    );

    expect(screen.queryByTestId('confetti-mock')).not.toBeInTheDocument();
  });

  test('calls onRestart when the restart button is clicked', () => {
    render(
      <Summary
        questions={mockQuestions}
        answers={mockAnswers}
        onRestart={mockOnRestart}
      />
    );

    fireEvent.click(screen.getByText('Restart Quiz'));

    expect(mockOnRestart).toHaveBeenCalledTimes(1);
  });
});
