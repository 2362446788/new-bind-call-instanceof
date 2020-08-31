// instanceof的实现机制就是找原型链上原型是否相等，只要能够通过原型链找到这个原型，那么

function instance_of(tar,classFn){
    const prototype = classFn.prototype;
    // ie中不支持__proto__，所以可以采用Object.getPrototypeOf
    // let proto = tar.__proto__;
    let proto = Object.getPrototypeOf(tar);
    while(true){
        if(proto === null) return false;
        if(proto === prototype) return true;
        // proto = proto.__proto__;
        proto = Object.getPrototypeOf(proto);
    }
}


console.log(instance_of({},Array));

// 这个方法再浏览器执行时其实是调用函数原型上 Function.prototype 的Symbol.hasInstance方法，机制和我们写的一样
console.log([] instanceof Array);

console.log(Array[Symbol.hasInstance]([]));

