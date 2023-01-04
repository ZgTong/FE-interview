function reviewNew(fn, ...args) {
    let obj = Object.create(fn.prototype)
    let res = fn.call(obj, ...args)
    return typeof res === 'object' ? res || obj : obj
}

function helper1(a, b, c) {
    console.log(`${a}${b}${c}${this.aaa}`, this);
}
var obj = {
    name: 'zuguang',
    aaa: 'hahaha'
}

Function.prototype.reviewCall = function(context, ...args) {
    context = Object(context) || window
    const fn = Symbol()
    context[fn] = this
    const res = context[fn](...args)
    delete context[fn]
    return res
}
// helper1.reviewCall(obj, 1,2,3)

Function.prototype.reviewApply = function (context, argsArr) {
    context = Object(context) || window
    const fn = Symbol()
    context[fn] = this
    const res = context[fn](...argsArr)
    delete context[fn]
    return res
}
// helper1.reviewApply(obj, [1,2,3])


Function.prototype.reviewBind = function (context) {
    if(typeof this !== 'function') throw new TypeError(`${this} must be a function!!!`)
    let self = this, 
        outArgs = [...arguments].slice(1),
        proFn = function () {}
        bound = function() {
            return self.apply(this instanceof bound ? this : context, outArgs.concat([...arguments]))
        }
    proFn.prototype = self.prototype
    bound.prototype = new proFn()
    return bound
}

Function.prototype.copybind = Function.prototype.bind || function bind(thisArg){
    if(typeof this !== 'function'){
        throw new TypeError(this + ' must be a function');
    }
    var self = this;
    var args = [].slice.call(arguments, 1);
    var bound = function(){
        var boundArgs = [].slice.call(arguments);
        var finalArgs = args.concat(boundArgs);
        if(this instanceof bound){
            if(self.prototype){
                function Empty(){}
                Empty.prototype = self.prototype;
                bound.prototype = new Empty();
            }
            var result = self.apply(this, finalArgs);
            var isObject = typeof result === 'object' && result !== null;
            var isFunction = typeof result === 'function';
            if(isObject || isFunction){
                return result;
            }
            return this;
        }
        else{
            return self.apply(thisArg, finalArgs);
        }
    };
    return bound;
}
let newfuck = helper1.copybind(obj,1, 2,3);
newfuck.aaa
let newIns = new newfuck()