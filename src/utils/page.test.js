import {
  getNextParticleIndexLimited,
  getNextParticleIndexInfinte,
  getPrevParticleIndexLimited,
  getPrevParticleIndexInfinte,
  getAdjacentIndexes,
  getPartialPageSize,
} from './page.js'

describe('getNextParticleIndexLimited', () => {
  it('returns next page index as expected', () => {
    const testCases = [
      { currentParticleIndex: -5, particlesCount: 7, particlesToScroll: 2, expected: 0 },
      { currentParticleIndex: 0, particlesCount: 7, particlesToScroll: 2, expected: 2 },
      { currentParticleIndex: 2, particlesCount: 7, particlesToScroll: 2, expected: 4 },
      { currentParticleIndex: 7, particlesCount: 7, particlesToScroll: 2, expected: 4 },
    ]
    testCases.forEach(({
      currentParticleIndex,
      particlesCount,
      particlesToScroll,
      expected,
    }) => {
      expect(getNextParticleIndexLimited({
        currentParticleIndex,
        particlesCount,
        particlesToScroll,
      })).toBe(expected)
    })
  })
  it('throws error if particlesCount is less than 1', () => {
    const currentParticleIndex = 5
    const particlesCount = 0
    const particlesToScroll = 1
    expect(
      () => getNextParticleIndexLimited({
        currentParticleIndex,
        particlesCount,
        particlesToScroll,
      })
    ).toThrowError('particlesCount must be at least 1')
  })
})

describe('getNextParticleIndexInfinte', () => {
  it('returns next page index as expected', () => {
    const testCases = [
      { currentParticleIndex: -5, particlesCount: 7, particlesToScroll: 2, clonesCountTail: 3, expected: 2 },
      { currentParticleIndex: 0, particlesCount: 7, particlesToScroll: 2, clonesCountTail: 3, expected: 2 },
      { currentParticleIndex: 2, particlesCount: 7, particlesToScroll: 2, clonesCountTail: 3, expected: 4 },
      { currentParticleIndex: 7, particlesCount: 7, particlesToScroll: 2, clonesCountTail: 3, expected: 4 },
    ]
    testCases.forEach(({
      currentParticleIndex,
      particlesCount,
      particlesToScroll,
      clonesCountTail,
      expected,
    }) => {
      expect(getNextParticleIndexInfinte({
        currentParticleIndex,
        particlesCount,
        particlesToScroll,
        clonesCountTail,
      })).toBe(expected)
    })
  })
  it('throws error if particlesCount is less than 1', () => {
    const currentParticleIndex = 5
    const particlesCount = 0
    expect(
      () => getNextParticleIndexInfinte({
        currentParticleIndex,
        particlesCount,
      })
    ).toThrowError('particlesCount must be at least 1')
  })
})

describe('getPrevParticleIndexLimited', () => {
  it('returns prev page index as expected', () => {
    const testCases = [
      { currentParticleIndex: -5, particlesCount: 7, particlesToScroll: 2, expected: 0 },
      { currentParticleIndex: 0, particlesCount: 7, particlesToScroll: 2, expected: 0 },
      { currentParticleIndex: 2, particlesCount: 7, particlesToScroll: 2, expected: 0 },
      { currentParticleIndex: 4, particlesCount: 7, particlesToScroll: 2, expected: 2 },
      { currentParticleIndex: 10, particlesCount: 7, particlesToScroll: 2, expected: 6 },
    ]
    testCases.forEach(({
      currentParticleIndex,
      particlesCount,
      particlesToScroll,
      expected,
    }) => {
      expect(getPrevParticleIndexLimited({
        currentParticleIndex,
        particlesCount,
        particlesToScroll,
      })).toBe(expected)
    })
  })
  it('throws error if particlesCount is less than 1', () => {
    const currentParticleIndex = 5
    const particlesCount = 0
    expect(
      () => getPrevParticleIndexLimited({
        currentParticleIndex,
        particlesCount,
      })
    ).toThrowError('particlesCount must be at least 1')
  })
})

