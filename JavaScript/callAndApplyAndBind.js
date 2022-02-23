function fuck (a,b,c){
    console.log(a+b+c+this.name);
}
var obj = {
    name :"tzg"
}
//手动实现call方法
Function.prototype.call_myself= function(obj){
    obj = obj ? Object(obj):window;
    // for (let i = 1; i < arguments.length; i++) {
    //     args.push("arguments["+i+"]");
    // }
    //ES6
    var args = [...arguments].slice(1);
    obj.fn = this;
    // var result = eval("obj.fn("+args+")");
    //ES6
    var result = obj.fn(...args);
    delete obj.fn
    return result;
}
// fuck.call_myself(obj,"我的","名字","是");


//手动实现apply方法
Function.prototype.apply_myself= function (obj,arr) {
    obj = obj ? Object(obj) : window;
    obj.fn = this;
    let result;
    if (!arr) {
        result = obj.fn();
    } else {
        result = obj.fn(...arr);
    }
    delete obj.fn;
    return result;
}
// fuck.apply_myself(obj,["my ","name ","is "]);
//手动实现bind方法
Function.prototype.bind_myself = function (obj) {
    if (typeof this !== "function") throw new Error("!!!")
    let self = this;
    let args = [...arguments].slice(1);
    let bound = function () {
        // 函数柯里化
        let newArgs = [...arguments];
        // this指向性
        return self.apply(this instanceof bound ? this : obj, args.concat(newArgs));
    }
    // 原型绑定的处理
    function proFn() {}
    proFn.prototype = self.prototype;
    bound.prototype = new proFn();
    return bound;
}
let newfuck = fuck.bind_myself(obj,1);
console.log(newfuck(2,3))
