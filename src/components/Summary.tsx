import { calculateTotalScore } from '../utils/calculateTotalScore';
import { memo, useMemo } from 'react';
import { QuizAnswers, QuizQuestion } from '../interfaces';
import Button from '../atoms/Button';
import Confetti from 'react-confetti';

interface SummaryProps {
  questions: QuizQuestion[];
  answers: QuizAnswers;
  onRestart: () => void;
}

const Summary = memo(({ questions, answers, onRestart }: SummaryProps) => {
  const totalScore = useMemo(() => calculateTotalScore(questions, answers), [questions, answers]);

  const totalQuestions = questions.length;
  const percentage = useMemo(() => (totalQuestions ? (totalScore / totalQuestions) * 100 : 0), [totalScore, totalQuestions]);

  const showConfetti = totalScore >= 2;

  return (
    <div className="summary">
      {showConfetti && <Confetti />}
      <h2>Summary</h2>
      <p>Correct: {totalScore}</p>
      <p>Wrong: {totalQuestions - totalScore}</p>
      <p>Questions Answered: {totalQuestions}</p>
      <p>Final Score: {percentage.toFixed(2)}%</p>
      <Button onClick={onRestart}>Restart Quiz</Button>
    </div>
  );
});

export default Summary;
