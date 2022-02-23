/**
 * 
 * 针对cookie操作的公共方法
 */
// str = "name=tzg;age=19";
// console.log(str.indexOf("name="));
// console.log(str.indexOf(";",0));


var CookieUtil = {
    get:function(name){
        var cookieName = encodeURIComponent(name)+"=";
            cookieStart = document.cookie.indexOf(cookieName);
            cookieValue = null;
        if(cookieStart>-1){
            var cookieEnd = document.cookie.indexOf(";",cookieStart);
            if(cookieEnd==-1){
                cookieEnd=document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
        }
        return cookieValue
    },

    set:function(name,value,expires,path,domain,secure){
        var cookieText = encodeURIComponent(name)+"="+encodeURIComponent(value);
        if(expires instanceof Date){
            cookieText+=";expires="+expires.toGMTString();
        }
        if(path){
            cookieText+=";path="+path;
        }
        if(domain){
            cookieText+=";domain="+domain;
        }
        if(secure){
            cookieText+=";secure";
        }
        document.cookie=cookieText;
    },
    unset:function(name,path,domain,secure){
        this.set(name,"",new Date(0),path,domain,secure);
    }
}

/**
 *  事件的公共方法
 */
var EventUtil = {
    /**
     * 添加事件
     * @param {*} element 元素
     * @param {*} type 事件类型
     * @param {*} handler 处理
     */
    addHandler:function (element,type,handler) {
        if (element.addEventListener) {
            element.addEventListener(type,handler,false);
        } else if (element.attachEvent) {
            element.attachEvent("on"+type,handler);
        } else {
            element["on"+type]=handler;
        }
    },


    /**
     * 移除事件
     * @param {*} element 
     * @param {*} type 
     * @param {*} handler 
     */
    removeHandler:function(element,type,handler){
        if (element.removeEventListener) {
            element.removeEventListener(type,handler,false);
        } else if (element.detachEvent) {
            element.detachEvent("on"+type,handler);
        } else {
            element["on"+type]=handler;
        }
    }
}

/**
 * 函数柯里化
 * @param {*} fn 要柯里化的函数
 */
function curry(fn){
    var length = fn.length; //3
    var args =Array.prototype.slice.call(arguments,1)||[];//[]
    console.log("curry:"+args)
    return function(){
        var innerArgs = Array.prototype.slice.call(arguments);
        console.log("inner:"+innerArgs)
        var newArgs = args.concat(innerArgs);
        if (newArgs.length<length) {
            return curry.call(this,fn,...newArgs);
        } else {
            return fn.apply(this,newArgs);
        }
    }

}


// test
function add(num1,num2,num3){
    return num1+num2+num3;
}

var curriedAdd = curry(add,4);
console.log(curriedAdd(2,3));


/**
 * 函数节流
 * @func 函数
 * @time 定时器时间
 */
function throttle(func,time,type){
    if (type===1) {
        var pre = 0;
    }else if (type===2) {
        var tid;
    }
    return function(){
        let context = this;
        let args = arguments;
        console.log(args);
        if (type===1) {
            let now = Date.now();
            if (now-pre>time) {
                func.apply(context,args);
                pre = now;
            }
        } else if(type===2) {
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
            }, time);
            if(callNow) {
                func.apply(context,args)
            };
        } else {
            timer = setTimeout(() => {
                func.apply(context, args)
              }, time)
        }

    }
}

/**
 * 简易版深拷贝
 * @param {} obj 
 */
function deepClone(obj){
    if (typeof obj =="object" && obj !== null) {
        var result = obj.constructor == Array ? [] : {};
        for (let key in obj) {
            //数组是索引，对象是key
            result[key] = (typeof obj[key] == "object" && obj !== null) ? deepClone(obj[key]) : obj[key];
        }
    } else {
        var result = obj
    }
    return result;
}

console.log("res:" + deepClone([{a:1,b:2},{2:2},[1,3,2]]));

/**
 * 数组展平一维  reduce和es6 ...
 * @param {*} arr 
 */
function arrayFlattenAllIn(arr){
    return arr.reduce((pre ,cur)=>{
        console.log(pre, cur);
        if (Array.isArray(cur)) {
            return [...pre,...arrayFlatten(cur)];
        } else {
            return [...pre,cur]
        }
    },[])
}

function* arrayFlattenGenerator(arr){
    let length = arr.length;
    for (let i = 0; i < length; i++) {
        let item = arr[i];
        if (typeof item !=="number") {
            yield* arrayFlattenGenerator(item);
        } else {
            yield item;
        }
    }
}
// var arrTest = [1,2,[3,[4,[5,[6,[7,[8,[9]]]]]]]];
// for (let f of arrayFlattenGenerator(arrTest)) {
//     console.log(f);
// }

function arrayFlattenWithDeep(arr,depth=1){
    var res =[];
    for (let i = 0; i < arr.length; i++) {
        let cur = arr[i];
        if (depth > 0 && Array.isArray(cur)) {
            res = res.concat(arrayFlattenWithDeep(cur,depth-1));
        } else {
            // 当前项cur不是数组，就直接加到res的后面
            res.push(cur);
        }
        
    }
    return res;
}

var arrTest = [1,2,[3,[4,[5,[6,[7,[8,[9]]]]]]]];
var arrTest2 = [1,[2,3]];
console.log(arrayFlattenWithDeep(arrTest,6));


/**
 * 手写instanceof
 * @param {*} left 要检测的对象 
 * @param {*} right 构造函数
 */
function myInstanceof(left,right){
    if (typeof left !=="object"||left ===null) {
        return false;
    }
    let rp = right.prototype;
    let lp = Object.getPrototypeOf(left);
    while (true) {
        //找到了最顶层
        if (lp===null) {
            return false;
        }
        if (rp===lp) {
            return true;
        }
        lp = Object.getPrototypeOf(lp);
    }
}


/**
 * 手写new方法
 * @param {*} fn 构造函数
 * @param  {...any} args 
 */
function myNew (fn,...args){
    let obj = Object.create(fn.prototype);
    let res = fn.call(obj,...args);
    // return res instanceof Object ? res:obj;
    return typeof res == "object" ? res || obj : obj
    // if ((res!==null&&typeof res =="object") || typeof res ==="function") {
    //     return res;
    // }
    // return obj;

}

/**
 * 数组乱序
 * @param {*} arr 
 */
function shuffle(arr){
    for (let i = arr.length; i; i--) {
        // let j = Math.floor(Math.random() * i);
        let j = (Math.random() * i) >> 0;
        [arr[i-1], arr[j]] = [arr[j], arr[i-1]];
    }
    return arr;
}
var arr =[1,2,3,4,5];
shuffle(arr)
console.log(arr);

/**
 * 数据类型检测
 * @param {*} obj 
 */
function getType(obj){
    // if(obj===null) return String(obj);
    return typeof obj === "object" ? Object.prototype.toString.call(obj).replace("[object ","").replace("]","").toLowerCase() : typeof obj;
}


/**
 * 
 * 千位分隔符
 * 
 * */
function parseNum(num) {
    let numStr = num + "";
    let numNewStr = "";
    for (let i = numStr.length - 1, j = 1; i >= 0 ; i--, j++) {
        if (j % 3 == 0 && i != 0) {
            numNewStr += numStr[i] + ",";
            continue;
        }
        numNewStr += numStr[i];
    }
    return numNewStr.split("").reverse().join("");
}

