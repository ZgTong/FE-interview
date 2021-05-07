const PENDING = Symbol();
const FULFILLED = Symbol();
const REJECTED = Symbol();
class MyPromise{
    constructor(executor){
        this.state = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = (value)=>{
            if (this.state == PENDING) {
                this.state = FULFILLED;
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn(this.value));
            }
        };
        let reject = (reason)=>{
            if (this.state == PENDING) {
                this.state = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn=>fn(this.reason));
            }
        };
        try {
            executor(resolve,reject);
        } catch (error) {
            reject(error);
        }        
    };

    then(onFulfilled, onRejected){
        if (this.state === FULFILLED) {
            onFulfilled(this.value);
        }
        if (this.state === REJECTED) {
            onRejected(this.reason);
        }
        if (this.state === PENDING) {
            this.onRejectedCallbacks.push(onRejected);
            this.onResolvedCallbacks.push(onFulfilled);
        }
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

MyPromise.all = (list)=>{
    return new Promise((resolve, reject)=>{
        let resArr = [];
        let index = 0;
        function processData(i,data){
            resArr[i] = data;
            index += 1;
            if (index == list.length) {
                resolve(resArr);
            }
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

const p = new MyPromise((resolve,reject)=>{
    setTimeout(() => {
        // resolve('success');
        reject('failed');
    }, 3000);
    
})
p.then(res=>{
    console.log(res+":resolve");
},err=>{
    console.log(err+":rejected");
})