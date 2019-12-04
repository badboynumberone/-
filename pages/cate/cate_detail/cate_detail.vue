<template>
	<view class="main">
		<!-- 内容 -->
		<view class="fsb bt">
			<scroll-view class="br" scroll-y="true" :style="{height: scrollHeight,width: '170rpx',background:'#F8F8F8'}">
				<van-sidebar :active="active" @change="onChange">
					<van-sidebar-item v-for="(item,index) in cates" :key="index" :title="item.name" />
				</van-sidebar>
			</scroll-view>
			<scroll-view class="pr" scroll-y="true" style="height: 100%;width: 580rpx;">
				<view class="top pa" style="width: 100%;top: 0px;right: 0px;">
					<view style="width: 100%;">
						<cate-bar ref='cate' @get="reload"></cate-bar>
					</view>
				</view>
				<view style="height: 40px;"></view>
				<view class="bottom">
					<product-item v-for="(item,index) in pageData[loadIndex].list" :key="index" :item="item" @click="navigateTo" :data-url="'/pages/index/product/product?id='+item.id"></product-item>
					<load-more :tip="pageData[loadIndex].text" :loading="pageData[loadIndex].isLoading" />
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
	import ProductItem from '../../../mycomponents/product-item/product-item.vue';
	export default {
		components: {
			Ser,
			uniGrid,
			uniGridItem,
			CateBar,
			ProductItem
		},
		data() {
			return {
				active: 0,
				scrollHeight: "",
				cates:[],
				pageData: [{
					areaName: "初始化",
					list: []
				}],
				selectarea: "初始",
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
		async onLoad(options) {
			//设置页面内容
			this.setPageContent(options);
			//获取二级分类
			await this.getSecondCate(options);
			
			this.selectarea = this.cates[this.active];
		    this.getData();
		},
		methods: {
			//设置页面内容
			setPageContent(options){
				wx.setNavigationBarTitle({
					title:options.cate
				})
				this.computeScrollHeight();
			},
			//计算滚动条长度
			computeScrollHeight() {
				const systemInfo = uni.getSystemInfoSync().windowHeight;
				this.scrollHeight = systemInfo + "px";
			},
			//获取二级分类
			async getSecondCate(options){
				this.cates= await this.$net.sendRequest(`/home/productCateList/${options.id}`,{},"GET");
			},
			//页面跳转
			navigateTo(e) {
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
			//重新加载
			reload(){
				loadData.clear.call(this);
				this.getData();
			},
			//获取数据
			getData() {
				loadData.loadMore.call(this, async (reslove, reject) => {
					await new Promise(async (res, rej) => {
						//获取需要加载的选项
						const index = parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea));
						// 获取需要加载的那一项
						let v = this.pageData[index];
						//发送请求了
						const result = await this.$net.sendRequest('/home/getProductList', {
							productCategoryId:this.cates[this.active].id,
							...this.$refs.cate.active!=1 ?{
								listOrder:(()=>{const arr = ['price','sale'];return arr[this.$refs.cate.active-2]})(),
								listOrderSort:(()=>{const arr = [this.$refs.cate.priceSort,this.$refs.cate.saleSort];return arr[this.$refs.cate.active-2]?1:0})(),
							}:{},
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
				if(this.active==e.detail) return 
				this.active=e.detail;
				this.selectarea = this.cates[e.detail].name;
				this.getData();
			},
			
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

