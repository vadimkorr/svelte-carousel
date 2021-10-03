import {
  getDistance,
  getValueInRange,
} from './math.js'

describe('getDistance', () => {
  it('returns correct distance between 2 points laying in one horizontal line', () => {
    const p1 = { x: 0, y: 0 }
    const p2 = { x: 5, y: 0 }

    expect(getDistance(p1, p2)).toBe(5)
  })

  it('returns correct distance between 2 points', () => {
    const p1 = { x: 1, y: 1 }
    const p2 = { x: 5, y: 4 }

    expect(getDistance(p1, p2)).toBe(5)
  })
})

describe('getValueInRange', () => {
  it('returns value in range as expected', () => {
    const testCases = [
      { min: 0, value: -5, max: 3, expected: 0 },
      { min: 0, value: 0, max: 3, expected: 0 },
      { min: 0, value: 1, max: 3, expected: 1 },
      { min: 0, value: 2, max: 3, expected: 2 },
      { min: 0, value: 7, max: 3, expected: 3 },
    ]
    testCases.forEach(({
      min,
      value,
      max,
      expected,
    }) => {
      expect(getValueInRange(
        min,
        value,
        max,
      )).toBe(expected)
    })
  })
})

