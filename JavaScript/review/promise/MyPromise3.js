const 
    PENDING = Symbol(),
    FULFILLED = Symbol(),
    REJECTED = Symbol();
class MyPromise {
    constructor(executor){
        this.state = PENDING;
        this.result = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
        try {
            executor(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }

    resolve(value){
        if(this.state = PENDING){
            this.state = FULFILLED;
            this.result = value;
            while(this.onResolvedCallbacks.length) this.onResolvedCallbacks.shift()(this.result);
        }
    }

    reject(reason){
        if(this.state = PENDING){
            this.state = REJECTED;
            this.result = reason;
            while(this.onRejectedCallbacks.length) this.onRejectedCallbacks.shift()(this.result);
        }
    }

    then(onFulfilled, onRejected) {
        let thenPromise = new MyPromise((resolve, reject) => {
            const resolvePromise = callback => {
                try {
                    const x = callback(this.result); 
                    if(x === thenPromise) throw new Error("Cannot return itself");
                    else if(x instanceof MyPromise) x.then(resolve, reject);
                    else resolve(x);
                } catch (error) {
                    reject(error);
                    throw new Error(error);
                }
            };
            if(this.state == FULFILLED) resolvePromise(onFulfilled);
            if(this.state == REJECTED) resolvePromise(onRejected);
            if(this.state == PENDING) {
                this.onResolvedCallbacks.push(resolvePromise.bind(this, onFulfilled));
                this.onResolvedCallbacks.push(resolvePromise.bind(this, onRejected));
            }
        })
        return thenPromise;
    }
}