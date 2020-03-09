<template>
	<view >
		<view class="header pr">
			<image :src="`${baseImageUrl}/bg_Presale@2x.png`" mode="widthFix" style="width: 100%;"></image>
			<view class="content f pa ">
				<view :class="['item',activeIndex==index ? 'active':'']" v-for=" (item,index) in arr" :key="index" @click="itemclickHandler(index)">
					<view :class="['date frm cfff',activeIndex==index ? 'fb ' + 'fz'+(25-arr.length*2): 'fs'+(21-arr.length*2)]">{{item.title}}</view>
					<!-- <view :class="['date frm fb ','fs'+(21-arr.length*2)]">今日</view> -->
					<view :class="['state frm ', activeIndex==index ? 'fz'+(16-arr.length):'fz'+(15-arr.length)]">{{item.tag}}</view>
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
				baseImageUrl:getApp().globalData.baseImageUrl,
				activeIndex:0,
				arr:[{
					title:"今天",
					tag:"正在开抢中"
				},
				{
					title:"明天",
					tag:"即将开抢"
				},
				{
					title:"后天",
					tag:"即将开抢"
				}]
			};
		},
		methods:{
			itemclickHandler(index){
				this.activeIndex = index;
				this.$emit("menuclick");
			}
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
			.date,.state{
				transition: all 0.2s;
			}
		}
	}
</style>
