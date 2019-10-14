import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

/* ------------------------------------------------------------------------挂载常用工具-----------------------------------------------------------------*/


//挂载本地存储
import Store from './store/index.js'
Vue.prototype.$store = Store

//挂载请求
import Request from './utils/request.js'
Vue.prototype.$sendRequest = Request

//挂载上传图片的请求
import UploadFile from './utils/uploadImg.js'
Vue.prototype.$uploadFile = UploadFile

//常用工具
import Tools from './utils/tools.js'
Vue.prototype.$tools = Tools


/* ------------------------------------------------------------------------挂载全局组件-----------------------------------------------------------------*/

//头部导航条
import pageHead from './components/page-head.vue'
Vue.component('page-head', pageHead)



