import { getRandomQuestions } from './getRandomQuestions'

describe('getRandomQuestions', () => {
  const sampleItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  test('should return the correct number of items', () => {
    const result = getRandomQuestions(sampleItems, 3)
    expect(result.length).toBe(3)
  })

  test('should return a random subset of items', () => {
    const result = getRandomQuestions(sampleItems, 5)
    expect(result.length).toBe(5)
    expect(result.every((item) => sampleItems.includes(item))).toBe(true)
  })

  test('should return an empty array when count is 0', () => {
    const result = getRandomQuestions(sampleItems, 0)
    expect(result).toEqual([])
  })

  test('should return the original array if count is greater than or equal to the array length', () => {
    const result = getRandomQuestions(sampleItems, sampleItems.length)
    expect(result).toEqual(expect.arrayContaining(sampleItems))

    const resultMoreThanLength = getRandomQuestions(sampleItems, 15)
    expect(resultMoreThanLength).toEqual(expect.arrayContaining(sampleItems))
    expect(resultMoreThanLength.length).toBeGreaterThanOrEqual(sampleItems.length)
  })

  test('should handle an empty input array', () => {
    const result = getRandomQuestions([], 3)
    expect(result).toEqual([])
  })
})
