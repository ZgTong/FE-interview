class PriorityQueue {
    constructor(comparator){
        this.arr = [];
        this.comparator = comparator || ((a, b) => a - b);
    }
    swapArrEle(e1, e2) {
        [this.arr[e1], this.arr[e2]] = [this.arr[e2], this.arr[e1]]
    }
}