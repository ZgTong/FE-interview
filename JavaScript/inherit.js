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

/**
 * 原型继承 Prototypal Inheritence
 * 缺点：
 * 单一继承，
 * 不能向父类传递参数，
 * 原型链继承多个实例的引用类型属性指向相同，一个实例修改了原型属性，另一个实例的原型属性也会被修改
 * **/

Per.prototype = new Person();

/**
 * 借用构造函数（经典继承）Pseudoclassical Inheritence，通过call复制父类构造器到子类，并扩展
 * 缺点：
 * 不能复用，代码臃肿，每个子类都有父类的实例副本
 * 只能继承父类的实例属性和方法，不能继承原型属性/方法；
 * **/
function Con() { 
    Person.call(this,'ll');
    this.age = 12;
}

/**
 * 组合继承 conbination 
 * 将原型链继承和构造函数继承这两种模式的优点组合在一起，通过调用父类构造，继承父类的属性并保留传参，然后通过将父类实例作为子类原型，实现函数复用。
 * 缺点：父类中的实例属性和方法既存在于子类的实例中，又存在于子类的原型中，不过仅是内存占用，因此，在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法。
 * **/ 
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

// 寄生式继承（原型式加壳子） Parasitic
function subObj(obj) {
    var sub = content(obj);
    return sub;
}
// 寄生组合式继承 Parasitic Conbination 
var content = subObj();
function SonObj() {
    Person.call(this)
}
SonObj.prototype = content;
content.constructor = SonObj;