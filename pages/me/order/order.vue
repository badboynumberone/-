<template>
	<view class="main">
		<!-- 状态栏 -->
		<view class="header">
			<van-tabs :active="active" @change="onTabChange" :line-width="'20'">
			  <van-tab name="all" title="全部"/>
			  <van-tab name="waitpay" title="待付款"/>
			  <van-tab name="waitsend" title="待发货"/>
			  <van-tab name="waitaccept" title="待收货"/>
			  <van-tab name="finish" title="交易成功"/>
			  <van-tab name="dealclose" title="交易关闭"/>
			</van-tabs>
		</view>
		<view style="height: 39px;"></view>
		<!-- 内容 -->
		<div class="container">
			<view class="item"v-for="(item,index) in pageData[loadIndex].list"  :key="index" :item="item">
				<my-goods-card :status="'待付款'" :item="item"></my-goods-card>
				<view class="pay pl5 pr5">
					实付款:<text class="theme fz16 fb">￥68.90</text>
				</view>
				<view class="action f p5">
					<!-- <view class="ml5">
						<van-tag plain round size="medium">取消订单</van-tag>
					</view>
					<view class="ml5">
						<van-tag type="success" plain round size="medium" :color="'#38A472'">支付23时59分</van-tag>
					</view>
					<view class="ml5">
						<van-tag plain round size="medium">申请退货退款</van-tag>
					</view> -->
					<view class="ml5">
						<van-tag plain round size="medium">删除订单</van-tag>
					</view>
					<view class="ml5">
						<van-tag plain round size="medium">查看物流</van-tag>
					</view>
					<view class="ml5">
						<van-tag type="success" round size="medium" :color="'#38A472'">确认收货</van-tag>
					</view>
				</view>
			</view>
		</div>
	</view>
</template>

<script>
	import loadData from "../../../utils/loaddata.js";
	import MyGoodsCard from "../../../mycomponents/my-goods-card/my-goods-card.vue";
	const arr =['待付款','待发货','待收货','交易成功','交易关闭','全部'];
	export default {
		components:{
			MyGoodsCard
		},
		data() {
			return {
				isLoaded:false,
				pageData: [{areaName:"初始化",list:[]}],
				selectarea: "初始化",
				active:0
			}
		},
		computed:{
			//需要加载的索引
			loadIndex() {
				let index = 0;
				index =parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea)) ;
				return index;
			}
		},
		onLoad() {
			this.selectarea = "全部";
			this.getData();
		},
		onReachBottom(){
			this.getData();
		},
		methods: {
			onTabChange(e){
				this.active = parseInt(e.detail.index);
				this.selectarea =  this.active==5 ? '全部': arr[this.active-1];
				this.getData();
			},
			getData(){
				loadData.loadMore.call(this, async (reslove, reject) => {
					await new Promise(async (res, rej) => {
						//获取需要加载的选项
						const index = parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea));
						// 获取需要加载的那一项
						let v = this.pageData[index];
						//发送请求了
						
						const result = await this.$net.sendRequest('/order/list', {
								pageNo: v.pageNum,
								pageSize: 20,
								...this.active==0 ? {}:{status:this.active-1} 
							});
						console.log(result)
						v.list = [...v.list, ...result]
						this.$set(this.pageData, index, v);
						this.isLoaded = true;
						reslove(result);
						res();
					})
				});
			},
			//页面跳转
			navigateTo(e) {
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';
	.header{
		position: fixed;
		top: 0px;
		@include wh(100%,44px);
		z-index: 9;
	}
	.container{
		.item{
			border-top: 5px solid #f1f1f1;
			.pay{
				color: #222;
				text-align: right;
			}
			.action{
				justify-content: flex-end;
			}
		}
	}
</style>
