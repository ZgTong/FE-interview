class Maxheap {
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

    getMin(){
        return arr[0]
    }

    insertKey(key){
        if (this.currentHeapSize === this.capacity) return false
        let i = this.currentHeapSize
        this.arr[i] = key
        this.currentHeapSize++
        while (i !== 0 && this.arr[i] > this.arr[this.getParent(i)]) {
            this.swapArrEle(this.arr, i, this.getParent(i))
            i = this.getParent(i)
        }
        return true
    }

    decreaseKey(key, new_val){
        this.arr[key] = new_val
        while (key !== 0 && this.arr[key] > this.arr[this.getParent(key)]) {
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
        if (this.arr[key] > new_val) this.increaseKey(key, new_val) 
        if (this.arr[key] < new_val) this.decreaseKey(key, new_val)  
    }

    minHepify(rootKey){
        let lc = this.getLeftChild(rootKey), rc = this.getRightChild(rootKey), smallest = rootKey
        if(lc < this.currentHeapSize && this.arr[lc] > this.arr[smallest]) smallest = lc
        if(rc < this.currentHeapSize && this.arr[rc] > this.arr[smallest]) smallest = rc
        if (smallest !== rootKey) {
            this.swapArrEle(this.arr, rootKey, smallest)
            this.minHepify(smallest)
        }
    }

    extractMin(){
        if(this.currentHeapSize <= 0) return false
        if (this.currentHeapSize == 1) {
            this.currentHeapSize--
            return this.arr[0]
        }
        let root = this.arr[0]
        this.arr[0] = this.arr[this.currentHeapSize - 1]
        this.currentHeapSize--
        this.minHepify(0)
        return root
    }

    deleteKey(key){
        this.decreaseKey(key, Number.MAX_VALUE)
        this.extractMin()
    }
}

let h = new Maxheap(11)
h.insertKey(3);
h.insertKey(2);
h.deleteKey(1);
h.insertKey(15);
h.insertKey(5);
h.insertKey(4);
h.insertKey(25);
console.log(h.arr.slice(0, h.currentHeapSize));