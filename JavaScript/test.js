// 类型检测
function getType(obj){
    return typeof obj === "object" ? Object.prototype.toString.call(obj).replace("[object","").replace("]","").toLowerCase() : typeof obj;
}

// 数组乱序
function shuffleArray(arr){
    let len = arr.length;
    for (let i = len-1; i; i--) {
        let j = Math.floor(Math.random()*len);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}
//new 
function my_new(fn, ...args){    
    let obj = Object.create(fn.prototype);
    let res = fn.call(obj,...args);
    return typeof res === "object" ? res||obj : obj;
}

function Father(name,age){
    this.name = name;
    this.age = age;
}
 Father.prototype.say = function(){
     console.log(this.name);
     return this.name;
 }
let son = my_new(Father, "tzg", 18);
console.log(son);
son.say();

// instanceof
function my_instanceof(left, right){
    lp = Object.getPrototypeOf(left);
    rp = right.prototype;
    while(true){
        if (lp===null) {
            return false;
        }
        if (rp ===lp) {
            return true;
        }
        lp = Object.getPrototypeOf(lp);
    }
}
console.log(my_instanceof({},Object))

// 节流
function throttle(func,time,type){
    if (type === 1) {
        var pre = 0;
    }else if (type === 2) {
        var tid;
    }
    return function () {
        let context = this;
        let args = [...arguments];
        if (type === 1) {
            let now = Date.now();
            if (now - pre > time) {
                func.call(context,...args);
            }
        } else if (type === 2) {
            if (!tid) {
                tid = setTimeout(() => {
                    tid = null;
                    func.call(context,...args)
                }, time);
            }            
        }
    }
}

// 防抖
function debounce(func, time, immediate){
    var timer;
    return function(){
        let context = this;
        let args = arguments;
        if (immediate) {
            let callNow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, time);
            if (callNow) func.apply(context,args);
        }else{
            timer = setTimeout(() => {
                func.apply(context,args);
            }, time);
        }
    }
}

// 深拷贝
function deepCopy(obj){
    if (typeof obj === "object" && obj !== null) {
        var res = obj.constructor == Array? [] : {};
        for (let key in obj) {
            res[key] = (typeof obj[key] === "object" && obj[key] !== null) ? deepCopy(obj[key]) : obj[key];
        }
    } else {
        var res = obj;       
    }
    return res;
}

// 函数柯里化
function my_currying(func){
    let len = func.length;
    let args = Array.prototype.slice.call(arguments,1)||[];
    return function () {
        let innerArgs = Array.prototype.slice.call(arguments);
        let newArgs = args.concat(innerArgs);
        if (newArgs.length < len) {
            return my_currying.call(this,func,...newArgs);
        } else {
            return func.apply(this, newArgs);
        }
    }
}

// 数组展平
function flatten(arr) {
    return arr.my_reduce((pre,cur)=>{
        if (Array.isArray(cur)) {
            return [...pre, ...flatten(cur)];
        } else {
            return [...pre, cur];
        }
    },[])
}


// reduce
Array.prototype.my_reduce = function (func, val) {
    for (let i = 0; i < this.length; i++) {
        if (typeof val === 'undefined') {
            val = func(this[i],this[i+1],i+1,this);
        } else {
            val = func(val,this[i],i,this);
        }
        
    }
    return val;
}

var arrTest = [1,2,[3,[4,[5,[6,[7,[8,[9]]]]]]]];
console.log(flatten(arrTest));

// 数组去重
function uniArr1(arr) {
    return arr.filter((cur,index,arr)=>{
        return arr.indexOf(cur,0) === index;
    })
}
function uniArr2(arr) {
    let mp = new Map();
    let resArr = new Array();
    for (let i = 0; i < arr.length; i++) {
        if (mp.has(arr[i])) {
            mp.set(arr[i], true);
        } else {
            mp.set(arr[i], false);
            resArr.push(arr[i]);
        }
        
    }
    return resArr;
}
function uniArr3(arr) {
    return arr.reduce((pre,cur)=>{
        if (!pre.includes(cur)) {
            return pre.concat(cur);
        }else{
            return pre;
        }
    },[])
}
function uniArr4(arr) {
    return Array.from(new Set(arr));
}

function fuck (a,b,c){
    console.log(a+b+c+this.name);
}
var obj = {
    name :"tzg"
}
// call 
Function.prototype.my_newCall = function (obj) {
    obj = obj ? Object(obj) : window;
    let args = [...arguments].slice(1);
    obj.fn = this;
    let res = obj.fn(...args);
    delete obj.fn;
    return res;
}
Function.prototype.my_newApply =  function (obj,arr) {
    obj = obj ? Object(obj) : window;
    obj.fn = this;
    let res;
    if (arr) {
        res = obj.fn(...arr);
    } else {
        res = obj.fn();
    }
    delete obj.fn;
    return res;
}
fuck.my_newCall(obj,"我的","名字","是");

Function.prototype.my_newBind = function(obj){
    if (typeof this !== "function") {
        throw new Error("!!");
    }
    let context = this;
    let args = [...arguments].slice(1);
    let bound = function (...innerArgs) {
        return context.apply(typeof this.constructor === context ? this : obj,args);
    }
    bound.prototype = context.prototype;
    return bound;

}
function a(m, n, o) {
    console.log(this.name + ' ' + m + ' ' + n + ' ' + o);
}

var b = {
    name: 'kong'
};
console.log(a.my_newBind(b, 7, 8)(9));