/**
 * Call a function on a set interval until all items called
 */

interface StackConfig<T> {
  items: T[];
  func: Function;
  delay: number;
}

export default class Stack<T> {

  stack: T[];
  userFunction: Function
  delay: number;
  done: Boolean;

  _interval: any;

  constructor(config: StackConfig<T>) {
    this.stack = config.items;
    this.userFunction = config.func;
    this.delay = config.delay;

    this.done = false;
  }

  private fire() {
    if (!this.stack.length) {
      this.done = true;
      return clearInterval(this._interval);
    }

    this.userFunction(this.stack.shift());
  }

  public start() {
    if (this.done) return;

    this._interval = window.setInterval(this.fire.bind(this), this.delay);
  }
}
