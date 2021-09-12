import {
  getPartialPageSize,
  // getCurrentPageIndex,
  // getPagesCountByParticlesCount,
  // getParticleIndexByPageIndexInfinite,
  // getParticleIndexByPageIndexLimited,
} from './page.js'

describe('getPartialPageSize', () => {
  it('returns result as expected if particlesToShow <= particlesToScroll', () => {
    const testCases = [{
      particlesCountWithoutClones: 9,
      particlesToShow: 2,
      particlesToScroll: 3,
      expected: 0,
    }, {
      particlesCountWithoutClones: 15,
      particlesToShow: 4,
      particlesToScroll: 5,
      expected: 0,
    }, {
      particlesCountWithoutClones: 16,
      particlesToShow: 4,
      particlesToScroll: 5,
      expected: 1,
    }, {
      particlesCountWithoutClones: 17,
      particlesToShow: 4,
      particlesToScroll: 5,
      expected: 2,
    }, {
      particlesCountWithoutClones: 18,
      particlesToShow: 4,
      particlesToScroll: 5,
      expected: 3,
    }, {
      particlesCountWithoutClones: 8,
      particlesToShow: 2,
      particlesToScroll: 2,
      expected: 0,
    }]

    testCases.forEach(({
      particlesCountWithoutClones,
      particlesToShow,
      particlesToScroll,
      expected,
    }) => {
      expect(getPartialPageSize({
        particlesCountWithoutClones,
        particlesToShow,
        particlesToScroll,
      })).toBe(expected)
    })
  })

  it('returns result as expected if particlesToShow > particlesToScroll', () => {
    const testCases = [{
      particlesCountWithoutClones: 8,
      particlesToShow: 4,
      particlesToScroll: 2,
      expected: 2,
    }, {
      particlesCountWithoutClones: 7,
      particlesToShow: 4,
      particlesToScroll: 3,
      expected: 1,
    }, {
      particlesCountWithoutClones: 8,
      particlesToShow: 4,
      particlesToScroll: 3,
      expected: 2,
    }, {
      particlesCountWithoutClones: 8,
      particlesToShow: 2,
      particlesToScroll: 2,
      expected: 0,
    }, {
      particlesCountWithoutClones: 9,
      particlesToShow: 4,
      particlesToScroll: 3,
      expected: 3,
    }, {
      particlesCountWithoutClones: 8,
      particlesToShow: 3,
      particlesToScroll: 2,
      expected: 2,
    }, {
      particlesCountWithoutClones: 6,
      particlesToShow: 3,
      particlesToScroll: 1,
      expected: 2,
    }, {
      particlesCountWithoutClones: 7,
      particlesToShow: 3,
      particlesToScroll: 1,
      expected: 2,
    }]

    testCases.forEach(({
      particlesCountWithoutClones,
      particlesToShow,
      particlesToScroll,
      expected,
    }) => {
      expect(getPartialPageSize({
        particlesCountWithoutClones,
        particlesToShow,
        particlesToScroll,
      })).toBe(expected)
    })
  })
})
