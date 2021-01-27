import {
  getNextPageIndexLimited,
  getNextPageIndexInfinte,
  getPrevPageIndexLimited,
  getPrevPageIndexInfinte
} from './page.js';

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
      expect(getNextPageIndexLimited(currentPageIndex, pagesCount)).toBe(expected);
    });
  });
});

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
      expect(getNextPageIndexInfinte(currentPageIndex, pagesCount)).toBe(expected);
    });
  });
});

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
      expect(getPrevPageIndexLimited(currentPageIndex, pagesCount)).toBe(expected);
    });
  });
});

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
      expect(getPrevPageIndexInfinte(currentPageIndex, pagesCount)).toBe(expected);
    });
  });
});
