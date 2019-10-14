//非主页面跳转
function navigateTo(url){
    uni.navigateTo({
        url
    })
}

//关闭当前页面跳转
function redirectTo(url){
    uni.redirectTo({ url });
}

//跳转到主页面
function switchTab(url){
    uni.switchTab({
        url
    })
}

//轻提示
function Toast(title,icon="none",duration=1500){
    uni.showToast({
        title,
        icon,
        duration,
        mask:true
    })
}

export default {
	navigateTo,
	redirectTo,
	switchTab,
	Toast
}