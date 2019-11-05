<template>
	<view class="main">
		<!-- 状态栏 -->
		<view class="header">
			<van-tabs :active="active" @change="onTabChange" :line-width="'20'">
			  <van-tab name="all" title="全部"/>
			  <van-tab name="waitpay" title="待付款"/>
			  <van-tab name="waitsend" title="待发货"/>
			  <van-tab name="waitaccept" title="待收货"/>
			  <van-tab name="finish" title="交易成功"/>
			  <van-tab name="dealclose" title="交易关闭"/>
			</van-tabs>
		</view>
		<view style="height: 39px;"></view>
		<!-- 内容 -->
		<div class="container">
			<view class="item" v-for="(item,index) in 6" :key="index">
				<my-goods-card :status="'待付款'"></my-goods-card>
				<view class="pay pl5 pr5">
					实付款:<text class="theme fz16 fb">￥68.90</text>
				</view>
				<view class="action f p5">
					<!-- <view class="ml5">
						<van-tag plain round size="medium">取消订单</van-tag>
					</view>
					<view class="ml5">
						<van-tag type="success" plain round size="medium" :color="'#38A472'">支付23时59分</van-tag>
					</view>
					<view class="ml5">
						<van-tag plain round size="medium">申请退货退款</van-tag>
					</view> -->
					<view class="ml5">
						<van-tag plain round size="medium">删除订单</van-tag>
					</view>
					<view class="ml5">
						<van-tag plain round size="medium">查看物流</van-tag>
					</view>
					<view class="ml5">
						<van-tag type="success" round size="medium" :color="'#38A472'">确认收货</van-tag>
					</view>
				</view>
			</view>
		</div>
	</view>
</template>

<script>
	import MyGoodsCard from "../../../mycomponents/my-goods-card/my-goods-card.vue";
	export default {
		components:{
			MyGoodsCard
		},
		data() {
			return {
				active:0
			}
		},
		methods: {
			onTabChange(e){
				this.active = parseInt(e.detail.index);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';
	.header{
		position: fixed;
		top: 0px;
		@include wh(100%,44px);
		z-index: 9;
	}
	.container{
		.item{
			border-top: 5px solid #f1f1f1;
			.pay{
				color: #222;
				text-align: right;
			}
			.action{
				justify-content: flex-end;
			}
		}
	}
</style>
