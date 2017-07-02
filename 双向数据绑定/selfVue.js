/**
 * Created by 旧梦 on 2017/7/2.
 */
function selfVue(options) {
    var self = this;
    this.methods = options.methods;
    this.data = options.data;

    Object.keys(this.data).forEach(function (key) {
        self.proxyKeys(key);         //绑定代理属性
    });

    observe(this.data);
    new Compile(options.el,this);
    options.mounted.call(this);         //所有事情都处理好后执行mounted函数
}

selfVue.prototype = {
    proxyKeys:function (key) {
        var self =this;
        Object.defineProperty(this,key,{
            enumerable:false,
            configurable:true,
            get:function getter() {
                return self.data[key];
            },
            set:function setter(newVal) {
                self.data[key] = newVal;
            }
        });
    }
}