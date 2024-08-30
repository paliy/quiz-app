import { QuizQuestion } from './interfaces'

export const mockQuestions: QuizQuestion[] = [
  {
    question: 'Question 1',
    type: 'multiple',
    correct_answer: 'Option 1',
    incorrect_answers: ['Option 2', 'Option 3'],
    category: 'Science',
    difficulty: 'Easy',
  },
  {
    question: 'Question 2',
    type: 'boolean',
    correct_answer: 'True',
    incorrect_answers: [],
    category: 'Math',
    difficulty: 'Medium',
  },
]

export const mockQuestionSingle: QuizQuestion[] = [
  {
    question: 'Question 1',
    type: 'multiple',
    correct_answer: 'A',
    incorrect_answers: ['B', 'C'],
    category: 'Science',
    difficulty: 'Easy',
  },
]

export const mockEmptyQuestions: QuizQuestion[] = []

export const mockAnswers = {
  'Question 1': ['Option 1'],
  'Question 2': 'True',
}

export const mockAnswersIncorrect = {
  'Question 1': ['Option 1'],
  'Question 2': 'False',
}

export const mockBooleanQuestion: QuizQuestion = {
  question: 'Is this true?',
  type: 'boolean',
  correct_answer: 'True',
  incorrect_answers: [],
  category: 'Some category',
  difficulty: 'Easy',
}

export const mockTextQuestion: QuizQuestion = {
  question: 'Enter your answer:',
  type: 'text',
  correct_answer: '',
  incorrect_answers: [],
  category: 'Some category',
  difficulty: 'Easy',
}

export const mockLockedBooleanQuestion: QuizQuestion = {
  question: 'This is a locked question',
  type: 'boolean',
  correct_answer: 'True',
  incorrect_answers: [],
  category: 'Some category',
  difficulty: 'Easy',
}

export const mockUnsupportedQuestion: QuizQuestion = {
  question: 'Unsupported question type?',
  type: 'unsupported' as any,
  correct_answer: '',
  incorrect_answers: [],
  category: 'Some category',
  difficulty: 'Easy',
}
