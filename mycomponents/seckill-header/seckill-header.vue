<template>
	<view>
		<view class="header pr">
			<image src="/static/images/mb.jpg" mode="widthFix" style="width: 100%;"></image>
			<view class="content f pa ">
				<view class="item active" v-for=" (item,index) in arr" :key="index">
					<view :class="['date frm fb cfff','fz'+(25-arr.length*2),'fs'+(21-arr.length*2)]">今日</view>
					<!-- <view :class="['date frm fb ','fs'+(21-arr.length*2)]">今日</view> -->
					<view :class="['state frm ','fz'+(15-arr.length)]">正在开抢中</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			navs:{
				type:Array
			}
		},
		data() {
			return {
				arr:[{
					title:"今日",
					tag:"正在开抢中"
				},
				{
					title:"今日",
					tag:"正在开抢中"
				},
				{
					title:"今日",
					tag:"正在开抢中"
				},
				{
					title:"今日",
					tag:"正在开抢中"
				},
				{
					title:"今日",
					tag:"正在开抢中"
				}],
				b:"ad"
			};
		},
		mounted() {
			console.log(this.$data)
		}
	}
</script>

<style lang="scss" scoped>
	
	.content{
		width: 100%;
		z-index: 9;
		left: 0px;
		top: 0px;
		.item{
			padding: 20rpx 0 10rpx;
			> view{
				color: #8FE1EF;
			}
			flex: 1;
			&.active{
				background:linear-gradient(180deg,rgb(32,155,180) 0%,rgba(119,219,237,-1.62) 100%);
			}
		}
	}
</style>
