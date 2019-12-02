import Vue from 'vue'
import Vuex from 'vuex'
import Request from './../utils/request.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		username: "",//用户名
		openid: null ,//用户id
		addressList:[] ,//用户地址
		defaultAddress:{},//默认地址
		cart:[],//购物车信息
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
		},
		//设置地址
		saveAddress(state,addressList){
			state.addressList = addressList; 
			state.defaultAddress = addressList.find(item=>item.defaultStatus==1)
		},
		//设置购物车
		saveCart(state,addressList){
			state.cart = addressList
		}
	},
	actions: {
		// lazy loading openid
		//自动登录
		autoLoginIn({dispatch,commit,state}){
			//获取用户信息
			dispatch("getUserInfo"); 
			//获取用户地址
			dispatch("getUserAddress");
			//获取购物车信息
			dispatch("getCart");
		},
		//获取用户信息
		async getUserInfo(){
			return;
			// Request.sendRequest("/sso/userinfo",{},"GET");
		},
		//获取用户地址列表
		async getUserAddress({dispatch,commit,state}){
			const result =await Request.sendRequest("/member/address/list",{},"GET");
			commit('saveAddress',result);
		},
		//获取用户购物车
		async getCart({dispatch,commit,state}){
			const result =await Request.sendRequest("/cart/list",{},"GET");
			commit('saveCart',result);
		},
	}
})

export default store
