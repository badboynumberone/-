<template>
	<view class="main"  v-if="baseImageUrl">
		<view :style="{'opacity':pageData[0].list.length?0:1,'position': !pageData[0].list.length?'static':'fixed','z-index':!pageData[0].list.length?1:-1}">
			<view class="top pf bt" style="width: 100%;top: 0px;right: 0px;z-index: 9;background: #fff;">
				<view style="width: 100%;">
					<cate-bar ref='cate' @get="reload"></cate-bar>
				</view>
			</view>
			<view style="height: 40px;"></view>
			<view class="mt10">
				<MyList :list="pageData[0].list"></MyList>
				<load-more v-if="pageData[0].list.length" :tip="pageData[0].text" :loading="pageData[0].isLoading" />
			</view>
		</view>
		
		<view class="fm" v-if="!pageData[0].list.length" style="height: 100%;">
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
	let arr = [];
	export default {
		components: {
			CateBar,MyList,Empty
		},
		data() {
			return {
				isLoaded: false,
				pageData: [{
					areaName: "初始化",
					list: [],
					text:'到底了',
					isLoading:false
				}],
				selectarea: "初始"
			};
		},
		
		onLoad(options) {
			console.log(getCurrentPages()[getCurrentPages().length-1].route,options)
			opt = options;
			arr = JSON.parse(opt.list);
			//设置页面内容
			this.setPageContent();
			//第一次加载获取数据
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
				const index = this.$refs.cate.active;
				const priceSort = this.$refs.cate.priceSort;
				const saleSort = this.$refs.cate.saleSort;
				const array = JSON.parse(JSON.stringify(arr));
				let data = null;
				index==1  && (data=arr);
				index==2 && !priceSort && (data = array.sort((a,b)=>{return parseFloat(a.price.split("~")[0])-parseFloat(b.price.split("~")[0])}));
				index==2 && priceSort && (data = array.sort((a,b)=>{return parseFloat(b.price.split("~")[0])-parseFloat(a.price.split("~")[0])}));
				index==3 && !saleSort && (data = array.sort((a,b)=>{return a.sale - b.sale}));
				index==3 && saleSort && (data = array.sort((a,b)=>{return b.sale - a.sale}));
				this.$set(this.pageData[0], 'list', data );
			},
			//获取数据
			getData() {
				//获取需要加载的选项
				this.$set(this.pageData[0], 'list', JSON.parse(opt.list));
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
