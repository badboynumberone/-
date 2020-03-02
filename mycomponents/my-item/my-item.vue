<template>
	<view class="item p5 fadeIn">
		<view class="pr" style="border-radius: 10rpx;overflow: hidden;">
			<Pic  :width="'100%'" :height="'325rpx'" :src="item.pic"
			 :mode="'aspectFill'" :back="'#f1f1f1'"></Pic>
			 <image class="pa"  v-if="item.albumVideo.length" style="bottom: 10px;left: 10px;width: 25px;height: 25px;" src="/static/images/video.png" mode="aspectFit"></image>
			 <view class="pa fill" v-if="item.stock<=0"  style="background-color: rgba(0,0,0,0.5);top: 0px;left: 0rpx;z-index: 99;"></view>
			 <image class="center" v-if="item.stock<=0" style="width: 200rpx;height: 200rpx;z-index: 999;" src="../../static/images/empty.png" mode="aspectFill"></image>
		</view>
		<view class="mt5" style="transform: scale(0.7,0.7);margin-left: -27px;">
			<my-tag :type="'first'" :text="item.brandName" />
		</view>
		<view class="fsb">
			<text class=" fz12 more-hidden title">{{item.name}}</text>
		</view>
		
		<view class="mt5" style="transform: scale(0.8,0.8);margin-left: -18px;line-height: ;">
			<my-tag :type="'second'" :text="item.tagName" />
		</view>
		<view class="fsb" style="align-items: center;margin-top: -10px;">
			<view class="f" style="align-items: center;">
				<view class="fz14 fb price mr10">
					￥{{item.price}}
				</view>
				<view class="fz11" style="color: #666;">销量 {{item.sale}}</view>
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
