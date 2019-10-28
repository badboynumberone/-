<template>
	<view class="">
		<view v-if="type==1" class="pt10 pb10" style="width: 95%;margin: 0 auto;">
			<van-button :color="color" block round :size="size"><text style="color: #fff;">{{text}}</text></van-button>
		</view>

		<view v-if="type==2" style="width: 100%">
			<van-button size="large" :color="color" block><text style="color: #fff;">{{text}}</text></van-button>
		</view>

		<view v-if="type==3" class="pt10 pb10" style="width: 95%;margin: 0 auto;">
			<van-button :color="color" block round open-type="getUserInfo" @getuserinfo="getUserInfo"><text style="color: #fff;">{{text}}</text></van-button>
		</view>
		
		<view v-if="type==4" class="pt10 pb10" style="width: 95%;margin: 0 auto;">
			<van-button :color="color" block round open-type="getPhoneNumber" @getphonenumber="getphonenumber"><text style="color: #fff;">{{text}}</text></van-button>
		</view>

		<view v-if="type==5" class="sp fsb" style="width: 100%">
			<button class="fz16 bn" type="primary">{{textFirst}}</button>
			<button class="fz16 bn" type="primary">{{textSecond}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			size:{
				type:String,
				default:"normal"
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
			//获取用户信息
			getUserInfo(e) {
				console.log(e)
			},
			//获取用户手机号
			getphonenumber(e){
				console.log(e)
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
