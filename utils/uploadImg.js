//上传文件（filePath是个数组）
import base from "./../utils/base.js";
export async function upLoadFile(file = []) {
	try {
		let filePathArr = file;
		for (var i = 0; i < filePathArr.length; i++) {
			let v = filePathArr[i];
			if (v.indexOf("http://tmp") != -1 || v.indexOf("wxfile") != -1) {
				filePathArr[i] = await upload(v);
			}
		}
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
		let imageUrl = "user-dir-prefix/" + parseInt(Math.random() * 100) + new Date().getTime() + filePath
			.substr(filePath.lastIndexOf("."), filePath.length - 1);

		uni.uploadFile({
			url: base.uploadurl, // 仅为示例，非真实的接口地址
			filePath: filePath,
			name: 'file',
			
			formData: {
				'policy': "eyJleHBpcmF0aW9uIjoiMjAxOS0xMC0yOFQwODowMzowMC41NDNaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ1c2VyLWRpci1wcmVmaXgvIl1dfQ",
				'OSSAccessKeyId': 'LTAIJAgDcX5kzR5c',
				'sucess_action_status': "200",
				"signature": "xJ9pXJ69sn2jSQ8q7U8lXZ6r+s8=",
				"key": imageUrl
			},
			success(res) {
				if (res.statusCode == 204) {
					try {
						resolve(result.host + "/" + imageUrl.trim())
					} catch (err) {
						resolve("上传失败")
					}
				}
			},
			fail(err) {
				reject(err)
			}
		})
	})
}
