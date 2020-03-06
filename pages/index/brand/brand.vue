<template>
	<view class="main bt"  v-if="baseImageUrl">
		<view class=" fsb">
			<scroll-view scroll-y="true" :style="{height: scrollHeight,width: '85px'}" >
				<van-sidebar :active="active" @change="onChange">
				  <van-sidebar-item v-for="(item,index) in 20" :key="index" title="标签名称" />
				</van-sidebar>
			</scroll-view>
			<scroll-view scroll-y="true" style="height: 100%;width: 290px;" >
				<view class="top">
					
				</view>
				<view class="bottom">
					<uni-grid :column="3" :show-border="false" :square="false">
						<uni-grid-item v-for="(item,index) in keys" :key="index">
							<view class="pic_item pr">
								<Pic :src="item.src" :height="'45px'" :width="'45px'" :mode="'aspectFill'" :back="'#fff'"></Pic>
							</view>
							<text class="text fz12" style="color: #222;">{{item.text}}</text>
						</uni-grid-item>
					</uni-grid>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniGrid from "../../../mycomponents/uni-grid/uni-grid.vue"
	import uniGridItem from "../../../mycomponents/uni-grid-item/uni-grid-item.vue"
	import {localYunImageUrl as baseImageUrl} from "../../../utils/base.js"
	export default {
		components:{
			uniGrid,uniGridItem
		},
		data() {
			return {
				keys: [{
						text: "待付款",
						url: "",
						src: baseImageUrl+"/Pending-payment@2x.png",
						num: 1
					},
					{
						text: "待发货",
						url: "",
						src: baseImageUrl+"/shipped@2x.png",
						num: 0
					},
					{
						text: "待收货",
						url: "",
						src: baseImageUrl+"/Goods-to-be-received@2x.png",
						num: 0
					},
					{
						text: "已完成",
						url: "",
						src: baseImageUrl+"/complete@2x.png",
						num: 0
					},
					{
						text: "退货退款",
						url: "",
						src: baseImageUrl+"/refund@2x.png",
						num: 0
					}
				]
			};
		}
	}
</script>

<style lang="scss">
	@import './../../../static/styles/mixin.scss';
	
</style>
