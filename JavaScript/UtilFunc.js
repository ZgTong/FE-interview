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
    console.log("1111");
    var tid=null;
    return function(){
        let context = this;
        let args = arguments;
        if(!tid){
            //time 时间内，tid都有引用，不会通过if ，超过time时间执行定时器内回调，清空tid，此时可以执行回调
            tid = setTimeout(
                ()=>{
                    tid = null;
                    func.apply(context,args);
                },time
            )
        }
    }
}

/**
 * 防抖 多次点击刷新定时器
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
    throttleTry.style.height = throttleTry.offsetWidth+"px";
}
window.onresize = throttle(resizeDiv,500);


/**
 * 简易版深拷贝
 * @param {} obj 
 */
function deepClone(obj){
    if (typeof obj =="object") {
        var result = obj.constructor==Array?[]:{};
        for (let key in obj) {
            result[key] = typeof obj[key] == "object"?deepClone(obj[key]):obj[key];
        }
    } else {
        var result = obj
    }
    return result;
}

var obj1 = {
    name:"tzg",
    age:24,
    offers: ['ali','tencent','bytedance'],
    parents:[
        {
            name:"tcs",
            age: 58
        },
        {
            name:"wyf",
            age: 52
        }
    ]
}

var obj2 = deepClone(obj1);
console.log(obj2)


/**
 * 数据类型检测
 * @param {*} obj 
 */
function getType(obj){
    if(obj===null) return String(obj);
    return typeof obj === "object"? Object.prototype.toString.call(obj).replace("[object ","").replace("]","").toLowerCase() : typeof obj;
}

console.log(getType(null));
console.log(getType(undefined));
console.log(getType("tzg"));
console.log(getType(18));
console.log(getType([12,132]));
console.log(getType({name:"tzg",age:18}));
console.log(getType(true));
console.log(getType(/123/));
console.log(getType(new Date()));