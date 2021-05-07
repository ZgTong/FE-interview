function Person(name) {
    this.name = name;
    this.sum = function () {
        alert(this.name);
    }
}
Person.prototype.age = 18;

function Per() {
    this.name = "tzg";    
}

//原型继承
Per.prototype = new Person();

//借用构造函数
function Con() { 
    Person.call(this,'ll');
    this.age = 12;
}

// 组合继承
function SubType(name) {
    Person.call(this,name);
}
SubType.prototype = new Person();

// 原型式继承
function content(obj) {
    function F() {
        
    }
    F.prototype = obj;
    return new F();
}

// 寄生式继承（原型式加壳子）
function subObj(obj) {
    var sub = content(obj);
    return sub;
}
// 寄生组合式继承
var content = subObj();
function SonObj() {
    Person.call(this)
}
SonObj.prototype = content;
content.constructor = SonObj;