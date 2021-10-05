import { NEXT, PREV } from '../../direction'
import {
  applyParticleSizes,
  getCurrentPageIndexByCurrentParticleIndex,
  getPartialPageSize,
  getPagesCountByParticlesCount,
  getParticleIndexByPageIndex,
  createResizeObserver,
} from '../../utils/page'
import { getClones, applyClones, getClonesCount } from '../../utils/clones'
import { getAdjacentIndexes } from '../../utils/lazy'
import { getValueInRange } from '../../utils/math'
import { get } from '../../utils/object'
import { ProgressManager } from '../../utils/ProgressManager'
import { wait } from '../../utils/interval'
import { reactive } from './reactive'

// return only getters
export const carousel2 = (onChange) => {
  return reactive(
    {
      particlesCountWithoutClones: 0,
      particlesToShow: 1,
      particlesToScroll: 1,
      initialPageIndex: 1,
      particlesCount: 1,
      currentParticleIndex: 1,
      infinite: false,
      clonesCountHead: 0,
      clonesCountTail: 0,
      clonesCountTotal: 0,
      partialPageSize: 1,
      currentPageIndex: 1,
      pagesCount: 1,
    },
    {
      setCurrentPageIndex: (data) => {
        const ind = getCurrentPageIndexByCurrentParticleIndex({
          currentParticleIndex: data.currentParticleIndex,
          particlesCount: data.particlesCount,
          clonesCountHead: data.clonesCountHead,
          clonesCountTotal: data.clonesCountTotal,
          infinite: data.initialPageIndex,
          particlesToScroll: data.particlesToScroll,
        })
        data.currentPageIndex = ind
        console.log('===> data.currentPageIndex', ind)
      },
      setPartialPageSize: (data) => {
        data.partialPageSize = getPartialPageSize({
          particlesToScroll: data.particlesToScroll,
          particlesToShow: data.particlesToShow,
          particlesCountWithoutClones: data.particlesCountWithoutClones,
        })
      },
      setClonesCount: (data) => {
        const { head, tail } = getClonesCount({
          infinite: data.infinite,
          particlesToShow: data.particlesToShow,
          partialPageSize: data.partialPageSize,
        })

        data.clonesCountHead = head
        data.clonesCountTail = tail
        data.clonesCountTotal = head + tail
      },
      setPagesCount: (data) => {
        data.pagesCount = getPagesCountByParticlesCount({
          infinite: data.infinite,
          particlesCountWithoutClones: data.particlesCountWithoutClones,
          particlesToScroll: data.particlesToScroll,
        })
      },
    },
    {
      prev: (data) => {
        const newCurrentParticleIndex = getParticleIndexByPageIndex({
          infinite: data.infinite,
          pageIndex: data.currentPageIndex - 1,
          clonesCountHead: data.clonesCountHead,
          clonesCountTail: data.clonesCountTail,
          particlesToScroll: data.particlesToScroll,
          particlesCount: data.particlesCount,
          particlesToShow: data.particlesToShow,
        })
        data.currentParticleIndex = newCurrentParticleIndex
      },
      next: (data) => {
        const newCurrentParticleIndex = getParticleIndexByPageIndex({
          infinite: data.infinite,
          pageIndex: data.currentPageIndex + 1,
          clonesCountHead: data.clonesCountHead,
          clonesCountTail: data.clonesCountTail,
          particlesToScroll: data.particlesToScroll,
          particlesCount: data.particlesCount,
          particlesToShow: data.particlesToShow,
        })
        data.currentParticleIndex = newCurrentParticleIndex
      },
      moveToParticle: (data, particleIndex) => {
        const newCurrentParticleIndex = getValueInRange(
          0,
          particleIndex,
          data.particlesCount - 1
        )
        data.currentParticleIndex = newCurrentParticleIndex
      },
    },
    onChange
  )
}
