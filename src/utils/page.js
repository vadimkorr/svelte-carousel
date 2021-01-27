export function getNextPageIndexLimited(currentPageIndex, pagesCount) {
  if (pagesCount < 1) throw new Error('pagesCount must be at least 1')
  return Math.min(Math.max(currentPageIndex + 1, 0), pagesCount - 1)
}

export function getNextPageIndexInfinte(currentPageIndex, pagesCount) {
  if (pagesCount < 1) throw new Error('pagesCount must be at least 1')
  const newCurrentPageIndex = Math.max(currentPageIndex, 0) + 1
  return newCurrentPageIndex > pagesCount - 1 ? 0 : Math.max(newCurrentPageIndex, 0)
}

export function getNextPageIndexFn(infinite) {
  return infinite ? getNextPageIndexInfinte : getNextPageIndexLimited
}

export function getPrevPageIndexLimited(currentPageIndex, pagesCount) {
  if (pagesCount < 1) throw new Error('pagesCount must be at least 1')
  return Math.max(Math.min(currentPageIndex - 1, pagesCount - 1), 0)
}

export function getPrevPageIndexInfinte(currentPageIndex, pagesCount) {
  if (pagesCount < 1) throw new Error('pagesCount must be at least 1')
  const newCurrentPageIndex = Math.min(currentPageIndex, pagesCount - 1) - 1
  return newCurrentPageIndex >= 0 ? Math.min(newCurrentPageIndex, pagesCount - 1) : pagesCount - 1
}

export function getPrevPageIndexFn(infinite) {
  return infinite ? getPrevPageIndexInfinte : getPrevPageIndexLimited
}

export function getPageIndex(pageIndex, pagesCount) {
  if (pagesCount < 1) throw new Error('pagesCount must be at least 1')
  return pageIndex < 0 ? 0 : Math.min(pageIndex, pagesCount - 1)
}

export function getAdjacentIndexes(pageIndex, pagesCount, infinite) {
  if (pagesCount < 1) throw new Error('pagesCount must be at least 1')
  const _pageIndex = Math.max(0, Math.min(pageIndex, pagesCount - 1))
  let rangeStart = _pageIndex - 1;
  let rangeEnd = _pageIndex + 1;
  rangeStart = rangeStart < 0
    ? infinite
      ? pagesCount - 1
      : 0
    : rangeStart 
  rangeEnd = rangeEnd > pagesCount - 1
    ? infinite
        ? 0
        : pagesCount - 1
    : rangeEnd
  return [...new Set([rangeStart, rangeEnd, _pageIndex])].sort((a, b) => a - b)
}
