import easyReactive from 'easy-reactive'

import { NEXT, PREV } from '../../direction'
import {
  getCurrentPageIndexByCurrentParticleIndex,
  getPartialPageSize,
  getPagesCountByParticlesCount,
  getParticleIndexByPageIndex,
} from '../../utils/page'
import { getClonesCount } from '../../utils/clones'
import { getAdjacentIndexes } from '../../utils/lazy'
import { getValueInRange } from '../../utils/math'
import { get, switcher } from '../../utils/object'
import { ProgressManager } from '../../utils/ProgressManager'

function createCarousel(onChange) {
  const progressManager = new ProgressManager({
    onProgressValueChange: (value) => {
      onChange('progressValue', 1 - value)
    },
  })

  const reactive = easyReactive(
    {
      data: {
        particlesCountWithoutClones: 0,
        particlesToShow: 1, // normalized
        particlesToShowInit: 1, // initial value
        particlesToScroll: 1, // normalized
        particlesToScrollInit: 1, // initial value
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
        disabled: false, // disable page change while animation is in progress
        durationMsInit: 1000,
        durationMs: 1000,
        offset: 0,
        particleWidth: 0,
        loaded: [],
      },
      watch: {
        setLoaded({ data }) {
          data.loaded = getAdjacentIndexes({
            infinite: data.infinite,
            pageIndex: data.currentPageIndex,
            pagesCount: data.pagesCount,
            particlesCount: data.particlesCountWithoutClones,
            particlesToShow: data.particlesToShow,
            particlesToScroll: data.particlesToScroll,
          }).particleIndexes
        },
        setCurrentPageIndex({ data }) {
          data.currentPageIndex = getCurrentPageIndexByCurrentParticleIndex({
            currentParticleIndex: data.currentParticleIndex,
            particlesCount: data.particlesCount,
            clonesCountHead: data.clonesCountHead,
            clonesCountTotal: data.clonesCountTotal,
            infinite: data.infinite,
            particlesToScroll: data.particlesToScroll,
          })
        },
        setPartialPageSize({ data }) {
          data.partialPageSize = getPartialPageSize({
            particlesToScroll: data.particlesToScroll,
            particlesToShow: data.particlesToShow,
            particlesCountWithoutClones: data.particlesCountWithoutClones,
          })
        },
        setClonesCount({ data }) {
          const { head, tail } = getClonesCount({
            infinite: data.infinite,
            particlesToShow: data.particlesToShow,
            partialPageSize: data.partialPageSize,
          })
          data.clonesCountHead = head
          data.clonesCountTail = tail
          data.clonesCountTotal = head + tail
        },
        setProgressManagerAutoplayDuration({ data }) {
          progressManager.setAutoplayDuration(data.autoplayDuration)
        },
        toggleProgressManager({ data: { pauseOnFocus, focused } }) {
          // as focused is in if block, it will not be put to deps, read them in data: {}
          if (pauseOnFocus) {
            if (focused) {
              progressManager.pause()
            } else {
              progressManager.resume()
            }
          }
        },
        initDuration({ data }) {
          data.durationMs = data.durationMsInit
        },
        applyAutoplay({ data, methods: { _applyAutoplayIfNeeded } }) {
          // prevent _applyAutoplayIfNeeded to be called with watcher
          // to prevent its data added to deps
          data.autoplay && _applyAutoplayIfNeeded(data.autoplay)
        },
        setPagesCount({ data }) {
          data.pagesCount = getPagesCountByParticlesCount({
            infinite: data.infinite,
            particlesCountWithoutClones: data.particlesCountWithoutClones,
            particlesToScroll: data.particlesToScroll,
            particlesToShow: data.particlesToShow,
          })
        },
        setParticlesToShow({ data }) {
          data.particlesToShow = getValueInRange(
            1,
            data.particlesToShowInit,
            data.particlesCountWithoutClones
          )
        },
        setParticlesToScroll({ data }) {
          data.particlesToScroll = getValueInRange(
            1,
            data.particlesToScrollInit,
            data.particlesCountWithoutClones
          )
        },
      },
      methods: {
        _prev({ data }) {
          data.currentParticleIndex = getParticleIndexByPageIndex({
            infinite: data.infinite,
            pageIndex: data.currentPageIndex - 1,
            clonesCountHead: data.clonesCountHead,
            clonesCountTail: data.clonesCountTail,
            particlesToScroll: data.particlesToScroll,
            particlesCount: data.particlesCount,
            particlesToShow: data.particlesToShow,
          })
        },
        _next({ data }) {
          data.currentParticleIndex = getParticleIndexByPageIndex({
            infinite: data.infinite,
            pageIndex: data.currentPageIndex + 1,
            clonesCountHead: data.clonesCountHead,
            clonesCountTail: data.clonesCountTail,
            particlesToScroll: data.particlesToScroll,
            particlesCount: data.particlesCount,
            particlesToShow: data.particlesToShow,
          })
        },
        _moveToParticle({ data }, particleIndex) {
          data.currentParticleIndex = getValueInRange(
            0,
            particleIndex,
            data.particlesCount - 1
          )
        },
        toggleFocused({ data }) {
          data.focused = !data.focused
        },
        async _applyAutoplayIfNeeded({ data, methods }) {
          // prevent progress change if not infinite for first and last page
          if (
            !data.infinite &&
            ((data.autoplayDirection === NEXT &&
              data.currentParticleIndex === data.particlesCount - 1) ||
              (data.autoplayDirection === PREV &&
                data.currentParticleIndex === 0))
          ) {
            progressManager.reset()
            return
          }

          if (data.autoplay) {
            const onFinish = () =>
              switcher({
                [NEXT]: async () => methods.showNextPage(),
                [PREV]: async () => methods.showPrevPage(),
              })(data.autoplayDirection)

            await progressManager.start(onFinish)
          }
        },
        // makes delayed jump to 1st or last element
        async _jumpIfNeeded({ data, methods }) {
          let jumped = false
          if (data.infinite) {
            if (data.currentParticleIndex === 0) {
              await methods.showParticle(
                data.particlesCount - data.clonesCountTotal,
                {
                  animated: false,
                }
              )
              jumped = true
            } else if (
              data.currentParticleIndex ===
              data.particlesCount - data.clonesCountTail
            ) {
              await methods.showParticle(data.clonesCountHead, {
                animated: false,
              })
              jumped = true
            }
          }
          return jumped
        },
        async changePage({ data, methods }, updateStoreFn, options) {
          progressManager.reset()
          if (data.disabled) return
          data.disabled = true

          updateStoreFn()
          await methods.offsetPage({ animated: get(options, 'animated', true) })
          data.disabled = false

          const jumped = await methods._jumpIfNeeded()
          !jumped && methods._applyAutoplayIfNeeded() // no need to wait it finishes
        },
        async showNextPage({ data, methods }, options) {
          if (data.disabled) return
          await methods.changePage(methods._next, options)
        },
        async showPrevPage({ data, methods }, options) {
          if (data.disabled) return
          await methods.changePage(methods._prev, options)
        },
        async showParticle({ methods }, particleIndex, options) {
          await methods.changePage(
            () => methods._moveToParticle(particleIndex),
            options
          )
        },
        _getParticleIndexByPageIndex({ data }, pageIndex) {
          return getParticleIndexByPageIndex({
            infinite: data.infinite,
            pageIndex,
            clonesCountHead: data.clonesCountHead,
            clonesCountTail: data.clonesCountTail,
            particlesToScroll: data.particlesToScroll,
            particlesCount: data.particlesCount,
            particlesToShow: data.particlesToShow,
          })
        },
        async showPage({ methods }, pageIndex, options) {
          const particleIndex = methods._getParticleIndexByPageIndex(pageIndex)
          await methods.showParticle(particleIndex, options)
        },
        offsetPage({ data }, options) {
          const animated = get(options, 'animated', true)
          return new Promise((resolve) => {
            // durationMs is an offset animation time
            data.durationMs = animated ? data.durationMsInit : 0
            data.offset = -data.currentParticleIndex * data.particleWidth
            setTimeout(() => {
              resolve()
            }, data.durationMs)
          })
        },
      },
    },
    {
      onChange,
    }
  )
  const [data, methods] = reactive

  return [{ data, progressManager }, methods, reactive._internal]
}

export default createCarousel
