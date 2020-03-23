<script>
	import Vue from 'vue'
	import Request from 'utils/request.js'
	import Base from './utils/base.js';
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			this.$nextTick(()=>{
				//登录状态未过期获取用户信息
				Request.checkLoginStatus();
			})
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onError:function(err){
			console.log(err)
		},
		globalData:{
			baseImageUrl:Base.localYunImageUrl
		}
	}
</script>

<style lang="scss">
	@import './common/uni.css';
	@import 'static/styles/common.scss';
	@import  'static/styles/modify.css';
</style>
