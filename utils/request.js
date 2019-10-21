import base from './base'

import Store from './../store/index.js'
//发送数据
const sendRequest = (url,params={},method="POST")=>{
	//将方法转为小写
    method = method.toUpperCase();
    return new Promise((resolve,reject) =>{
      uni.request({
          url:base.apiHost + url,
          method,
          data:params,
          header: {
              'content-type':'application/json;charset=UTF-8',
              'Authorization': uni.getStorageSync('accessToken'),
          },
          dataType: 'json',
          responseType: 'text',
          success: res => {
              
			  
			  if(AccessToken失效){
				  getAccessToken(function(){sendRequest(url, method, params).then(resolve, reject)});
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
 function getAccessToken(callback=()=>{}) {
	uni.login({
		success: (data) => {
			uni.request({
				method:"POST",
				data:{code},
				dataType: 'json',
				responseType: 'text',
				success(res){
					console.log("accessToken:"+res);
					uni.setStorageSync("accessToken",值);
					callback();
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
				
				Store.dispatch("loginIn",{username:"dzf"});
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