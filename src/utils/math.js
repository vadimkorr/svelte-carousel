export const getDistance = (p1, p2) => {
  const xDist = p2.x - p1.x;
  const yDist = p2.y - p1.y;

  return Math.sqrt((xDist * xDist) + (yDist * yDist));
}

// TODO: determine when partial offset is needed and apply partial offset
// TODO: determine how many clones should be from both sides


// TODO: refactor pagesToShow <= pagesToScroll
// TODO: think about case if pagesCount < pagesToShow and pagesCount < pagesToScroll

// TODO: math to page
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


  // if (pagesToShow <= pagesToScroll) {
  //   const overlap = pagesToScroll - pagesToShow
  //   let _pages = pagesToShow

  //   while(true) {
  //     const diff = pagesCountWithoutClones - _pages - overlap
  //     if (diff < pagesToShow) {
  //       return diff
  //     }
  //     _pages += pagesToShow + overlap
  //   } 
  // } else {
  //   const overlap = pagesToShow - pagesToScroll
  //   let _pages = pagesToShow
  //   while(true) {
  //     const diff = pagesCountWithoutClones - _pages + overlap
  //     if (diff < pagesToShow) {
  //       return diff
  //     }
  //     _pages += pagesToShow - overlap
  //   }
  // }
}
