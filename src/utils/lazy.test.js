import {
  getIndexesOfPagesWithoutClonesInScroll,
  getAdjacentIndexes,
} from './lazy.js'

describe('getIndexesOfPagesWithoutClonesInScroll', () => {
  it('returns correct range if pagesToShow < pagesToScroll', () => {
    const testCases = [
      { scrollIndex: 0, pagesToShow: 3, pagesCount: 9, pagesToScroll: 4, expected: [0, 1, 2, 3] },
      { scrollIndex: 1, pagesToShow: 3, pagesCount: 9, pagesToScroll: 4, expected: [4, 5, 6, 7] },
      { scrollIndex: 2, pagesToShow: 3, pagesCount: 9, pagesToScroll: 4, expected: [8] },
    ]
    testCases.forEach(({
      scrollIndex,
      pagesToShow,
      pagesToScroll,
      pagesCount,
      expected,
    }) => {
      expect(getIndexesOfPagesWithoutClonesInScroll({
        scrollIndex,
        pagesToShow,
        pagesToScroll,
        pagesCount,
      })).toEqual(expected)
    })
  })

  it('returns correct range if pagesToShow > pagesToScroll', () => {
    const testCases = [
      { scrollIndex: 0, pagesToShow: 4, pagesToScroll: 3, pagesCount: 8, expected: [0, 1, 2, 3] },
      { scrollIndex: 1, pagesToShow: 4, pagesToScroll: 3, pagesCount: 8, expected: [3, 4, 5, 6] },
      { scrollIndex: 2, pagesToShow: 4, pagesToScroll: 3, pagesCount: 8, expected: [6, 7] },
    ]
    testCases.forEach(({
      scrollIndex,
      pagesToShow,
      pagesToScroll,
      pagesCount,
      expected,
    }) => {
      expect(getIndexesOfPagesWithoutClonesInScroll({
        scrollIndex,
        pagesToShow,
        pagesToScroll,
        pagesCount,
      })).toEqual(expected)
    })
  })

  it('returns correct range if pagesToShow == pagesToScroll', () => {
    const testCases = [
      { scrollIndex: 0, pagesToShow: 2, pagesToScroll: 2, pagesCount: 5, expected: [0, 1] },
      { scrollIndex: 1, pagesToShow: 2, pagesToScroll: 2, pagesCount: 5, expected: [2, 3] },
      { scrollIndex: 2, pagesToShow: 2, pagesToScroll: 2, pagesCount: 5, expected: [4] },
    ]
    testCases.forEach(({
      scrollIndex,
      pagesToShow,
      pagesToScroll,
      pagesCount,
      expected,
    }) => {
      expect(getIndexesOfPagesWithoutClonesInScroll({
        scrollIndex,
        pagesToShow,
        pagesToScroll,
        pagesCount,
      })).toEqual(expected)
    })
  })
})

describe('getAdjacentIndexes', () => {
  it('returns indexes as expected if it is infinite', () => {
    const testCases = [
      {
        scrollIndex: 0,
        scrollsCount: 2,
        pagesCount: 4,
        pagesToShow: 2,
        pagesToScroll: 2,
        expected: {
          scrollIndexes: [0, 1],
          pageIndexes: [0, 1, 2, 3],
        },
      },
      {
        scrollIndex: -5,
        scrollsCount: 5,
        pagesCount: 10,
        pagesToShow: 2,
        pagesToScroll: 2,
        expected: {
          scrollIndexes: [0, 1, 4],
          pageIndexes: [0, 1, 2, 3, 8, 9],
        },
      },
      {
        scrollIndex: 0,
        scrollsCount: 5,
        pagesCount: 10,
        pagesToShow: 2,
        pagesToScroll: 2,
        expected: {
          scrollIndexes:  [0, 1, 4],
          pageIndexes: [0, 1, 2, 3, 8, 9],
        },
      },
      {
        scrollIndex: 2,
        scrollsCount: 5,
        pagesCount: 10,
        pagesToShow: 2,
        pagesToScroll: 2,
        expected: {
          scrollIndexes: [0, 1, 2, 3, 4],
          pageIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
      },
      {
        scrollIndex: 4,
        scrollsCount: 5,
        pagesCount: 10,
        pagesToShow: 2,
        pagesToScroll: 2,
        expected: {
          scrollIndexes: [0, 3, 4],
          pageIndexes: [0, 1, 6, 7, 8, 9],
        },
      },
      {
        scrollIndex: 15,
        scrollsCount: 5,
        pagesCount: 10,
        pagesToShow: 2,
        pagesToScroll: 2,
        expected: {
          scrollIndexes: [0, 3, 4],
          pageIndexes: [0, 1, 6, 7, 8, 9],
        },
      },
    ]
    testCases.forEach(({
      scrollIndex,
      scrollsCount,
      pagesCount,
      pagesToShow,
      pagesToScroll,
      expected,
    }) => {
      expect(getAdjacentIndexes({
        infinite: true,
        scrollIndex,
        scrollsCount,
        pagesCount,
        pagesToShow,
        pagesToScroll,
      })).toEqual(expected)
    })
  })

  it('returns indexes as expected if it is not infinite', () => {
    const testCases = [
      {
        scrollIndex: 0,
        scrollsCount: 2,
        pagesCount: 4,
        pagesToShow: 2,
        pagesToScroll: 2,
        expected: {
          scrollIndexes: [0, 1],
          pageIndexes: [0, 1, 2, 3],
        },
      },
      {
        scrollIndex: -5,
        scrollsCount: 5,
        pagesCount: 10,
        pagesToShow: 2,
        pagesToScroll: 2,
        expected: {
          scrollIndexes: [0, 1, 4],
          pageIndexes: [0, 1, 2, 3, 8, 9],
        },
      },
      {
        scrollIndex: 0,
        scrollsCount: 5,
        pagesCount: 10,
        pagesToShow: 2,
        pagesToScroll: 2,
        expected: {
          scrollIndexes:  [0, 1, 4],
          pageIndexes: [0, 1, 2, 3, 8, 9],
        },
      },
      {
        scrollIndex: 2,
        scrollsCount: 5,
        pagesCount: 10,
        pagesToShow: 2,
        pagesToScroll: 2,
        expected: {
          scrollIndexes: [0, 1, 2, 3, 4],
          pageIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
      },
      {
        scrollIndex: 4,
        scrollsCount: 5,
        pagesCount: 10,
        pagesToShow: 2,
        pagesToScroll: 2,
        expected: {
          scrollIndexes: [0, 3, 4],
          pageIndexes: [0, 1, 6, 7, 8, 9],
        },
      },
      {
        scrollIndex: 15,
        scrollsCount: 5,
        pagesCount: 10,
        pagesToShow: 2,
        pagesToScroll: 2,
        expected: {
          scrollIndexes: [0, 3, 4],
          pageIndexes: [0, 1, 6, 7, 8, 9],
        },
      },
    ]
    testCases.forEach(({
      scrollIndex,
      scrollsCount,
      pagesCount,
      pagesToShow,
      pagesToScroll,
      expected,
    }) => {
      expect(getAdjacentIndexes({
        infinite: false,
        scrollIndex,
        scrollsCount,
        pagesCount,
        pagesToShow,
        pagesToScroll,
      })).toEqual(expected)
    })
  })
})
