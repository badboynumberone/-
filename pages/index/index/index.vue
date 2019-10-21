<template>
	<view class="main">
		<scroll-view v-if="images.length"  scroll-y>
			<!-- 轮播图 -->
			<swiper class="swiper"  :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500"
			 :circular="true">
				<swiper-item v-for="(item,index) in images" :key="index">
					<view class="swiper-item" @click="navigateTo" :data-url="'/pages/me/me/me'"><image lazy-load="true" @load="loadImg('imgLoadedcount')" mode="widthFix" class='fill' :src="item"></image></view>
				</swiper-item>
			</swiper>
			<button class="login_button frm bn show"  open-type="getUserInfo" @getuserinfo="getUserInfo">
				<div class="container">
					
				</div>
			</button>
			<image src="https://img.ivsky.com/img/bizhi/slides/201909/25/abominable-008.jpg" mode=""></image>
		</scroll-view>
	</view>
</template>

<script>
	
	export default {
		components: {
			
		},
		data() {
			return {
				images:[]
			}
		},
		computed:{
			//页面初次请求和图片是否加载完
			
		},
		async onLoad() {
			//显示加载中
			this.$tools.showLoading("加载中...");
			
			// //检查登录状态
			await this.$net.checkLoginStatus();
			
			//第一次加载获取数据
			this.getData(true);
			
			//提供钩子
			this.$mp.page.hook = this.getData;
			
		},
		methods: {
			getUserInfo(e){
				console.debug("用户信息:"+e);
				wx.login({
					success(res) {
						console.log(res)
					}
				})
			},
			//页面跳转
			navigateTo(e){
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
			//已加载图片数量
			loadImg(flied){
				this[flied]++;
			},
			//获取数据
			async getData(isFirst=false){
				
				//获取数据
				// const result = await this.$net.sendRequest("/hello",{username:"asdsa"});
				const timer = setTimeout(()=>{
					this.images= ['https://hao6.qhimg.com/t01a4f2e0df51243cc0.jpg?780*500',
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571080833783&di=05701b8aee2d111a52e8edf69e653c18&imgtype=0&src=http%3A%2F%2Fk.zol-img.com.cn%2Fdiybbs%2F5506%2Fa5505953_s.jpg',
					'https://hao5.qhimg.com/t01ef8405a246eb51d9.jpg?780*500'];
					
					wx.hideLoading();
					clearTimeout(timer)
				}, 0);
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
	.login_button{
		background:#fff !important;
		.container{
			@include borderRadius(100px);
			background: #ccc;
		}
		&:after{
			border: none;
		}
	}
</style>
