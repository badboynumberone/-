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
					<text class="theme">{{item.type==6 ? '仅退款' : '退款退货'}}</text>
				</view>
				<view class="action f p5">
					<view class="ml5" @click="cancelApply(item)">
						<van-tag plain round size="medium" >取消申请</van-tag>
					</view>
					<view class="ml5" @click="toDetail" :data-item="item">
						<van-tag type="success" plain round size="medium" :color="'#38A472'">查看详情</van-tag>
					</view>
				</view>
			</view>
		</div>
		<!-- 加载更多 -->
		<load-more :tip="pageData[loadIndex].text" :loading="pageData[loadIndex].isLoading" />
		<!-- 模态框 -->
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import loadData from "../../../utils/loaddata.js";
	import Dialog from '../../../wxcomponents/vant/dialog/dialog';
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
			toDetail(e){
				const item = e.currentTarget.dataset.item;
				this.$tools.navigateTo('/pages/me/refund_detail/refund_detail?item='+JSON.stringify(item));
			},
			//刷新页面
			async refresh(){
				this.pageData.splice(1);
				await this.getData();
			},
			//取消申请退款
			cancelApply(item){
				Dialog.confirm({
				  title: '取消退款申请?',
				  message: '撤销退款申请后，本次退款申请将 关闭，如果后续仍有问题，您可继 续发起退款申请。'
				}).then(async () => {
					uni.showLoading({
						mask: true
					});
					await this.$net.sendRequest("/returnApply/cancelApply",{id:item.id});
					await this.refresh();
					uni.hideLoading();
				  // on confirm
				}).catch(() => {
				  // on cancel
				});
			},
			//获取数据
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
