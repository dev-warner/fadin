/**
 * Call a function on a set interval until all items called
 */

interface StackConfig<T> {
  items: T[]
  func: UserFunction<T>
  delay: number
}

type UserFunction<T> = (item?: T) => void

export default class Stack<T> {
  private stack: T[]
  private userFunction: UserFunction<T>
  private delay: number
  private done: Boolean

  _interval: any

  constructor(config: StackConfig<T>) {
    this.stack = config.items
    this.userFunction = config.func
    this.delay = config.delay

    this.done = false
  }

  public pause() {
    this.done = true
    clearInterval(this._interval)
  }

  public start() {
    if (this.done) return

    this._interval = window.setInterval(this.fire.bind(this), this.delay)
  }

  public reset() {
    this.stack = [];
    this.pause();
  }

  private fire() {
    if (!this.stack.length) {
      this.done = true
      return clearInterval(this._interval)
    }

    this.userFunction(this.stack.shift())
  }

  public isDone() {
    return this.done
  }
}
