function myNew(constructor, ...args) {
    let ins = Object.create(constructor.prototype);
    let res = constructor.call(ins, ...args);
    return typeof res === "object" ? res || ins : ins;
}
function Father(name,age){
    this.name = name;
    this.age = age;
}
Father.prototype.say = function(){
    console.log(this.name);
    return this.name;
}
let son = myNew(Father, "tzg", 18);
console.log(son);
son.say();