import base from './base'

import Store from './../store/index.js'

const applicationJSON = ['/order/generateOrder'];
//发送数据
export function sendRequest(url, params = {}, method = "POST") {
	//将方法转为小写
	console.log(`接口:${url},参数:`, params)
	method = method.toUpperCase();
	let addurl = '';
	let baseUrl = url;
	if (method == "GET" && Object.entries(params).length) {
		for (let [key, value] of Object.entries(params)) {
			addurl += ('&' + key + '=' + value);
		}
		addurl = "?" + addurl.slice(1, -1)
		baseUrl += addurl
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: base.apiHost + baseUrl,
			method,
			data: params,
			header: {
				'content-type': applicationJSON.includes(url) ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8',
				'Authorization': uni.getStorageSync('accessToken'),
			},
			dataType: 'json',
			responseType: 'text',
			success: res => {
				console.log(`接口:${url},返回状态:${res.statusCode},请求返回结果`, res.data)

				if (res.statusCode == 200) {
					const result = res.data;
					if (result.code == 401 && Store.state.hasLogin) { //token已经过期 不过此时是登录有效期
						getAccessToken(() => {
							sendRequest(url, params, method).then(resolve, reject)
						});
					}
					if (result.code == 200) { //正常返回
						resolve(result.data)
					}
					
					if(result.code==500&&result.message=='缺货'){
						uni.hideLoading();
						uni.showToast({
							title:'该商品处于缺货状态',
							icon:"none",
							mask:true,
							duration:1500
						})
					}

					//各页面返回数据异常处理


				}


			},
			fail: (error) => {
				uni.showToast({
					title: 'net error',
					icon: 'none',
					duration: 1500
				});
			}
		});

	})
}

//获取AccessToken
export function getAccessToken(callback = () => {}) {
	uni.login({
		success: (data) => {
			console.log(data)
			uni.request({
				url: `${base.apiHost}/sso/wx/loginByCode?code=${data.code}`,
				method: "POST",
				dataType: 'json',
				success(res) {
					console.log("accessToken:", res.data.data.token);
					
					if (res.data.data.token) {
						uni.setStorageSync("accessToken", `Bearer ${res.data.data.token}`);
					}
					callback(res.data.data);
				},
				fail(err) {
					console.log("获取AccessToken失败" + err)
				}
			})
		},
		fail: (err) => {
			console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
			reject(err)
		}
	})
}

//检查登录状态
function checkLoginStatus() {
	return new Promise((resolve, reject) => {
		uni.checkSession({
			success: async () => {
				console.log("code&&session:未过期");
				//自动登录
				if(uni.getStorageSync('accessToken')){
					await Store.dispatch("autoLoginIn");
				}
				resolve();
			},
			fail: () => {
				console.log("code&&session:已过期")
				uni.removeStorageSync("accessToken");

				resolve();
			}
		})
	})
}

//检查登录
function checkLogin() {
	if (!Store.state.hasLogin) {
		wx.showModal({
			title: "提示",
			content: "你还尚未登录,赶紧去登录吧",
			success(res) {
				if (res.confirm) {
					uni.navigateTo({
						url: "/pages/me/wxlogin/wxlogin"
					})
				}
			}
		})
	}
	return Store.state.hasLogin;
}

export default {
	checkLogin,
	sendRequest,
	checkLoginStatus,
	getAccessToken
}
