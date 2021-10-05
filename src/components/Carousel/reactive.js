// Code that has to run when a
// reactive property changes it's value.

const objectsAreSame = (x, y) => {
  // return false
  let _objectsAreSame = true
  for (let propertyName in x) {
    if (Number.isNaN(x[propertyName]) || Number.isNaN(y[propertyName])) {
      continue
    }
    if (x[propertyName] !== y[propertyName]) {
      _objectsAreSame = false
      break
    }
  }

  return _objectsAreSame
}

const getObject = (oldData, newData) => {
  const newDeps = {}

  Object.entries(oldData).forEach(([key, value]) => {
    // console.log('oldData', key, value)
    newDeps[key] = newData[key]
  })
  // console.log('isDiff', oldData, newDeps)

  return newDeps
}

const useSubscription = () => {
  const subscribers = {}

  const memoDependency = (target, dep) => {
    const { watcherName, fn } = target
    const { key, value } = dep

    if (!subscribers[watcherName]) {
      subscribers[watcherName] = {
        deps: {},
        fn,
      }
    }
    subscribers[watcherName].deps[key] = value
  }

  return {
    subscribe: (target, dep) => {
      if (target) {
        memoDependency(target, dep)
      }
    },
    notify: (data) => {
      Object.entries(subscribers).forEach(([watcherName, { deps }]) => {
        const newDeps = getObject(deps, data)
        if (!objectsAreSame(deps, newDeps)) {
          subscribers[watcherName].deps = newDeps
          subscribers[watcherName].fn()
        }
      })
    },
  }
}

const useWatcher = () => {
  let target = null

  return {
    watch: (watcherName, fn) => {
      target = {
        watcherName,
        fn,
      }
      target.fn()
      target = null
    },
    getTarget: () => {
      return target
    },
  }
}

export const reactive = (data, watchers, methods, onChange) => {
  const { subscribe, notify } = useSubscription()
  const { watch, getTarget } = useWatcher()

  const _data = new Proxy(data, {
    get(target, key) {
      subscribe(getTarget(), { key, value: target[key] })
      return Reflect.get(...arguments)
    },
    set(_, key, value) {
      Reflect.set(...arguments)
      onChange && onChange(key, value)
      notify(_data)
      return true
    },
  })

  Object.entries(watchers).forEach(([watcherName, watcher]) => {
    watch(watcherName, () => watcher(_data))
  })

  const _methods = {}
  Object.entries(methods).forEach(([methodName, method]) => {
    _methods[methodName] = (...args) => method(_data, _methods, ...args)
  })

  return [_data, _methods]
}
