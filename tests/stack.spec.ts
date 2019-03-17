import Stack from '../lib/stack'

describe('stack', () => {
  test('should take a list and call a function on it after a delay', () => {
    jest.useFakeTimers()

    const mock = jest.fn()
    const s = new Stack<number>({
      delay: 100,
      items: [0, 1, 2],
      func: mock
    })

    s.start()

    expect(mock).toBeCalledTimes(0)
    jest.advanceTimersByTime(101)
    expect(mock).toBeCalledTimes(1)
    jest.advanceTimersByTime(101)
    expect(mock).toBeCalledTimes(2)
    jest.advanceTimersByTime(101)
    expect(mock).toBeCalledTimes(3)
  })

  test('should return if done', () => {
    jest.useFakeTimers()
    const mock = jest.fn()
    const s = new Stack<number>({
      delay: 100,
      items: [1, 2],
      func: mock
    })

    s.start()
    jest.advanceTimersByTime(201)
    spyOn(window, 'setInterval')
    s.start()
    expect(window.setInterval).not.toBeCalled()
  })

  describe('isDone ', () => {
    test('should return false when there are items left and true when theres non', () => {
      jest.useFakeTimers()

      const mock = jest.fn()
      const s = new Stack<number>({
        delay: 100,
        items: [0, 1, 2],
        func: mock
      })

      s.start()
      expect(s.isDone()).toEqual(false)
      jest.advanceTimersByTime(300)
      expect(s.isDone()).toEqual(true)
    })
  })

  describe('pause', () => {
    test('should stop the interval', () => {
      jest.useFakeTimers()

      const mock = jest.fn()
      const s = new Stack<number>({
        delay: 100,
        items: [0, 1, 2],
        func: mock
      })

      s.start()
      jest.advanceTimersByTime(200)
      expect(mock).toBeCalledTimes(2)
      s.pause()
      jest.advanceTimersByTime(100)
      expect(mock).toBeCalledTimes(2)
    })
    test('should beable to restart', () => {
      jest.useFakeTimers()

      const mock = jest.fn()
      const s = new Stack<number>({
        delay: 100,
        items: [0, 1, 2, 4],
        func: mock
      })

      s.start()
      jest.advanceTimersByTime(200)
      expect(mock).toBeCalledTimes(2)
      s.pause()
      jest.advanceTimersByTime(100)
      expect(mock).toBeCalledTimes(2)
      s.start()
      jest.advanceTimersByTime(100)
      expect(mock).toBeCalledTimes(3)
    })
  })

  describe('reset', () => {
    test('should call pause', () => {
      spyOn(Stack.prototype, 'pause')
      const mock = jest.fn()
      const s = new Stack<number>({
        delay: 100,
        items: [0, 1, 2, 4],
        func: mock
      })
      s.reset()
      expect(Stack.prototype.pause).toHaveBeenCalled()
    })
    test('should remove items', () => {
      const mock = jest.fn()
      const s = new Stack<number>({
        delay: 100,
        items: [0, 1, 2, 4],
        func: mock
      })
      spyOn(window, 'setInterval')
      s.reset()
      s.start()
      expect(window.setInterval).not.toBeCalled()
    })
  })
})
