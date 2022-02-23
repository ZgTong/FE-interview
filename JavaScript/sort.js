let arrtest= [2,3,1,5,4,6]
function swap(arr,i,j) {
    [arr[i],arr[j]] = [arr[j],arr[i]]
}
// 冒泡排序
function bubbleSort(arr) {
    let len = arr.length;
    for (let i = len-1; i > 0; i--) {        
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j+1]) arr.splice(j,1,...arr.splice(j+1,1,arr[j]))
        }
    }
    return arr
}
// console.log(`bubbleSort:`, bubbleSort(arrtest))

// 直接插入排序
function insertionSort(arr) {
    let len = arr.length
    for (let i = 1; i < len; i++) {
        let j = i-1
        let temp = arr[i]
        for (j; j >= 0; j--) {
            if (arr[j] > temp) arr[j+1] = arr[j]
            else break            
        }
        arr[j+1] = temp
    }
    return arr
}
// console.log(`insertionSort:`, insertionSort(arrtest))

// 选择排序
function selectionSort(arr) {
    const len = arr.length
    let minIdx
    for (let i = 0; i < len-1; i++) {
        minIdx = i
        for (let j = i; j < len; j++) {
            if (arr[j]<arr[minIdx]) minIdx = j            
        }
        if (minIdx!==i) swap(arr,i,minIdx)
    }
    return arr
}
// console.log(`selectionSort:`, selectionSort(arrtest))


// 快速排序
function partition(arr,left,right) {
    let pivotVal = arr[(left+(right-left)/2)>>0]
    let i = left
    let j = right
    while (i<=j) {
        while (arr[i] < pivotVal) {
            i++
        }
        while (arr[j] > pivotVal) {
            j--
        }
        if (i<=j) {
            swap(arr, i, j)
            i++
            j--
        }
    }
    return i
}
function quickSort(arr,left=0,right=arr.length-1) {
    if (arr.length > 1) {
        const baseIdx = partition(arr,left,right)
        if (left < baseIdx-1) {
            quickSort(arr,left,baseIdx-1)
        }
        if (baseIdx < right) {
            quickSort(arr,baseIdx,right)
        }
    }
    return arr
}

// console.log(`quickSort:`, quickSort(arrtest))

// 归并排序
function mergeArr(arr1,arr2) {
    const len1 = arr1.length, len2 = arr2.length
    let i = 0,j = 0, res = []
    while (i < len1 && j < len2) { //合并
        if (arr1[i] < arr2[j]) {
            res.push(arr1[i])
            i++
        } else {
            res.push(arr2[j])
            j++
        }
    }
    if (i<len1) return res.concat(arr1.slice(i))
    else return res.concat(arr2.slice(j))
}

function mergeSort(arr) {
    let len = arr.length
    if (len<=1) return arr
    let mid = (len/2)>>0
    const lArr = mergeSort(arr.slice(0,mid))
    const rArr = mergeSort(arr.slice(mid,len))
    return mergeArr(lArr,rArr)
}
// console.log(`quickSmergeSortort:`, mergeSort(arrtest))

// 希尔排序
function shellSort(arr) {
    const len = arr.length
    let gap = (len/2)>>0
    while (gap) {
        for (let i = gap; i < len; i++) {            
            for (let j = i-gap; j >= 0; j -= gap) {
                if(arr[j] > arr[j+gap]) swap(arr, j, j+gap)
                else break
            }
        }
        gap = (gap/2)>>0
    }
    return arr
}
console.log(`shellSort:`, shellSort(arrtest))