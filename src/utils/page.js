export function getNextPageIndexLimited(currentPageIndex, pagesCount) {
  return Math.min(Math.max(currentPageIndex + 1, 0), pagesCount - 1)
}

export function getNextPageIndexInfinte(currentPageIndex, pagesCount) {
  const newCurrentPageIndex = Math.max(currentPageIndex, 0) + 1
  return newCurrentPageIndex > pagesCount - 1 ? 0 : Math.max(newCurrentPageIndex, 0)
}

export function getNextPageIndexFn(infinite) {
  return infinite ? getNextPageIndexInfinte : getNextPageIndexLimited
}

export function getPrevPageIndexLimited(currentPageIndex, pagesCount) {
  return Math.max(Math.min(currentPageIndex - 1, pagesCount - 1), 0)
}

export function getPrevPageIndexInfinte(currentPageIndex, pagesCount) {
  const newCurrentPageIndex = Math.min(currentPageIndex, pagesCount - 1) - 1
  return newCurrentPageIndex >= 0 ? Math.min(newCurrentPageIndex, pagesCount - 1) : pagesCount - 1
}

export function getPrevPageIndexFn(infinite) {
  return infinite ? getPrevPageIndexInfinte : getPrevPageIndexLimited
}

export function getPageIndex(pageIndex, pagesCount) {
  return pageIndex < 0 ? 0 : Math.min(pageIndex, pagesCount - 1)
}
