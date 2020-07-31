/**
 * 
 * 针对cookie操作的公共方法
 */
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
function curry(fn,args){
    var length = fn.length; //3
    var args =args||[];//[]
    console.log(args)
    return function(){
        var innerArgs = Array.prototype.slice.call(arguments);
        var newArgs = args.concat(innerArgs);
        if (newArgs.length<length) {
            return curry.call(this,fn,newArgs);
        } else {
            return fn.apply(this,newArgs);
        }
    }

}


// test
function add(num1,num2,num3){
    return num1+num2+num3;
}

var curriedAdd = curry(add);
console.log(curriedAdd(5,4)(3));


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

function throttle1(func,time,type) {
    if (type===1) {
        var pre = 0;
    }else if (type===2) {
        var tid;
    }

    return function(){
        let context = this ;
        let args = arguments;
        if (type===1) {
            let now = new Date();
            if (now-pre >time) {
                func.apply(context,args);
                pre=now
            }
        } else if (type===2) {
            if (!tid) {
                tid= setTimeout(() => {
                    tid = null;
                    func.apply(context,args);
                }, time);
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
                //可有可无,重复
                timer = null;
            }, time);
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


/**
 * 数据类型检测
 * @param {*} obj 
 */
function getType(obj){
    if(obj===null) return String(obj);
    return typeof obj === "object"? Object.prototype.toString.call(obj).replace("[object ","").replace("]","").toLowerCase() : typeof obj;
}

