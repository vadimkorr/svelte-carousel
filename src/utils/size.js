export function getPagesCount({ slidesCount, perPage }) {
  return Math.ceil(slidesCount/perPage)
}

export function getPerPageTail({
  perPage,
  slidesCount,
  pagesCount
}) {
  return slidesCount - perPage * (pagesCount - 1)
}

export function getIsNotCompletePage({
  pageIndex,
  pagesCount,
}) {
  return pageIndex === pagesCount - 1 && pagesCount !== 1
}

export function getSlideSize({
  contentContainerWidth,
  perPage,
  perPageTail,
  isNotCompletePage
}) {
  return isNotCompletePage
    ? Math.round(contentContainerWidth/perPageTail) 
    : Math.round(contentContainerWidth/perPage)
}

export function getPageIndex({ slideIndex, perPage }) {
  return Math.floor(slideIndex/perPage)
}
