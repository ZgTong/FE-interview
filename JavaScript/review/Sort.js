let testArr = [2, 11, 1, 3, 7, 8, 6, 9, 4, 10, 5];
function swap(arr,i,j) {
    [arr[i],arr[j]] = [arr[j],arr[i]]
}
//选取最后一个作为基准，将所有比基准大的放右边
const partition = (arr, low ,high) => {
    console.log(low, high)
    let pivot = arr[high],
        i = low - 1;
    for(let j = low; j < high; j++){
        if(arr[j] <= pivot) swap(arr, ++i, j);
    }
    swap(arr, i + 1, high);
    return i + 1;
}

const partition1 = (arr, begin ,end) => {
    let pivot = arr[begin],
        pos = begin;
    for(let i = begin + 1; i <= end; i++){
        if(arr[i] <= pivot) swap(arr, ++pos, i);
    }
    swap(arr, pos, begin);
    return pos;
}

const quickSort = (arr, l ,r) => {
    //前序遍历的思想
    if(l<r){
        let pivot = partition1(arr, l, r);
        quickSort(arr, l, pivot - 1);
        quickSort(arr, pivot + 1, r);
    }
}
quickSort(testArr, 0 , 10)
console.log(testArr);