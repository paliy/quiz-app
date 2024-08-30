import { QuizQuestion } from '../interfaces'
import { getRandomQuestions } from '../utils/getRandomQuestions'
import { useState, useEffect, useCallback, useMemo } from 'react'

export const useQuizLogic = (questions: QuizQuestion[], initialCount: number) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([])

  useEffect(() => {
    if (questions?.length > 0) {
      setCurrentQuestions(getRandomQuestions(questions, initialCount))
      setCurrentQuestionIndex(0)
      setAnswers({})
      setSubmitted(false)
    }
  }, [questions, initialCount])

  const handleAnswerChange = useCallback(
    (question: string, answer: string | string[]) => {
      setAnswers((prev) => ({ ...prev, [question]: answer }))
    },
    []
  )

  const handleSubmit = useCallback(() => {
    if (currentQuestions?.length > 0) {
      const allAnswered = currentQuestions.every((q) => {
        if (q.type === 'multiple') {
          return (answers[q.question] as string[])?.length > 0
        }
        return (
          typeof answers[q.question] === 'string' && answers[q.question]?.length > 0
        )
      })

      if (allAnswered) {
        setSubmitted(true)
      }
    }
  }, [answers, currentQuestions])

  const handleRestart = useCallback(() => {
    setCurrentQuestions(getRandomQuestions(questions, initialCount))
    setCurrentQuestionIndex(0)
    setAnswers({})
    setSubmitted(false)
  }, [questions, initialCount])

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < currentQuestions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }, [currentQuestionIndex, currentQuestions])

  const currentQuestion = currentQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === currentQuestions?.length - 1

  const isQuestionAnswered = useCallback(() => {
    if (currentQuestion) {
      if (currentQuestion.type === 'multiple') {
        return (answers[currentQuestion.question] as string[])?.length > 0
      }
      return (
        typeof answers[currentQuestion.question] === 'string' &&
        answers[currentQuestion.question]?.length > 0
      )
    }
    return false
  }, [currentQuestion, answers])

  const isDisabled = !submitted && !isLastQuestion && isQuestionAnswered()
  const showSubmitButton = !submitted && isLastQuestion && isQuestionAnswered()
  const showRestartButton = submitted

  const result = useMemo(
    () => ({
      currentQuestionIndex,
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
      currentQuestions,
    }),
    [
      currentQuestionIndex,
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
      currentQuestions,
    ]
  )

  return result
}
