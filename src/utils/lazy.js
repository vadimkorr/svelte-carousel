import { getValueInRange } from './math'

export function getIndexesOfPagesWithoutClonesInScroll({
  scrollIndex,
  pagesToShow,
  pagesToScroll,
  pagesCount,
}) {
  const overlap = scrollIndex === 0 ? 0 : pagesToShow - pagesToScroll
  const from = scrollIndex * pagesToShow - scrollIndex * overlap
  const to = from + Math.max(pagesToShow, pagesToScroll) - 1
  const indexes = []
  for (let i=from; i<=Math.min(pagesCount - 1, to); i++) {
    indexes.push(i)
  }
  return indexes
}

export function getAdjacentIndexes({
  infinite,
  scrollIndex,
  scrollsCount,
  pagesCount,
  pagesToShow,
  pagesToScroll,
}) {
  const _scrollIndex = getValueInRange(0, scrollIndex, scrollsCount - 1)

  let rangeStart = _scrollIndex - 1
  let rangeEnd = _scrollIndex + 1

  rangeStart = infinite
    ? rangeStart < 0 ? scrollsCount - 1 : rangeStart
    : Math.max(0, rangeStart)

  rangeEnd = infinite
    ? rangeEnd > scrollsCount - 1 ? 0 : rangeEnd
    : Math.min(scrollsCount - 1, rangeEnd)

  const scrollIndexes = [...new Set([
    rangeStart,
    _scrollIndex,
    rangeEnd,

    // because of these values outputs for infinite/non-infinites are the same
    0, // needed to clone first scroll pages
    scrollsCount - 1, // needed to clone last scroll pages
  ])].sort((a, b) => a - b)
  const pageIndexes = scrollIndexes.flatMap(
    scrollIndex => getIndexesOfPagesWithoutClonesInScroll({
      scrollIndex,
      pagesToShow,
      pagesToScroll,
      pagesCount,
    })
  )
  return {
    scrollIndexes,
    pageIndexes: [...new Set(pageIndexes)].sort((a, b) => a - b),
  }
}
