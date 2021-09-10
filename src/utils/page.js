import {
  getValueInRange,
} from './math'

export function getNextPageIndexLimited({
  currentPageIndex,
  pagesCount,
  pagesToScroll,
}) {
  if (pagesCount < 1) throw new Error('pagesCount must be at least 1')
  return currentPageIndex + Math.min(pagesCount - (currentPageIndex + 1) - pagesToScroll, pagesToScroll)
}

export function getNextPageIndexInfinte({
  currentPageIndex,
  pagesCount,
  pagesToScroll,
  clonesCountTail,
}) {
  if (pagesCount < 1) throw new Error('pagesCount must be at least 1')
  const newCurrentPageIndex = Math.max(currentPageIndex, 0) + Math.min(pagesCount - clonesCountTail - currentPageIndex, pagesToScroll)
  return newCurrentPageIndex > pagesCount - 1 ? 0 : Math.max(newCurrentPageIndex, 0)
}

export function getNextPageIndexFn(infinite) {
  return infinite ? getNextPageIndexInfinte : getNextPageIndexLimited
}

export function getPrevPageIndexLimited({
  currentPageIndex,
  pagesCount,
  pagesToScroll,
}) {
  if (pagesCount < 1) throw new Error('pagesCount must be at least 1')
  return getValueInRange(
    0,
    currentPageIndex - Math.min(currentPageIndex, pagesToScroll),
    pagesCount - 1
  )
}

export function getPrevPageIndexInfinte({
  currentPageIndex,
  pagesCount,
  pagesToScroll,
}) {
  if (pagesCount < 1) throw new Error('pagesCount must be at least 1')
  const newCurrentPageIndex = Math.min(currentPageIndex, pagesCount - 1) - Math.min(currentPageIndex, pagesToScroll)
  return newCurrentPageIndex >= 0 ? Math.min(newCurrentPageIndex, pagesCount - 1) : pagesCount - 1
}

export function getPrevPageIndexFn(infinite) {
  return infinite ? getPrevPageIndexInfinte : getPrevPageIndexLimited
}

export function getPageIndex({
  pageIndex,
  pagesCount,
}) {
  if (pagesCount < 1) throw new Error('pagesCount must be at least 1')
  return pageIndex < 0 ? 0 : Math.min(pageIndex, pagesCount - 1)
}

export function getPageSizes({
  pageWindowElement,
  pagesContainerChildren,
  pagesToShow,
}) {
  const pagesWindowWidth = pageWindowElement.clientWidth
  const pageWidth = pagesWindowWidth / pagesToShow
  const pagesCount = pagesContainerChildren.length

  return {
    pagesWindowWidth,
    pageWidth,
    pagesCount,
  }
}

export function applyPageSizes({
  pagesContainerChildren,
  pageWidth,
}) {
  for (let pageIndex=0; pageIndex<pagesContainerChildren.length; pageIndex++) {
    pagesContainerChildren[pageIndex].style.minWidth = `${pageWidth}px`
    pagesContainerChildren[pageIndex].style.maxWidth = `${pageWidth}px`
  }
}

export function getCurrentScrollIndex({
  currentPageIndex,
  pagesCount,
  headClonesCount,
  infinite,
  pagesToScroll,
}) {
  if (infinite) {
    if (currentPageIndex === pagesCount - headClonesCount) return 0
    if (currentPageIndex === 0) return pagesCount - headClonesCount
    return Math.floor((currentPageIndex - headClonesCount) / pagesToScroll)
  }
  return Math.ceil(currentPageIndex / pagesToScroll)
}

// TODO: think about case if pagesCount < pagesToShow and pagesCount < pagesToScroll
export function getPartialPageSize({
  pagesToScroll,
  pagesToShow,
  pagesCountWithoutClones
}) {
  const overlap = pagesToScroll - pagesToShow
  let _pages = pagesToShow

  while(true) {
    const diff = pagesCountWithoutClones - _pages - overlap
    if (diff < pagesToShow) {
      return diff
    }
    _pages += pagesToShow + overlap
  }
}

export function getScrollsCount({
  infinite,
  pagesCountWithoutClones,
  pagesToScroll,
}) {
  return infinite
    ? Math.ceil(pagesCountWithoutClones / pagesToScroll)
    : Math.round(pagesCountWithoutClones / pagesToScroll)
}

export function getPageIndexByScrollIndex({
  infinite,
  scrollIndex,
  clonesCountHead,
  pagesToScroll,
  pagesCount,
  pagesToShow,
}) {
  return infinite
    ? clonesCountHead + scrollIndex * pagesToScroll
    : Math.min(scrollIndex * pagesToScroll, pagesCount - pagesToShow)
}
