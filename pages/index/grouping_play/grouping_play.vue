<template>
	<view class="main">
		<view class="top">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="title fm mb10">
					<image :src="`${baseImageUrl}/triangle@2x.png`" mode="aspectFit"></image>
					<text class="fb ml5 mr5">{{item[0]}}</text>
					<image :src="`${baseImageUrl}/triangle@2x.png`" style="transform:rotate(180deg)" mode="aspectFit"></image>
				</view>
				<view class="content pt10 pb10 pl20 pr20 c222">
					{{item[1]}}
				</view>
			</view>
		</view>
		<view class="bottom">
			<image class="w100" :src="`${baseImageUrl}/group-step@2x.png`" mode="widthFix"></image>
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
				baseImageUrl: getApp().globalData.baseImageUrl,
				list:[
					['拼团有效期','拼团有效期是自开团时刻起的24小时内，如果距离商品活动实效时间小于24小时,则以商品活动结束时间为准'],
					['拼团成功','拼团有效期内,达到相应参团人数的团,则该团成功。'],
					['拼团失败','超过成团有效期24小时,未达成相应参团人数的团,则该团失败'],
					['参团失败,自动退款','若拼团有效期内没有凑齐人数，即算拼团失败。系统会自动将所有支付的货款原路退回。']
				]
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
	.title{
		image{
			@include wh(30rpx,30rpx);
		}
	}
	.bottom{
		border-top: 5px solid #F1F1F1;
	}
</style>
