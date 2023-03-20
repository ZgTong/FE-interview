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
        return Math.floor((childIdx - 1) / 2);
    }
    getLeftChild(parentIdx){
        return 2 * parentIdx + 1;
    }
    getRightChild(parentIdx){
        return 2 * parentIdx + 2;
    }
    getMin(){
        return this.arr[0];
    }
    insertEle(ele){
        if(this.currentSize === this.capacity) return false;
        let i = this.currentSize;
        this.arr[i] = ele;
        this.currentSize++;
        while(i !== 0 && this.arr[i] < this.arr[this.getParent(i)]){
            this.swapArrEle(i, this.getParent(i));
            i = this.getParent(i);
        }
        return true;
    }
    minHeapify(root){
        
    }
    extractMin(){
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