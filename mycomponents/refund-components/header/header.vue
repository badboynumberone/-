<template>
	<view v-if="baseImageUrl">
		<view v-if="true" class="first p10 fsb">
			<view class="left ftm">
				<Pic :src="`${baseImageUrl}/Order-complete@2x.png`" :height="'45rpx'" :width="'45rpx'" :mode="'aspectFill'" :round="true" :back="'#fff'"></Pic>
				<text class="fz14 ml10" style="color: #222;">商家已收货，退款成功！</text>
			</view>
			<view class="right theme fz14">
				退款成功
			</view>
		</view>
		
		<view v-if="false" class="second p10">
			<view class="order">
				订单号：2016083016302710 
			</view>
			<view class="total">
				订单总额：<text class="theme">￥23.00</text>
			</view>
		</view>
	</view>
</template>

<script>
	import Pic from "../../Pic/Pic.vue";
	export default {
		components:{
			Pic
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';
	.first{
		align-items: center;
	}
</style>
