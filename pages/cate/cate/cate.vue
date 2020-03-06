<template>
	<view class="main" >
		<!-- 搜索框 -->
		<view class="search_wrapper" @click="navigateTo" data-url="/pages/index/search/search">
			<Ser :color="'#38A472'" :back="'#fff'"></Ser>	
		</view>
		<!-- 内容 -->
		<view style="height: 45px;">
		</view>
		<view class=" fsb">
			<scroll-view scroll-y="true" style="height: 100%;" >
				<view class="bottom pt10">
					<!-- <uni-grid :column="3" :show-border="false" :square="false">
						<uni-grid-item v-for="(item,index) in keys" :key="index" v-if="item.showStatus==0" >
							<view  @click="navigateTo" :data-url="'/pages/cate/cate_detail/cate_detail?id='+item.id+'&cate='+item.name">
								<view class="pic_item pr" >
									<Pic :src="item.mobilePhoto" :height="'45px'" :width="'45px'" :mode="'aspectFill'" :back="'#fff'"></Pic>
								</view>
								<text class="text fz12" style="color: #222;">{{item.name}}</text>
							</view>
						</uni-grid-item>
					</uni-grid> -->
					<van-grid column-num="4" :border="false">
						<van-grid-item use-slot  v-for="(item,index) in keys" :key="index" v-if="item.name!='更多'" >
							<view class="fm" style="flex-flow: column wrap;" @click="navigateTo" :data-url="'/pages/cate/intro_cate_detail/intro_cate_detail?id='+item.id+'&name='+item.name">
								<Pic :src="item.mobilePhoto" :height="'40px'" :width="'40px'" :mode="'aspectFill'" :back="'#fff'" :round="true"></Pic>
								<text class="text fz12" style="color: #222;margin-top: 5rpx;">{{item.name}}</text>
							</view>
						</van-grid-item>
					</van-grid>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Ser from "../../../mycomponents/Ser/Ser";
	import uniGrid from "../../../mycomponents/uni-grid/uni-grid.vue"
	import uniGridItem from "../../../mycomponents/uni-grid-item/uni-grid-item.vue"
	import {localYunImageUrl as baseImageUrl} from "../../../utils/base.js"
	export default {
		components:{
			Ser,uniGrid,uniGridItem
		},
		data() {
			return {
				baseImageUrl:getApp().globalData.baseImageUrl,
				isLoaded:false,
				active: 0,
				scrollHeight:"",
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
			}
		},
		async onLoad() {
			await this.getCate();
			this.isLoaded = true;	
		},
		methods: {
			//页面跳转
			navigateTo(e) {
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
			//获取分类
			async getCate(){
				const result = await this.$net.sendRequest("/home/productCateList/0",{},"GET");
				this.keys = result.reverse();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search_wrapper{
		width: 100%;
		position: fixed;
		z-index: 99;
		top: 0px;
		 box-shadow:-2px 3px 5px #DBDBDB;
	}
</style>
