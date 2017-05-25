/**
 * Created by 旧梦 on 2017/5/25.
 */
Vue.component('select2',{
    props:['options','value'],
    template:'#select2-template',
    mounted:function () {
        var vm=this
        $(this.$el)
            .val(this.value)
            .select2({data:this.options})
            .on('change',function () {
                vm.$emit('input',this.value)
            })
    },
    watch:{
        value:function (value) {
            $(this.$el).val(value)
        },
        options:function (options) {
            $(this.$el).select2({data:options})
        }
    },
    destroyed:function () {
        $(this.$el).off().select2('destroy')
    }
})

var vm=new Vue({
    el:'#el',
    template:'#demo-template',
    data:{
        selected:0,
        options:[
            {id:1,text:'Hello'},
            {id:2   ,text:'World'}
        ]
    }
})