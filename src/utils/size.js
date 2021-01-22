export function getPagesCount({ slidesCount, slidesToShow }) {
  return Math.ceil(slidesCount/slidesToShow)
}

export function getSlidesToShowTail({
  slidesToShow,
  slidesCount,
  pagesCount
}) {
  return slidesCount - slidesToShow * (pagesCount - 1)
}

export function getIsNotCompletePage({
  pageIndex,
  pagesCount,
}) {
  return pageIndex === pagesCount - 1 && pagesCount !== 1
}

export function getSlideSize({
  pageWidth,
  slidesToShow,
  slidesToShowTail,
  isNotCompletePage
}) {
  return isNotCompletePage
    ? Math.round(pageWidth/slidesToShowTail) 
    : Math.round(pageWidth/slidesToShow)
}

export function getPageIndex({ slideIndex, slidesToShow }) {
  return Math.floor(slideIndex/slidesToShow)
}
