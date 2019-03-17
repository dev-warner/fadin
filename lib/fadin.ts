import AnimationService from "./animation";

export interface FadinConfig {
  delay?: number;
  selector?: string;
  noInitalScrollEvent?: boolean;
}

export default class Fadin {

  private animationService: AnimationService;
  private _detach: Function;

  constructor(config: FadinConfig = {}) {
    this.animationService = new AnimationService(config.selector || ".fadin");

    this._detach = this.setUpEventListener("scroll", () => {
      this.animationService.animateItems(config.delay || 0);
    });

    if (!config.noInitalScrollEvent) this.sendScroll();
  }

  /**
   * returns true when no more items are left to animate
   */
  public isDone() {
    return this.animationService.isDone();
  }

  /**
   * explictily removes event listeners
   */
  public detach(): void {
    return this._detach();
  }

  /**
   * hides items out view and adds items back to the stack
   */
  public reset() {
    this.animationService.reset();
    this.sendScroll();
  }

  /**
   * Sends scroll event to window to fade in items that are inview onload
   */
  public sendScroll() {
    window.dispatchEvent(new Event("scroll"));
  }

  private setUpEventListener(type: string, func: Function) {
    const event = () => {
      if (this.isDone()) {
        window.removeEventListener(type, event, true)
      }
      func()
    }

    window.addEventListener(type, event.bind(this))

    return () => window.removeEventListener(type, event, true)
  }
}
