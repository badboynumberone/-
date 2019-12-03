<template>
	<view class="main">
		<view class="header">
			<view class="top pr">
				<Pic :src="'/static/images/order-background@2x.png'" :height="'100%'" :width="'100%'" :mode="'aspectFill'"></Pic>
				<view class="pa box fill fsr p20">
					<view class="fz18 fb" style="color: #fff;">{{pageData.state}}</view>
					<view style="color: #fff;">订单号：{{pageData.orderNo}}</view>
				</view>
			</view>
			<view class="bottom ftm pl10 pr10 ">
				<Pic :src="'/static/images/order-address@2x.png'" :height="'45rpx'" :width="'37rpx'" :mode="'scaleToFill'" :back="'#fff'"></Pic>
				<view class="box fsr">
					<text class="fz16 fb" :decode="true">{{pageData.receiverName}} {{pageData.receiverPhone}}</text>
					<view class="more-hidden" style="width: 310px;line-height: 17px;">{{pageData.address}}</view>
				</view>
			</view>
		</view>
		<view class="body">
			<my-goods-card :item="pageData" :isClick="true"></my-goods-card>
			<van-field :value="'微信支付'" readonly label="支付方式"  input-align="right" />
			<van-field :value="'普通快递'" readonly label="配送方式"  input-align="right" />
			<van-field :value="pageData.freightAmount || 0.00 " readonly label="快递费"  input-align="right" />
			<van-field type="textarea"   readonly label="订单备注"  input-align="left">
				<view slot="right-icon" style="width: 250px;height: 50px;text-align: left;">
					{{pageData.note}}
				</view>
			</van-field>
			<view class="pt10 pb10 pl15 pr15" style="text-align: right;">
				<text class="fz14" style="color: #333;">合计:</text>
				<text class="fz16 fb theme">¥{{pageData.totalAmount}}</text>
			</view>
		</view>
		<view style="height: 46px;"></view>
		
		<view class="bottom_bar p10 f pf">
			<van-tag :color="'#38A472'" plain round size="medium">查看物流</van-tag>
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
				isLoaded:false,
				pageData:{},//页面数据
			};
		},
		onLoad(options) {
			console.log(getCurrentPages()[getCurrentPages().length-1].route,options)
			//获取地址
			this.getOrderDetail(options.orderNo);
		},
		methods:{
			//获取订单详情
			async getOrderDetail(orderNo){
				const result = await this.$net.sendRequest("/order/info",{orderNo});
				this.pageData=this.mapResult(result);
			},
			//处理结果
			mapResult(res){
				const arr=['待付款','待发货','待收货','交易成功','交易关闭'];
				res.state = arr[res.status] ,res.address = res.receiverProvince+res.receiverCity+res.receiverRegion+res.receiverDetailAddress;
				res.items = res.orderItemList;delete res.orderItemList;
				return res;
			}
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
