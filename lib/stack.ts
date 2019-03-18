/*** @ignore */
interface StackConfig<T> {
  items: T[]
  func: UserFunction<T>
  delay: number
}

/*** @ignore */
export type UserFunction<T> = (item?: T) => any

/*** @ignore */
export default class Stack<T> {
  private stack: T[]
  private userFunction: UserFunction<T>
  private delay: number

  _interval: any

  constructor(config: StackConfig<T>) {
    this.stack = config.items
    this.userFunction = config.func
    this.delay = config.delay
  }

  public pause() {
    clearInterval(this._interval)
  }

  public start() {
    if (this.isDone()) return;
    this._interval = window.setInterval(this.fire.bind(this), this.delay)
  }

  public reset() {
    this.stack = [];
    this.pause();
  }

  private fire() {
    this.check();
    this.userFunction(this.stack.shift())
    this.check();
  }

  private check() {
    if (!this.stack.length) {
      return clearInterval(this._interval)
    }
  }

  public isDone() {
    return this.stack.length <= 0;
  }
}