describe('getPrevParticleIndexInfinte', () => {
  it('returns prev page index as expected', () => {
    const testCases = [
      { currentParticleIndex: -5, particlesCount: 7, particlesToScroll: 2, expected: 0 },
      { currentParticleIndex: 2, particlesCount: 7, particlesToScroll: 2, expected: 0 },
      { currentParticleIndex: 2, particlesCount: 7, particlesToScroll: 2, expected: 0 },
      { currentParticleIndex: 10, particlesCount: 7, particlesToScroll: 2, expected: 4 },
    ]
    testCases.forEach(({
      currentParticleIndex,
      particlesCount,
      particlesToScroll,
      expected,
    }) => {
      expect(getPrevParticleIndexInfinte({
        currentParticleIndex,
        particlesCount,
        particlesToScroll,
      })).toBe(expected)
    })
  })
  it('throws error if particlesCount is less than 1', () => {
    const currentParticleIndex = 2
    const particlesCount = 7
    const particlesToScroll = 2

    expect(
      () => getPrevParticleIndexInfinte({
        currentParticleIndex,
        particlesCount,
        particlesToScroll,
      })
    ).toThrowError('particlesCount must be at least 1')
  })
})

describe('getPartialPageSize', () => {
  it('returns result as expected if particlesToShow <= particlesToScroll', () => {
    const testCases = [{
      pagesCountWithoutClones: 9,
      particlesToShow: 2,
      particlesToScroll: 3,
      expected: 0,
    }, {
      pagesCountWithoutClones: 15,
      particlesToShow: 4,
      particlesToScroll: 5,
      expected: 0,
    }, {
      pagesCountWithoutClones: 16,
      particlesToShow: 4,
      particlesToScroll: 5,
      expected: 1,
    }, {
      pagesCountWithoutClones: 17,
      particlesToShow: 4,
      particlesToScroll: 5,
      expected: 2,
    }, {
      pagesCountWithoutClones: 18,
      particlesToShow: 4,
      particlesToScroll: 5,
      expected: 3,
    }, {
      pagesCountWithoutClones: 8,
      particlesToShow: 2,
      particlesToScroll: 2,
      expected: 0,
    }]

    testCases.forEach(({
      pagesCountWithoutClones,
      particlesToShow,
      particlesToScroll,
      expected,
    }) => {
      expect(getPartialPageSize({
        pagesCountWithoutClones,
        particlesToShow,
        particlesToScroll,
      })).toBe(expected)
    })
  })

  it('returns result as expected if particlesToShow > particlesToScroll', () => {
    const testCases = [{
      pagesCountWithoutClones: 8,
      particlesToShow: 4,
      particlesToScroll: 2,
      expected: 2,
    }, {
      pagesCountWithoutClones: 7,
      particlesToShow: 4,
      particlesToScroll: 3,
      expected: 1,
    }, {
      pagesCountWithoutClones: 8,
      particlesToShow: 4,
      particlesToScroll: 3,
      expected: 2,
    }, {
      pagesCountWithoutClones: 8,
      particlesToShow: 2,
      particlesToScroll: 2,
      expected: 0,
    }, {
      pagesCountWithoutClones: 9,
      particlesToShow: 4,
      particlesToScroll: 3,
      expected: 3,
    }, {
      pagesCountWithoutClones: 8,
      particlesToShow: 3,
      particlesToScroll: 2,
      expected: 2,
    }, {
      pagesCountWithoutClones: 6,
      particlesToShow: 3,
      particlesToScroll: 1,
      expected: 2,
    }, {
      pagesCountWithoutClones: 7,
      particlesToShow: 3,
      particlesToScroll: 1,
      expected: 2,
    }]

    testCases.forEach(({
      pagesCountWithoutClones,
      particlesToShow,
      particlesToScroll,
      expected,
    }) => {
      expect(getPartialPageSize({
        pagesCountWithoutClones,
        particlesToShow,
        particlesToScroll,
      })).toBe(expected)
    })
  })
})
