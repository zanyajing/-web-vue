import axios from 'axios'
import Vue from 'vue'
//axios.defaults.baseURL = 'http://192.168.1.24:9126'
//axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.axios = axios
