//非主页面跳转
function navigateTo(url) {
	uni.navigateTo({
		url
	})
}

//关闭当前页面跳转
function redirectTo(url) {
	uni.redirectTo({
		url
	});
}

//跳转到主页面
function switchTab(url) {
	uni.switchTab({
		url
	})
}

//轻提示
function Toast(title, icon = "none", duration = 1500) {
	uni.showToast({
		title,
		icon,
		duration,
		mask: true
	})
}

//加载中...
function showLoading(title) {
	wx.showLoading({
		title,
		mask: true
	})
}

//获取其中的图片
export function getImages() {
	let images = [];

	function isHas(str, arr) {
		for (let s of arr) {
			if (str.includes(s)) {
				return true;
			}
		}
		return false
	}
	return function getAllImages(obj, suffix = [".jpg", ".jpeg", ".png",".svg","webp"]) {
		if (obj.constructor == Object) {
			for (let v of Object.values(obj)) {
				if (v.constructor == String && isHas(v, suffix)) {
					images.push(v);
				}
				if ([Object, Array].includes(v.constructor)) {
					getAllImages(v);
				}
			}
		}
		if (obj.constructor == Array) {
			for (let v of obj) {
				if ([Object, Array].includes(v.constructor)) {
					getAllImages(v);
				}
				if (v.constructor == String && isHas(v, suffix)) {
					images.push(v)
				}
			}
		}
		if (obj.constructor == String && isHas(obj, suffix)) {
			images.push(obj)
		}
		return images;
	}
}


export default {
	navigateTo,
	redirectTo,
	switchTab,
	Toast,
	showLoading,
	getImages
}
