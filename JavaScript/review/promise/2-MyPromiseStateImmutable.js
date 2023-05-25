const 
    PENDING = Symbol(),
    FULFILLED = Symbol(),
    REJECTED = Symbol();
class MyPromise {
    constructor(executor){
        this.initValue();
        this.initBind();
        executor(this.resolve,this.reject);
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
}