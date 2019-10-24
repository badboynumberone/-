<template>
	<view class="main">
		<scroll-view scroll-y>
			<!-- 搜索框 -->
			<view class="search_wrapper" @click="navigateTo" data-url="/pages/index/search/search">
				<Ser></Ser>	
			</view>
			<!-- 轮播图 -->
			<view class="mt10">
				<BwSwiper :swiperList="swiperList" swiperType style="width:100%" @clickItem="swiperClick"></BwSwiper>
			</view>
			<view class="" v-for="(item,index) in pageData[selectIndex].list" :key="index">
				{{item.areaName}}
			</view>
			<button type="primary"@click="change">切换</button>
		</scroll-view>
	</view>
</template>

<script>
	import Ser from "../../../mycomponents/Ser/Ser";
	import BwSwiper from "../../../mycomponents/bw-swiper/bw-swiper";
	export default {
		components: {
			Ser,BwSwiper
		},
		data() {
			return {
				swiperList:[{img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',text:'加油'},{img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',text:'加油'},{img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',text:'加油'}],				pageNum:0,
				pageData:[],
				selectarea:"主模块"
				
			}
		},
		computed: {
			//页面初次请求和图片是否加载完
			selectIndex(){
				return this.pageData.findIndex((item)=>item.areaName==this.selectarea);
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
			swiperClick(item){
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
			
			change(){
				this.selectarea="lala";
				this.getData();
			},
			//获取数据
			async getData(isRefresh=false) {
				this.$loadmore.call(this,async (reslove,reject)=>{
					await new Promise((res,rej)=>{
						const timer = setTimeout(()=>{
							//获取需要加载的选项
							const index = parseInt(this.pageData.findIndex(item=>item.areaName==this.selectarea));
							// 获取数据
							let v = this.pageData[index];
							v.list = [...v.list,...["sad","asdsa","asdsa","asdsa","asdsa","asdsa","asdsa","asdsa","asdsa","asdsa"]]
							this.$set(this.pageData,index,v);
							reslove(["sad","asdsa","asdsa","asdsa","asdsa","asdsa","asdsa","asdsa","asdsa","asdsa"]);
							res();
						},2000);
					})
					console.log("hello,world")
					
				});
			}
			
			

		}
	}
</script>

<style lang="scss">
	@import './../../../static/styles/mixin.scss';
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
