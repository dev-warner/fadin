import AnimationService, { AnimationFunction } from "./animation";

export interface FadinConfig {
  delay?: number;
  selector?: string;
  noInitalScrollEvent?: boolean;
  animationFunction?: AnimationFunction | undefined;
}

const initalState: FadinConfig = {
  delay: 200,
  selector: '.fadin',
  noInitalScrollEvent: false,
  animationFunction: undefined
}

export default class Fadin {

  private animationService: AnimationService;
  private _detach: Function;

  /**
   * ```
   * import { Fader } from 'fadin';
   *
   * new Fader({selector: '.className', delay: 400})
   * ```
   * will create a new instance of fadin setup event listeners
   * and self destructs when all animations compilete
   */
  constructor(options: FadinConfig = initalState) {
    const config = Object.assign({}, initalState, options);

    this.animationService = new AnimationService(config.selector as string);

    this._detach = this.setUpEventListener("scroll", () => {
      this.animationService.animateItems(config.delay as number, config.animationFunction);
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
   * fadin.sendScroll()
   *
   * just alias for `window.dispatchEvent(new Event("scroll"));`
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
