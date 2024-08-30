import { QuizAnswers, QuizQuestion } from '../interfaces';
import Button from '../atoms/Button';
import Confetti from 'react-confetti';

interface SummaryProps {
  questions: QuizQuestion[];
  answers: QuizAnswers;
  onRestart: () => void;
}

const Summary = ({ questions, answers, onRestart }: SummaryProps) => {
  const correctAnswers = questions.filter((q) => {
    if (q.type === 'multiple') {
      return (answers[q.question] as string[]).includes(q.correct_answer);
    }
    return answers[q.question] === q.correct_answer;
  }).length;

  const totalQuestions = questions.length;
  const wrongAnswers = totalQuestions - correctAnswers;
  const percentage = totalQuestions ? (correctAnswers / totalQuestions) * 100 : 0;
  const showConfetti = correctAnswers >= 2;

  return (
    <div className="summary">
      {showConfetti && <Confetti />}
      <h2>Summary</h2>
      <p>Correct: {correctAnswers}</p>
      <p>Wrong: {wrongAnswers}</p>
      <p>Questions Answered: {totalQuestions}</p>
      <p>Final Score: {percentage.toFixed(2)}%</p>
      <Button onClick={onRestart}>Restart Quiz</Button>
    </div>
  );
};

export default Summary;
