<template>
	<view class="main">
		<scroll-view scroll-y>
			<!-- 搜索框 -->
			<Ser></Ser>
			<!-- 轮播图 -->
			<view class="mt10">
				<BwSwiper :swiperList="swiperList" swiperType style="width:100%" @clickItem="swiperClick"></BwSwiper>
			</view>
			
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
				images: [],
				swiperList:[{img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',text:'加油'},{img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',text:'加油'},{img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg',text:'加油'}]
			}
		},
		computed: {
			//页面初次请求和图片是否加载完

		},
		async onLoad() {
			//显示加载中
			this.$tools.showLoading("加载中...");
			
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
			//获取数据
			async getData(isFirst = false) {

				//获取数据
				// const result = await this.$net.sendRequest("/hello",{username:"asdsa"});
				const timer = setTimeout(() => {
					this.images = ['https://hao6.qhimg.com/t01a4f2e0df51243cc0.jpg?780*500',
						'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571080833783&di=05701b8aee2d111a52e8edf69e653c18&imgtype=0&src=http%3A%2F%2Fk.zol-img.com.cn%2Fdiybbs%2F5506%2Fa5505953_s.jpg',
						'https://hao5.qhimg.com/t01ef8405a246eb51d9.jpg?780*500'
					];

					wx.hideLoading();
					clearTimeout(timer)
				}, 0);
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
