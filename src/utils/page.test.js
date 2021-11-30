import {
  getPartialPageSize,
  _getCurrentPageIndexByCurrentParticleIndexInfinite,
  _getCurrentPageIndexByCurrentParticleIndexLimited,
  _getPagesCountByParticlesCountInfinite,
  _getPagesCountByParticlesCountLimited,
  _getParticleIndexByPageIndexInfinite,
  _getParticleIndexByPageIndexLimited,
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
    }, {
      particlesCountWithoutClones: 5,
      particlesToShow: 2,
      particlesToScroll: 3,
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

describe('_getCurrentPageIndexByCurrentParticleIndexInfinite', () => {
  it('returns result as expected if particlesCount: 13; clonesCountHead: 2; clonesCountTotal: 5; particlesToScroll: 2 (particlesToShow: 3)', () => {
    const testCases = [{
      particlesCount: 13,
      clonesCountHead: 2,
      clonesCountTotal: 5,
      particlesToScroll: 2,
      currentParticleIndex: 0,
      expected: 3,
    }, {
      particlesCount: 13,
      clonesCountHead: 2,
      clonesCountTotal: 5,
      particlesToScroll: 2,
      currentParticleIndex: 2,
      expected: 0,
    }, {
      particlesCount: 13,
      clonesCountHead: 2,
      clonesCountTotal: 5,
      particlesToScroll: 2,
      currentParticleIndex: 4,
      expected: 1,
    }, {
      particlesCount: 13,
      clonesCountHead: 2,
      clonesCountTotal: 5,
      particlesToScroll: 2,
      currentParticleIndex: 8,
      expected: 3,
    }, {
      particlesCount: 13,
      clonesCountHead: 2,
      clonesCountTotal: 5,
      particlesToScroll: 2,
      currentParticleIndex: 10,
      expected: 4,
    }]

    testCases.forEach(({
      currentParticleIndex,
      particlesCount,
      clonesCountHead,
      clonesCountTotal,
      particlesToScroll,
      expected,
    }) => {
      expect(_getCurrentPageIndexByCurrentParticleIndexInfinite({
        currentParticleIndex,
        particlesCount,
        clonesCountHead,
        clonesCountTotal,
        particlesToScroll,
      })).toBe(expected)
    })
  })

  it('returns result as expected if particlesCount: 10; clonesCountHead: 1; clonesCountTotal: 3; particlesToScroll: 2 (particlesToShow: 2)', () => {
    const testCases = [{
      particlesCount: 10,
      clonesCountHead: 1,
      clonesCountTotal: 3,
      particlesToScroll: 2,
      currentParticleIndex: 0,
      expected: 3,
    }, {
      particlesCount: 10,
      clonesCountHead: 1,
      clonesCountTotal: 3,
      particlesToScroll: 2,
      currentParticleIndex: 1,
      expected: 0,
    }, {
      particlesCount: 10,
      clonesCountHead: 1,
      clonesCountTotal: 3,
      particlesToScroll: 2,
      currentParticleIndex: 3,
      expected: 1,
    }, {
      particlesCount: 10,
      clonesCountHead: 1,
      clonesCountTotal: 3,
      particlesToScroll: 2,
      currentParticleIndex: 5,
      expected: 2,
    }, {
      particlesCount: 10,
      clonesCountHead: 1,
      clonesCountTotal: 3,
      particlesToScroll: 2,
      currentParticleIndex: 7,
      expected: 3,
    }, {
      particlesCount: 10,
      clonesCountHead: 1,
      clonesCountTotal: 3,
      particlesToScroll: 2,
      currentParticleIndex: 9,
      expected: 0,
    }]

    testCases.forEach(({
      currentParticleIndex,
      particlesCount,
      clonesCountHead,
      clonesCountTotal,
      particlesToScroll,
      expected,
    }) => {
      expect(_getCurrentPageIndexByCurrentParticleIndexInfinite({
        currentParticleIndex,
        particlesCount,
        clonesCountHead,
        clonesCountTotal,
        particlesToScroll,
      })).toBe(expected)
    })
  })

  it('returns result as expected if particlesCount: 10; clonesCountHead: 1; clonesCountTotal: 3; particlesToScroll: 3 (particlesToShow: 2)', () => {
    const testCases = [{
      particlesCount: 10,
      clonesCountHead: 1,
      clonesCountTotal: 3,
      particlesToScroll: 3,
      currentParticleIndex: 0,
      expected: 2,
    }, {
      particlesCount: 10,
      clonesCountHead: 1,
      clonesCountTotal: 3,
      particlesToScroll: 3,
      currentParticleIndex: 1,
      expected: 0,
    }, {
      particlesCount: 10,
      clonesCountHead: 1,
      clonesCountTotal: 3,
      particlesToScroll: 3,
      currentParticleIndex: 4,
      expected: 1,
    }, {
      particlesCount: 10,
      clonesCountHead: 1,
      clonesCountTotal: 3,
      particlesToScroll: 3,
      currentParticleIndex: 7,
      expected: 2,
    }, {
      particlesCount: 10,
      clonesCountHead: 1,
      clonesCountTotal: 3,
      particlesToScroll: 3,
      currentParticleIndex: 9,
      expected: 0,
    }]

    testCases.forEach(({
      currentParticleIndex,
      particlesCount,
      clonesCountHead,
      clonesCountTotal,
      particlesToScroll,
      expected,
    }) => {
      expect(_getCurrentPageIndexByCurrentParticleIndexInfinite({
        currentParticleIndex,
        particlesCount,
        clonesCountHead,
        clonesCountTotal,
        particlesToScroll,
      })).toBe(expected)
    })
  })
})

describe('_getCurrentPageIndexByCurrentParticleIndexLimited particlesCount: 5', () => {
  it('returns result as expected if particlesToScroll: 2 (particlesToShow: 2)', () => {
    const testCases = [{
      currentParticleIndex: 0,
      particlesToScroll: 2,
      expected: 0,
    }, {
      currentParticleIndex: 2,
      particlesToScroll: 2,
      expected: 1,
    }, {
      currentParticleIndex: 4,
      particlesToScroll: 2,
      expected: 2,
    }]

    testCases.forEach(({
      currentParticleIndex,
      particlesToScroll,
      expected,
    }) => {
      expect(_getCurrentPageIndexByCurrentParticleIndexLimited({
        currentParticleIndex,
        particlesToScroll,
      })).toBe(expected)
    })
  })

  it('returns result as expected if particlesToScroll: 2 (particlesToShow: 3)', () => {
    const testCases = [{
      currentParticleIndex: 0,
      particlesToScroll: 2,
      expected: 0,
    }, {
      currentParticleIndex: 2,
      particlesToScroll: 2,
      expected: 1,
    }]

    testCases.forEach(({
      currentParticleIndex,
      particlesToScroll,
      expected,
    }) => {
      expect(_getCurrentPageIndexByCurrentParticleIndexLimited({
        currentParticleIndex,
        particlesToScroll,
      })).toBe(expected)
    })
  })

  it('returns result as expected if particlesToScroll: 3 (particlesToShow: 2)', () => {
    const testCases = [{
      currentParticleIndex: 0,
      particlesToScroll: 3,
      expected: 0,
    }, {
      currentParticleIndex: 3,
      particlesToScroll: 3,
      expected: 1,
    }]

    testCases.forEach(({
      currentParticleIndex,
      particlesToScroll,
      expected,
    }) => {
      expect(_getCurrentPageIndexByCurrentParticleIndexLimited({
        currentParticleIndex,
        particlesToScroll,
      })).toBe(expected)
    })
  })
})

describe('_getPagesCountByParticlesCountInfinite', () => {
  it('returns result as expected if particlesCountWithoutClones: 5; particlesToScroll: 2 (particlesToShow: 3, particlesCount: 8)', () => {
    const testCases = [{
      particlesCountWithoutClones: 5,
      particlesToScroll: 2,
      expected: 3,
    }]

    testCases.forEach(({
      particlesCountWithoutClones,
      particlesToScroll,
      expected,
    }) => {
      expect(_getPagesCountByParticlesCountInfinite({
        particlesCountWithoutClones,
        particlesToScroll,
      })).toBe(expected)
    })
  })

  it('returns result as expected if particlesCountWithoutClones: 6; particlesToScroll: 2 (particlesToShow: 2, particlesCount: 10)', () => {
    const testCases = [{
      particlesCountWithoutClones: 6,
      particlesToScroll: 2,
      expected: 3,
    }]

    testCases.forEach(({
      particlesCountWithoutClones,
      particlesToScroll,
      expected,
    }) => {
      expect(_getPagesCountByParticlesCountInfinite({
        particlesCountWithoutClones,
        particlesToScroll,
      })).toBe(expected)
    })
  })

  it('returns result as expected if particlesCountWithoutClones: 5; particlesToScroll: 3 (particlesToShow: 2, particlesCount: 9)', () => {
    const testCases = [{
      particlesCountWithoutClones: 5,
      particlesToScroll: 3,
      expected: 2,
    }]

    testCases.forEach(({
      particlesCountWithoutClones,
      particlesToScroll,
      expected,
    }) => {
      expect(_getPagesCountByParticlesCountInfinite({
        particlesCountWithoutClones,
        particlesToScroll,
      })).toBe(expected)
    })
  })
})

describe('_getPagesCountByParticlesCountLimited', () => {
  it('returns result as expected if particlesCountWithoutClones: 5; particlesToScroll: 2 (particlesToShow: 3)', () => {
    const testCases = [{
      particlesCountWithoutClones: 5,
      particlesToScroll: 2,
      particlesToShow: 3,
      expected: 2,
    }]

    testCases.forEach(({
      particlesCountWithoutClones,
      particlesToScroll,
      particlesToShow,
      expected,
    }) => {
      expect(_getPagesCountByParticlesCountLimited({
        particlesCountWithoutClones,
        particlesToScroll,
        particlesToShow,
      })).toBe(expected)
    })
  })

  it('returns result as expected if particlesCountWithoutClones: 9; particlesToScroll: 2 (particlesToShow: 3)', () => {
    const testCases = [{
      particlesCountWithoutClones: 9,
      particlesToScroll: 2,
      particlesToShow: 3,
      expected: 4,
    }]

    testCases.forEach(({
      particlesCountWithoutClones,
      particlesToScroll,
      particlesToShow,
      expected,
    }) => {
      expect(_getPagesCountByParticlesCountLimited({
        particlesCountWithoutClones,
        particlesToScroll,
        particlesToShow,
      })).toBe(expected)
    })
  })

  it('returns result as expected if particlesCountWithoutClones: 6; particlesToScroll: 2 (particlesToShow: 2)', () => {
    const testCases = [{
      particlesCountWithoutClones: 6,
      particlesToScroll: 2,
      particlesToShow: 2,
      expected: 3,
    }]

    testCases.forEach(({
      particlesCountWithoutClones,
      particlesToScroll,
      particlesToShow,
      expected,
    }) => {
      expect(_getPagesCountByParticlesCountLimited({
        particlesCountWithoutClones,
        particlesToScroll,
        particlesToShow,
      })).toBe(expected)
    })
  })

  it('returns result as expected if particlesCountWithoutClones: 5; particlesToScroll: 3 (particlesToShow: 2)', () => {
    const testCases = [{
      particlesCountWithoutClones: 5,
      particlesToScroll: 3,
      particlesToShow: 2,
      expected: 2,
    }]

    testCases.forEach(({
      particlesCountWithoutClones,
      particlesToScroll,
      particlesToShow,
      expected,
    }) => {
      expect(_getPagesCountByParticlesCountLimited({
        particlesCountWithoutClones,
        particlesToScroll,
        particlesToShow,
      })).toBe(expected)
    })
  })
})

describe('_getParticleIndexByPageIndexInfinite', () => {
  it('returns result as expected if particlesCount: 11; clonesCountHead: 2; clonesCountTail: 3; particlesToScroll: 2 (particlesToShow: 3)', () => {
    const testCases = [{
      pageIndex: 0,
      clonesCountHead: 1,
      clonesCountTail: 3,
      particlesToScroll: 2,
      particlesCount: 11,
      expected: 1,
    }, {
      pageIndex: 1,
      clonesCountHead: 1,
      clonesCountTail: 3,
      particlesToScroll: 2,
      particlesCount: 11,
      expected: 3,
    }, {
      pageIndex: 2,
      clonesCountHead: 1,
      clonesCountTail: 3,
      particlesToScroll: 2,
      particlesCount: 11,
      expected: 5,
    }, {
      pageIndex: 3,
      clonesCountHead: 1,
      clonesCountTail: 3,
      particlesToScroll: 2,
      particlesCount: 11,
      expected: 7,
    }]

    testCases.forEach(({
      pageIndex,
      clonesCountHead,
      clonesCountTail,
      particlesToScroll,
      particlesCount,
      expected,
    }) => {
      expect(_getParticleIndexByPageIndexInfinite({
        pageIndex,
        clonesCountHead,
        clonesCountTail,
        particlesToScroll,
        particlesCount,
      })).toBe(expected)
    })
  })

  it('returns result as expected if particlesCount: 10; clonesCountHead: 1; clonesCountTail: 2; particlesToScroll: 2 (particlesToShow: 2)', () => {
    const testCases = [{
      pageIndex: 0,
      clonesCountHead: 1,
      clonesCountTail: 2,
      particlesToScroll: 2,
      particlesCount: 10,
      expected: 1,
    }, {
      pageIndex: 1,
      clonesCountHead: 1,
      clonesCountTail: 2,
      particlesToScroll: 2,
      particlesCount: 10,
      expected: 3,
    }, {
      pageIndex: 2,
      clonesCountHead: 1,
      clonesCountTail: 2,
      particlesToScroll: 2,
      particlesCount: 10,
      expected: 5,
    }, {
      pageIndex: 3,
      clonesCountHead: 1,
      clonesCountTail: 2,
      particlesToScroll: 2,
      particlesCount: 10,
      expected: 7,
    }]

    testCases.forEach(({
      pageIndex,
      clonesCountHead,
      clonesCountTail,
      particlesToScroll,
      particlesCount,
      expected,
    }) => {
      expect(_getParticleIndexByPageIndexInfinite({
        pageIndex,
        clonesCountHead,
        clonesCountTail,
        particlesToScroll,
        particlesCount,
      })).toBe(expected)
    })
  })

  it('returns result as expected if particlesCount: 10; clonesCountHead: 1; clonesCountTail: 2; particlesToScroll: 3 (particlesToShow: 2)', () => {
    const testCases = [{
      pageIndex: 0,
      clonesCountHead: 1,
      clonesCountTail: 2,
      particlesToScroll: 3,
      particlesCount: 10,
      expected: 1,
    }, {
      pageIndex: 1,
      clonesCountHead: 1,
      clonesCountTail: 2,
      particlesToScroll: 3,
      particlesCount: 10,
      expected: 4,
    }, {
      pageIndex: 2,
      clonesCountHead: 1,
      clonesCountTail: 2,
      particlesToScroll: 3,
      particlesCount: 10,
      expected: 7,
    }]

    testCases.forEach(({
      pageIndex,
      clonesCountHead,
      clonesCountTail,
      particlesToScroll,
      particlesCount,
      expected,
    }) => {
      expect(_getParticleIndexByPageIndexInfinite({
        pageIndex,
        clonesCountHead,
        clonesCountTail,
        particlesToScroll,
        particlesCount,
      })).toBe(expected)
    })
  })
})

describe('_getParticleIndexByPageIndexLimited', () => {
  it('returns result as expected if particlesCount: 6; particlesToScroll: 2; particlesToShow: 3', () => {
    const testCases = [{
      pageIndex: 0,
      particlesToScroll: 2,
      particlesCount: 6,
      particlesToShow: 3,
      expected: 0,
    }, {
      pageIndex: 1,
      particlesToScroll: 2,
      particlesCount: 6,
      particlesToShow: 3,
      expected: 2,
    }, {
      pageIndex: 2,
      particlesToScroll: 2,
      particlesCount: 6,
      particlesToShow: 3,
      expected: 3,
    }]

    testCases.forEach(({
      pageIndex,
      particlesToScroll,
      particlesCount,
      particlesToShow,
      expected,
    }) => {
      expect(_getParticleIndexByPageIndexLimited({
        pageIndex,
        particlesToScroll,
        particlesCount,
        particlesToShow,
        particlesCount,
      })).toBe(expected)
    })
  })

  it('returns result as expected if particlesCount: 6; particlesToScroll: 2; particlesToShow: 2', () => {
    const testCases = [{
      pageIndex: 0,
      particlesToScroll: 2,
      particlesCount: 6,
      particlesToShow: 2,
      expected: 0,
    }, {
      pageIndex: 1,
      particlesToScroll: 2,
      particlesCount: 6,
      particlesToShow: 2,
      expected: 2,
    }, {
      pageIndex: 2,
      particlesToScroll: 2,
      particlesCount: 6,
      particlesToShow: 2,
      expected: 4,
    }]

    testCases.forEach(({
      pageIndex,
      particlesToScroll,
      particlesCount,
      particlesToShow,
      expected,
    }) => {
      expect(_getParticleIndexByPageIndexLimited({
        pageIndex,
        particlesToScroll,
        particlesCount,
        particlesToShow,
        particlesCount,
      })).toBe(expected)
    })
  })
  
  it('returns result as expected if particlesCount: 6; particlesToScroll: 3; particlesToShow: 2', () => {
    const testCases = [{
      pageIndex: 0,
      particlesToScroll: 3,
      particlesCount: 6,
      particlesToShow: 2,
      expected: 0,
    }, {
      pageIndex: 1,
      particlesToScroll: 3,
      particlesCount: 6,
      particlesToShow: 2,
      expected: 3,
    }, {
      pageIndex: 2,
      particlesToScroll: 3,
      particlesCount: 6,
      particlesToShow: 2,
      expected: 4,
    }]

    testCases.forEach(({
      pageIndex,
      particlesToScroll,
      particlesCount,
      particlesToShow,
      expected,
    }) => {
      expect(_getParticleIndexByPageIndexLimited({
        pageIndex,
        particlesToScroll,
        particlesCount,
        particlesToShow,
        particlesCount,
      })).toBe(expected)
    })
  })
})
