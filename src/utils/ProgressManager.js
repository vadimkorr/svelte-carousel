import { setIntervalImmediate } from './interval'

const STEP_MS = 35
export class ProgressManager {
  #autoplayDuration
  #onProgressValueChange

  #interval
  #paused = false

  constructor({
    autoplayDuration,
    onProgressValueChange,
  }) {
    this.#autoplayDuration = autoplayDuration
    this.#onProgressValueChange = onProgressValueChange
  }

  start(onFinish) {
    this.reset()

    const stepMs = Math.min(STEP_MS, this.#autoplayDuration)
    let progress = -stepMs

    this.#interval = setIntervalImmediate(() => {
      if (this.#paused) {
        return 
      }
      progress += stepMs

      const value = progress / this.#autoplayDuration
      this.#onProgressValueChange(value)

      if (value > 1) {
        this.reset()
        onFinish()
      }
    }, stepMs)
  }

  pause() {
    this.#paused = true
  }

  resume() {
    this.#paused = false
  }

  reset() {
    clearInterval(this.#interval)
  }
}
