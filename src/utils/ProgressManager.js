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

  start() {
    let value = 0
    let progress = 0
    const stepMs = this.#autoplayDuration / PROGRESS_STEPS_COUNT

    this.#interval = setInterval(() => {
      if (this.#paused) {
        return 
      }
      progress += stepMs
      value = progress / this.#autoplayDuration
      this.#onValueChange(value)
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
