import { setIntervalImmediate } from './interval'

const PROGRESS_STEPS_COUNT = 100

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

    const stepMs = this.#autoplayDuration / PROGRESS_STEPS_COUNT
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
