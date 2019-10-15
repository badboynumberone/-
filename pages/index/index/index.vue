<template>
	<view class="main" v-show="imgLoadedcount>=imgNeedLoad" >
		<scroll-view  scroll-y>
			<!-- 轮播图 -->
			<swiper class="swiper"  :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500"
			 :circular="true">
				<swiper-item v-for="(item,index) in images" :key="index">
					<view class="swiper-item" @click="navigateTo" :data-url="'/pages/me/me/me'"><image lazy-load="true" @load="loadImg('imgLoadedcount')" mode="widthFix" class='fill' :src="item"></image></view>
				</swiper-item>
			</swiper>
			
		</scroll-view>
	</view>
</template>

<script>
	
	export default {
		components: {
			
		},
		data() {
			return {
				
				imgLoadedcount:0,//是否加载图片成功
				imgNeedLoad:0,//图片需要加载数量
				
				images:[]
			}
		},
		computed:{
			//页面初次请求和图片是否加载完
		},
		onLoad() {
			//显示加载中
			this.$tools.showLoading("加载中...");
			//第一次加载获取数据
			this.getData(true);
			//提供钩子
			this.$mp.page.hook = this.getData;
		},
		methods: {
			changeContent(){
			},
			//页面跳转
			navigateTo(e){
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
			//已加载图片数量
			loadImg(flied){
				this[flied]++;
			},
			//初始化数据
			initData(){
				
				//清空数据
				this.images = [];
			},
			//获取数据
			getData(isFirst=false){
				if(isFirst){
					this.initData();
				}
				const timer = setTimeout(()=>{
					this.images= ['https://hao6.qhimg.com/t01a4f2e0df51243cc0.jpg?780*500',
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571080833783&di=05701b8aee2d111a52e8edf69e653c18&imgtype=0&src=http%3A%2F%2Fk.zol-img.com.cn%2Fdiybbs%2F5506%2Fa5505953_s.jpg',
					'https://hao5.qhimg.com/t01ef8405a246eb51d9.jpg?780*500'];
					if(isFirst){
						this.imgNeedLoad = this.images.length;
					}
					wx.hideLoading();
					clearTimeout(timer)
				}, 2000);
			}

		}
	}
</script>

<style lang="scss">
	@import './../../../static/styles/mixin.scss';
	.swiper{
		.swiper-item{
			height: 100%;
			
		}
	}
	
	
	.active{
		animation: fadeIn 0.25s, 100ms;
		image{
			width: 500upx;
			height: 250upx;
		}
	}
	
</style>
