<template>
	<view class="main" v-if="isLoaded">
		<Imgs :images="needLoadResource">
			<!-- 搜索框 -->
			<view class="search_wrapper" @click="navigateTo" data-url="/pages/index/search/search">
				<Ser :back="'#fff'"></Ser>
			</view>
			<!-- 搜索框 -->
			<!-- <view class="search_wrapper" @click="navigateTo" data-url="/pages/index/search/search">
				<Ser></Ser>	
			</view> -->
			<view class="mt10 mb10">
				<BwSwiper :swiperList="swiperList" swiperType style="width:100%" @clickItem="swiperClick"></BwSwiper>
			</view>

			<!-- 商品列表 -->
			<view class="goods">
				<view class="fsb  pl10 pr10 pb5" style="align-items: center;">
					<view class="ftm fz18 fb h1 ">
						<view style="transform: translateY(4px);margin-right: 5rpx;">
							<van-icon name="apps-o" color="#38A472" size="21px" />
						</view>
						优质优品
					</view>
					<view class="fz14 f">
						<text style="color: #666;">查看更多</text>
						<view style="transform: translateY(2px);">
							<van-icon name="arrow" color="#666" />
						</view>
					</view>
				</view>
				<view class="">

				</view>
				<uni-grid :column="5" :show-border="false" :square="false">
					<uni-grid-item v-for="(item,index) in keys" :key="index">
						<view class="pic_item pr" @click="navigateTo($event,index)" :data-url="'/pages/me/order/order'">
							<Pic :src="item.src" :height="'30px'" :width="'30px'" :mode="'aspectFill'" :back="'#fff'"></Pic>
						</view>
						<text class="text fz12" style="color: #222;margin-top: 5rpx;">{{item.text}}</text>
					</uni-grid-item>
				</uni-grid>
				<div class="menu  fsb p10">
					<div class="item pr">
						<Pic :src="'/static/images/own-brand@2x.png'" :height="'100%'" :width="'100%'" :mode="'aspectFill'"></Pic>
						<view class="wrapper pa fm">
							<text class="fz18 fb" style="color: #fff;transform: translateY(-12px);">自有品牌</text>
							<text class="fz14" style="color: #fff;transform: translateY(-12px);">品质好物</text>
						</view>
					</div>
					<div class="item pr">
						<Pic :src="'/static/images/co-create-brand@2x.png'" :height="'100%'" :width="'100%'" :mode="'aspectFill'"></Pic>
						<view class="wrapper pa fm">
							<text class="fz18 fb" style="color: #fff;transform: translateY(-12px);">共创品牌</text>
							<text class="fz14" style="color: #fff;transform: translateY(-12px);">精品有约</text>
						</view>
					</div>
					<div class="item pr">
						<Pic :src="'/static/images/recommended-brand@2x.png'" :height="'100%'" :width="'100%'" :mode="'aspectFill'"></Pic>
						<view class="wrapper pa fm">
							<text class="fz18 fb" style="color: #fff;transform: translateY(-12px);">推荐品牌</text>
							<text class="fz14" style="color: #fff;transform: translateY(-12px);">持续热销</text>
						</view>
					</div>
				</div>
				<view class="ftm fz18 fb h1 pl10 pr10 pb15">
					<view style="transform: translateY(4px);margin-right: 5rpx;">
						<van-icon name="good-job-o" color="#38A472" size="21px" />
					</view>
					为你推荐
				</view>
				<view class="container pl10 pr10 fsb  mb10">
					<view class="item active">全部</view>
					<view class="item">品牌好货</view>
					<view class="item">便宜好货</view>
					<view class="item">时令新鲜</view>
				</view>
				<MyList :pageData="pageData"></MyList>
			</view>
			<!-- 加载更多 -->
			<load-more :tip="'正在加载中...'" :loading="true" />
		</Imgs>
	</view>
</template>

<script>
	import Ser from "../../../mycomponents/Ser/Ser";
	import BwSwiper from "../../../mycomponents/bw-swiper/bw-swiper";
	import MyList from "../../../mycomponents/my-list/my-list.vue";
	import uniGrid from "../../../mycomponents/uni-grid/uni-grid.vue"
	import uniGridItem from "../../../mycomponents/uni-grid-item/uni-grid-item.vue"
	export default {
		components: {
			Ser,
			BwSwiper,
			MyList,
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				keys: [{
						text: "蔬菜菌菇",
						url: "",
						src: "/static/images/vegetable-normal_@2x.png",
						num: 1
					},
					{
						text: "肉禽蛋品",
						url: "",
						src: "/static/images/meat@2x.png",
						num: 0
					},
					{
						text: "粮油副食",
						url: "",
						src: "/static/images/rice@2x.png",
						num: 0
					},
					{
						text: "海鲜水产",
						url: "",
						src: "/static/images/fish@2x.png",
						num: 0
					},
					{
						text: "新鲜水果",
						url: "",
						src: "/static/images/apple@2x.png",
						num: 0
					}
				],
				swiperList: [],
				pageNum: 0,
				pageData: [
					"as暗示法大纲打得过大个个都是是的港式大飒飒噶都是嘎我当时嘎嘎挂电视柜d", "asdas",
					"adsgaassd", "asddsga",
					"adsgaassd", "asddsga"
				],
				selectarea: "主模块",
				isLoaded: false
			}
		},
		async onLoad() {

			//检查登录状态
			await this.$net.checkLoginStatus();

			//第一次加载获取数据
			this.getData(true);

			//提供钩子
			this.$mp.page.hook = this.getData;

		},
		computed: {
			needLoadResource() {
				return [...this.keys, ...this.swiperList]
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

			change() {
				this.selectarea = "lala";
				this.getData();
			},
			//获取数据
			getData(isRefresh = false) {
				this.$loadmore.call(this, async (reslove, reject) => {
					await new Promise((res, rej) => {
						const timer = setTimeout(() => {
							//获取需要加载的选项
							const index = parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea));
							// 获取数据
							let v = this.pageData[index];
							v.list = [...v.list, ...["sad", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa",
								"asdsa"
							]]
							this.swiperList = [{
								img: 'http://img2.imgtn.bdimg.com/it/u=1509436749,76325603&fm=15&gp=0.jpg',
								text: '加油'
							}, {
								img: 'http://img3.imgtn.bdimg.com/it/u=3750359057,3264830258&fm=26&gp=0.jpg',
								text: '加油'
							}, {
								img: 'http://img0.imgtn.bdimg.com/it/u=2405794550,2319224924&fm=15&gp=0.jpg',
								text: '加油'
							}];
							this.$set(this.pageData, index, v);
							this.isLoaded = true;
							reslove(["sad", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa", "asdsa"]);
							res();
						}, 100);
					})
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';

	.goods {
		.menu {
			.item {
				@include wh(214rpx, 256rpx);

				.wrapper {
					top: 0rpx;
					left: 0rpx;
					@include wh(214rpx, 256rpx);
					flex-flow: column wrap;
					z-index: 9;
				}
			}
		}

		.container {
			.item {
				display: inline-block;
				border: 1rpx solid #CFCFCF;
				border-radius: 30px;
				overflow: hidden;
				padding: 3rpx 25rpx;
				line-height: 45rpx;
				color: #666;
			}

			.active {
				background: linear-gradient(142deg, rgba(26, 174, 104, 1) 0%, rgba(124, 206, 89, 1) 100%);
				color: #fff !important;
				box-shadow: 0px 4px 9px 0px rgba(125, 238, 99, 0.53);
				border: none;
			}
		}
	}

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
