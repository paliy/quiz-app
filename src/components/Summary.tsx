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
  const totalScore = useMemo(() => {
    return questions.reduce((acc, question) => {
      const userAnswer = answers[question.question];

      if (question.type === 'multiple') {
        const correctAnswers = Array.isArray(question.correct_answer)
          ? question.correct_answer
          : [question.correct_answer];
        const userAnswers = Array.isArray(userAnswer) ? userAnswer : [];

        const correctSelections = userAnswers.filter(answer => correctAnswers.includes(answer)).length;
        const hasIncorrectAnswer = userAnswers.some(answer => !correctAnswers.includes(answer));

        if (correctSelections === correctAnswers.length && !hasIncorrectAnswer) {
          return acc + 1;
        } else if (correctSelections > 0 && hasIncorrectAnswer) {
          return acc + 0.5;
        } else {
          return acc;
        }
      }

      return acc + (userAnswer === question.correct_answer ? 1 : 0);
    }, 0);
  }, [questions, answers]);

  const totalQuestions = questions.length;
  const percentage = useMemo(() => {
    return totalQuestions ? (totalScore / totalQuestions) * 100 : 0;
  }, [totalScore, totalQuestions]);

  const showConfetti = useMemo(() => totalScore >= 2, [totalScore]);

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
