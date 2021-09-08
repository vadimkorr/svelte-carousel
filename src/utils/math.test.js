import {
  getDistance,
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
