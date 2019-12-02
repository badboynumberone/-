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

//格式化日期
function dateFormat(fmt, date) {
    let ret;
    let opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}
//平铺数组
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

export default {
	navigateTo,
	redirectTo,
	switchTab,
	Toast,
	showLoading,
	getImages,
	dateFormat,
	deepFlatten
}
