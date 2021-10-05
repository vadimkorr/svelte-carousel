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

function getCapitalized(str) {
  const _str = String(str)
  return `${_str.charAt(0).toUpperCase()}${_str.slice(1)}`
}

// TODO: merge values and computed

const carousel = (effects, options) => {
  const values = {}
  const setters = {}
  const computed = get(options, 'computed', {})

  const memo = {}

  const actions = {}
  Object.entries(get(options, 'actions', {})).forEach(([actionName, fn]) => {
    actions[actionName] = (args) => fn(values, setters, computed, actions, args)
  })

  Object.entries(effects).forEach(([subject, descriptor]) => {
    setters[`set${getCapitalized(subject)}`] = (value) => {
      console.log('===> setter', subject)
      // if (memo[subject])

      const _value = get(descriptor, 'normalize', (value) => value)(
        value,
        values,
        computed
      )

      values[subject] = _value

      Object.entries(computed).forEach(([c, v]) => {
        if (v.deps.includes(subject)) {
          const dV = v.deps.map((d) => values[d])
          const _memo = dV.join(' ')
          // console.log()

          if (dV.every((v) => v !== undefined) && memo[c] !== _memo) {
            v.fn(values, computed)
          }
          memo[c] = _memo
        }
      })

      get(options, 'onChange', () => {})(values, computed)
    }
  })

  return {
    ...setters,
    ...actions,
  }
}

export const carouselEngine = (onChange) => {
  const _carousel = carousel(
    {
      particlesCountWithoutClones: {
        effect: ({ values, setters }) => {},
      },
      particlesToShow: {
        effect: ({ values, setters }) => {},
        normalize: (value, values) => {
          return getValueInRange(1, value, values.particlesCountWithoutClones)
        },
      },
      particlesToScroll: {
        effect: ({ values, setters }) => {},
        normalize: (value, values) => {
          return getValueInRange(1, value, values.particlesCountWithoutClones)
        },
      },
      initialPageIndex: {
        effect: ({ values }) => {
          console.log('initialPageIndex effect', values)
        },
        // ignore calc if value is undefined
        normalize: (value, values, computed) => {
          return getParticleIndexByPageIndex({
            infinite: values.infinite,
            pageIndex: value,
            clonesCountHead: computed.clonesCount.head,
            clonesCountTail: computed.clonesCount.tail,
            particlesToScroll: values.particlesToScroll,
            particlesCount: values.particlesCount,
            particlesToShow: values.particlesToShow,
          })
        },
      },
      particlesCount: {
        effect: ({ values }) => {},
      },
      currentParticleIndex: {
        effect: ({ values }) => {},
      },
      infinite: {},
    },
    {
      onChange,
      computed: {
        clonesCount: {
          fn: (values, computed) => {
            return getClonesCount({
              infinite: values.infinite,
              particlesToShow: values.particlesToShow,
              partialPageSize: values.partialPageSize,
            })
          },
          deps: ['infinite', 'particlesToShow', 'partialPageSize'], // try to use proxy to detect deps
        },
        partialPageSize: {
          fn: (values, computed) => {
            return getPartialPageSize({
              particlesToScroll: values.particlesToScroll,
              particlesToShow: values.particlesToShow,
              particlesCountWithoutClones: values.particlesCountWithoutClones,
            })
          },
          deps: [
            'particlesToScroll',
            'particlesToShow',
            'particlesCountWithoutClones',
          ],
        },
        currentPageIndex: {
          fn: (values, computed) => {
            console.log('===> currentPageIndex', currentPageIndex)
            // dispatch('pageChange', currentPageIndex)
            return getCurrentPageIndexByCurrentParticleIndex({
              currentParticleIndex: values.currentParticleIndex,
              particlesCount: values.particlesCount,
              clonesCountHead: clonesCount.head,
              clonesCountTotal: clonesCount.total,
              infinite: values.initialPageIndex,
              particlesToScroll: values.particlesToScroll,
            })
          },
          deps: [
            'currentParticleIndex',
            'particlesCount',
            'initialPageIndex',
            'particlesToScroll',
            'clonesCount',
          ],
        },
        pagesCount: {
          fn: (values, computed) => {
            return getPagesCountByParticlesCount({
              infinite: values.infinite,
              particlesCountWithoutClones: values.particlesCountWithoutClones,
              particlesToScroll: values.particlesToScroll,
            })
          },
          deps: [
            'infinite',
            'particlesCountWithoutClones',
            'particlesToScroll',
          ],
        },
      },
      actions: {
        prev: (values, setters, computed, actions) => {
          const newCurrentParticleIndex = getParticleIndexByPageIndex({
            infinite: values.infinite,
            pageIndex: computed.currentPageIndex - 1,
            clonesCountHead: computed.clonesCount.head,
            clonesCountTail: computed.clonesCount.tail,
            particlesToScroll: values.particlesToScroll,
            particlesCount: values.particlesCount,
            particlesToShow: values.particlesToShow,
          })
          setters.setCurrentParticleIndex(newCurrentParticleIndex)
        },
        next: (values, setters, computed, actions) => {
          const newCurrentParticleIndex = getParticleIndexByPageIndex({
            infinite: values.infinite,
            pageIndex: computed.currentPageIndex + 1,
            clonesCountHead: computed.clonesCount.head,
            clonesCountTail: computed.clonesCount.tail,
            particlesToScroll: values.particlesToScroll,
            particlesCount: values.particlesCount,
            particlesToShow: values.particlesToShow,
          })
          setters.setCurrentParticleIndex(newCurrentParticleIndex)
        },
        moveToParticle: (values, setters, computed, actions, args) => {
          const newCurrentParticleIndex = getValueInRange(
            0,
            args.particleIndex,
            values.particlesCount - 1
          )
          setters.setCurrentParticleIndex(newCurrentParticleIndex)
        },
      },
    }
  )

  return _carousel
}
