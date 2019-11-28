<template>
	<view class="main pr">
		<!-- 登录第一步骤 -->
		<view v-if="step==1" class="container ct" style="width: 100%;margin-top: -130px;">
			<view class="fb p20 mb30" style="font-size: 25px;">欢迎登录！</view>
			<view class="wx_header ">
				<Pic :height="'100px'" :width="'100px'" :mode="'aspectFill'" :round="true"></Pic>
			</view>
			<view class="button p10">
				<my-button :text="'登录'" :type="3"></my-button>
			</view>
		</view>

		<!-- 登录第二步骤 -->
		<view v-if="step==2" class="container ct" style="width: 100%;margin-top: -130px;">
			<view class="fb p20 mb30" style="font-size: 25px;">绑定手机号！</view>
			<view class="button p10">
				<my-button :text="'手机号一键绑定'" :type="4"></my-button>
			</view>
			<view class="button" style="text-align: center;" @click="bindOtherPhone">
				<text>绑定其他手机号</text>
			</view>
		</view>

		<!-- 登录第三步骤 -->
		<view v-if="step==3" class="container ct" style="width: 100%;margin-top: -130px;">
			<view class="fb p20 mb30" style="font-size: 25px;">绑定手机号！</view>
			<view class="box mb20">
				<view class="ftm wrapper margin pt5 pb5">
					<van-icon name="phone-o" size="20px" />
					<input type="number" maxlength="11" :value="phone" placeholder="请输入手机号码" @input="onChangge" data-name="phone" />
				</view>
			</view>
			<view class="box">
				<view class="ftm wrapper margin">
					<van-icon name="comment-o" size="20px" />
					<input type="text" maxlength="6" :value="code" placeholder="请输入验证码" @input="onChangge" data-name="code" />
					<view :class="['getCode',{'active':seconds!=60}]" @click="getCode">
						{{seconds==60?'获取验证码':seconds+'(s)'}}
					</view>
				</view>
			</view>
			<view class="next margin fm" @click="bindPhone">
				<image src="/static/images/sign in@2x.png" :mode="'aspectFit'" style="width: 60%;"></image>
			</view>
		</view>
		<view class="notice cl">
			温馨提示：未注册用户，初次登录时将完成注册
		</view>
	</view>
</template>

<script>
	import MyButton from "../../../mycomponents/my-button/my-button.vue";
	let timer = null;
	export default {
		components: {
			MyButton
		},
		data() {
			return {
				step: 1, //是否第一步
				phone: "", //手机号
				code: "", //验证码
				seconds: 60, //剩余时间
				openid:"",//openid
				userinfo:{},//用户信息
			}
		},
		onHide() {
			clearInterval(timer);
		},
		onUnload() {
			clearInterval(timer);
		},
		methods: {
			//绑定其他手机号
			bindOtherPhone(){
				this.step = 3;
			},
			onChangge(e) {
				this[e.currentTarget.dataset.name] = e.detail.value;
			},
			async getCode() {
				if (!this.checkForm(1)) {
					return;
				}
				const result  =await this.$net.sendRequest("/sso/getAuthCode",{telephone:this.phone},"GET");
				this.$tools.Toast("验证码发送成功!")
				timer = setInterval(() => {
					this.seconds--;
					(this.seconds<=0)&&(this.seconds=0)
				}, 1000);

			},
			//注册成功
			async bindPhone() {
				if (!this.checkForm(2)) {
					return;
				}
				await this.sendBindPhone(2);
				wx.showToast({
					title:"绑定成功",
					duration:1500,
					icon:"success",
					success:()=>{
						let timer = setTimeout(function(){
							wx.switchTab({
								url:"/pages/me/me/me"
							})
							clearTimeout(timer)
						},1500)
					}
				})
			},
			//绑定手机号
			async sendBindPhone(type){
				const result = await this.$net.sendRequest(`/sso/wx/regByOpenid`,{type:type,openid:this.openid,telephone:this.phone,authCode:this.code,wxPic:this.userinfo.avatarUrl,wxName:this.userinfo.nickName});
				
			},
			checkForm(checkNum) {
				if (checkNum == 1 && !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone)) {
					this.$tools.Toast("手机格式不正确!");
					return false;
				}

				if (checkNum == 2 && !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone)) {
					this.$tools.Toast("手机格式不正确!");
					return false;
				}

				if (checkNum == 2 && !/^[a-z\d_]{6}$/i.test(this.code)) {
					this.$tools.Toast("验证码格式不正确!");
					return false;
				}
				return true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';

	.wx_header {
		@include wh(100px, 100px);
		@include borderRadius(100px);
		margin: 20px auto;
		box-shadow: -2px 3px 5px #DBDBDB;
	}

	.wrapper {
		width: 300px;
		border-bottom: 1rpx solid #f1f1f1;

		input {
			font-size: 16px;
			margin-top: -5px;
			margin-left: 20px;
		}

		.getCode {
			@include sc(14px, $theme);
			@include wh(90px, 30px);
			line-height: 30px;
			text-align: center;
			border: 1rpx solid $theme;
			border-radius: 30px;
			overflow: hidden;
			margin: 5px 0;
		}

		.active {
			border-color: #c7c7c7 !important;
			color: #c7c7c7 !important;
		}
	}

	.next {
		@include wh(150px, 50px);
		margin-top: 20px;
		border-radius: 25px;
		overflow: hidden;
		background: linear-gradient(142deg,rgba(26,174,104,1) 0%,rgba(124,206,89,1) 100%);
	}

	.notice {
		bottom: 20px;
		white-space: nowrap;
		color: #666;
	}
</style>
