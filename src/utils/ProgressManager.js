import { setIntervalImmediate } from './interval'

const STEP_MS = 35
const MAX_VALUE = 1

export class ProgressManager {
  constructor({ onProgressValueChange }) {
    this._onProgressValueChange = onProgressValueChange

    this._autoplayDuration
    this._onProgressValueChange
  
    this._interval
    this._paused = false
  }

  setAutoplayDuration(autoplayDuration) {
    this._autoplayDuration = autoplayDuration
  }

  start(onFinish) {
    return new Promise((resolve) => {
      this.reset()

      const stepMs = Math.min(STEP_MS, Math.max(this._autoplayDuration, 1))
      let progress = -stepMs
  
      this._interval = setIntervalImmediate(async () => {
        if (this._paused) {
          return
        }
        progress += stepMs
  
        const value = progress / this._autoplayDuration
        this._onProgressValueChange(value)
  
        if (value > MAX_VALUE) {
          this.reset()
          await onFinish()
          resolve()
        }
      }, stepMs)
    })
  }

  pause() {
    this._paused = true
  }

  resume() {
    this._paused = false
  }

  reset() {
    clearInterval(this._interval)
    this._onProgressValueChange(MAX_VALUE)
  }
}
