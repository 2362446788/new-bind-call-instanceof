// bind是用来解决预先处理的需求
// 例如，在绑定点击时间行为时，想要修改this指向
let obj = {
    name: "xiaowang"
}
function func(){
    console.log(this,arguments)
}
btn.onclick = func;
btn.onclick = func.bind(obj);
// 在没有出现bind之前也就是ie678（bind不兼容）使用这样来解决
btn.onclick = function anonymous() {
    func.call(obj)
}

Function.prototype.bind = function bind(context, ...params) {
    context == null ? context = window : null;
    let _this = this;
    return function anonymous(...args) {
        // 这里想要执行传进来的函数，需要现在外面的函数获取然后执行，这里用到的时闭包的保存机制
        _this.call(context, ...params.concat(args));
    }
}

btn.onclick = func.bind(obj,10,20);