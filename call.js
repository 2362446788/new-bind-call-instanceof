let obj = {
    name: "xiaowang"
}

function func() {
    console.log(this)
}
console.log(func.call(2));
// call能修改this指向，执行过程：通过func的原型链找到call方法，call执行，让里面的func执行，把this执行为obj；
// 那我们怎样实现呢
// 在call函数中，一开始this为点前面的值func，设置一个对象为obj，然后让obj的一个属性为func，obj[属性]执行,这个时候的this就是我们的obj了。

Function.prototype.call = function call(context, ...args) {
    // 1. 进来判断一下context的值，如果没传或者传递null，我们设置为window
    context == null ? context = window : null;
    // 2. 接着判断context的数据类型值，不为引用类型值的需要通过自己的constructor设置为对象，但是symbol和bigint没有这个属性，那就基于Object()完成
    if(!/^(object|function)$/.test(typeof context)){
        // if(/^(symbol|bigint)$/.test(typeof context)){
        //     context = Object(context);
        // }else{
        //     context = new context.constructor(context);
        // }
        Object(context)
    }
    // 3. 这里的this一开始为传进来的方法，向对象中加属性，让其this，然后执行，传进来的方法中this就改变了
    let key = Symbol('key'),
        result;
    context[key] = this;
    result = context[key]();
    delete context[key];
    return result;
}

// apply的用法和call相似，不同的只是传递的参数形式，call需要一个个传递，apply需要的则是一个数组。