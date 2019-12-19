<template>
	<view class="main" v-if="isLoaded">
		<!-- 导航条 -->
		<div class="container">
			<view class="item" v-for="(item,index) in pageData[loadIndex].list"   :key="index" >
				<my-goods-card :item="item"  :isOrder="true" :isShow="true"></my-goods-card>
				<view class="pay pl5 pr5 f">
					<view class="ml5 mr5" style="margin-top: 3px;">
						<van-icon name="refund-o" :color="'#38A472'" size="15px" />
					</view>
					<text class="theme">仅退款</text>
				</view>
				<view class="action f p5">
					<view class="ml5" @click="toDetail(item)">
						<van-tag type="success" plain round size="medium" :color="'#38A472'">查看详情</van-tag>
					</view>
				</view>
			</view>
		</div>
		<!-- 加载更多 -->
		<load-more :tip="pageData[loadIndex].text" :loading="pageData[loadIndex].isLoading" />
	</view>
</template>

<script>
	import loadData from "../../../utils/loaddata.js";
    const status=['待审核','商家已拒绝','退款中','复核已拒绝','退款成功','已关闭'];
	import MyGoodsCard from "../../../mycomponents/my-goods-card/my-goods-card.vue";
	export default {
		components:{
			MyGoodsCard
		},
		data() {
			return {
				isLoaded: false,
				pageData: [{
					areaName: "初始化",
					list: []
				}],
				selectarea: "初始化",
			};
		},
		computed: {
			//需要加载的索引
			loadIndex() {
				let index = 0;
				index = parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea));
				return index;
			}
		},
		async onLoad(options) {
			console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
			this.$mp.page.hook = this.refresh;
			this.selectarea = '退款退货';
			await this.getData();
		},
		onReachBottom() {
			this.getData();
		},
		methods:{
			//跳转到详情
			toDetail(item){
				this.$tools.navigateTo('/pages/me/refund_detail/refund_detail?item='+JSON.stringify(item));
			},
			//刷新页面
			refresh(){
				this.pageData.splice(1);
				this.getData();
			},
			async getData(){
				loadData.loadMore.call(this, async (reslove, reject) => {
					await new Promise(async (res, rej) => {
						//获取需要加载的选项
						const index = parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea));
						// 获取需要加载的那一项
						let v = this.pageData[index];
						//发送请求了
						let  result = await this.$net.sendRequest('/returnApply/list', {
							pageNo: v.pageNum,
							pageSize: 20,
						});
						console.log(result)
						result = result.map(item=>{item.status = status[item.status];return item}).filter(item=>item.status)
						v.list = [...v.list, ...result]
						this.$set(this.pageData, index, v);
						this.isLoaded = true;
						reslove(result);
						res();
					})
				});
			}
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
