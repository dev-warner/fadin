import Stack from "./stack";

export interface FaderConfig {
  defaultDelay?: number;
  querySelector?: string;
}

export default class AnimateOnScroll {
  static createFader(config: FaderConfig) {
    return new AnimateOnScroll(config);
  }

  private defaultDelay: number;
  private windowBottom: number;
  private toAnimate: HTMLElement[];

  constructor(config: FaderConfig = {}) {
    this.defaultDelay = config.defaultDelay || 0;
    this.toAnimate = Array.from(
      document.querySelectorAll(config.querySelector || ".js-fade")
    );

    this.setWindowBottom();

    this._setUpEventListener("resize", this.setWindowBottom.bind(this));
    this._setUpEventListener("scroll", this.animateItems.bind(this));

    window.dispatchEvent(new Event("scroll"));
  }

  animateItems() {
    const items = this.getItemsToAnimate();

    if (!items) return;

    const animate = new Stack<Node>({
      items,
      func: this.assignDelayAndOpacity.bind(this),
      delay: this.defaultDelay
    });

    animate.start();
  }

  getItemsToAnimate() {
    if (this.isDone()) return;

    const { visible, hidden } = this.getVisibleAndHiddenItems();

    this.toAnimate = hidden;

    return visible;
  }

  getVisibleAndHiddenItems() {
    const model = {
      visible: [],
      hidden: []
    };

    return this.toAnimate.reduce<IModel>((acc, item) => {
      const key = this.shouldBeVisible(item) ? "visible" : "hidden";

      acc[key] = acc[key].concat(item);

      return acc;
    }, model);
  }

  isDone() {
    return this.toAnimate.length <= 0;
  }

  assignDelayAndOpacity(elem: HTMLElement) {
    Object.assign(elem.style, {
      opacity: 1,
      transitionDelay: this.getDelay(elem)
    });
  }

  getDelay(elem: HTMLElement) {
    if (elem && elem.dataset && elem.dataset.delay) {
      return elem.dataset.delay || "0s";
    }
  }

  setWindowBottom() {
    this.windowBottom = window.scrollY + window.innerHeight;
  }

  shouldBeVisible(elem: HTMLElement) {
    const rect = elem.getBoundingClientRect();
    const viewHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight
    );

    return (
      !(rect.bottom < 0 || rect.top - viewHeight >= 0) &&
      elem.style.opacity !== "1"
    );
  }

  private _setUpEventListener(type: string, func: Function) {
    const event = () => {
      if (this.isDone()) {
        return this._removeListener(type, event);
      }
      func();
    };

    window.addEventListener(type, event.bind(this));
  }

  private _removeListener(
    type: string,
    event: EventListenerOrEventListenerObject
  ) {
    window.removeEventListener(type, event, true);
  }
}

interface IModel {
  visible: HTMLElement[];
  hidden: HTMLElement[];
}
