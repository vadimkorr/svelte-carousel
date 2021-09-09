export function getNextPageIndexLimited({
  currentPageIndex,
  pagesCount,
  pagesToScroll,
}) {
  if (pagesCount < 1) throw new Error('pagesCount must be at least 1')
  console.log('next',  pagesCount, currentPageIndex, pagesCount - currentPageIndex)
  return currentPageIndex + Math.min(pagesCount - (currentPageIndex+1) - pagesToScroll, pagesToScroll)
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
  return Math.max(
    Math.min(
      currentPageIndex - Math.min(currentPageIndex, pagesToScroll),
      pagesCount - 1
    ),
  0)
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

export function getIndexesOfPagesWithoutClonesInScroll({
  scrollIndex,
  pagesToShow,
  pagesToScroll,
  pagesCount,
}) {
  const overlap = scrollIndex === 0 ? 0 : pagesToShow - pagesToScroll
  const from = scrollIndex * pagesToShow - scrollIndex * overlap
  const to = from + Math.max(pagesToShow, pagesToScroll) - 1
  console.log('=======>', from, to)
  const indexes = []
  for (let i=from; i<=Math.min(pagesCount - 1, to); i++) {
    indexes.push(i)
  }
  return indexes
}

export function getAdjacentIndexes({
  scrollIndex,
  scrollsCount,
  pagesCount,
  pagesToShow,
  pagesToScroll,
}) {
  // not checking is infinite or not, as first and last scrolls are always shown to be cloned
  const _scrollIndex = Math.max(0, Math.min(scrollIndex, scrollsCount - 1))
  const rangeStart = Math.max(0, _scrollIndex - 1)
  const rangeEnd = Math.min(_scrollIndex + 1, scrollsCount - 1)

  const scrollIndexes = [...new Set([rangeStart, rangeEnd, _scrollIndex])].sort((a, b) => a - b)
  const pageIndexes = []
  scrollIndexes.forEach(scrollIndex => pageIndexes.push(
    ...getIndexesOfPagesWithoutClonesInScroll({
      scrollIndex,
      pagesToShow,
      pagesToScroll,
      pagesCount,
    })
  ))
  return {
    scrollIndexes,
    pageIndexes: [...new Set(pageIndexes)].sort((a, b) => a - b),
  }
}

export function getClones({
  headClonesCount,
  tailClonesCount,
  pagesContainerChildren,
}) {
  // TODO: add fns to remove clones if needed
  const clonesToAppend = []
  for (let i=0; i<tailClonesCount; i++) {
    clonesToAppend.push(pagesContainerChildren[i].cloneNode(true))
  }

  const clonesToPrepend = []
  const len = pagesContainerChildren.length
  for (let i=len-1; i>len-1-headClonesCount; i--) {
    clonesToPrepend.push(pagesContainerChildren[i].cloneNode(true))
  }

  return {
    clonesToAppend,
    clonesToPrepend,
  }
}

export function applyClones({
  pagesContainer,
  clonesToAppend,
  clonesToPrepend,
}) {
  for (let i=0; i<clonesToAppend.length; i++) {
    pagesContainer.append(clonesToAppend[i])
  }
  for (let i=0; i<clonesToPrepend.length; i++) {
    pagesContainer.prepend(clonesToPrepend[i])
  }
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

export function getPagesCountWithoutClones({
  pagesCount,
  infinite,
  totalClonesCount,
  pagesToScroll,
}) {
  return Math.max(
    Math.ceil(
      (pagesCount - (infinite ? totalClonesCount : 0)) / pagesToScroll
    ),
  1)
}

export function getClonesCount({
  infinite,
  pagesToShow,
  partialPageSize,
}) {
  // Math.max(pagesToScroll, pagesToShow) // max - show 4, scroll 3, pages 7
  const clonesCount = infinite
    ? {
      head: partialPageSize || pagesToShow,
      tail: pagesToShow,
    } : {
      head: 0,
      tail: 0,
    }

  return {
    ...clonesCount,
    total: clonesCount.head + clonesCount.tail,
  }
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
