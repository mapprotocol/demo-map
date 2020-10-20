import Vue from 'vue'
import http from './http'

//接口方法定义
let requests = {
  getBalance:(params)=>http.get('api/sendCoin',params),//账户增加余额
};

Vue.prototype.$http=requests;
export default requests;
