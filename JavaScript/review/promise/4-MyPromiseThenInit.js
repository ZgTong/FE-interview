const 
    PENDING = Symbol(),
    FULFILLED = Symbol(),
    REJECTED = Symbol();
class MyPromise {
    constructor(executor){
        this.initValue();
        this.initBind();
        try {
            executor(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    };

    resolve(value){
        if(this.PromiseState !== PENDING) return;
        this.PromiseResult = value;
        this.PromiseState = FULFILLED;
    };

    reject(reason){
        if(this.PromiseState !== PENDING) return;
        this.PromiseResult = reason;
        this.PromiseState = REJECTED;
    };

    initBind(){
        this.resolve.bind(this);
        this.reject.bind(this);
    };

    initValue(){
        this.PromiseState = PENDING;
        this.PromiseResult = undefined;
    };

    then(onFulfilled, onRejected){
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
        onRejected = typeof onRejected === "function" ? onRejected : reason => {throw reason};

        if(this.PromiseState === FULFILLED) onFulfilled(this.PromiseResult);
        else if(this.PromiseState === REJECTED) onRejected(this.PromiseResult);
    };
}