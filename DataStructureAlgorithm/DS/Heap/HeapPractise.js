class MinHeap {
    constructor(size){
        this.arr = []
        this.capacity = size || Number.MAX_VALUE
        this.currentSize = 0
    }
    swapArrEle(arr, e1, e2) {
        [arr[e1], arr[e2]] = [arr[e2], arr[e1]]
    }
    getParent(childIdx){
        return Math.floor((childIdx - 1) / 2)
    }
    getLeftChild(parentIdx){
        return 2*parentIdx + 1
    }
    getRightChild(parentIdx){
        return 2*parentIdx + 2
    }
    getMin(){
        return arr[0]
    }
    insertEle(ele){
        if(this.capacity <= this.currentSize) return false
        let idx = this.currentSize
        this.arr[idx] = ele
        this.currentSize++
        while (idx !== 0 && this.arr[idx] < this.arr[this.getParent(idx)]) {
            this.swapArrEle(this.arr, idx, this.getParent(idx))
            idx = this.getParent(idx)
        }
        return true
    }
    minHeapify(root){
        let lc = this.getLeftChild(root), rc = this.getRightChild(root), smallest = root
        if(lc < this.currentSize && this.arr[lc] < this.arr[smallest]) smallest = lc
        if(rc < this.currentSize && this.arr[rc] < this.arr[smallest]) smallest = rc
        if (smallest !== root) {
            this.swapArrEle(this.arr, root, smallest)
            this.minHeapify(smallest)
        }
    }
    extractMin(){
        if(this.currentSize <= 0) return false
        if (this.currentSize == 1) {
            this.currentSize--
            return this.arr[0]
        }
        let root = this.arr[0]
        this.arr[0] = this.arr[this.currentSize - 1]
        this.currentSize--
        this.minHeapify(0)
        return root
    }
}

let h = new MinHeap(11)
h.insertEle(2);
h.extractMin();
console.log(h.arr.slice(0, h.currentSize));
h.insertEle(3);
h.insertEle(4);
h.extractMin();
console.log(h.arr.slice(0, h.currentSize));
// h.insertEle(5);
// h.insertEle(6);
// h.extractMin();
// console.log(h.arr.slice(0, h.currentHeapSize));
// h.insertEle(7);
// console.log(h.arr.slice(0, h.currentHeapSize));