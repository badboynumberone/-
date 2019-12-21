<template>
	<view class="item p5 fadeIn">
		<view style="border-radius: 10rpx;overflow: hidden;">
			<Pic :width="'100%'" :height="'150px'" :src="item.pic"
			 :mode="'aspectFill'" :back="'#f1f1f1'"></Pic>
		</view>
		<view class="mt5" style="transform: scale(0.7,0.7);margin-left: -27px;">
			<my-tag :type="'first'" :text="item.brandName" />
		</view>
		<text class=" fz12 more-hidden title">{{item.name}}</text>
		<view class="mt5" style="transform: scale(0.8,0.8);margin-left: -18px;">
			<my-tag :type="'second'" :text="item.tagName" />
		</view>
		<view class="fsb" style="align-items: center;">
			<view class="fz14 fb price">
				￥{{item.price}}
			</view>
			<image style="width: 45rpx;height: 60rpx;" src="/static/images/shopping-Cart-Selection@2x.png" mode="aspectFit"></image>
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
	
	
	@-webkit-keyframes fadeIn {
	  from {
	    opacity: 0;
	  }
	
	  to {
	    opacity: 1;
	  }
	}
	
	@keyframes fadeIn {
	  from {
	    opacity: 0;
	  }
	
	  to {
	    opacity: 1;
	  }
	}
	
	.fadeIn {
	  -webkit-animation-name: fadeIn;
	  animation-name: fadeIn;
	  animation-duration: 500ms;
	}
</style>
