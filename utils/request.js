import base from './base'

import Store from './../store/index.js'
//发送数据
const sendRequest = (url,params={},method="POST")=>{
	//将方法转为小写
    method = method.toUpperCase();
	let addurl = '';
	 if(method =="GET"&&Object.entries(params).length){
		 for(let [key,value] of Object.entries(params)){
			 addurl+=('&'+key+'='+value);
		 }
		 addurl = "?" + addurl.slice(1,-1)
		 url+=addurl
	 } 
    return new Promise((resolve,reject) =>{
      uni.request({
          url:base.apiHost + url,
          method,
          data:params,
          header: {
              'content-type':'application/x-www-form-urlencoded;charset=UTF-8',
              'Authorization': uni.getStorageSync('accessToken'),
          },
          dataType: 'json',
          responseType: 'text',
          success: res => {
			  console.log(`接口:${url},返回状态:${res.statusCode},请求返回结果`, res)
			  if(res.statusCode==200){
				  resolve(res.data)
			  }
			  
			  // if(AccessToken失效){
				 //  getAccessToken(function(){sendRequest(url, method, params).then(resolve, reject)});
			  // }
              
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
 function getAccessToken(callback=()=>{}) {
	uni.login({
		success: (data) => {
			console.log(data)
			uni.request({
				url:`${base.apiHost}/sso/wx/loginByCode?code=${data.code}`,
				method:"POST",
				dataType: 'json',
				success(res){
					console.log("accessToken:",res);
					uni.setStorageSync("accessToken",`Authorization   Bearersdvnasdnvsdnfsldfdsf${res.data.data.openid}`);
					callback(res.data.data);
				},
				fail(err) {
					console.log("获取AccessToken失败"+err)
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
function checkLoginStatus(){
	return new Promise((resolve,reject)=>{
		uni.checkSession({
			success:()=>{
				console.log("code&&session:未过期");
				
				uni.showLoading({mask:true});
				//自动获取用户信息
				Store.dispatch("autoLoginIn");
				
				resolve();
			},
			fail:()=>{
				console.log("code&&session:已过期")
				uni.removeStorageSync("accessToken");
				
				resolve();
			}
		})
	})
}

export default {
	sendRequest,
	checkLoginStatus,
	getAccessToken
}