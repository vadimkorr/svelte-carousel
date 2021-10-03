import { getValueInRange } from './math'

export function getIndexesOfParticlesWithoutClonesInPage({
  pageIndex,
  particlesToShow,
  particlesToScroll,
  particlesCount,
}) {
  const overlap = pageIndex === 0 ? 0 : particlesToShow - particlesToScroll
  const from = pageIndex * particlesToShow - pageIndex * overlap
  const to = from + Math.max(particlesToShow, particlesToScroll) - 1
  const indexes = []
  for (let i=from; i<=Math.min(particlesCount - 1, to); i++) {
    indexes.push(i)
  }
  return indexes
}

export function getAdjacentIndexes({
  infinite,
  pageIndex,
  pagesCount,
  particlesCount,
  particlesToShow,
  particlesToScroll,
}) {
  const _pageIndex = getValueInRange(0, pageIndex, pagesCount - 1)

  let rangeStart = _pageIndex - 1
  let rangeEnd = _pageIndex + 1

  rangeStart = infinite
    ? rangeStart < 0 ? pagesCount - 1 : rangeStart
    : Math.max(0, rangeStart)

  rangeEnd = infinite
    ? rangeEnd > pagesCount - 1 ? 0 : rangeEnd
    : Math.min(pagesCount - 1, rangeEnd)

  const pageIndexes = [...new Set([
    rangeStart,
    _pageIndex,
    rangeEnd,

    // because of these values outputs for infinite/non-infinites are the same
    0, // needed to clone first page particles
    pagesCount - 1, // needed to clone last page particles
  ])].sort((a, b) => a - b)
  const particleIndexes = pageIndexes.flatMap(
    pageIndex => getIndexesOfParticlesWithoutClonesInPage({
      pageIndex,
      particlesToShow,
      particlesToScroll,
      particlesCount,
    })
  )
  return {
    pageIndexes,
    particleIndexes: [...new Set(particleIndexes)].sort((a, b) => a - b),
  }
}
