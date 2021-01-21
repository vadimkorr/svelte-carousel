export function getNextItemIndexLimited(currentItemIndex, length) {
  return Math.min(currentItemIndex + 1, length - 1)
}

export function getNextItemIndexInfinte(currentItemIndex, length) {
  const newCurrentItemIndex = currentItemIndex + 1
  return newCurrentItemIndex > length - 1 ? 0 : newCurrentItemIndex
}

export function getNextItemIndexFn(infinite) {
  return infinite ? getNextItemIndexInfinte : getNextItemIndexLimited
}

export function getPrevItemIndexLimited(currentItemIndex, length) {
  return Math.max(currentItemIndex - 1, 0)
}

export function getPrevItemIndexInfinte(currentItemIndex, length) {
  const newCurrentItemIndex = currentItemIndex - 1
  return newCurrentItemIndex >= 0 ? newCurrentItemIndex : length - 1
}

export function getPrevItemIndexFn(infinite) {
  return infinite ? getPrevItemIndexInfinte : getPrevItemIndexLimited
}
