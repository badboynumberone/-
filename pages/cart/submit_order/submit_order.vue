<template>
	<view class="main">
		<!-- 地址选择 -->
		<view class="address p10">
			<view class="wrapper pr">
				<Pic :src="'/static/images/order_address_background@2x.png'" :width="'100%'" :height="'90px'"></Pic>
				<!-- <view class="content pa p10" style="top: 0px;left: 0px;" >
					<view class="">
						<text :decode="true" class="wsnw fb fz17">菜菜 15957625469</text>
					</view>
					<view class="address_detail more-hidden fz12" style="width: 250px;">
						江苏省江宁区双龙大道833号南方花园风彩园20栋3单元304室
					</view>
				</view> -->
				<view class="content pa p10 ftm" style="top: 0px;left: 0px;">
					<view class="mt5 ml20" size="20px"><van-icon name="location-o" /></view><text class="fz14">请选择收货地址</text>
				</view>
				<view class="icon ct" style="right: 10px;">
					<van-icon name="arrow" />
				</view>
			</view>
		</view>
		<!-- 商品信息 -->
		<view class="container" v-for="(item,index) in 6" :key="index">
			<my-goods-card></my-goods-card>
			<van-cell title="配送方式" value="普通快递" />
			<van-field :value="message" label="备注" type="textarea" placeholder="请输入备注(50字以内)" autosize maxlength="50" />
			<view class="pt10 pb10 pl15 pr15 f" style="justify-content: flex-end;align-items: center;background: #fff;">
				<text style="color: #222;">合计:</text>
				<text class="price fb fz20">￥64</text>
			</view>
		</view>
		
		
		<view style="height: 60rpx;background: #F1F1F1;"></view>
		
		<!-- 底部结算条 -->
		<view class="submit_bar pf" style="bottom:0px">
			<van-submit-bar :price="6400" :button-text="'提交订单'" @submit="onClickButton" :tip="true"/>
		</view>
		
		
	</view>
</template>

<script>
	import MyGoodsCard from "../../../mycomponents/my-goods-card/my-goods-card.vue";
	import Pic from "../../../mycomponents/Pic/Pic.vue";
	export default {
		components: {
			MyGoodsCard,Pic
		},
		data() {
			return {
				message:""
			};
		}
	}
</script>

<style lang="scss">
	@import './../../../static/styles/mixin.scss';

	.main {
		background: #f1f1f1;

		.address {
			.wrapper {
				border-radius: 5px;
				overflow: hidden;
				.content {
					@include wh(100%, 80px);
				}
			}
		}
		.container{
			border-bottom: 5px solid #f1f1f1;
			.price{
				color: $theme;
			}
		}
	}
</style>
