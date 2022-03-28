const { Class, Obj } = require('./index')

const Animal = Class({
  prototype() {
    this.walk = true
    this.say = function() {
      throw Error('the "say" function unimplemented')
    }
  },
  constructor(name, year) {
    this.name = name
    this.year = year
  }
})

const Dog = Class({
  Base: Animal,
  prototype() {
    this.say = function() {
      return 'wangwang'
    }
  },
  constructor(name, year, color) {
    this.super(name, year)
    this.color = color
  }
})

const black = Dog.new('bb', 3, 'black')
const white = Dog.new('ww', 5, 'white')

test('class', () => {
  expect(black.say()).toBe('wangwang')
  expect(white.say()).toBe('wangwang')

  expect(black.name).toBe('bb')
  expect(black.color).toBe('black')
  expect(black.year).toBe(3)
  expect(white.name).toBe('ww')
  expect(white.color).toBe('white')
  expect(white.year).toBe(5)

  expect(black.is(Dog)).toBe(true)
  expect(black.is(Animal)).toBe(true)
  expect(black.is(Obj)).toBe(true)
  expect(white.is(Dog)).toBe(true)
  expect(white.is(Animal)).toBe(true)
  expect(white.is(Obj)).toBe(true)
})

const Cat = Class({
  Base: Animal,
  prototype() {
    this.say = function() {
      return 'miaomiao'
    }
  },
  constructor(name, year, gender) {
    this.super(name, year)
    this.gender = gender
  }
})

const feifei = Cat.new('feifei', 3, 'female')
test('polymorphism', () => {
  expect(black.say()).toBe('wangwang')
  expect(feifei.say()).toBe('miaomiao')

  expect(black.name).toBe('bb')
  expect(black.color).toBe('black')
  expect(black.year).toBe(3)
  expect(feifei.name).toBe('feifei')
  expect(feifei.gender).toBe('female')
  expect(feifei.year).toBe(3)

  expect(black.is(Dog)).toBe(true)
  expect(black.is(Animal)).toBe(true)
  expect(black.is(Obj)).toBe(true)

  expect(feifei.is(Dog)).toBe(false)
  expect(feifei.is(Cat)).toBe(true)
  expect(feifei.is(Animal)).toBe(true)
  expect(feifei.is(Obj)).toBe(true)
})