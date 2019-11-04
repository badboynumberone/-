<template>
	<view class="item p5">
		<view style="border-radius: 10rpx;overflow: hidden;">
			<Pic :width="'100%'" :height="'150px'" :src="'https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg'"
			 :mode="'aspectFill'" :back="'#fff'"></Pic>
		</view>
		<view class="mt5" style="transform: scale(0.7,0.7);margin-left: -27px;">
			<my-tag :type="'first'" />
		</view>
		<text class=" fz12 more-hidden title">是东莞市大嘎达是十大杀手的哥哥都是嘎都是嘎</text>
		<view class="mt5" style="transform: scale(0.8,0.8);margin-left: -18px;">
			<my-tag :type="'second'" :text="'绿色食品'" />
		</view>
		<view class="fz14 fb price">
			￥123
		</view>
	</view>
</template>

<script>
	import Pic from "../Pic/Pic.vue";
	import MyTag from "../my-tag/my-tag.vue";
	export default {
		props:{
			item:{
				type:Object
			}
		},
		components: {
			Pic,
			MyTag
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	@import './../../static/styles/mixin.scss';
	.item {
		background: #fff;
		box-shadow: 0px 0px 5px 2px #E8E8E8;
		margin-bottom: 5px;

		.title {
			line-height: 17px;
		}

		.price {
			color: $theme;
		}
	}
</style>
