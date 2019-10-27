<template>
	<view class="main">
		
		<!-- 搜索框 -->
		<view class="search_wrapper" @click="navigateTo" data-url="/pages/index/search/search">
			<Ser :back="'#fff'"></Ser>	
		</view>
		
		<!-- 内容 -->
		<view style="height: 45px;">
			
			
		</view>
		<view class=" fsb">
			<scroll-view scroll-y="true" :style="{height: scrollHeight,width: '85px'}" >
				<van-sidebar :active="active" @change="onChange">
				  <van-sidebar-item v-for="(item,index) in 20" title="标签名称" />
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
	import Ser from "../../../mycomponents/Ser/Ser";
	import uniGrid from "../../../mycomponents/uni-grid/uni-grid.vue"
	import uniGridItem from "../../../mycomponents/uni-grid-item/uni-grid-item.vue"
	export default {
		components:{
			Ser,uniGrid,uniGridItem
		},
		data() {
			return {
				active: 0,
				scrollHeight:"",
				keys: [{
						text: "待付款",
						url: "",
						src: "/static/images/Pending-payment@2x.png",
						num: 1
					},
					{
						text: "待发货",
						url: "",
						src: "/static/images/shipped@2x.png",
						num: 0
					},
					{
						text: "待收货",
						url: "",
						src: "/static/images/Goods-to-be-received@2x.png",
						num: 0
					},
					{
						text: "已完成",
						url: "",
						src: "/static/images/complete@2x.png",
						num: 0
					},
					{
						text: "退货退款",
						url: "",
						src: "/static/images/refund@2x.png",
						num: 0
					}
				]
			}
		},
		onLoad() {
			this.computeScrollHeight();
		},
		methods: {
			//页面跳转
			navigateTo(e) {
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
			//计算滚动条长度
			computeScrollHeight(){
				const systemInfo = uni.getSystemInfoSync().windowHeight-45;
				this.scrollHeight = systemInfo+"px";
			},
			onChange(e){
				console.log(e)
				
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
