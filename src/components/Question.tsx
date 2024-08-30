import { decodeHtmlEntities } from '../utils/decodeHtmlEntities';
import { QuizQuestion } from '../interfaces';
import { useState, useCallback, memo } from 'react';
import Checkbox from '../atoms/Checkbox';
import RadioButton from '../atoms/RadioButton';
import TextInput from '../atoms/TextInput';

interface QuestionProps {
  question: QuizQuestion;
  submitted: boolean;
  onAnswerChange: (question: string, answer: string | string[]) => void;
}

const Question = memo(({ question, submitted, onAnswerChange }: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>(
    question.type === 'multiple' ? [] : ''
  );

  const handleMultipleChange = useCallback((value: string, checked: boolean) => {
    const updatedAnswers = checked
      ? [...(selectedAnswer as string[]), value]
      : (selectedAnswer as string[]).filter(answer => answer !== value);
    setSelectedAnswer(updatedAnswers);
    onAnswerChange(question.question, updatedAnswers);
  }, [selectedAnswer, question.question, onAnswerChange]);

  const handleChange = useCallback((value: string | string[], checked?: boolean) => {
    if (question.type === 'multiple' && typeof value === 'string' && checked !== undefined) {
      handleMultipleChange(value, checked);
    } else {
      setSelectedAnswer(value);
      onAnswerChange(question.question, value);
    }
  }, [handleMultipleChange, question.question, question.type, onAnswerChange]);

  const renderQuestion = () => {
    const questionText = decodeHtmlEntities(question.question);

    switch (question.type) {
      case 'boolean':
        return (
          <div className="question-container">
            <h4>{questionText}</h4>
            <RadioButton
              name={question.question}
              options={['True', 'False']}
              selectedValue={selectedAnswer as string}
              onChange={value => handleChange(value)}
              disabled={submitted}
            />
          </div>
        );

      case 'multiple':
        const options = (question.incorrect_answers || []).concat(question.correct_answer)
          .map(decodeHtmlEntities);

        return (
          <div className="question-container">
            <h4>{questionText}</h4>
            <Checkbox
              name={question.question}
              options={options}
              selectedValues={selectedAnswer as string[]}
              onChange={(value, checked) => handleChange(value, checked)}
              disabled={submitted}
            />
          </div>
        );

      case 'text':
        return (
          <div className="question-container">
            <h4>{questionText}</h4>
            <TextInput
              value={selectedAnswer as string}
              onChange={value => handleChange(value)}
              disabled={submitted}
              placeholder="Your answer here"
            />
          </div>
        );

      default:
        return <p>Unsupported question type</p>;
    }
  };

  return (
    <div className="question">
      {renderQuestion()}
    </div>
  );
});

export default Question;
