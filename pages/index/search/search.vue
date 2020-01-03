<template>
	<view class="main">
		<!-- 搜索框 -->
		<view class="pf" style="width: 100%;top: 0px;left: 0px;">
			<Ser :isDisabled="false" ref="search" :color="'#38A472'" @startSerch='search'></Ser>
		</view>
		<view style="height: 45px;"></view>
		<view class="before_search" v-if="isHistory">
			<!-- 热门搜索 -->
			<view class="searchBotBox" v-if="hotKey.length">
				<view class="ov ">
					<view class="fl" style="color: #898989;">热门搜索</view>
				</view>
				<view class="searchHistoryBox">
					<view class="searchHistoryBoxItem text-hidden" v-for="(item,index) in hotKey" :key='index' style="max-width: 150px;"
					 @click="itemsearch(item)">
						{{item}}
					</view>
				</view>
			</view>

			<!-- 搜索历史 -->
			<view class="searchBotBox">
				<view class="ov ">
					<view class="fl" style="color: #898989;">搜索历史</view>
					<view @click="clearKey" class="fr grace-more-r grace-search-remove">
						<van-icon name="delete"></van-icon>
					</view>
				</view>
				<view class="searchHistoryBox" v-if="searchKey.length">
					<view class="searchHistoryBoxItem text-hidden" v-for="(item,index) in searchKey" :key='index' style="max-width: 150px;"
					 @click="itemsearch(item)">
						{{item}}
					</view>
				</view>
			</view>
		</view>

		<!-- 已经搜索 -->
		<view class="searched"  :style="{'opacity':isHistory?0:1,'position': !isHistory?'static':'fixed','z-index':!isHistory?1:-1}">
			<!-- 状态栏 -->
			<view class="pf" style="width: 100%;top: 45px;">
				<cate-bar ref='cate' @get="reload"></cate-bar>
			</view>
			<view style="height: 44px;"></view>
			
			<view v-if="pageData[loadIndex].list.length">
				<!-- 内容 -->
				<MyList :list="pageData[loadIndex].list"></MyList>
				<load-more :tip="pageData[loadIndex].text" :loading="pageData[loadIndex].isLoading" />
			</view>
			
			<view class="fm" v-if="!pageData[loadIndex].list.length" style="height: 100%;">
				<Empty :text="'没有找到商品,请更换条件再试试哦'" :src="'/static/images/ddwsj@2x.png'" style="height: 100%;" />
			</view>
		</view>


		<!-- 模态框 -->
		<van-dialog id="van-dialog" confirm-button-color="#38A472" />
	</view>
</template>

<script>
	import Ser from "../../../mycomponents/Ser/Ser";
	import Dialog from '../../../wxcomponents/vant/dialog/dialog';
	import CateBar from '../../../mycomponents/cate-bar/cate-bar.vue';
	import MyList from "../../../mycomponents/my-list/my-list.vue";
	import loadData from "../../../utils/loaddata.js";
	import Empty from '../../../mycomponents/empty-item/empty-item.vue';
	export default {
		components: {
			Ser,
			CateBar,
			MyList,
			Empty
		},
		data() {
			return {
				searchKey: [],
				hotKey: [],
				isHistory: true,
				isLoaded: false,
				pageData: [{
					areaName: "初始化",
					list: []
				}],
				selectarea: "初始"
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
		onReachBottom() {
			this.search();
		},
		async onLoad() {
			wx.showLoading({
				title: "请稍后..."
			})
			//获取历史搜索
			this.getKeyHistory();
			//获取热门搜索
			await this.getHotKey();
			wx.hideLoading();
		},
		methods: {
			//获取热门搜索
			async getHotKey() {
				const result = await this.$net.sendRequest("/home/getSearch", {
					limit: 10
				}, "GET");
				this.hotKey = result.hotKey;this.isLoaded = true;
			},
			//获取搜索历史
			getKeyHistory() {
				try {
					this.searchKey = JSON.parse(uni.getStorageSync("searchHistory"));
				} catch (e) {
					//TODO handle the exception
					uni.setStorageSync("searchHistory", JSON.stringify([]))
				}

			},
			clearKey() {
				Dialog.confirm({
					title: '提示',
					message: '确认删除该关键词吗?'
				}).then(() => {
					// on confirm
					uni.setStorageSync("searchHistory", JSON.stringify([]));
					this.getKeyHistory()
				});
			},
			itemsearch(item) {
				this.$refs.search.searchValue = item;
				this.reload();
			},
			reload(){
				this.pageData.splice(1,1);
				this.$nextTick(()=>{this.$refs.search.confirmContent();})
			},
			//搜索
			search(){
				this.selectarea = "搜索商品";
				loadData.loadMore.call(this, async (reslove, reject) => {
					await new Promise(async (res, rej) => {
						//获取需要加载的选项
						const index = parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea));
						// 获取需要加载的那一项
						let v = this.pageData[index];
						console.log(this.$refs.cate.active)
						//发送请求了
						const result = await this.$net.sendRequest('/home/getProductList', {
							name:this.$refs.search.searchValue.trim(),
							...this.$refs.cate.active!=1 ?{
								listOrder:(()=>{const arr = ['price','sale'];return arr[this.$refs.cate.active-2]})(),
								listOrderSort:(()=>{const arr = [this.$refs.cate.priceSort,this.$refs.cate.saleSort];return arr[this.$refs.cate.active-2]?1:0})(),
							}:{},
							pageNum: v.pageNum,
							pageSize: 20
						},"GET")
						v.list = [...v.list, ...result]
						this.$set(this.pageData, index, v);
						reslove(result);
						res();
					})
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';

	.searchBotBox {
		width: 100%;
		margin-top: 10upx;
		padding: 15upx 3%;
		box-sizing: border-box;
	}

	.searchHistoryBox {
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		margin-top: 60upx;

	}
	.searched{
		height: 100%;
	}

	.searchHistoryBoxItem {
		float: left;
		font-size: 26upx;
		color: #666;
		line-height: 46upx;
		height: 46upx;
		padding: 0 20upx;
		border-radius: 23upx;
		margin-left: 15upx;
		margin-bottom: 20upx;
		background: #f1f1f1;
	}
</style>
