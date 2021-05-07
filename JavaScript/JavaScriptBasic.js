const p1 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve('fuck有'), 10000)
  })
  
const p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("P2 resolve"), 5000)
})

p2
.then(result => console.log(result))
.catch(error => console.log(error))

//红灯3秒亮一次，绿灯1秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：
function red(){console.log("red")};
function yellow(){console.log("yellow")};
function green(){console.log("green")};
var light = function (timer,fn) {
    return new Promise((resolve,reject)=>{
        setTimeout(function () {
            fn();
            resolve();
        },timer)
    })
}

var step = function () {
    Promise.resolve().then(function () {
        return light(3000,red)
    }).then(function () {
        return light(2000, green);
    }).then(function () {
        return light(1000, yellow);
    }).then(function () {
        step();
    });
}

step();

//reduce 函数
//计算数组中每个元素出现的次数
let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
let nameNums = names.reduce((pre,cur,idx,arr)=>{
    if (cur in pre) {
        pre[cur]++;
    } else {
        pre[cur]=1;
    }
    return pre;
},{})

console.log(nameNums)
var p = new Promise((resolve, reject) => {
    reject(Error('The Fails!'))
  })
  .catch(error => console.log(error.message))
  .catch(error => console.log(error.message))


  var p = new Promise((resolve, reject) => {
    reject(Error('The Fails!'))
  })
  .catch(error => console.log(error))
  .then(error => console.log(error))


  Promise.resolve('Success!')
  .then(() => {
    throw Error('Oh noes!')
  })
  .catch(error => {
    return 'actually, that worked'
  })
  .then(data => {
    throw Error('The fails!')
  })
  .catch(error => console.log(error.message))

const tasks= [];
const output = (i)=>new Promise((resolve)=>{
    setTimeout(() => {
        console.log(i);
        resolve();
    }, 1000*i);
})

for (var j = 0; j < 5; j++) {
    tasks.push(output(j));
}
Promise.all(tasks).then(()=>{
    setTimeout(() => {
        console.log(j)
    }, 1000);
})

var name = "The Window";
　　var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　return function(){
　　　　　　　　return this.name;
　　　　　　};
　　　　}
　　};

console.log(object.getNameFunc()());

const arr = [1,2,3];
arr.reduce((p,c)=>{
    return p.then(r=>{
            return new Promise(r=>{
                setTimeout(() => r(console.log(c)), 1000);
            })
        }
    )
},Promise.resolve())