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
	let r = [];

	function t(r, t) {
		for (let c of t)
			if (r.includes(c)) return !0;
		return !1
	}
	return function c(n, o = [".jpg", ".jpeg", ".png", ".svg", "webp"]) {
		if (n.constructor == Object)
			for (let e of Object.values(n)) e.constructor == String && t(e, o) && r.push(e), [Object, Array].includes(e.constructor) &&
				c(e);
		if (n.constructor == Array)
			for (let e of n)[Object, Array].includes(e.constructor) && c(e), e.constructor == String && t(e, o) && r.push(e);
		return n.constructor == String && t(n, o) && r.push(n), r
	}
};


export default {
	navigateTo,
	redirectTo,
	switchTab,
	Toast,
	showLoading,
	getImages
}
