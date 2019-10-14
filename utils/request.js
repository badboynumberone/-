import base from './base'

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
              'Authorization': wx.getStorageSync('accessToken'),
              'Shop-Id': base.shopId,
          },
          dataType: 'json',
          responseType: 'text',
          success: res => {
              
              
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

export default {
	sendRequest
}