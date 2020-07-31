(function () {
    // 判断function
    function isFunction(fn) {
        return typeof fn === 'function';
    }

    // 状态 pending、fulfilled、rejected
    var PENDING = 'pending';
    var FULFILLED = 'fulfilled';
    var REJECTED = 'rejected';

    // 构造方法
    var Kromise = function (handle) {
        // 当前状态
        this._status = PENDING;
        // 添加成功回调队列
        this._fulfilledQueue = [];
        // 添加失败回调队列
        this._rejectedQueue = [];
        // 引用当前this对象
        var self = this;

        if (!isFunction(handle)) {
            throw new Error('Parameter handle is not a function！')
        }

        // 添加resolve时执行的函数
        function _resolve(val) {
            var run = function () {
                if (self._status !== PENDING) return;
                // 依次执行成功队列中的函数，并清空队列
                var runFulfilled = function (res) {
                    var resolve;
                    while (resolve = self._fulfilledQueue.shift()) { // 出栈
                        resolve(res);
                    }
                };

                // 依次执行失败队列中的函数，并清空队列
                var runRejected = function (err) {
                    var reject;
                    while (reject = self._rejectedQueue.shift()) { // 出栈
                        reject(err);
                    }
                };
                /* 如果resolve的参数为Kromise对象，则必须等待该Kromise对象状态改变后,
                 * 当前Kromise的状态才会改变，且状态取决于参数Kromise对象的状态
                 */
                if (val instanceof Kromise) {
                    val.then(function (value) {
                        self._status = FULFILLED;
                        self._value = value;
                        runFulfilled(value)
                    }, function (err) {
                        self._status = REJECTED;
                        self._value = err;
                        runRejected(err);
                    })
                } else {
                    self._status = FULFILLED;
                    self._value = val;
                    runFulfilled(val);
                }

            };
            // 为了支持同步的Promise，这里采用异步调用
            setTimeout(run, 0)
        }

        // 添加reject时执行的函数
        function _reject(err) {
            var run = function () {
                if (self._status !== PENDING) return;
                // 依次执行成功队列中的函数，并清空队列
                self._status = REJECTED;
                self._value = err;
                var reject;
                while (reject = self._fulfilledQueue.shift()) { // 出栈
                    reject(err);
                }
            };
            // 为了支持同步的Promise，这里采用异步调用
            setTimeout(run, 0)
        }

        // 执行handle,捕获异常
        try {
            handle(_resolve.bind(this), _reject.bind(this));
        } catch (e) {
            _reject(e);
        }
    };

    // 属性
    Kromise.length = 1;

    // 实例方法
    // 实现then方法
    Kromise.prototype.then = function (onFulfilled, onRejected) {
        var self = this;
        // 返回一个新的Kromise对象
        return new Kromise(function (onFulfilledNext, onRejectedNext) {
            // 成功时的回调
            var fulfilled = function (val) {
                try {
                    // 如果不是函数，值穿透
                    if (!isFunction(onFulfilled)) {
                        onFulfilledNext(val)
                    } else {
                        var res = onFulfilled(val);
                        // 如果当前回调函数返回Kromise对象，必须等待其状态改变后在执行下一个回调
                        if (res instanceof Kromise) {
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res);
                        }
                    }
                } catch (e) {
                    // 如果函数执行出错，新的Kromise对象的状态为失败
                    onRejectedNext(e);
                }
            };
            // 失败时的回调
            var rejected = function (err) {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(err)
                    } else {
                        var res = onRejected(err);
                        if (res instanceof Kromise) {
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            onFulfilledNext(res);
                        }
                    }
                } catch (e) {
                    onRejectedNext(e)
                }
            };

            switch (self._status) {
                // 当状态为pending时，将then方法回调函数加入执行队列等待执行
                case PENDING:
                    self._fulfilledQueue.push(fulfilled);
                    self._rejectedQueue.push(rejected);
                    break;
                // 当状态已经改变时，立即执行对应的回调函数
                case FULFILLED:
                    fulfilled(self._value);
                    break;
                case REJECTED:
                    rejected(self._value);
                    break;
            }
        });
    };

    // 实现catch方法
    Kromise.prototype.catch = function (onRejected) {
        return this.then(undefined, onRejected);
    };

    // 实现finally方法
    Kromise.prototype.finally = function (onFinally) {
        return this.then(function (value) {
            Kromise.resolve(onFinally()).then(function () {
                return value;
            })
        }, function (err) {
            Kromise.resolve(onFinally()).then(function () {
                throw new Error(err);
            })
        })
    };

    // 静态方法
    // 实现resolve方法
    Kromise.resolve = function (value) {
        // 如果参数是Kromise实例，直接返回这个实例
        if (value instanceof Kromise) {
            return value;
        }
        return new Kromise(function (resolve) {
            resolve(value)
        })
    };
    // 实现reject方法
    Kromise.reject = function (value) {
        return new Kromise(function (resolve, reject) {
            reject(value)
        })
    };
    // 实现all方法
    Kromise.all = function (arr) {
        var self = this;
        return new Kromise(function (resolve, reject) {
            var values = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                // 数组参数如果不是Kromise实例，先调用Kromise.resolve
                self.resolve(arr[i]).then(function (res) {
                    values.push(res);
                    // 所有状态都变成fulfilled时返回的Kromise状态就变成fulfilled
                    if (values.length === arr.length) {
                        resolve(values);
                    }
                }, function (e) {
                    // 有一个被rejected时返回的Kromise状态就变成rejected
                    reject(e);
                })
            }
        })
    };

    // 实现race方法
    Kromise.race = function (arr) {
        var self = this;
        return new Kromise(function (resolve, reject) {
            for (var i = 0, len = arr.length; i < len; i++) {
                // 只要有一个实例率先改变状态，新的Kromise的状态就跟着改变
                self.resolve(arr[i]).then(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err);
                })
            }
        })
    };
    // 实现any方法
    Kromise.any = function (arr) {
        var self = this;
        return new Kromise(function (resolve, reject) {
            var count = 0;
            var errors = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                // 只要有一个实例状态变为fulfilled，新的Kromise状态就会改变为fulfilled
                self.resolve(arr[i]).then(function (res) {
                    resolve(res);
                }, function (err) {
                    errors[count] = err;
                    count++;
                    // 否则等待所有的rejected,新的Kromise状态才会改变为rejected
                    if (count === arr.length) {
                        reject(errors);
                    }
                })
            }
        })

    };
    // 实现allSettled方法
    Kromise.allSettled = function (arr) {
        var results = [];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            this.resolve(arr[i]).then(function (res) {
                results.push({status: FULFILLED, value: res});
            }, function (err) {
                results.push({status: REJECTED, value: err});
            })
        }
        // 一旦结束，状态总是`fulfilled`，不会变成`rejected`
        return new Kromise(function (resolve, reject) {
            resolve(results)
        })
    };
    // 实现try方法
    Kromise.try = function (fn) {
        if (!isFunction(fn)) return;
        return new Kromise(function (resolve, reject) {
            return resolve(fn());
        })
    };

    // 挂载
    window.Kromise = Kromise;
})();
