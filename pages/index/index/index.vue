<template>
	<view class="main" v-show="isLoaded">
		<!-- 搜索框 -->
		<view class="search_wrapper" @click="navigateTo" data-url="/pages/index/search/search">
			<Ser :back="'linear-gradient(-52deg,rgba(242,63,61,1),rgba(218,11,32,1)) 100%'"></Ser>
		</view>
		<!-- 新品速递 -->
		<view class="new_goods pr">
			<image class="back pa" src="/static/images/home_bg@2x.png" mode="widthFix"></image>
			<view class="new_content cl">
				<image class="pa fill"  src="/static/images/new_bg@2x.png" mode="scaleToFill"></image>
				<view class="content pa fill p10" >
					<view class="header fsb mb5" style="align-items: center;">
						<view class="fz16 fb" style="color: #fff;">新品速递</view>
						<!-- <view class="more fz10">更多新品</view> -->
					</view>
					<view class="container"  style="border-radius: 5px;overflow: hidden;" >
						<scroll-view class="fill f" scroll-x>
							<view class="wrapper f">
								<view class="item p15" v-for="(item,index) in newList" :key="index" @click="navigateTo" :data-url="'/pages/index/product/product?id='+item.id">
									<Pic :src="item.pic" :height="'75px'" :width="'75px'" :mode="'aspectFill'" :back="'#f1f1f1'"></Pic>
									<view class="text-hidden  fz11" style="width: 100%;">{{item.name}}</view>
									<view class="fsb" style="align-items: center;margin-top: -2px;">
										<text class="price theme fz12">
											￥{{item.price}}
										</text>
										<image style="width: 15px;height: 36rpx;transform: translateY(-2px);" src="/static/images/shopping-Cart-Selection@2x.png" mode="aspectFit"></image>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
		<!-- 保证 -->
		<view class="promise p10 pt5 pb5 fsb">
			<view class="ftm"><image src="/static/images/checklist@2x.png" mode="scaleToFill" style="width: 13px;height: 13px;margin-right: 5px;"></image> <text class="fz11" style="color: #DB0D21;">产地直供，品质保证</text></view>
			<view class="ftm"><image src="/static/images/checklist@2x.png" mode="scaleToFill" style="width: 13px;height: 13px;margin-right: 5px;"></image> <text class="fz11" style="color: #DB0D21;">7天无忧退货</text></view>
			<view class="ftm"><image src="/static/images/checklist@2x.png" mode="scaleToFill" style="width: 13px;height: 13px;margin-right: 5px;"></image> <text class="fz11" style="color: #DB0D21;">认证厂商，品牌商品</text></view>
		</view>
		
		<!-- 分类列表 -->
		<view class="goodss">
			<view class="nav p10" style="padding-top: 0px;padding-bottom: 0px;">
				<van-grid column-num="4" :border="false">
					<van-grid-item use-slot  v-for="(item,index) in cateList" :key="index" v-if="index<8" >
						<view class="fm" style="flex-flow: column wrap;" @click="navigateTo" :data-url="'/pages/cate/intro_cate_detail/intro_cate_detail?id='+item.id+'&name='+item.name">
							<Pic :src="item.mobilePhoto" :height="'40px'" :width="'40px'" :mode="'aspectFill'" :back="'#f1f1f1'"></Pic>
							<text class="text fz12" style="color: #222;margin-top: 5rpx;">{{item.name}}</text>
						</view>
					</van-grid-item>
				</van-grid>
			</view>
		</view>
		
		<!-- 今日推荐 -->
		<view class="intro p10" style="padding-top: 0px;">
			<view class="navbar pr">
				<view class="pa fill fsb p10"  style="align-items: center;top: 0px;left: 0px;z-index: 9;" >
					<text class="fb fz14">今日推荐</text>
					<!-- <view class="more fz10" style="color: #666;border-color: #666;">更多新品</view> -->
				</view>
				<image class="pa fill" style="top: 0px;left: 0px;" src="/static/images/recommend_bg@2x.png" mode="widthFix"></image>
			</view>
			<view class="content ftm">
				<scroll-view class="f" scroll-x style="height: 180px;">
					<!-- <view style="height: 10px;"></view> -->
					<view class="wrapper f">
						<view class="item p10 ml10 pr" v-for="(item,index) in recommandList" :key="index" @click="navigateTo" :data-url="'/pages/index/product/product?id='+item.id">
							<view class="tag pa">
								<text class="center fz10" style="color: #fff;line-height: 36rpx;text-align: center;white-space: nowrap;">好货</text>
								<image class="fill" src="/static/images/good_bg@2x.png" mode=""></image>
							</view>
							<Pic :src="item.pic" :height="'100px'" :width="'100px'" :mode="'aspectFill'" :back="'#f1f1f1'"></Pic>
							<view class="text-hidden  fz14" style="width: 100%;">{{item.name}}</view>
							<view class="fsb" style="align-items: center;margin-top: -2px;">
								<text class="price theme fz13">
									￥{{item.price}}
								</text>
								<image style="width: 15px;height: 36rpx;transform: translateY(-2px);" src="/static/images/shopping-Cart-Selection@2x.png" mode="aspectFit"></image>
							</view>
						</view>
					</view>
					<!-- <view style="height: 10px;"></view> -->
				</scroll-view>
			</view>
		</view>
		
		<!-- 热销榜 -->
		<view class="intro p10" style="padding-top: 0px;">
			<view class="navbar pr">
				<view class="pa fill fsb p10"  style="align-items: center;top: 0px;left: 0px;z-index: 9;" >
					<text class="fb fz14">热销榜</text>
					<view class="more fz10" style="color: #666;border-color: #666;">更多热销</view>
				</view>
				<image class="pa fill" style="top: 0px;left: 0px;" src="/static/images/ranking_bg@2x.png" mode="widthFix"></image>
			</view>
			<view class="content p5" style="height: 690rpx;">
				<div class="single f p10 mb5" v-for="(item,index) in hotList" :key="index" v-if="index<3" @click="navigateTo" :data-url="'/pages/index/product/product?id='+item.id">
					<view class="mr10 pr" style="width: 180rpx;height:180rpx">
						<Pic :src="item.pic" :height="'100%'" :width="'100%'" :mode="'aspectFill'" :back="'#f1f1f1'"></Pic>
						<image class="pa" style="top: 0px;left: 0px;width: 60rpx;height: 60rpx;" :src="
						index==0? '../../../static/images/ranking1@2x.png' : index==1? '../../../static/images/ranking2@2x.png' : '../../../static/images/ranking3@2x.png'
						" mode="aspectFill"></image>
					</view>
					<div class="container fsb" style="flex: 1;flex-flow: column wrap;">
						<view class="title fb fz16">
							{{item.name}}
						</view>
						<view class="mt5 mb5">
							<my-tag :type="'second'" :text="'as'" />
						</view>
						<view class="fsb" style="align-items: center;margin-top: -2px;">
							<text class="price theme fz16 fb">
								￥{{item.price}}
							</text>
							<image style="width: 22.5px;height: 54rpx;transform: translateY(-2px);" src="/static/images/shopping-Cart-Selection@2x.png" mode="aspectFit"></image>
						</view>
					</div>
				</div>
			</view>
		</view>
		
		<!-- 商品列表 -->
		<view class="goods">
			<view class="fm mt5 mb15">
				<image class="small mr5" src="/static/images/icon_4@2x.png" mode="aspectFill"></image><image class="big mr5" src="/static/images/icon-7@2x.png" mode="aspectFill"></image>
				猜你喜欢
				<image class="big mr5 ml5" src="/static/images/icon_4@2x.png" mode="aspectFill"></image><image class="small"  src="/static/images/icon-7@2x.png" mode="aspectFill"></image>
			</view>
			<MyList :list="pageData[loadIndex].list"></MyList>
		</view>
		<!-- 加载更多 -->
		<load-more v-if="pageData[loadIndex].list.length" :tip="pageData[loadIndex].text" :loading="pageData[loadIndex].text=='加载中...'" />
		<view v-if="pageData[loadIndex].text=='加载中...' && pageData[loadIndex].pageNum==1" style="height: 1000rpx;"></view>

	</view>
