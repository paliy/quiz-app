import { calculateTotalScore } from './calculateTotalScore'
import {
  mockQuestions,
  mockAnswers,
  mockEmptyQuestions,
  mockBooleanQuestion,
  mockTextQuestion,
  mockUnsupportedQuestion,
} from '../testConstants'

describe('calculateTotalScore', () => {
  it('should correctly calculate the score for all correct answers', () => {
    expect(calculateTotalScore(mockQuestions, mockAnswers)).toBe(2)
  })

  it('should correctly handle partially correct multiple-choice answers', () => {
    const modifiedAnswers = {
      ...mockAnswers,
      'Question 1': ['Option 1', 'Option 2'],
    }

    expect(calculateTotalScore(mockQuestions, modifiedAnswers)).toBe(1.5)
  })

  it('should return 0 for all incorrect answers', () => {
    const incorrectAnswers = {
      'Question 1': ['Option 2', 'Option 3'],
      'Question 2': 'False',
    }
    expect(calculateTotalScore(mockQuestions, incorrectAnswers)).toBe(0)
  })

  it('should handle empty questions gracefully', () => {
    expect(calculateTotalScore(mockEmptyQuestions, mockAnswers)).toBe(0)
  })

  it('should handle boolean questions correctly', () => {
    const answers = {
      'Is this true?': 'True',
    }
    expect(calculateTotalScore([mockBooleanQuestion], answers)).toBe(1)
  })

  it('should handle text questions correctly', () => {
    const answers = {
      'Enter your answer:': 'Some answer',
    }
    expect(calculateTotalScore([mockTextQuestion], answers)).toBe(0)
  })

  it('should handle unsupported question types gracefully', () => {
    expect(calculateTotalScore([mockUnsupportedQuestion], {})).toBe(0)
  })
})
