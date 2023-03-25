class EventEmitter {
    constructor(){
        this.events = Object.create(null);
    }
    on(type, cb){
        let events = this.events;
        if (events[type]) {
            events[type].push(cb);
        } else {
            events[type] = [cb];
        }
    }
    emit(type,...args){
        if(this.events[type]){
            this.events[type].forEach(listener => {
                listener.call(this,...args);
            });
        }
    }
    off(type,cb){
        let events = this.events;
        if (events[type]) {
            events[type] = events[type].filter(listener=>{
                return listener !== cb && listener.listen !== cb;
            })
        }
    }
    once(type, cb){
        function wrap() {
            cb(...arguments);
            this.off(type, wrap);
        }
        // 先绑定，调用后删除
        wrap.listen = cb;
        // 直接调用on方法
        this.on(type, wrap);
    }
}
const pubSub = new EventEmitter();
pubSub.on('name', name => {
    console.log(`your name is ${name}`);
})
pubSub.on('name', name => {
    console.log(`She's name is ${name}`);
})
pubSub.on('gender', gender => {
    console.log(`your name is ${gender}`);
})
pubSub.emit('name', 'leaf333'); 
pubSub.emit('gender', '18'); 