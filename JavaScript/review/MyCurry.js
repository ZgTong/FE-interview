function myCurry(func) {
    const
        funcArgsLen = func.length,
        args = Array.prototype.slice.call(arguments, 1);
        return function () {
            const 
                innerArgs = Array.prototype.slice.call(arguments),
                newArgs = args.concat(innerArgs);
            if(newArgs.length < funcArgsLen) return myCurry.call(this, func, ...newArgs);
            else return func.apply(this, newArgs);
        }
}