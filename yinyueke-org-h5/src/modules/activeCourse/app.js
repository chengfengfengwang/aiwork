import Vue from 'vue'
import app from './app.vue'
//import axios from '../../common/axios_config'
import axios from 'axios';
import { Dialog } from 'vant';
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //return response;
    if(response.status==200 || response.status==204){
        const res = response.data;
        if(res.error){Dialog.alert({message: res.msg})}
        return res;
    }else{
        Dialog.alert({message: '请求出错了'})
    }
    
  }, function (error) {
    if(error && error.response){
        if(error.response.status == 400){
            Dialog.alert({message: error.response.data.message})
            //alert(error.response.data.message)
        } else{
            Dialog.alert({message: '请求出错，状态码' + error.response.status})
            //alert('请求出错，状态码' + error.response.status)
        }
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  });
Vue.prototype.axios = axios;
import router from './router/index'



new Vue({
    router,
    render: h => h(app)
}).$mount('#activeCourse')