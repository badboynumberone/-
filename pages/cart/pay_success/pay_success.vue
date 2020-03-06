<template>
	<view class="main pr"  v-if="baseImageUrl">
		<div class="container center">
			<view class="fm mb10">
				<image :src="`${baseImageUrl}/successful_payment@2x.png`" mode="aspectFill"></image>
			</view>
			<view class="fm fz14" style="margin-bottom: 30px;">订单支付成功</view>
			<view class="fm fb theme" style="margin-bottom: 30px;font-size: 75rpx;">￥{{info[0]}}</view>
			<view class="mb10">
				<van-field :value="'微信支付'" label="支付方式" readonly :input-align="'right'" />
			</view>
			<view @click="navigateTo" :data-url="info[1]" >
				<my-button :type="1" :text="'查看详情'" :round="true" ></my-button>
			</view>
		</div>
			
	</view>
</template>

<script>
	import MyButton from '../../../mycomponents/my-button/my-button.vue';
	export default {
		components:{
			MyButton
		},
		data() {
			return {
				info:[]
			};
		},
		onLoad(options) {
			console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
			this.setInfo(options);
		},
		methods:{
			//设置页面信息
			setInfo(options){
				this.info = [options.price,options.type=='product'?'/pages/me/order_detail/order_detail?orderNo='+options.orderNo:'/pages/me/order/order?active=3']
			},
			//页面跳转
			navigateTo(e) {
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		margin-top: -65px;
		image{
			@include wh(90px,90px);
		}
	}
</style>
