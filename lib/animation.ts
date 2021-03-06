import Stack, { UserFunction } from './stack'

export type AnimationFunction = UserFunction<HTMLElement>;

/*** @ignore */
export default class Animation {
  private query: string
  private toAnimate: HTMLElement[]

  constructor(query: string) {
    this.query = query
    this.toAnimate = Array.from(document.querySelectorAll(query))
  }

  public animateItems(delay: number, func?: AnimationFunction) {
    const items = this.getItemsToAnimate()

    if (!items) return

    const animate = new Stack<HTMLElement>({
      items,
      delay,
      func: elem => func ? func(elem as HTMLElement) : this.assignDelayAndOpacity(elem)
    })

    animate.start()
  }

  public getItemsToAnimate() {
    if (this.isDone()) return

    const { visible, hidden } = this.getVisibleAndHiddenItems()

    this.toAnimate = hidden

    return visible
  }

  public reset() {
    this.toAnimate = Array.from(
      document.querySelectorAll(this.query)
    ) as HTMLElement[]

    const { hidden } = this.getVisibleAndHiddenItems()

    hidden.forEach(elem => {
      elem.style.opacity = '0'

      return elem
    })
  }

  public isDone() {
    return this.toAnimate.length <= 0
  }

  public assignDelayAndOpacity(elem?: HTMLElement) {
    if (!elem) return

    const transitionDelay = this.getDelay(elem)
    Object.assign(elem.style, { opacity: 1 })

    if (transitionDelay) {
      Object.assign(elem.style, { transitionDelay })
    }
  }

  private getVisibleAndHiddenItems() {
    const model = {
      visible: [],
      hidden: []
    }

    return this.toAnimate.reduce<IModel>((acc, item) => {
      const key = this.shouldBeVisible(item) ? 'visible' : 'hidden'

      acc[key] = acc[key].concat(item)

      return acc
    }, model)
  }

  private getDelay(elem: HTMLElement) {
    if (elem && elem.dataset && elem.dataset.delay) {
      return elem.dataset.delay;
    }
  }

  private shouldBeVisible(elem: HTMLElement) {
    const rect = elem.getBoundingClientRect()
    const viewHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight
    )

    return (
      !(rect.bottom < 0 || rect.top - viewHeight >= 0) &&
      elem.style.opacity !== '1'
    )
  }
}

/*** @ignore */
interface IModel {
  visible: HTMLElement[]
  hidden: HTMLElement[]
}
