<template>
	<view>
		<view class="bg" style="width: 22px;" v-if="num<100">{{num}}</view>
		<view class="bg" style="width: 30px;" v-if="num>=100">99+</view>
		<!-- <view class="bg" style="width: 22px;">{{num}}</view> -->
		<!-- <view class="bg" style="width: 22px;">{{num}}</view> -->
		
	</view>
</template>

<script>
	let opt = null,pages=null;
	export default {
		props:{
			num:Number
		},
		data() {
			return {
				baseImageUrl:getApp().globalData.baseImageUrl,
			};
		},
		computed:{
			
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.bg{
		text-align: center;
		line-height: 22px;
		background: #FF4444;
		border-radius: 22px;
		overflow: hidden;
		font-size: 10px;
		color: #fff;
	}
</style>
