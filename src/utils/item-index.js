export function getNextItemIndexLimited(currentItemIndex, items) {
  return Math.min(currentItemIndex + 1, items.length - 1)
}

export function getNextItemIndexInfinte(currentItemIndex, items) {
  const newCurrentItemIndex = currentItemIndex + 1
  return newCurrentItemIndex > items.length - 1 ? 0 : newCurrentItemIndex
}

export function getNextItemIndexFn(infinite) {
  return infinite ? getNextItemIndexInfinte : getNextItemIndexLimited
}

export function getPrevItemIndexLimited(currentItemIndex, items) {
  return Math.max(currentItemIndex - 1, 0)
}

export function getPrevItemIndexInfinte(currentItemIndex, items) {
  const newCurrentItemIndex = currentItemIndex - 1
  return newCurrentItemIndex >= 0 ? newCurrentItemIndex : items.length - 1
}

export function getPrevItemIndexFn(infinite) {
  return infinite ? getPrevItemIndexInfinte : getPrevItemIndexLimited
}
