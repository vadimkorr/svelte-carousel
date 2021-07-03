import {
  setIntervalImmediate,
} from './interval.js'

describe('setIntervalImmediate', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  })

  it('runs callback immediately and them each n ms', () => {
    let interval
    const durationMs = 1000

    const callNumbersToStopTimer = 3
    let calledTimes = 0
    const callback = () => {
      calledTimes++
      if (calledTimes === callNumbersToStopTimer) {
        clearInterval(interval)
      }
    }

    interval = setIntervalImmediate(callback, durationMs)
    jest.runAllTimers()

    expect(calledTimes).toBe(callNumbersToStopTimer)
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), durationMs)
    expect(clearInterval).toHaveBeenCalledWith(interval)
  })
})
