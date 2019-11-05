<template>
	<view class="main">
		<!-- 导航条 -->
		<div class="container">
			<view class="item" v-for="(item,index) in 5" :key="index" >
				<my-goods-card :status="'待审核'"></my-goods-card>
				<view class="pay pl5 pr5 f">
					<view class="ml5 mr5" style="margin-top: 3px;">
						<van-icon name="refund-o" :color="'#38A472'" size="15px" />
					</view>
					<text class="theme">仅退款</text>
				</view>
				<view class="action f p5">
					<view class="ml5">
						<van-tag type="success" plain round size="medium" :color="'#38A472'">查看详情</van-tag>
					</view>
				</view>
			</view>
		</div>
		<!-- 加载更多 -->
		<load-more :tip="'到底了'" :loading="false" />
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
				
			};
		}
	}
</script>

<style lang="scss">
	@import './../../../static/styles/mixin.scss';
	.container .item:not(:first-child){
		border-top: 5px solid #f1f1f1;
	}
	.container{
		border-top: 1rpx solid #f1f1f1;
		.item{
			
			.action{
				justify-content: flex-end;
			}
		}
	}
</style>
