export interface QuizQuestion {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string | string[]
  incorrect_answers?: string[]
}

export interface QuizAnswers {
  [key: string]: string | string[]
}
