/**
 * 函数柯里化
 * @param {*} fn 要柯里化的函数
 */
function curry(fn,args){
    var length = fn.length; //3
    var args =args || [];//[]
    return function(){
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        if (finalArgs.length<length) {
            return curry.call(this,fn,finalArgs);
        } else {
            return fn.apply(this,finalArgs);
        }
    }

}

// test
function add(num1,num2,num3){
    return num1+num2+num3;
}

var curriedAdd = curry(add);
console.log(curriedAdd(3)(4,5));


/**
 * 函数节流
 * @func 函数
 * @time 定时器时间
 */
function throttle(func,time){
    var tid =null;
    return function(){
        let context = this;
        let args = arguments;
        if(!tid){
            tid = setTimeout(
                ()=>{
                    tid = null;func.apply(context,args);
                },time
            )
        }
    }
}
/**
 * 防抖
 * @param {*} func 
 * @param {*} time 
 * @param {*} immediate 是否立即执行
 */
function debounce(func,time,immediate){
    let timer;
    return function(){
        let context = this;
        let args = arguments;
        if(timer){
            clearTimeout(timer);
        }

        if (immediate) {
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait);
            if(callNow) {
                func.apply(context,args)
            };
        } else {
            timer = setTimeout(() => {
                func.apply(this, args)
              }, time)
        }

    }
}

function resizeDiv(){
    var throttleTry = document.querySelector(".throttleTry");
    console.log(throttleTry);
    throttleTry.getElementsByClassName.height = throttleTry.offsetWidth+"px";
}
window.onresize = throttle(resizeDiv,3000);


