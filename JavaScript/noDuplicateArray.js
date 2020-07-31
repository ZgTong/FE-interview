//数组去重方法总结
var arr = [1,2,3,4,4,2,1];
//reduce 和includes
function uniqueArr(arr){ 
    return arr.reduce((pre,cur,idx,arr)=>{
        if (!pre.includes(cur)) {
            return pre.concat(cur);
        } else {
            return pre
        }
    },[])
}
//Set
function uniqueArr1(arr) {
    return Array.from(new Set(arr));
}
//indexof
function uniqueArr2(arr) {
    if (!Array.isArray(arr)) {
        console.log("type error");
        return
    }
    var newArr =[];
    for (let i = 0; i < arr.length; i++) {
        
        if (newArr.indexOf(arr[i])===-1) {
            newArr.push(arr[i]);
        }
        
    }
    return newArr;
}
arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
//排序后当前遍历的项与前一个有无重复
function uniqueArr3(arr) {
    if (!Array.isArray(arr)) {
        console.log("type error");
        return
    }
    arr = arr.sort((a,b)=>{
        return a-b;
    });
    var newArr = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        if(arr[i]!==arr[i-1]){
            newArr.push(arr[i]);
        } 
    }
    return newArr;
}
//hasOwnProperty
function uniqueArr4(arr) {
    var obj = {}
    return arr.filter((item,index,arr)=>{
        return obj.hasOwnProperty(typeof item+item)?false:(obj[typeof item+item]=true)
    });
}
//filter
function uniqueArr5(arr) {
    return arr.filter(function (item,index,arr) {
        //如果不是第一个，就说明重复，舍弃
        return arr.indexOf(item,0)===index;
    })
}
//ES6 map
arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
function uniqueArr6(arr) {
    let map = new Map();
    let array = new Array();
    for (let i = 0; i < arr.length; i++) {
        if (map.has(arr[i])) {
            map.set(arr[i],true);
        }else{
            map.set(arr[i],false);
            array.push(arr[i]);
        }
        
    }
    return array;

}

function uniqueArr7(ARR) {
    
}
arrnew = uniqueArr6(arr)
console.log(arrnew)