Function.prototype.myCall = function (obj, ...args) {
    obj = obj ? Object(obj) : window;
    const fn = Symbol();
    obj[fn] = this;
    let res = obj[fn](...args);
    delete obj[fn];
    return res;
}

Function.prototype.myApply = function (obj, arr) {
    obj = obj ? Object(obj) : window;
    const fn = Symbol();
    obj[fn] = this;
    let res = obj[fn](...arr);
    delete obj[fn];
    return res;
}

Function.prototype.myBind = function (obj) {
    const
        self = this, // test()
        args = [...arguments].slice(1),
        bound = function () { //2, 3
            const 
                innerArgs = Array.prototype.slice.call(arguments),
                finalArgs = args.concat(innerArgs),
                getType = function (obj){
                    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
                };
            if (new.target) {
                console.log("this", this)
                if(self.prototype){
                    function Empty() {};
                    Empty.prototype = self.prototype;
                    bound.prototype = new Empty();
                }
                let res = self.apply(this, finalArgs);
                console.log(res, self, this, self.prototype);
                if(getType(res) === "object" || getType(res) === "function") return res;
                return this;
            } else return self.apply(obj, finalArgs);
        };
    return bound;
}

function test(a, b, c) {
    this.name = b;
    console.log(a, b, c, this.name);
}
const testObj = {
    name: 'zuguang'
}
// console.log(test.prototype);
test.myApply(testObj, [1, 2, 3]);
test.myCall(testObj, 1, 2, 3);
let bd = test.bind(testObj, 1);
let newNew = new bd(2,3)