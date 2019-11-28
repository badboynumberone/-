import Vue from 'vue'
import Vuex from 'vuex'
import Request from './../utils/request.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		username: "",//用户名
		openid: null //用户id
	},
	mutations: {
		login(state, username) {
			state.hasLogin = true;
			state.username = username;
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		setOpenid(state, openid) {
			state.openid = openid
		}
	},
	actions: {
		// lazy loading openid
		autoLoginIn: ({commit,state},userinfo={})=>{
			//再进行登录后进行返回登录信息
			Request.sendRequest("/sso/userinfo",{},"GET");
			
			
		}
	}
})

export default store
