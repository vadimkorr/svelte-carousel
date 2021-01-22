export function getNextPageIndexLimited(currentPageIndex, pagesCount) {
  return Math.min(currentPageIndex + 1, pagesCount - 1)
}

export function getNextPageIndexInfinte(currentPageIndex, pagesCount) {
  const newCurrentPageIndex = currentPageIndex + 1
  return newCurrentPageIndex > pagesCount - 1 ? 0 : newCurrentPageIndex
}

export function getNextPageIndexFn(infinite) {
  return infinite ? getNextPageIndexInfinte : getNextPageIndexLimited
}

export function getPrevPageIndexLimited(currentPageIndex, pagesCount) {
  return Math.max(currentPageIndex - 1, 0)
}

export function getPrevPageIndexInfinte(currentPageIndex, pagesCount) {
  const newCurrentPageIndex = currentPageIndex - 1
  return newCurrentPageIndex >= 0 ? newCurrentPageIndex : pagesCount - 1
}

export function getPrevPageIndexFn(infinite) {
  return infinite ? getPrevPageIndexInfinte : getPrevPageIndexLimited
}
