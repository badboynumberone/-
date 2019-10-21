import Vue from 'vue'
import Vuex from 'vuex'

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
		loginIn: ({commit,state},userinfo={})=>{
			console.log("登录用户信息:",userinfo)
			//调用接口获取获取accessToken
				
				
			//再进行登录后进行返回登录信息
			const timer = setTimeout(()=>{
				commit("login",userinfo.username);
				uni.hideLoading();
				console.log(state.username)
				clearTimeout(timer)
			},1000)
			
			
		}
	}
})

export default store
