const PENDING = Symbol();
const FULFILLED = Symbol();
const REJECTED = Symbol();
class MyPromise{
    constructor(executor){
        this.state = PENDING;
        this.result = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = (value)=>{
            if (this.state == PENDING) {
                this.state = FULFILLED;
                this.result = value;
                while(this.onResolvedCallbacks.length) this.onResolvedCallbacks.shift()(this.result);
            }
        };
        let reject = (reason)=>{
            if (this.state == PENDING) { // if判断状态不可变
                this.state = REJECTED;
                this.result = reason;
                while(this.onRejectedCallbacks.length) this.onRejectedCallbacks.shift()(this.result);
            }
        };
        resolve.bind(this);
        reject.bind(this);
        try {
            executor(resolve,reject);
        } catch (error) { // 处理throw，等同reject
            reject(error);
        }        
    };

    then(onFulfilled, onRejected){
        //思路：基础版本，根据state决定执行onFulfilled， onRejected
        //      考虑延时，定时器，在pending状态下存入数组
        //      链式调用
        //      微任务
        let thenPromise = new MyPromise((resolve, reject) => {
            const resolvePromise = callback => {
                try {
                    const x = callback(this.result); //执行onFulfilled onRejected的结果
                    if(x === thenPromise) throw new Error("Cannot return itself.");
                    else if(x instanceof MyPromise) x.then(resolve, reject); // 是promise，递归至不是promise
                    else resolve(x); // 不是promise直接成功
                } catch (error) {
                    reject(error);
                    throw new Error(error);
                }
            };
            if (this.state === FULFILLED) resolvePromise(onFulfilled);
            if (this.state === REJECTED) resolvePromise(onRejected);
            if (this.state === PENDING) {
                this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected));
                this.onResolvedCallbacks.push(resolvePromise.bind(this, onFulfilled));
            }
        });
        return thenPromise;
    }
}
const isPromise = (value)=>{
    if ((typeof value === "object" && value != null) || typeof value === "function") {
        if (typeof value.then == "function") {
            return true;
        }
    } else {
        return false;
    }
}

MyPromise.all = (list) => {
    return new Promise((resolve, reject)=>{
        let resArr = [];
        let index = 0;
        function processData(i,data){
            resArr[i] = data;
            index += 1;
            if (index == list.length) resolve(resArr);
        }
        for (let i = 0; i < list.length; i++) {
            if (isPromise(list[i])) {
                list[i].then((data)=>{
                    processData(i,data);
                },(err)=>{
                    reject(err);
                    return;
                })
            } else {
                processData(i,list[i])
            }
            
        }
    })
}

const p = new MyPromise((resolve, reject)=>{
    setTimeout(() => {
        resolve('success');
        // reject('failed');
    }, 3000);
    
})

p.then(
    res => {
        return res+":resolve first"
    },
    err => err+":rejected"
).then(res => console.log(res + ":resolve second"));