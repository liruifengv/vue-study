/**
 * Created by 旧梦 on 2017/5/24.
 */
//自定义注册 demo-grid 组件
Vue.component('demo-grid',{
    template:'#grid-template',          //引用 grid-template 模板
    props:{                             //子组件
        data:Array,
        columns:Array,
        filterKey:String
    },
    data:function () {
        var sortOrders={}
        this.columns.forEach(function (key) {
            sortOrders[key]=1
        })
        return{
            sortKey:'',
            sortOrders:sortOrders
        }
    },
    computed:{                                         //计算属性
        filteredData:function () {
            var sortKey=this.sortKey
            var filterKey=this.filterKey&&this.filterKey.toLowerCase()
            var order=this.sortOrders[sortKey]||1
            var data=this.data
            if(filterKey){
                data=data.filter(function (row) {
                    return Object.keys(row).some(function (key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey)>-1
                    })
                })
            }
            if (sortKey){
                data=data.slice().sort(function (a,b) {
                    a=a[sortKey]
                    b=b[sortKey]
                    return (a===b?0:a>b?1:-1)*order
                })
            }
            return data
        }
    },
    filters:{                           //Vue 过滤器：首字母大写
        capitalize:function (str) {
            return str.charAt(0).toUpperCase()+str.slice(1)
        }
    },
    methods:{
        sortBy:function (key) {
            this.sortKey=key
            this.sortOrders[key]=this.sortOrders[key]*-1
        }
    }
})


//挂载 demo
var demo=new  Vue({
    el:'#demo',
    data:{
        searchQuery:'',
        gridColumns:['name','power'],
        gridData:[
            {name:'Chunk Norris',power:'Infinity'},
            {name:'Bruce Lee',power:'9000'},
            {name:'Jackie Chan',power:'7000'},
            {name:'Jet Li',power:'8000'},
        ]
    }
})