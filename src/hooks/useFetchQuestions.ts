import { QuizQuestion } from '../interfaces'
import { useQuery } from '@tanstack/react-query'

const fetchQuestions = async (): Promise<QuizQuestion[]> => {
  const response = await fetch('/questions.json')
  if (!response.ok) {
    throw new Error('Failed to fetch questions')
  }
  const data = await response.json()
  return data.results
}

export const useFetchQuestions = () => {
  return useQuery<QuizQuestion[]>({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
  })
}
