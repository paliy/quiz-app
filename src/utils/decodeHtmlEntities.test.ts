import { decodeHtmlEntities } from './decodeHtmlEntities'

describe('decodeHtmlEntities', () => {
  test('should decode HTML entities', () => {
    expect(decodeHtmlEntities('&lt;div&gt;')).toBe('<div>')
    expect(decodeHtmlEntities('&amp;')).toBe('&')
    expect(decodeHtmlEntities('&quot;')).toBe('"')
    expect(decodeHtmlEntities('&#39;')).toBe("'")
    expect(decodeHtmlEntities('&eacute;')).toBe('é')
  })

  test('should handle empty strings', () => {
    expect(decodeHtmlEntities('')).toBe('')
  })

  test('should return the same string if no entities are present', () => {
    expect(decodeHtmlEntities('plain text')).toBe('plain text')
  })
})
