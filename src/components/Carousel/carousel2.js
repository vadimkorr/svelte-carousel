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
  const progressManager = new ProgressManager({
    onProgressValueChange: (value) => {
      onChange('progressValue', 1 - value)
    },
  })

  const [data, methods] = reactive(
    {
      particlesCountWithoutClones: 0,
      particlesToShow: 1,
      particlesToScroll: 1,
      initialPageIndex: 1,
      particlesCount: 1,
      currentParticleIndex: 1,
      infinite: false,
      autoplayDuration: 1000,
      clonesCountHead: 0,
      clonesCountTail: 0,
      clonesCountTotal: 0,
      partialPageSize: 1,
      currentPageIndex: 1,
      pagesCount: 1,
      pauseOnFocus: false,
      focused: false,
      autoplay: false,
      autoplayDirection: 'next',
      disabled: false, // Disable page change while animation is in progress
      duration: 1000,
      _duration: 1000,
      offset: 0,
      particleWidth: 0,
    },
    {
      setCurrentPageIndex: (data) => {
        data.currentPageIndex = getCurrentPageIndexByCurrentParticleIndex({
          currentParticleIndex: data.currentParticleIndex,
          particlesCount: data.particlesCount,
          clonesCountHead: data.clonesCountHead,
          clonesCountTotal: data.clonesCountTotal,
          infinite: data.initialPageIndex,
          particlesToScroll: data.particlesToScroll,
        })
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
      setProgressManagerAutoplayDuration: (data) => {
        progressManager.setAutoplayDuration(data.autoplayDuration)
      },
      toggleProgressManager: ({ pauseOnFocus, focused }) => {
        if (pauseOnFocus) {
          if (focused) {
            progressManager.pause()
          } else {
            progressManager.resume()
          }
        }
      },
      initDuration: (data) => {
        data._duration = data.duration
      },
    },
    {
      _prev: (data) => {
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
      _next: (data) => {
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
      _moveToParticle: (data, _, particleIndex) => {
        const newCurrentParticleIndex = getValueInRange(
          0,
          particleIndex,
          data.particlesCount - 1
        )
        data.currentParticleIndex = newCurrentParticleIndex
      },
      toggleFocused: (data) => {
        data.focused = !data.focused
      },
      applyAutoplayIfNeeded: async (
        {
          infinite,
          autoplayDirection,
          currentParticleIndex,
          particlesCount,
          autoplay,
        },
        { showNextPage, showPrevPage }
      ) => {
        // prevent progress change if not infinite for first and last page
        if (
          !infinite &&
          ((autoplayDirection === NEXT &&
            currentParticleIndex === particlesCount - 1) ||
            (autoplayDirection === PREV && currentParticleIndex === 0))
        ) {
          progressManager.reset()
          return
        }

        if (autoplay) {
          const autoplayDirectionFnDescription = {
            [NEXT]: async () => await progressManager.start(showNextPage),
            [PREV]: async () => await progressManager.start(showPrevPage),
          }

          await autoplayDirectionFnDescription[autoplayDirection]()
        }
      },
      // makes delayed jump to 1st or last element
      _jumpIfNeeded: async (
        {
          infinite,
          currentParticleIndex,
          particlesCount,
          clonesCountTotal,
          clonesCountTail,
          clonesCountHead,
        },
        { showParticle }
      ) => {
        let jumped = false
        if (infinite) {
          if (currentParticleIndex === 0) {
            await showParticle(particlesCount - clonesCountTotal, {
              animated: false,
            })
            jumped = true
          } else if (
            currentParticleIndex ===
            particlesCount - clonesCountTail
          ) {
            await showParticle(clonesCountHead, {
              animated: false,
            })
            jumped = true
          }
        }
        return jumped
      },

      changePage: async (
        data,
        { offsetPage, applyAutoplayIfNeeded, _jumpIfNeeded },
        updateStoreFn,
        options
      ) => {
        progressManager.reset()
        if (data.disabled) return
        data.disabled = true

        updateStoreFn()
        await offsetPage({ animated: get(options, 'animated', true) })
        data.disabled = false

        const jumped = await _jumpIfNeeded()
        !jumped && applyAutoplayIfNeeded() // no need to wait it finishes
      },
      showNextPage: async ({ disabled }, { changePage, _next }, options) => {
        if (disabled) return
        await changePage(_next, options)
      },
      showPrevPage: async ({ disabled }, { changePage, _prev }, options) => {
        if (disabled) return
        await changePage(_prev, options)
      },
      showParticle: async (
        _,
        { changePage, _moveToParticle },
        particleIndex,
        options
      ) => {
        await changePage(() => _moveToParticle(particleIndex), options)
      },
      offsetPage: (data, _, options) => {
        const animated = get(options, 'animated', true)
        return new Promise((resolve) => {
          // _duration is an offset animation time
          data._duration = animated ? data.duration : 0
          data.offset = -data.currentParticleIndex * data.particleWidth
          setTimeout(() => {
            resolve()
          }, data._duration)
        })
      },
    },
    onChange
  )

  return [{ data, progressManager }, methods]
  // return [{ ...data, progressManager }, methods]
}