</template>

<script>
	import Ser from "../../../mycomponents/Ser/Ser";
	import BwSwiper from "../../../mycomponents/bw-swiper/bw-swiper";
	import MyList from "../../../mycomponents/my-list/my-list.vue";
	import uniGrid from "../../../mycomponents/uni-grid/uni-grid.vue";
	import uniGridItem from "../../../mycomponents/uni-grid-item/uni-grid-item.vue"
	import MyTag from '../../../mycomponents/my-tag/my-tag.vue';
	export default {
		components: {
			Ser,
			BwSwiper,
			MyList,
			uniGrid,
			uniGridItem,
			MyTag
		},
		data() {
			return {
				hotList:[],
				newList:[],
				recommandList:[],
				cateList: [
				],
				pageData: [],
				selectarea: "全部",
				isLoaded: false
			}
		},
		async onLoad() {

			await this.getAllData();
			//第一次加载获取数据
			this.selectarea = "全部";
			this.getData();

			//提供钩子
			this.$mp.page.hook = this.getData;

		},
		onReachBottom() {
			//如果正在加载则不允许点击
			if (parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea)).isLoading) return;
			this.getData();
		},
		async onPullDownRefresh() {
			await this.getAllData();
			this.$loadData.clear.call(this);
			this.getData();
			wx.stopPullDownRefresh();
			this.$tools.Toast("刷新成功");
		},
		computed: {
			loadIndex() {
				return parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea)) || 0;
			}
		},
		methods: {
			//获取用户信息
			getUserInfo(e) {
				console.debug("用户信息:" + e);
				wx.login({
					success(res) {
						console.log(res)
					}
				})
			},
			//点击轮播图
			swiperClick(item) {
				this.$tools.navigateTo(item.text)
			},
			//页面跳转
			navigateTo(e) {
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
			//已加载图片数量
			loadImg(flied) {
				this[flied]++;
			},
			//切换
			itemClick(item) {
				this.selectarea = item;
				//获取需要加载的选项
				try {
					!this.pageData[parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea))].list.length && this.getData();
				} catch (e) {
					//TODO handle the exception
					this.getData()
				}
			},
			async getAllData() {
				const result = await this.$net.sendRequest("/home/content", {
					appSource: 'weixin'
				}, "GET");
				this.cateList = result.catList.reverse(),this.hotList = result.hotProducts, this.newList = result.newProducts,
				this.recommandList = result.recommandProducts;
			},
			//获取数据
			getData() {
				this.$loadData.loadMore.call(this, async (reslove, reject) => {
					const index = parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea));
					let v = this.pageData[index];
					const result = await this.$net.sendRequest("/home/guessLike", {
						recommandStatus: 1,
						pageNum: v.pageNum,
						pageSize: 3,
					}, "GET");
				    const arr =  this.$tools.deepFlatten(result.filter(item=>!item.deleteStatus).map(item=>{
						const products = item.products;
						delete item.products;
						return [item,...products]
					}))	
					v.list = [...v.list, ...arr];
					this.$set(this.pageData, index, v);
					reslove(result);
					this.isLoaded = true;
					// await new Promise((res, rej) => {
					// 	const timer = setTimeout(() => {
					// 		//获取需要加载的选项
					// 		const index = parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea));
					// 		// 获取需要加载的那一项
					// 		let v = this.pageData[index];
					// 		v.list = [...v.list, ...["sad", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa",
					// 			"asdsa", "sad", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa",
					// 			"asdsa"
					// 		]]
					// 		// this.swiperList = [{
					// 		// 	img: 'http://img2.imgtn.bdimg.com/it/u=1509436749,76325603&fm=15&gp=0.jpg',
					// 		// 	text: '加油'
					// 		// }, {
					// 		// 	img: 'http://img3.imgtn.bdimg.com/it/u=3750359057,3264830258&fm=26&gp=0.jpg',
					// 		// 	text: '加油'
					// 		// }, {
					// 		// 	img: 'http://img0.imgtn.bdimg.com/it/u=2405794550,2319224924&fm=15&gp=0.jpg',
					// 		// 	text: '加油'
					// 		// }];
					// 		this.$set(this.pageData, index, v);
					// 		this.isLoaded = true;
					// 		reslove(["sad", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa"]);
					// 		res();
					// 	}, 100);
					// })
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';
	.van-grid-item__content{
		padding-bottom: 0px;
	}
	.big{
		@include wh(15rpx,15rpx);
	}
	.small{
		@include wh(10rpx,10rpx);
	}
	.navbar{
		@include wh(100%,80rpx);
	}
	.intro{
		width: 100%;
		.content{
			@include wh(100%,380rpx);
			.single{
				box-shadow:2px 2px 5px #f1f1f1;
				border-radius: 5px;
			}
			.item{
				width:260rpx;
				box-shadow:2px 2px 5px #f1f1f1;
				border-radius: 5px;
				.tag{
					@include wh(70rpx,36rpx);
					left: 0rpx;
					right: 0px;	
					
				}
			}
		}
	}
	.more{
		border: 1px solid #fff;
		color: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		padding: 0px 10rpx;
	}
	.new_goods{
		@include wh(100%,380rpx);
		.new_content{
			@include wh(710rpx,380rpx);
			border-radius: 15px;
			overflow: hidden;
			.content{
				top: 0rpx;
				left: 0rpx;
				.container{
					background: #fff;
					height:80%;
					.item{
						width: 111px;
					}
				}
			}
		}
		.back{
			@include wh(100%,210rpx);
			height: 210rpx !important;
			top: 0rpx;
			left: 0rpx;
		}
	}
	// .goods {
	// 	.menu {
	// 		.item {
	// 			@include wh(214rpx, 256rpx);

	// 			.wrapper {
	// 				top: 0rpx;
	// 				left: 0rpx;
	// 				@include wh(214rpx, 256rpx);
	// 				flex-flow: column wrap;
	// 				z-index: 9;
	// 			}
	// 		}
	// 	}

	// 	.container {
	// 		.item {
	// 			display: inline-block;
	// 			border: 1rpx solid #CFCFCF;
	// 			border-radius: 30px;
	// 			overflow: hidden;
	// 			padding: 3rpx 25rpx;
	// 			line-height: 45rpx;
	// 			color: #666;
	// 		}

	// 		.active {
	// 			background: linear-gradient(142deg, rgba(26, 174, 104, 1) 0%, rgba(124, 206, 89, 1) 100%);
	// 			color: #fff !important;
	// 			box-shadow: 0px 4px 9px 0px rgba(125, 238, 99, 0.53);
	// 			border-color: $theme;
	// 		}
	// 	}
	// }

	.swiper {
		.swiper-item {
			height: 100%;
		}
	}

	.login_button {
		background: #fff !important;

		.container {
			@include borderRadius(100px);
			background: #ccc;
		}

		&:after {
			border: none;
		}
	}
</style>
