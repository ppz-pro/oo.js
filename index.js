const Obj =
exports.Obj = {
  proto: {
    is(clazz) {
      return clazz.proto.isPrototypeOf(this)
    }
  },
  new() {
    return Object.create(this.proto)
  }
}

exports.Class =
function Class({ Base = Obj, prototype, constructor }) {
  const proto = Object.create(Base.proto)
  proto.super = Base.constructor || nullFunction
  prototype.apply(proto)

  return {
    proto,
    constructor,
    new() {
      const instance = Object.create(proto)
      if(constructor)
        constructor.apply(instance, arguments)
      return instance
    }
  }
}

function nullFunction() {}