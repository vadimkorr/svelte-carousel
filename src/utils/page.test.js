import {
  getNextPageIndexLimited,
  getNextPageIndexInfinte,
  getPrevPageIndexLimited,
  getPrevPageIndexInfinte,
  getPageIndex,
  getAdjacentIndexes
} from './page.js'

describe('getNextPageIndexLimited', () => {
  it('returns next page index as expected', () => {
    const testCases = [
      { currentPageIndex: -5, pagesCount: 3, expected: 0 },
      { currentPageIndex: 0, pagesCount: 3, expected: 1 },
      { currentPageIndex: 1, pagesCount: 3, expected: 2 },
      { currentPageIndex: 2, pagesCount: 3, expected: 2 },
      { currentPageIndex: 7, pagesCount: 3, expected: 2 },
    ]
    testCases.forEach(({ currentPageIndex, pagesCount, expected }) => {
      expect(getNextPageIndexLimited(currentPageIndex, pagesCount)).toBe(expected)
    })
  })
  it('throws error if pagesCount is less than 1', () => {
    const currentPageIndex = 5
    const pagesCount = 0
    expect(
      () => getNextPageIndexLimited(currentPageIndex, pagesCount)
    ).toThrowError('pagesCount must be at least 1')
  })
})

describe('getNextPageIndexInfinte', () => {
  it('returns next page index as expected', () => {
    const testCases = [
      { currentPageIndex: -5, pagesCount: 3, expected: 1 },
      { currentPageIndex: 0, pagesCount: 3, expected: 1 },
      { currentPageIndex: 1, pagesCount: 3, expected: 2 },
      { currentPageIndex: 2, pagesCount: 3, expected: 0 },
      { currentPageIndex: 7, pagesCount: 3, expected: 0 },
    ]
    testCases.forEach(({ currentPageIndex, pagesCount, expected }) => {
      expect(getNextPageIndexInfinte(currentPageIndex, pagesCount)).toBe(expected)
    })
  })
  it('throws error if pagesCount is less than 1', () => {
    const currentPageIndex = 5
    const pagesCount = 0
    expect(
      () => getNextPageIndexInfinte(currentPageIndex, pagesCount)
    ).toThrowError('pagesCount must be at least 1')
  })
})

describe('getPrevPageIndexLimited', () => {
  it('returns prev page index as expected', () => {
    const testCases = [
      { currentPageIndex: -5, pagesCount: 3, expected: 0 },
      { currentPageIndex: 0, pagesCount: 3, expected: 0 },
      { currentPageIndex: 1, pagesCount: 3, expected: 0 },
      { currentPageIndex: 2, pagesCount: 3, expected: 1 },
      { currentPageIndex: 7, pagesCount: 3, expected: 2 },
    ]
    testCases.forEach(({ currentPageIndex, pagesCount, expected }) => {
      expect(getPrevPageIndexLimited(currentPageIndex, pagesCount)).toBe(expected)
    })
  })
  it('throws error if pagesCount is less than 1', () => {
    const currentPageIndex = 5
    const pagesCount = 0
    expect(
      () => getPrevPageIndexLimited(currentPageIndex, pagesCount)
    ).toThrowError('pagesCount must be at least 1')
  })
})

describe('getPrevPageIndexInfinte', () => {
  it('returns prev page index as expected', () => {
    const testCases = [
      { currentPageIndex: -5, pagesCount: 3, expected: 2 },
      { currentPageIndex: 0, pagesCount: 3, expected: 2 },
      { currentPageIndex: 1, pagesCount: 3, expected: 0 },
      { currentPageIndex: 2, pagesCount: 3, expected: 1 },
      { currentPageIndex: 7, pagesCount: 3, expected: 1 },
    ]
    testCases.forEach(({ currentPageIndex, pagesCount, expected }) => {
      expect(getPrevPageIndexInfinte(currentPageIndex, pagesCount)).toBe(expected)
    })
  })
  it('throws error if pagesCount is less than 1', () => {
    const currentPageIndex = 5
    const pagesCount = 0
    expect(
      () => getPrevPageIndexInfinte(currentPageIndex, pagesCount)
    ).toThrowError('pagesCount must be at least 1')
  })
})

describe('getPageIndex', () => {
  it('returns normalized page index as expected', () => {
    const testCases = [
      { pageIndex: -5, pagesCount: 3, expected: 0 },
      { pageIndex: 0, pagesCount: 3, expected: 0 },
      { pageIndex: 1, pagesCount: 3, expected: 1 },
      { pageIndex: 2, pagesCount: 3, expected: 2 },
      { pageIndex: 7, pagesCount: 3, expected: 2 },
    ]
    testCases.forEach(({ pageIndex, pagesCount, expected }) => {
      expect(getPageIndex(pageIndex, pagesCount)).toBe(expected)
    })
  })
  it('throws error if pagesCount is less than 1', () => {
    const pageIndex = 5
    const pagesCount = 0
    expect(
      () => getPageIndex(pageIndex, pagesCount)
    ).toThrowError('pagesCount must be at least 1')
  })
})

describe('getAdjacentIndexes', () => {
  it('returns indexes as expected if infinite', () => {
    const testCases = [
      { pageIndex: 0, pagesCount: 1, expected: [0] },
      { pageIndex: -5, pagesCount: 10, expected: [0, 1, 9] },
      { pageIndex: 0, pagesCount: 10, expected: [0, 1, 9] },
      { pageIndex: 5, pagesCount: 10, expected: [4, 5, 6] },
      { pageIndex: 9, pagesCount: 10, expected: [0, 8, 9] },
      { pageIndex: 15, pagesCount: 10, expected: [0, 8, 9] },
    ]
    testCases.forEach(({ pageIndex, pagesCount, expected }) => {
      expect(getAdjacentIndexes(pageIndex, pagesCount, true)).toEqual(expected)
    })
  })
  it('returns indexes as expected if not infinite', () => {
    const testCases = [
      { pageIndex: 0, pagesCount: 1, expected: [0] },
      { pageIndex: -5, pagesCount: 10, expected: [0, 1] },
      { pageIndex: 0, pagesCount: 10, expected: [0, 1] },
      { pageIndex: 5, pagesCount: 10, expected: [4, 5, 6] },
      { pageIndex: 9, pagesCount: 10, expected: [8, 9] },
      { pageIndex: 15, pagesCount: 10, expected: [8, 9] },
    ]
    testCases.forEach(({ pageIndex, pagesCount, expected }) => {
      expect(getAdjacentIndexes(pageIndex, pagesCount, false)).toEqual(expected)
    })
  })
  it('throws error if pagesCount is less than 1', () => {
    const pageIndex = 5
    const pagesCount = 0
    const infinite = true
    expect(
      () => getAdjacentIndexes(pageIndex, pagesCount, infinite)
    ).toThrowError('pagesCount must be at least 1')
  })
})
