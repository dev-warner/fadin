import Animation from '../lib/animation'
import Stack from '../lib/stack'

describe('animation', () => {
  test('should not call start if not items', () => {
    document.body.innerHTML = `
            <div></div>
        `
    spyOn(Stack.prototype, 'start')
    const animation = new Animation('.fade')
    animation.animateItems(0)
    expect(Stack.prototype.start).not.toHaveBeenCalled()
  })

  test('should get items and call start', () => {
    document.body.innerHTML = `
            <div class="fade"></div>
        `
    spyOn(Stack.prototype, 'start')
    const animation = new Animation('.fade')
    animation.animateItems(0)
    expect(Stack.prototype.start).toHaveBeenCalled()
  })

  test('assign should return if no elem passed', () => {
    const animation = new Animation('.fade')
    expect(animation.assignDelayAndOpacity).not.toThrow();
  })

  describe('getItemsToAnimate', () => {
    test('should not call if is Done', () => {
      document.body.innerHTML = `
                <div></div>
            `
      const a = new Animation('.fade')
      const result = a.getItemsToAnimate()
      expect(result).toEqual(undefined)
    })
    test('should not call if is Done', () => {
      document.body.innerHTML = `
                <div class="fade"></div>
            `
      const a = new Animation('.fade')
      const result = a.getItemsToAnimate()
      expect(result).toEqual([expect.any(Element)])
    })
    test('should only return visable', () => {
      let count = 0
      const mockElem = {
        getBoundingClientRect: () => {
          count++
          return { bottom: count > 1 ? 0 : 1000, top: count > 1 ? 0 : 1000 }
        },
        style: {
          opacity: 0
        }
      }
      spyOn(document, 'querySelectorAll').and.returnValue([mockElem, mockElem])
      const a = new Animation('.fade')
      const result = a.getItemsToAnimate()
      expect(result).toEqual([mockElem])
    })
  })

  describe('applying animation', () => {
    test('should after set delay add opactiy', () => {
      const mockElem = {
        getBoundingClientRect: () => {
          return { bottom: 0, top: 0 }
        },
        style: {
          opacity: 0
        }
      }
      spyOn(document, 'querySelectorAll').and.returnValue([mockElem])
      document.body.innerHTML = `
            <div class="fade"></div>
        `
      jest.useFakeTimers()
      const a = new Animation('.fade')
      a.animateItems(200)
      jest.runTimersToTime(300)
      expect(mockElem.style.opacity).toEqual(1)
    })

    test('should have items left if not enough time passed', () => {
      const mockElem = {
        getBoundingClientRect: () => {
          return { bottom: 0, top: 0 }
        },
        style: {
          opacity: 0
        }
      }
      spyOn(document, 'querySelectorAll').and.returnValue([mockElem])
      document.body.innerHTML = `
              <div class="fade"></div>
          `
      jest.useFakeTimers()
      const a = new Animation('.fade')
      a.animateItems(200)
      jest.runTimersToTime(0)
      expect(mockElem.style.opacity).toEqual(0)
    })

    test('should use delay from data-attr if present', () => {
      const mockElem = {
        dataset: { delay: '0.5s' },
        getBoundingClientRect: () => {
          return { bottom: 0, top: 0 }
        },
        style: {
          opacity: 0,
          transitionDelay: 0
        }
      }
      spyOn(document, 'querySelectorAll').and.returnValue([mockElem])

      jest.useFakeTimers()
      const a = new Animation('.fade')
      a.animateItems(200)
      jest.runTimersToTime(500)
      expect(mockElem.style.transitionDelay).toEqual('0.5s')
    })
  })

  describe('reset', () => {
    let mockElem: any;
    let mockElemHidden: any;

    beforeEach(() => {
      mockElem = {
        getBoundingClientRect: () => {
          return { bottom: 0, top: 0 }
        },
        style: {opacity: 1}
      }
      mockElemHidden = {
        getBoundingClientRect: () => {
          return { bottom: 1000, top: 1000 }
        },
        style: {opacity: 1}
      }
      spyOn(document, 'querySelectorAll').and.returnValue([
        mockElem,
        mockElemHidden
      ])
    })
    test('should ignore visble elems', () => {
        const a = new Animation('.fade')
        a.reset();
        expect(mockElem.style.opacity).toBe(1);
    })
    test('should hide hidden elems', () => {
        const a = new Animation('.fade')
        a.reset();
        expect(mockElemHidden.style.opacity).toEqual("0");
    })
  })
})
