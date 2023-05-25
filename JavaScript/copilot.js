var a = 1;
var obj = {
  a: 2,
  b: function() {
    return this.a;
  }
}
// obj.b();
obj.b.call(obj);