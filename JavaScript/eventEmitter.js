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
            this.events.forEach(listener => {
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
    once(){
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

pubSub.subscribe('name', name => {
    console.log(`your name is ${name}`);
})
pubSub.subscribe('gender', gender => {
    console.log(`your name is ${gender}`);
})
pubSub.publish('name', 'leaf333'); 
pubSub.publish('gender', '18'); 