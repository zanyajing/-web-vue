// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/input.css'
import 'element-ui/lib/theme-chalk/message.css'
import 'element-ui/lib/theme-chalk/dialog.css'
import 'element-ui/lib/theme-chalk/message-box.css'
import 'element-ui/lib/theme-chalk/index.css'
import {
	Message,
	Dialog,
	MessageBox,
	Input,
	Option
} from 'element-ui'
//import Promise from 'promise-polyfill'
//if (!window.Promise) {  
//  window.Promise = Promise;  
//}
Vue.component(Input.name, Input)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.use(Dialog)
Vue.use(Option)
Vue.prototype.$message = Message

import sendCode from "@/components/sendCode/sendCode.vue"

Vue.component(sendCode.name, sendCode)

Vue.use(ElementUI)
Vue.use(Vuex)
	//Vue.config.productionTip = false
	/* eslint-disable no-new */

const store = new Vuex.Store({
	state: {
		userInfo: {
			email: '',
			headImgUrl: '',
			mobile: '',
			nickname: ''
		}
	},
	mutations: {
		updateUserInfo(state, newUserInfo) {
			state.userInfo = newUserInfo
		}
	}
})

Vue.filter('empty', function(val) {
	if(!val || val == '' || val == 'null' || val == undefined) {
		val = '--'
	}
	return val
})


new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	},
	store
})