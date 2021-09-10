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

export function getClonesCount({
  infinite,
  pagesToShow,
  partialPageSize,
}) {
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
