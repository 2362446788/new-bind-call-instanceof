function Dog(name) {
    this.name = name;
}

Dog.prototype.bark = function bark() {
    console.log('wangwang');
}

Dog.prototype.sayName = function sayName() {
    console.log("my name is " + this.name);
}

// 创建类的实例对象还可以：但是这样不建议使用，因为ie不支持使用__proto__
// let tar = {};
// tar.__proto__ = Func.prototype;

// Object.create有兼容性：处理兼容，就需要重写
Object.create = function create(prototype){
    function Fn(){};
    Fn.prototype = prototype;
    Fn.prototype.constructor = Fn;
    return new Fn;
}

function _new(Func,...args){
    // 1. 创建一个该类的实例对象
    let tar = Object.create(Func.prototype);
    // 2. 执行函数，让this指向该实例对象
    let res = Func.call(tar,...args);
    // 3. 检测是否有返回值且返回值为引用数据类型，如果是返回该引用数据类型，否则的话返回实力对象
    if(res == null || !(/^(function|object)$/.test(typeof tar))) return tar;
    return res;
}

let dog = _new(Dog,'小王');
// let dog = new Dog('小王');
dog.bark();
dog.sayName();
console.log(dog instanceof Dog);