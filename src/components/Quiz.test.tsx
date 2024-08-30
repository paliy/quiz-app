import { render, screen, fireEvent } from '@testing-library/react';
import Quiz from './Quiz';
import { mockQuestions, mockEmptyQuestions, mockQuestionSingle } from '../testConstants';
import { QuizQuestion } from '../interfaces';

jest.mock('./Question', () => {
  return ({ question, submitted, onAnswerChange }: { question: QuizQuestion, submitted: boolean, onAnswerChange: (question: string, answer: string) => void }) => (
    <div data-testid="mock-question">
      <h4>{question.question}</h4>
      <button onClick={() => onAnswerChange(question.question, 'mock-answer')}>
        Mock Interaction
      </button>
    </div>
  );
});

describe('Quiz Component', () => {
  const mockOnAnswerChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders a list of questions', () => {
    render(
      <Quiz
        questions={mockQuestions}
        submitted={false}
        onAnswerChange={mockOnAnswerChange}
      />
    );

    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Question 2')).toBeInTheDocument();
  });

  test('renders nothing when no questions are provided', () => {
    render(
      <Quiz
        questions={mockEmptyQuestions}
        submitted={false}
        onAnswerChange={mockOnAnswerChange}
      />
    );

    expect(screen.queryByText('Question 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Question 2')).not.toBeInTheDocument();
  });

  test('calls onAnswerChange when a question is interacted with', () => {
    render(
      <Quiz
        questions={mockQuestionSingle}
        submitted={false}
        onAnswerChange={mockOnAnswerChange}
      />
    );

    const mockButton = screen.getByText('Mock Interaction');
    fireEvent.click(mockButton);

    expect(mockOnAnswerChange).toHaveBeenCalledWith('Question 1', 'mock-answer');
  });
});
