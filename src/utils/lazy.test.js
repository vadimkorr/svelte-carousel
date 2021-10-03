import {
  getIndexesOfParticlesWithoutClonesInPage,
  getAdjacentIndexes,
} from './lazy.js'

describe('getIndexesOfParticlesWithoutClonesInPage', () => {
  it('returns correct range if particlesToShow < particlesToScroll', () => {
    const testCases = [
      { pageIndex: 0, particlesToShow: 3, particlesCount: 9, particlesToScroll: 4, expected: [0, 1, 2, 3] },
      { pageIndex: 1, particlesToShow: 3, particlesCount: 9, particlesToScroll: 4, expected: [4, 5, 6, 7] },
      { pageIndex: 2, particlesToShow: 3, particlesCount: 9, particlesToScroll: 4, expected: [8] },
    ]
    testCases.forEach(({
      pageIndex,
      particlesToShow,
      particlesToScroll,
      particlesCount,
      expected,
    }) => {
      expect(getIndexesOfParticlesWithoutClonesInPage({
        pageIndex,
        particlesToShow,
        particlesToScroll,
        particlesCount,
      })).toEqual(expected)
    })
  })

  it('returns correct range if particlesToShow > particlesToScroll', () => {
    const testCases = [
      { pageIndex: 0, particlesToShow: 4, particlesToScroll: 3, particlesCount: 8, expected: [0, 1, 2, 3] },
      { pageIndex: 1, particlesToShow: 4, particlesToScroll: 3, particlesCount: 8, expected: [3, 4, 5, 6] },
      { pageIndex: 2, particlesToShow: 4, particlesToScroll: 3, particlesCount: 8, expected: [6, 7] },
    ]
    testCases.forEach(({
      pageIndex,
      particlesToShow,
      particlesToScroll,
      particlesCount,
      expected,
    }) => {
      expect(getIndexesOfParticlesWithoutClonesInPage({
        pageIndex,
        particlesToShow,
        particlesToScroll,
        particlesCount,
      })).toEqual(expected)
    })
  })

  it('returns correct range if particlesToShow == particlesToScroll', () => {
    const testCases = [
      { pageIndex: 0, particlesToShow: 2, particlesToScroll: 2, particlesCount: 5, expected: [0, 1] },
      { pageIndex: 1, particlesToShow: 2, particlesToScroll: 2, particlesCount: 5, expected: [2, 3] },
      { pageIndex: 2, particlesToShow: 2, particlesToScroll: 2, particlesCount: 5, expected: [4] },
    ]
    testCases.forEach(({
      pageIndex,
      particlesToShow,
      particlesToScroll,
      particlesCount,
      expected,
    }) => {
      expect(getIndexesOfParticlesWithoutClonesInPage({
        pageIndex,
        particlesToShow,
        particlesToScroll,
        particlesCount,
      })).toEqual(expected)
    })
  })
})

describe('getAdjacentIndexes', () => {
  it('returns indexes as expected if it is infinite', () => {
    const testCases = [{
      pageIndex: 0,
      pagesCount: 2,
      particlesCount: 4,
      particlesToShow: 2,
      particlesToScroll: 2,
      expected: {
        pageIndexes: [0, 1],
        particleIndexes: [0, 1, 2, 3],
      },
    }, {
      pageIndex: -5,
      pagesCount: 5,
      particlesCount: 10,
      particlesToShow: 2,
      particlesToScroll: 2,
      expected: {
        pageIndexes: [0, 1, 4],
        particleIndexes: [0, 1, 2, 3, 8, 9],
      },
    }, {
      pageIndex: 0,
      pagesCount: 5,
      particlesCount: 10,
      particlesToShow: 2,
      particlesToScroll: 2,
      expected: {
        pageIndexes:  [0, 1, 4],
        particleIndexes: [0, 1, 2, 3, 8, 9],
      },
    }, {
      pageIndex: 2,
      pagesCount: 5,
      particlesCount: 10,
      particlesToShow: 2,
      particlesToScroll: 2,
      expected: {
        pageIndexes: [0, 1, 2, 3, 4],
        particleIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    }, {
      pageIndex: 4,
      pagesCount: 5,
      particlesCount: 10,
      particlesToShow: 2,
      particlesToScroll: 2,
      expected: {
        pageIndexes: [0, 3, 4],
        particleIndexes: [0, 1, 6, 7, 8, 9],
      },
    }, {
      pageIndex: 15,
      pagesCount: 5,
      particlesCount: 10,
      particlesToShow: 2,
      particlesToScroll: 2,
      expected: {
        pageIndexes: [0, 3, 4],
        particleIndexes: [0, 1, 6, 7, 8, 9],
      },
    }]
    testCases.forEach(({
      pageIndex,
      pagesCount,
      particlesCount,
      particlesToShow,
      particlesToScroll,
      expected,
    }) => {
      expect(getAdjacentIndexes({
        infinite: true,
        pageIndex,
        pagesCount,
        particlesCount,
        particlesToShow,
        particlesToScroll,
      })).toEqual(expected)
    })
  })

  it('returns indexes as expected if it is not infinite', () => {
    const testCases = [{
      pageIndex: 0,
      pagesCount: 2,
      particlesCount: 4,
      particlesToShow: 2,
      particlesToScroll: 2,
      expected: {
        pageIndexes: [0, 1],
        particleIndexes: [0, 1, 2, 3],
      },
    }, {
      pageIndex: -5,
      pagesCount: 5,
      particlesCount: 10,
      particlesToShow: 2,
      particlesToScroll: 2,
      expected: {
        pageIndexes: [0, 1, 4],
        particleIndexes: [0, 1, 2, 3, 8, 9],
      },
    }, {
      pageIndex: 0,
      pagesCount: 5,
      particlesCount: 10,
      particlesToShow: 2,
      particlesToScroll: 2,
      expected: {
        pageIndexes:  [0, 1, 4],
        particleIndexes: [0, 1, 2, 3, 8, 9],
      },
    }, {
      pageIndex: 2,
      pagesCount: 5,
      particlesCount: 10,
      particlesToShow: 2,
      particlesToScroll: 2,
      expected: {
        pageIndexes: [0, 1, 2, 3, 4],
        particleIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    }, {
      pageIndex: 4,
      pagesCount: 5,
      particlesCount: 10,
      particlesToShow: 2,
      particlesToScroll: 2,
      expected: {
        pageIndexes: [0, 3, 4],
        particleIndexes: [0, 1, 6, 7, 8, 9],
      },
    }, {
      pageIndex: 15,
      pagesCount: 5,
      particlesCount: 10,
      particlesToShow: 2,
      particlesToScroll: 2,
      expected: {
        pageIndexes: [0, 3, 4],
        particleIndexes: [0, 1, 6, 7, 8, 9],
      },
    }]
    testCases.forEach(({
      pageIndex,
      pagesCount,
      particlesCount,
      particlesToShow,
      particlesToScroll,
      expected,
    }) => {
      expect(getAdjacentIndexes({
        infinite: false,
        pageIndex,
        pagesCount,
        particlesCount,
        particlesToShow,
        particlesToScroll,
      })).toEqual(expected)
    })
  })
})
