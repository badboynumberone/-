<template>
	<view class="main" >
		<view :style="{'opacity':pageData[loadIndex].list.length?0:1,'position': !pageData[loadIndex].list.length?'static':'fixed','z-index':!pageData[loadIndex].list.length?1:-1}">
			<view class="top pf bt" style="width: 100%;top: 0px;right: 0px;z-index: 9;background: #fff;">
				<view style="width: 100%;">
					<cate-bar ref='cate' @get="reload"></cate-bar>
				</view>
			</view>
			<view style="height: 40px;"></view>
			<view class="mt10">
				<MyList :list="pageData[loadIndex].list"></MyList>
				<load-more v-if="pageData[loadIndex].list.length" :tip="pageData[loadIndex].text" :loading="pageData[loadIndex].isLoading" />
			</view>
		</view>
		
		<view class="fm" v-if="!pageData[loadIndex].list.length" style="height: 100%;">
			<Empty :text="'没有找到商品,请更换分类再试试哦'" :src="`${baseImageUrl}/ddwsj@2x.png`" style="height: 100%;" />
		</view>
		
	</view>
</template>

<script>
	import CateBar from '../../../mycomponents/cate-bar/cate-bar.vue'
	import MyList from "../../../mycomponents/my-list/my-list.vue";
	import loadData from "../../../utils/loaddata.js";
	import Empty from '../../../mycomponents/empty-item/empty-item.vue';
	let opt = null;
	export default {
		components: {
			CateBar,MyList,Empty
		},
		data() {
			return {
				baseImageUrl:getApp().globalData.baseImageUrl,
				pageData: [{
					areaName: "初始化",
					list: []
				}],
				selectarea: "初始"
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
		onLoad(options) {
			opt = options;
			//设置页面内容
			this.setPageContent();
			//第一次加载获取数据
			this.selectarea="全部";
			this.getData();
			
		},
		onReachBottom() {
			this.getData();
		},
		methods:{
			//设置页面标题
			setPageContent(){
				wx.setNavigationBarTitle({
					title:opt.name
				})
			},
			//重新加载
			reload(){
				loadData.clear.call(this);
				this.getData();
			},
			//获取数据
			getData() {
				console.log(this.$refs.cate.active)
				loadData.loadMore.call(this, async (reslove, reject) => {
					await new Promise(async (res, rej) => {
						//获取需要加载的选项
						const index = parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea));
						// 获取需要加载的那一项
						let v = this.pageData[index];
						//发送请求了
						const result = await this.$net.sendRequest('/home/getProductList', {
							productCategoryId:opt.id,
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
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
