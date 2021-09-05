import {
  getDistance,
  getPartialPageSize
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

describe('getPartialPageSize', () => {

  it('getPartialPageSize', () => {
    // ==== pagesToShow <= pagesToScroll
    // const r1 = getPartialPageSize({
    //   pagesCount: 15,
    //   pagesToShow: 4,
    //   pagesToScroll: 5,
    // })
    // expect(r1).toBe(0)

    // const r2 = getPartialPageSize({
    //   pagesCount: 16,
    //   pagesToShow: 4,
    //   pagesToScroll: 5,
    // })
    // expect(r2).toBe(1)

    // const r3 = getPartialPageSize({
    //   pagesCount: 17,
    //   pagesToShow: 4,
    //   pagesToScroll: 5,
    // })
    // expect(r3).toBe(2)

    // const r4 = getPartialPageSize({
    //   pagesCount: 18,
    //   pagesToShow: 4,
    //   pagesToScroll: 5,
    // })
    // expect(r4).toBe(3)

    // const r5 = getPartialPageSize({
    //   pagesCount: 8,
    //   pagesToShow: 2,
    //   pagesToScroll: 2,
    // })
    // expect(r5).toBe(0)

    // ====== pagesToScroll < pagesToShow

    // const r6 = getPartialPageSize({
    //   pagesCount: 8,
    //   pagesToShow: 4,
    //   pagesToScroll: 2,
    // })
    // expect(r6).toBe(2)

    // const r7 = getPartialPageSize({
    //   pagesCount: 7,
    //   pagesToShow: 4,
    //   pagesToScroll: 3,
    // })
    // expect(r7).toBe(1)

    // const r8 = getPartialPageSize({
    //   pagesCount: 8,
    //   pagesToShow: 4,
    //   pagesToScroll: 3,
    // })
    // expect(r8).toBe(2)

    // const r9 = getPartialPageSize({
    //   pagesCount: 8,
    //   pagesToShow: 2,
    //   pagesToScroll: 2,
    // })
    // expect(r9).toBe(0)

    // const r10 = getPartialPageSize({
    //   pagesCount: 9,
    //   pagesToShow: 4,
    //   pagesToScroll: 3,
    // })
    // expect(r10).toBe(3)

    // const r11 = getPartialPageSize({
    //   pagesCount: 8,
    //   pagesToShow: 3,
    //   pagesToScroll: 2,
    // })
    // expect(r11).toBe(2)

    
    const r12 = getPartialPageSize({
      pagesCount: 6,
      pagesToShow: 3,
      pagesToScroll: 1,
    })
    expect(r12).toBe(2)

    
    const r13 = getPartialPageSize({
      pagesCount: 7,
      pagesToShow: 3,
      pagesToScroll: 1,
    })
    expect(r13).toBe(2)



  })
})
