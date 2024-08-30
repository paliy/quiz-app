import { useCallback, useMemo } from 'react';
import { useFetchQuestions } from './hooks/useFetchQuestions';
import { useQuizLogic } from './hooks/useQuizLogic';
import Button from './atoms/Button';
import Quiz from './components/Quiz';
import Summary from './components/Summary';
import './styles.css';

const App = () => {
  const { data: questions, error, isLoading } = useFetchQuestions();

  const {
    currentQuestion,
    handleAnswerChange,
    handleSubmit,
    handleRestart,
    handleNextQuestion,
    isDisabled,
    showSubmitButton,
    showRestartButton,
    submitted,
    answers,
    currentQuestions
  } = useQuizLogic(questions || [], 3);

  const handleButtonClick = useCallback(() => {
    if (showSubmitButton) {
      handleSubmit();
    } else {
      handleNextQuestion();
    }
  }, [showSubmitButton, handleSubmit, handleNextQuestion]);

  const buttonText = useMemo(() => showSubmitButton
    ? 'Submit All Answers'
    : 'Next Question',
    [showSubmitButton]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="app">
      <h1>Quiz</h1>
      {!submitted && currentQuestions.length > 0 && (
        <>
          <Quiz
            questions={[currentQuestion]}
            submitted={submitted}
            onAnswerChange={handleAnswerChange}
          />
          <Button
            onClick={handleButtonClick}
            disabled={!isDisabled && !showSubmitButton}
          >
            {buttonText}
          </Button>
        </>
      )}
      {showRestartButton && (
        <Summary
          questions={currentQuestions}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default App;
