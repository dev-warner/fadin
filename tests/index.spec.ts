import fadin from '../lib'
import Fadin from '../lib/fadin'
import Animation from '../lib/animation'

jest.mock('../lib/animation')

const getListeners = (elem?: any) => {
  const map: any = {};

  (elem || window).addEventListener = jest.fn().mockImplementationOnce((event, cb) => {
    map[event] = cb
  })

  return map
}

describe('fader', () => {
  beforeEach(() => (Animation as any).mockClear())

  test('can directly create', () => {
    const fader = new Fadin()

    expect(fader).toBeInstanceOf(Fadin)
  })

  test('should create instance of fader', () => {
    const animation = fadin('.item', { delay: 200 })

    expect(animation).toBeInstanceOf(Fadin)
  })

  test('should create instance of fader with no params', () => {
    const animation = fadin()

    expect(animation).toBeInstanceOf(Fadin)
  })

  test('should fire scroll event', () => {
    const spy = { spy: () => null }
    spyOn(spy, 'spy')
    window.addEventListener('scroll', spy.spy)
    fadin('.item', { delay: 200 })
    expect(spy.spy).toHaveBeenCalled()
  })

  test('should attach event listener on scroll', () => {
    const map = getListeners()

    fadin('.item', { delay: 200 })
    expect(map).toHaveProperty('scroll')
  })

  test('should call scroll handler', () => {
    document.body.innerHTML = `
      <div class="item"></div>
    `
    fadin()
    expect(Animation.prototype.animateItems).toHaveBeenCalled()
  })

  test('should not fire scroll if config says so', () => {
    spyOn(Fadin.prototype, 'sendScroll')
    fadin('.fader', { noInitalScrollEvent: true })
    expect(Fadin.prototype.sendScroll).not.toHaveBeenCalled()
  })

  test('should remove listenters when done', () => {
    (Animation.prototype.isDone as any).mockReturnValueOnce(true)
    spyOn(window, 'removeEventListener')
    fadin()
    expect(window.removeEventListener).toHaveBeenCalled();
  })

  describe('isDone', () => {
    it('should call animation service to check if all items are complete', () => {
      fadin()
      expect(Animation.prototype.isDone).toHaveBeenCalled()
    })
  })

  describe('detach', () => {
    test('should remove listenters', () => {
      const lis = getListeners()
      const ani = fadin('.item', { delay: 200 })

      expect(lis).toHaveProperty('scroll')
      ani.detach()
      const lis2 = getListeners()
      expect(lis2).not.toHaveProperty('scroll')
    })
  })

  describe('reset', () => {
    test('should call animation reset', () => {
      const f = fadin()
      f.reset()
      expect(Animation.prototype.reset).toHaveBeenCalled()
    })
  })
})
