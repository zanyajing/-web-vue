import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import projectList from '@/components/projectList/projectList'
import apply from '@/components/apply/apply'
import applyDetail from '@/components/applyDetail/applyDetail'
import myApplyList from '@/components/myApplyList/myApplyList'
import login from '@/components/login/login'
import register from '@/components/register/register'
// import registerPwd from '@/components/register/registerPwd'
import registerSuc from '@/components/register/registerSuc'
import passwordCode from '@/components/password/passwordCode'
import passwordRet from '@/components/password/passwordRet'
import passwordSuccess from '@/components/password/passwordSuccess'
import fncDetails from '@/components/fncDetails/fncDetails'
import knowList from '@/components/knowList/knowList'
import details from '@/components/knowList/details'
import applySuccess from '@/components/applySuccess/applySuccess'
import {Storage,getUrlKey,Cookie} from '../common/js/common'

Vue.use(Router)

const routes = [{
	path: '/',
	name: 'index',
	component: index
}, {
	path: '/projectList',
	name: 'projectList',
	component: projectList
}, {
	path: '/apply',
	name: 'apply',
	component: apply,
	meta: {
      requiresAuth: true
    }
}, {
	path: '/applyDetail',
	name: 'applyDetail',
	component: applyDetail,
	meta: {
      requiresAuth: true
    }
}, {
	path: '/myApplyList',
	name: 'myApplyList',
	component: myApplyList,
	meta: {
      requiresAuth: true
    }
}, {
	path: '/applySuccess',
	name: 'applySuccess',
	component: applySuccess,
	meta: {
      requiresAuth: true
    }
}, {
	path: '/login',
	name: 'login',
	component: login
}, {
	path: '/register',
	name: 'register',
	component: register
},
// {
// 	path: '/registerPwd',
// 	name: 'registerPwd',
// 	component: registerPwd
// },
{
	path: '/registerSuc',
	name: 'registerSuc',
	component: registerSuc,
  meta: {
    requiresAuth: true
  }
}, {
	path: '/passwordCode',
	name: 'passwordCode',
	component: passwordCode
}, {
	path: '/passwordRet',
	name: 'passwordRet',
	component: passwordRet
}, {
	path: '/passwordSuccess',
	name: 'passwordSuccess',
	component: passwordSuccess
}, {
	path: '/fncDetails',
	name: 'fncDetails',
	component: fncDetails
}, {
	path: '/knowList',
	name: 'knowList',
	component: knowList
}, {
	path: '/details',
	name: 'details',
	component: details
}]

const router = new Router({
	mode: 'hash',
	routes:routes
})


router.beforeEach((to, from, next) => {
	if(getUrlKey('token')){
		Cookie.set('token',getUrlKey('token'),30)
	}
	let token = Cookie.get('token')
	if(to.matched.some(record => record.meta.requiresAuth) && (token == null || token == 'null' || token == '')) {
		next({
			path: '/login',
			query:{
				redirect:to.fullPath
			}
		})
	} else {
		next()
	}
})

export default router
