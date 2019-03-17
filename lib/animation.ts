import Stack from './stack'

/**
 * @ignore
 */
export default class Animation {
  private query: string
  private toAnimate: HTMLElement[]

  constructor(query: string) {
    this.query = query
    this.toAnimate = Array.from(document.querySelectorAll(query))
  }

  public animateItems(delay: number) {
    const items = this.getItemsToAnimate()

    if (!items) return

    const animate = new Stack<HTMLElement>({
      items,
      delay,
      func: elem => this.assignDelayAndOpacity(elem)
    })

    animate.start()
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

  public getItemsToAnimate() {
    if (this.isDone()) return

    const { visible, hidden } = this.getVisibleAndHiddenItems()

    this.toAnimate = hidden

    return visible
  }

  public isDone() {
    return this.toAnimate.length <= 0
  }

  public assignDelayAndOpacity(elem?: HTMLElement) {
    if (!elem) return

    Object.assign(elem.style, {
      opacity: 1,
      transitionDelay: this.getDelay(elem)
    })
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
      return elem.dataset.delay || '0s'
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

interface IModel {
  visible: HTMLElement[]
  hidden: HTMLElement[]
}
