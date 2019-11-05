<template>
	<view class="main">
		<view class="header">
			<view class="top pr">
				<Pic :src="'/static/images/order-background@2x.png'" :height="'100%'" :width="'100%'" :mode="'aspectFill'"></Pic>
				<view class="pa box fill fsr p20">
					<view class="fz18 fb" style="color: #fff;">待收货</view>
					<view style="color: #fff;">订单号：2016083016302710</view>
				</view>
			</view>
			<view class="bottom ftm pl10 pr10 ">
				<Pic :src="'/static/images/order-address@2x.png'" :height="'45rpx'" :width="'37rpx'" :mode="'scaleToFill'" :back="'#fff'"></Pic>
				<view class="box fsr">
					<text class="fz16 fb" :decode="true">菜菜 15957624596</text>
					<view class="more-hidden" style="width: 310px;line-height: 17px;">江苏省江宁区双龙大道833号南方花园风彩园20栋3单元304室</view>
				</view>
			</view>
		</view>
		<view class="body">
			<my-goods-card></my-goods-card>
			<van-field :value="'微信支付'" readonly label="支付方式"  input-align="right" />
			<van-field :value="'普通快递'" readonly label="配送方式"  input-align="right" />
			<van-field type="textarea"   readonly label="订单备注"  input-align="left">
				<view slot="right-icon" style="width: 250px;height: 50px;text-align: left;">
					啦啦啦啦啦啦啦啦啦,请帮忙把商品的质量控制的好一些，拜托啦拜托啦拜托啦！
				</view>
			</van-field>
			<view class="pt10 pb10 pl15 pr15" style="text-align: right;">
				<text class="fz14" style="color: #333;">合计:</text>
				<text class="fz16 fb theme">¥2568.00</text>
			</view>
		</view>
		<view style="height: 46px;"></view>
		
		<view class="bottom_bar p10 f pf">
			<van-tag type="success" plain round size="medium">查看物流</van-tag>
		</view>
	</view>
</template>

<script>
	import MyGoodsCard from "../../../mycomponents/my-goods-card/my-goods-card.vue";
	export default {
		components: {
			MyGoodsCard
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';

	.header {
		border-bottom: 5px solid #f1f1f1;

		.top {
			@include wh(100%, 200rpx);

			.box {
				top: 0rpx;
				left: 0rpx;
				flex-flow: column wrap;
			}
		}

		.bottom {
			@include wh(100%, 160rpx);

			.box {
				margin-left: 20px;
				flex: 1;
				flex-flow: column wrap;
			}
		}
	}
	.bottom_bar{
		justify-content: flex-end;
		bottom: 0rpx;
		left: 0px;
		width: 100%;
		background: #fff;
		z-index: 9;
		border-top: 1rpx solid #f1f1f1;
		overflow: hidden;
	}
</style>
