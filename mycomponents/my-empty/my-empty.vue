<template>
	<view class="container bgfff fill fm" :style="{height:height}">
		<view class="fm" style="flex-flow: column wrap;position: relative;top: -40rpx;">
			<image :src="`${baseImageUrl}/empty-statys%402x.png`" mode="aspectFit" lazy-load="true"></image>
			<view class="fz15 c666">亲,当日没有{{text}}哦!</view>
			<view class="fz12 cccc pt10 pb10">可以去商城首页逛逛哦!</view>
			<view style="width: 300rpx;" @click="toHome">
				<van-button round block type="info" :color="'linear-gradient(142deg,rgba(26,174,104,1) 0%,rgba(124,206,89,1) 100%)'">去首页</van-button>
			</view>
			
		</view>


	</view>
</template>

<script>
	export default {
		name:"emptycomponent",
		props:{
			height:{
				type:String
			}
		},
		data() {
			return {
				text:getCurrentPages()[getCurrentPages().length-1].route=='pages/index/presell/presell'?'预售':'秒杀',
				baseImageUrl:getApp().globalData.baseImageUrl,
			}
		},
		methods: {
			toHome(){
				
				wx.switchTab({
					url:"/pages/index/index/index"
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		border-radius: 20rpx;
		overflow: hidden;
	}
</style>
