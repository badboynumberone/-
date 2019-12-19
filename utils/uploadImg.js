//上传文件（filePath是个数组）
import base from "./../utils/base.js";
import Request from './../utils/request.js';
let oss = {};
export async function upLoadFile(file = []) {
	//获取上传接口信息
	console.log("oss信息:", oss);
	oss = await Request.sendRequest(`/common/policy`,{},"GET");
	
	try {
		let filePathArr = file;
		for (var i = 0; i < filePathArr.length; i++) {
			let v = filePathArr[i];
			if (v.indexOf("http://tmp") != -1 || v.indexOf("wxfile") != -1) {
				filePathArr[i] = await upload(v);
			}
		}
		console.log("上传完的图片",filePathArr)
		return filePathArr;
	} catch (err) {
		//TODO handle the exception
		console.log(err);
	}
}

// 单个文件上传
function upload(filePath) {
	return new Promise((resolve, reject) => {
		//图片路径
		let imageUrl = oss.dir + "/" + parseInt(Math.random() * 100) + new Date().getTime() + filePath
			.substr(filePath.lastIndexOf("."), filePath.length - 1);
		uni.uploadFile({
			url: oss.host, // 仅为示例，非真实的接口地址
			filePath: filePath,
			name: 'file',
			formData: {
				'policy': oss.policy,
				'OSSAccessKeyId': oss.accessKeyId,
				'sucess_action_status': "200",
				"signature": oss.signature,
				"key": imageUrl
			},
			success(res) {
				if (res.statusCode == 204) {
					try {
						resolve(oss.host + "/" + imageUrl.trim())
					} catch (err) {
						reject("上传失败")
					}
				}
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
