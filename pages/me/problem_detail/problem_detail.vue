<template>
	<view class="main">
		<view class="container p20">
			<view class="question f" style="margin-bottom: 20rpx;">
				<view class="icon fm mr5">
					Q
				</view>
				<view class="content fz17 fb">
					已确认收货的订单失效？
				</view>
			</view>
			<view class="answer f">
				<view class="icon fm mr5" style="background: #C2C2C2;">
					A
				</view>
				<view class="content" style="color: #C2C2C2;">
					订单已失效订单已失效订单已失效订单已失效
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	let opt = null,pages=null;
	export default {
		components:{
			
		},
		data() {
			return {
				
			};
		},
		computed:{
			
		},
		onLoad(options) {
			//页面信息答应
			this.setPage(options);
		},
		methods:{
			setPage(options){
				console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
				opt = options;pages=getCurrentPages();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		>view{
			align-items: center;
			.icon{
				@include wh(50rpx,50rpx);
				color: #fff;
				border-radius: 50%;
				overflow: hidden;
				background: $theme;
			}
		}
	}
</style>
