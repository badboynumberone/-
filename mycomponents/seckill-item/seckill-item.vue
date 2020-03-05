<template>
	<view class="item ftm p10 bgfff pr">
		<Pic :src="'/static/images/successful_payment@2x.png'" :height="'170rpx'" :width="'170rpx'" :mode="'aspectFit'" :back="'#f1f1f1'"/>
		<view class="content ml10">
			<view class="title fz15 fb more-hidden" style="line-height: 46rpx;">
				水果小黄瓜新鲜青瓜5斤天...水果小黄瓜新sadsadasddsa鲜青瓜5斤天...
			</view>
			<!-- <view class="limit_count fz12">
				限量1200件
			</view>
			<view class="limit_time fz12">
				12:00开抢
			</view> -->
			<view class="progress ftm pt5">
				<view class="line">
					<view class="length" style="width: 100rpx;height: 100%;"></view>
				</view>
				<view class="text ml10 cccc fz12">已抢400件</view>
			</view>
			<view class="left_time">
				<text class="fz12 c666">距离结束还剩:</text>
				<text class="fz12 c666" style="color: #1AAE68;">01:23:56</text>
			</view>
			<view class="price">
				<text class="now fz21 fb">¥50</text>
				<text class="old fz13">¥80</text>
			</view>
			
		</view>
		<view class="button pa">
			<!-- <view class="go ftm cfff">去抢购<van-icon name="arrow" style="margin-top: 7.9rpx;" /></view> -->
			<!-- <view class="out ftm cfff">已抢完</view> -->
			<view class="ready ftm cfff">即将开抢</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				
			};
		},
		computed:{
			
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.item{
		border-radius:18rpx;
		overflow: hidden;
		min-height: 210rpx;
		.progress{
			
		}
		.line{
			@include wh(220rpx,8rpx);
			border-radius: 8rpx;
			overflow: hidden;
			border: 1px solid #1AAE68;
			.length{
				background:linear-gradient(101deg,rgba(26,174,104,1) 0%,rgba(136,207,118,1) 100%);
			}
		}
		.limit_count{
			color: #33BAC5;
		}
		.limit_time{
			color: #23B166;
		}
		.price{
			.now{
				color: #1AAE68;
			}
			.old{
				color: #C2C2C2;
				text-decoration: line-through;
				margin-left:15rpx;
			}
		}
		
		.button{
			bottom:20rpx;
			right: 20rpx;
			>view{
				padding: 7.5rpx 20rpx;
				border-radius:26px;
				overflow: hidden;
			}
			.go{
				background:linear-gradient(101deg,rgba(26,174,104,1) 0%,rgba(136,207,118,1) 100%);
				box-shadow:1px 8px 18px 0px rgba(125,203,117,0.48);
			}
			.out{
				background: #C9C9C9;
			}
			.ready{
				background: #59C08F;
			}
		}
	}
</style>
