/**
 * 函数柯里化
 * @param {*} fn 要柯里化的函数
 */
function curry(fn,args){
    var length = fn.length;
    var args = args||[];
    return function(){
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);

        if(finalArgs.length<length){
            return curry.call(this,fn,finalArgs);
        }else{
            return fn.apply(this,finalArgs);
        }
        
    }
}
// test
// function add(num1,num2,num3){
//     return num1+num2+num3;
// }

// var curriedAdd = curry(add);
// console.log(curriedAdd(3)(4,5));


/**
 * 函数节流
 * @func 函数
 * @time 定时器时间
 * @context 执行上下文
 */
function throttle(func,time,context){
    clearTimeout(func.tId);
    func.tId = setTimeout(function(){
        func.call(context);
    },time);
}
// function resizeDiv(){
//     var throttleTry = document.querySelector(".throttleTry");
//     console.log(throttleTry);
//     throttleTry.getElementsByClassName.height = throttleTry.offsetWidth+"px";
// }
// window.onresize = function(){
//     this.throttle(resizeDiv,500);
// }