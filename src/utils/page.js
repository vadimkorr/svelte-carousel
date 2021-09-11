export function getNextPageIndexLimited({
  currentPageIndex,
  pagesCount,
}) {
  if (pagesCount < 1) throw new Error('pagesCount must be at least 1')
  return Math.min(Math.max(currentPageIndex + 1, 0), pagesCount - 1)
}

export function getNextPageIndexInfinte({
  currentPageIndex,
  pagesCount,
}) {
  if (pagesCount < 1) throw new Error('pagesCount must be at least 1')
  const newCurrentPageIndex = Math.max(currentPageIndex, 0) + 1
  return newCurrentPageIndex > pagesCount - 1 ? 0 : Math.max(newCurrentPageIndex, 0)
}

export function getNextPageIndexFn(infinite) {
  return infinite ? getNextPageIndexInfinte : getNextPageIndexLimited
}

export function getPrevPageIndexLimited({
  currentPageIndex,
  pagesCount,
}) {
  if (pagesCount < 1) throw new Error('pagesCount must be at least 1')
  return Math.max(Math.min(currentPageIndex - 1, pagesCount - 1), 0)
}

export function getPrevPageIndexInfinte({
  currentPageIndex,
  pagesCount,
}) {
  if (pagesCount < 1) throw new Error('pagesCount must be at least 1')
  const newCurrentPageIndex = Math.min(currentPageIndex, pagesCount - 1) - 1
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

export function getAdjacentIndexes({
  pageIndex,
  pagesCount,
  infinite,
}) {
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

export function getClones({
  oneSideClonesCount,
  pagesContainerChildren,
}) {
  // TODO: add fns to remove clones if needed
  const clonesToAppend = []
  for (let i=0; i<oneSideClonesCount; i++) {
    clonesToAppend.push(pagesContainerChildren[i].cloneNode(true))
  }

  const clonesToPrepend = []
  const len = pagesContainerChildren.length
  for (let i=len-1; i>len-1-oneSideClonesCount; i--) {
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

export function applyPageSizes({
  pagesContainerChildren,
  pageWidth,
}) {
  for (let pageIndex=0; pageIndex<pagesContainerChildren.length; pageIndex++) {
    pagesContainerChildren[pageIndex].style.minWidth = `${pageWidth}px`
    pagesContainerChildren[pageIndex].style.maxWidth = `${pageWidth}px`
  }
}

export function getCurrentPageIndexWithoutClones({
  currentPageIndex,
  pagesCount,
  oneSideClonesCount,
  infinite,
}) {
  if (infinite) {
    if (currentPageIndex === pagesCount - 1) return 0
    if (currentPageIndex === 0) return (pagesCount - oneSideClonesCount * 2) - 1
    return currentPageIndex - 1
  }
  return currentPageIndex
}

export function getPagesCountWithoutClones({
  pagesCount,
  oneSideClonesCount,
}) {
  const bothSidesClonesCount = oneSideClonesCount * 2
  return Math.max(pagesCount - bothSidesClonesCount, 1)
}

export function getOneSideClonesCount({
  infinite,
}) {
  return infinite ? 1 : 0
}

export function createResizeObserver(onResize) {
  return new ResizeObserver(entries => {
    onResize({
      width: entries[0].contentRect.width,
    })
  });
}
