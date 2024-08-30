import { QuizAnswers, QuizQuestion } from '../interfaces'

export const calculateTotalScore = (
  questions: QuizQuestion[],
  answers: QuizAnswers
): number => {
  return questions.reduce((acc, question) => {
    const userAnswer = answers[question.question]

    if (question.type === 'multiple') {
      const correctAnswers = Array.isArray(question.correct_answer)
        ? question.correct_answer
        : [question.correct_answer]
      const userAnswers = Array.isArray(userAnswer) ? userAnswer : []

      const correctSelections = userAnswers.filter((answer) =>
        correctAnswers.includes(answer)
      ).length
      const hasIncorrectAnswer = userAnswers.some(
        (answer) => !correctAnswers.includes(answer)
      )

      if (correctSelections === correctAnswers.length && !hasIncorrectAnswer) {
        return acc + 1
      } else if (correctSelections > 0 && hasIncorrectAnswer) {
        return acc + 0.5
      } else {
        return acc
      }
    }

    return acc + (userAnswer === question.correct_answer ? 1 : 0)
  }, 0)
}
