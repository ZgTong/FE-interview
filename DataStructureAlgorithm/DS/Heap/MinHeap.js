class Minheap {
    constructor(size){ 
        this.arr = []
        this.capacity = size || Number.MAX_VALUE
        this.currentHeapSize = 0
    }

    swapArrEle(arr, e1, e2) {
        [arr[e1], arr[e2]] = [arr[e2], arr[e1]]
    }

    getParent(key){
        return Math.floor((key-1)/2)
    }

    getLeftChild(key){
        return 2*key + 1
    }

    getRightChild(key){
        return 2*key + 2
    }

    // 直接return arr[0]
    getMin(){
        return this.arr[0]
    }

    // 插入时只做自底向上交换，但不堆化,此时顶部最小
    insertKey(key){
        if (this.currentHeapSize === this.capacity) return false
        let i = this.currentHeapSize
        this.arr[i] = key
        this.currentHeapSize++
        while (i !== 0 && this.arr[i] < this.arr[this.getParent(i)]) {
            this.swapArrEle(this.arr, i, this.getParent(i))
            i = this.getParent(i)
        }
        return true
    }

    //找到最小的位置，递归判断是否是根。
    minHepify(rootKey){
        let lc = this.getLeftChild(rootKey), rc = this.getRightChild(rootKey), smallest = rootKey
        if(lc < this.currentHeapSize && this.arr[lc] < this.arr[smallest]) smallest = lc
        if(rc < this.currentHeapSize && this.arr[rc] < this.arr[smallest]) smallest = rc
        if (smallest !== rootKey) {
            this.swapArrEle(this.arr, rootKey, smallest)
            this.minHepify(smallest)
        }
    }

    //顶部就是最小的，然后用最后一个替代顶部，堆化
    extractMin(){
        if(this.currentHeapSize <= 0) return false
        if (this.currentHeapSize == 1) {
            this.currentHeapSize--
            return this.arr[0]
        }
        let root = this.arr[0]
        this.arr[0] = this.arr[this.currentHeapSize - 1] //最下面的放上去覆盖提取出来的
        this.currentHeapSize--
        this.minHepify(0)
        return root
    }

    decreaseKey(key, new_val){
        this.arr[key] = new_val
        while (key !== 0 && this.arr[key] < this.arr[this.getParent(key)]) {
            this.swapArrEle(this.arr, key, this.getParent(key))
            key = this.getParent(key)
        }
    }

    increaseKey(key, new_val){
        this.arr[key] =  new_val
        this.minHepify(key)
    }

    changeValueOnAKey(key, new_val){
        if (this.arr[key] === new_val) return 
        if (this.arr[key] < new_val) this.increaseKey(key, new_val) 
        if (this.arr[key] > new_val) this.decreaseKey(key, new_val)  
    }

    deleteKey(key){
        this.decreaseKey(key, Number.MIN_VALUE)
        this.extractMin()
    }
}

let h = new Minheap(11)
h.insertKey(2);
h.extractMin();
console.log(h.arr.slice(0, h.currentHeapSize));
h.insertKey(3);
h.insertKey(4);
h.extractMin();
console.log(h.arr.slice(0, h.currentHeapSize));
// h.insertKey(5);
// h.insertKey(6);
// h.extractMin();
// console.log(h.arr.slice(0, h.currentHeapSize));
// h.insertKey(7);
// console.log(h.arr.slice(0, h.currentHeapSize));