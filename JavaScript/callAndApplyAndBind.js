function fuck (a,b,c){
    console.log(a+b+c+this.name);
}
var obj = {
    name :"tzg"
}
//手动实现call方法
Function.prototype.call_myself= function(obj){
    obj = obj ? Object(obj):window;
    var args = [];
    // for (let i = 1; i < arguments.length; i++) {
    //     args.push("arguments["+i+"]");
    // }
    //ES6
    args = [...arguments].slice(1);
    obj.fn = this;
    // var result = eval("obj.fn("+args+")");
    //ES6
    var result = obj.fn(...args);
    delete obj.fn
    return result;
}
fuck.call_myself(obj,"我的","名字","是");


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
fuck.apply_myself(obj,["my ","name ","is "]);
//手动实现bind方法

Function.prototype.bind_myself = function (obj) {
    var fn = this;
    var args = Array.prototype.slice.call(arguments,1);
    return function (...newArgs) {
        fn.apply_myself(obj,args.concat(...newArgs));
    }
}
let newfuck = fuck.bind_myself(obj,1);
newfuck(2,3);
