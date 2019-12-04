<template>
	<view class="box f p10 pr bb">
			<view class="pic mr10">
				<Pic :src="item.pic" :height="'100%'" :width="'100%'" :mode="'aspectFill'"></Pic>
			</view>
			<view class="content fsb pr">
				<view class="fz15 fb text-hidden">{{item.name}}</view>
				<view class="tag"><my-tag :text="item.tagName" :type="'second'"></my-tag></view>
				<view class="price fb theme">￥{{item.price}}</view>
				<view class="tag fb theme"><my-tag :text="item.brandName" :type="'first'"></my-tag></view>
				<image class="pa" style="right: 0px;bottom: 0px;" src="../../static/images/shopping-Cart-Selection@2x.png" mode="aspectFit"></image>
			</view>
	</view>
</template>

<script>
	import MyTag from '../my-tag/my-tag.vue';
	export default {
		components:{
			MyTag
		},
		data() {
			return {
				item:{
					type:Object
				}
			};
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		.pic{
			@include wh(190rpx,190rpx);
		}
		.content{
			flex: 1;
			flex-flow: column wrap;
			.tag{
				transform: scale(0.8,0.8);
				margin-left: -20px;
			}
			image{
				@include wh(40px,25px);
			}
		}
	}
</style>
