import { setIntervalImmediate } from './interval'

const PROGRESS_STEPS_COUNT = 100


export class ProgressManager {
  #autoplayDuration
  #onValueChange

  #interval
  #paused = false

  constructor({
    autoplayDuration,
    onValueChange,
  }) {
    this.#autoplayDuration = autoplayDuration
    this.#onValueChange = onValueChange
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
      this.#onValueChange(value)

      if (value > 1) {
        this.reset()
        onFinish()
        this.start(onFinish)
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

  // TODO: add on destroy
}
