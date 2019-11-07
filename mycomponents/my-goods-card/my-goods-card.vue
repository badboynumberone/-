<template>
	<view class="box p10">
		<view class="header pb5 fsb bb" style="align-items: center;">
			<view class="store ftm">
				<view class="icon mr5">
					<van-icon name="shop-o" :size="'20x'" />
				</view>
				<text class="fb">南京普朗克科贸有限公司</text>
				<view class="icon right">
					<van-icon name="arrow" :color="'#ccc'" />
				</view>
			</view>
			<text class="status theme fz14" v-if="status">
				{{status}}
			</text>
		</view>
		<view class="container f pb5 pt5" v-for="(item,index) in 2" :key="index" @click="navigateTo" :data-url="'/pages/me/order_detail/order_detail'">
			<view class="pic">
				<Pic :src="'https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg'" :height="'90px'" :width="'90px'" :mode="'aspectFill'"></Pic>
			</view>
			<view class="info fsr ml10">
				<text class="text-hidden" style="width: 230px;">樱桃盐水鸭正宗南京特产咸水鸭樱桃盐水鸭正宗南京特产咸水鸭</text>
				<text class="text-hidden fz10 size" :decode="true" style="width: 220px;margin-top: -5px;">10斤20斤10斤20斤10斤20斤10斤20斤10斤20斤10斤20斤10斤20斤10斤20斤</text>
				<view class="price fz16  fsb">
					<text>￥32.00</text>
					<view class="fz12" style="color: #727272;">
						x1
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Pic from "../Pic/Pic.vue";
	export default {
		components:{
			Pic
		},
		props:{
			status:{
				type:String
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			// computeUrl(item,index){
			// 	return function(item,index){
			// 		return ;
			// 	}
			// }
		},
		methods:{
			//页面跳转
			navigateTo(e) {
				const url = e.currentTarget.dataset.url;
				if(!url){
					return;
				}
				this.$tools.navigateTo(url)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../static/styles/mixin.scss';
	.box{
		background: #fff;
		border-bottom: 1rpx solid #f1f1f1;
		.header {
			.icon {
				transform: translateY(2px);
			}
		}
		.container:not(:last-child){
			border-bottom: 1rpx solid #f1f1f1;
		}
		.container{
			
			.pic{
				border-radius: 5rpx;
				overflow: hidden;
			}
			.info {
				flex-flow: column wrap;
				flex: 1;
				.size {
					color: #727272;
				}
			
				.price {
					align-items: center;
			
					>text {
						color: $theme;
					}
				}
			}
		}
	}
</style>
