<template>
	<view class="container clearfix">
		<view class="content">
			<view class="column pr5">
				<view class="item p5" v-for="(item,index) in pageData" :key="index" v-if="index%2==0" @click="toProduct" :data-url="'/pages/index/product/product'">
					<view style="border-radius: 10rpx;overflow: hidden;">
						<Pic :width="'100%'" :height="'150px'" :src="'https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg'" :mode="'aspectFill'" :back="'#fff'" ></Pic>
					</view>
					<view>{{item}}</view>
				</view>
			</view>
			
			<view class="column pl5">
				<view class="item p5" v-for="(item,index) in pageData" :key="index" v-if="index%2==1" @click="toProduct" :data-url="'/pages/index/product/product'">
					<view style="border-radius: 10rpx;overflow: hidden;">
						<Pic :width="'100%'" :height="'150px'" :src="'https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg'" :mode="'aspectFill'" :back="'#fff'"  ></Pic>
					</view>
					<view class="">
						{{item}}
					</view>
					<view class="">
						{{item}}
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
			pageData:{
				type:Array,
				default:function(){
					return [
						"asd","asdas",
						"adsgaassd","asddsga",
						"adsgaassd","asddsga"
					]
				}
			}
		},
		computed:{
		},
		data() {
			return {
				
			};
		},
		methods:{
			toProduct(e){
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../static/styles/mixin.scss';
	.container {
		
		.content{
			width: 750upx;
			padding: 0px 10px;
			display: flex;
			.column {
				width: 50%;
				.item{
					background: #fff;
					box-shadow: 0px 0px 5px 2px #E8E8E8;
					margin-bottom: 5px;
				}
			}
		}
		
	}
</style>
