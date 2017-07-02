/**
 * Created by 旧梦 on 2017/7/2.
 */
function Observer(data) {
    this.data = data;
    this.walk(data);
}
Observer.prototype = {
    walk:function (data) {
        var self =this;
        Object.keys(data).forEach(function (key) {
            self.defineReactive(data,key,data[key]);
        });
    },

    defineReactive:function(data,key,val) {
        var dep = new Dep();
        var childObj=observe(val); //递归遍历所有子属性

        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:true,
            get:function getter() {
                if(Dep.target){            //判断是否需要添加订阅者
                    dep.addSub(Dep.target);  //在这里添加一个订阅者
                }
                return val;

            },
            set:function setter(newVal) {
                if(val === newVal){
                    return;
                }
                val = newVal;
                console.log('属性'+key+'已经被监听了，现在值为：“'+newVal.toString()+'”');
                dep.notify();  //如果数据变化，通知所有订阅者
            }
        });
    }
}

function observe(value,vm) {
    if(!value || typeof value !=='object'){
        return;
    }
    return new Observer(value);
};

function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub:function (sub) {
        this.subs.push(sub);
    },
    notify:function () {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    }
};
Dep.target = null;

/*
var library = {
    book1:{
        name:''
    },
    book2:''
};
observe(library);
 */