<template>
	<view class="wrapper f bb">
		<view class="item fm" @click="sortBy(1)">
			<text :class="{'active':active==1}">综合</text>
		</view>
		<view class="item fm" @click="sortBy(2)">
			<text :class="['mr10',{'active':active==2}]">价格</text>
			<image v-if="priceSort" src="../../static/images/price-01@2x.png" mode="aspectFill"></image>
			<image v-else src="../../static/images/two_arrow.png" mode="aspectFill"></image>
		</view>
		<view class="item fm"  @click="sortBy(3)">
			<text  :class="['mr10',{'active':active==3}]">销量</text>
			<image v-if="saleSort" src="../../static/images/price-01@2x.png" mode="aspectFill"></image>
			<image v-else src="../../static/images/two_arrow.png" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:1,
				priceSort:true ,//默认降序(价格排序)
				saleSort:true,//默认降序(价格牌序)
			};
		},
		methods:{
			//按什么排序
			sortBy(type){
				this.active = type;
				if(this.active==2 && this.active==type){
					this.priceSort = !this.priceSort;
				}
				if(this.active==3 && this.active==type){
					this.saleSort = !this.saleSort;
				}
				this.$emit("get")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrapper{
		width: 100%;
		height: 80rpx;
		background: #fff;
		.item{
			flex: 1;
			text{
				color: #757575;
			}
			image{
				width: 10rpx;
				height: 20rpx;
			}
		}
		
		.active{
			color: $theme !important;
		}
	}
</style>
