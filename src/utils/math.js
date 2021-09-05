export const getDistance = (p1, p2) => {
  const xDist = p2.x - p1.x;
  const yDist = p2.y - p1.y;

  return Math.sqrt((xDist * xDist) + (yDist * yDist));
}

// 3 => true
export function getIsOdd(num) {
  return Boolean(num % 2)
}


// TODO: determine when partial offset is needed and apply partial offset
// TODO: determine how many clones should be from both sides


// TODO: refactor pagesToShow <= pagesToScroll
// TODO: think about case if pagesCount < pagesToShow and pagesCount < pagesToScroll
export function getPartialPageSize({
  pagesToScroll,
  pagesToShow,
  pagesCount
}) {

  if (pagesToShow <= pagesToScroll) {
    const overlap = pagesToShow - pagesToScroll

    const d = (Math.max(pagesToShow-pagesToScroll), pagesToShow)
    // console.log('overlap', overlap)
    let _pages = d
    // console.log('pages', _pages)
  
    while(true) {
      // let fp = _pages - overlap
      _pages = _pages - overlap + d
      // console.log('pages', _pages)
      const diff = pagesCount - _pages
      if (diff < pagesToShow) {
        // console.log('diff', diff)
        // console.log('pagesToShow - diff', pagesToShow - Math.abs(diff) - overlap)
        const res = diff + overlap
        if (res < 0) {
          return pagesToShow - overlap + res
        }
        console.log(res, diff)
        return diff !== 0 ? Math.min(res, diff) : res
      }
    } 
  } else {
    const overlap = pagesToShow - pagesToScroll

    // console.log('overlap', overlap)
    let _pages = pagesToShow
    console.log('pages', _pages)
  
    while(true) {
      const diff = pagesCount - _pages + overlap
      if (diff < pagesToShow) {
        return diff
      }
      _pages += pagesToShow - overlap
      console.log('pages', _pages)
    }
  }
 
}
