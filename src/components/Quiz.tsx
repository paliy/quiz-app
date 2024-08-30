import { memo } from 'react';
import { QuizQuestion } from '../interfaces';
import Question from './Question';

interface QuizProps {
  questions: QuizQuestion[];
  submitted: boolean;
  onAnswerChange: (question: string, answer: string | string[]) => void;
}

const Quiz = memo(({ questions, submitted, onAnswerChange }: QuizProps) => {
  return (
    <div>
      {questions.map((question) => (
        <Question
          key={question.question}
          question={question}
          submitted={submitted}
          onAnswerChange={onAnswerChange}
        />
      ))}
    </div>
  );
});

export default Quiz;
