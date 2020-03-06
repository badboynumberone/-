<template>
	<view class="main"  v-if="baseImageUrl">
		<!-- 内容 -->
		<view class=" fsb bt">
			<scroll-view scroll-y="true" :style="{height: scrollHeight,width: '170rpx'}">
				<van-sidebar :active="active" @change="onChange">
					<van-sidebar-item v-for="(item,index) in 20" :key="index" title="标签名称" />
				</van-sidebar>
			</scroll-view>
			<scroll-view scroll-y="true" style="height: 100%;width: 580rpx;">
				<view class="top">
					<view style="width: 100%;">
						<cate-bar ref='cate' @get="reload"></cate-bar>
					</view>
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
	import CateBar from '../../../mycomponents/cate-bar/cate-bar.vue'
	import loadData from "../../../utils/loaddata.js";
	import {localYunImageUrl as baseImageUrl} from "../../../utils/base.js"
	export default {
		components: {
			Ser,
			uniGrid,
			uniGridItem,
			CateBar
		},
		data() {
			return {
				active: 0,
				scrollHeight: "",
				pageData: [{
					areaName: "初始化",
					list: []
				}],
				selectarea: "初始",
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
		computed: {
			//需要加载的索引
			loadIndex() {
				let index = 0;
				index = parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea));
				return index;
			}
		},
		onLoad() {
			this.computeScrollHeight();
			this.selectarea = "产品";
			this.getData();

		},
		methods: {
			//页面跳转
			navigateTo(e) {
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
			//计算滚动条长度
			computeScrollHeight() {
				const systemInfo = uni.getSystemInfoSync().windowHeight - 45;
				this.scrollHeight = systemInfo + "px";
			},
			reload() {

			},
			//
			getData() {
				loadData.loadMore.call(this, async (reslove, reject) => {
					await new Promise(async (res, rej) => {
						//获取需要加载的选项
						const index = parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea));
						// 获取需要加载的那一项
						let v = this.pageData[index];
						console.log(this.$refs.cate.active)
						//发送请求了
						const result = await this.$net.sendRequest('/home/getProductList', {
							pageNum: v.pageNum,
							pageSize: 20
						}, "GET")
						v.list = [...v.list, ...result]
						this.$set(this.pageData, index, v);
						reslove(result);
						res();
					})
				});
			},
			onChange(e) {
				console.log(e)

			}
		}
	}
</script>

<style lang="scss" scoped>
	.search_wrapper {
		width: 100%;
		position: fixed;
		z-index: 99;
		top: 0px;
		box-shadow: -2px 3px 5px #DBDBDB;
	}
</style>
