<template>
	<view class="">
		<view v-if="type==1" class="pt10 pb10" style="width: 95%;margin: 0 auto;">
			<van-button :color="color" block :round="round" :size="size"><text style="color: #fff;">{{text}}</text></van-button>
		</view>

		<view v-if="type==2" style="width: 100%">
			<van-button size="large" :color="color" block><text style="color: #fff;">{{text}}</text></van-button>
		</view>

		<view v-if="type==3" class="pt10 pb10" style="width: 95%;margin: 0 auto;">
			<van-button :color="color" block :round="round" open-type="getUserInfo" @getuserinfo="getUserInfo"><text style="color: #fff;">{{text}}</text></van-button>
		</view>

		<view v-if="type==4" class="pt10 pb10" style="width: 95%;margin: 0 auto;">
			<van-button :color="color" block :round="round" open-type="getPhoneNumber" @getphonenumber="getphonenumber"><text
				 style="color: #fff;">{{text}}</text></van-button>
		</view>

		<view v-if="type==5" class="sp fsb" style="width: 100%">
			<button class="fz16 bn" type="primary" @click="firstClick">{{textFirst}}</button>
			<button class="fz16 bn" type="primary"  @click="secondClick">{{textSecond}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			round: {
				type: Boolean,
				default: true
			},
			size: {
				type: String,
				default: "normal"
			},
			type: {
				type: Number,
				default: 3,
				//1 代表圆角95%宽的圆角按钮
				//2 满屏无圆角矩形按钮
				//3 双按钮
			},
			text: {
				type: String,
			},
			textFirst: {
				type: String,
				default: "订单详情"
			},
			textSecond: {
				type: String,
				default: "取消订单"
			},
			color: {
				type: String,
				default: "linear-gradient(142deg,rgba(26,174,104,1) 0%,rgba(124,206,89,1) 100%)"
			}
		},
		data() {
			return {


			}
		},
		methods: {
			//点击第一个
			firstClick(){
				this.$emit("firstClick")
			},
			//点击第二个
			secondClick(){
				this.$emit("secondClick")
			},
			//获取用户信息
			async getUserInfo(e) {
				console.log(e)
				//获取openid或者token
				if(e.target.errMsg!='getUserInfo:ok')return;
				wx.showLoading({title:"登录中...",mask:true});
				await this.$net.getAccessToken((res) => {
					wx.hideLoading();
					//未绑定手机号,去绑定手机
					if (res.openid) { //
						this.$parent.$data.step = 2, this.$parent.$data.openid = res.openid;
						this.$parent.$data.userinfo = e.detail.userInfo;
					}
					//已经绑定手机号,直接登录
					if (res.token) {
						//用户相关地址和信息
						this.$store.dispatch("autoLoginIn");
						// 提示登录成功
						wx.showToast({
							title: "登录成功",
							duration: 1500,
							icon: "success",
							success: () => {
								let timer = setTimeout(function() {
									wx.switchTab({
										url: "/pages/me/me/me"
									})
									clearTimeout(timer)
								}, 500)
							}
						})
					}
				});
			},
			//显示动画
			showToast(){
				
			},
			//获取用户手机号
			async getphonenumber(e) {
				console.log(e)
				if(e.detail.errMsg!='getPhoneNumber:ok')return
				wx.showLoading({title:"绑定中...",mask:true});
				const data = {
					openid:this.$parent.$data.openid,
					enyDate:e.detail.encryptedData,
					iv:e.detail.iv,
					wxPic:this.$parent.$data.userinfo.avatarUrl,
					wxName:this.$parent.$data.userinfo.nickName
				}
				//绑定手机号
				const result = await this.$net.sendRequest("/sso/wx/wxOneReg",data);
				const res = await this.$net.sendRequest("/sso/wx/wxOneReg",data);
					//已经绑定手机号,直接登录
					if (result) {
						uni.setStorageSync("accessToken", `Bearer ${result}`);
						//用户相关地址和信息
						this.$store.dispatch("autoLoginIn");
						// 提示登录成功
						wx.showToast({
							title: "登录成功",
							duration: 1500,
							icon: "success",
							success: () => {
								let timer = setTimeout(function() {
									wx.switchTab({
										url: "/pages/me/me/me"
									})
									clearTimeout(timer)
								}, 500)
							}
						})
					}
				
				wx.hideLoading();

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../static/styles/mixin.scss';

	.sp {

		button {
			flex: 1;
			border-radius: 0px;
			line-height: 50px;
			color: #fff;

			&:first-child {
				background: #222;
			}

			&:last-child {
				background: linear-gradient(142deg, rgba(26, 174, 104, 1) 0%, rgba(124, 206, 89, 1) 100%);
			}
		}
	}
</style>
