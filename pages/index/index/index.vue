<template>
	<view class="main"  >

		<!-- 搜索框 -->
		<view class="search_wrapper" @click="navigateTo" data-url="/pages/index/search/search">
			<Ser :back="'#24B3D5'" :color="'#24B3D5'"></Ser>
		</view>
		<!-- 新品速递 -->
		<view class="new_goods pr">
			<image class="back pa" :src="`${baseImageUrl}/home-bg@2x.jpg`" lazy-load="true" mode="widthFix"></image>
			<view class="new_content cl">
				<!-- <image class="pa fill" :src="`${baseImageUrl}/new_bg@2x.png`" mode="scaleToFill"></image>
				<view class="content pa fill p10">
					<view class="header fsb mb5" style="align-items: center;">
						<view class="fz16 fb" style="color: #fff;">新品速递</view>
						<view class="more fz10" @click="toList('newList')">更多新品</view>
					</view>
					<view class="container" style="border-radius: 5px;overflow: hidden;">
						<scroll-view class="fill f" scroll-x>
							<view class="wrapper f">
								<view class="item p15" v-for="(item,index) in newList" :key="index" @click="navigateTo" :data-url="'/pages/index/product/product?id='+item.id">
									<Pic :src="item.pic" :height="'75px'" :width="'75px'" :mode="'aspectFill'" :back="'#f1f1f1'"></Pic>
									<view class="text-hidden  fz11" style="width: 100%;">{{item.name}}</view>
									<view class="fsb" style="align-items: center;margin-top: -2px;">
										<text class="price theme fz12">
											￥{{item.price}}
										</text>
										<image style="width: 15px;height: 36rpx;transform: translateY(-2px);" :src="`${baseImageUrl}/shopping-Cart-Selection@2x.png"
										 mode="aspectFit"></image>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view> -->
				<view class="pr">
					<swiper :autoplay="true" :circular="true" :interval="4000" :duration="1000" @change="indexChange" style="background-color: #f1f1f1; border-radius: 20px;overflow: hidden;height: 320rpx;">
						<swiper-item v-for="(item,index) in banners" :key="index" @click="toProductDetail(item.productId)">
							<view class="swiper-item fill">
								<image class="fill" :src="item.photoUrl" lazy-load="true" mode="scaleToFill"></image>
							</view>
						</swiper-item>
					</swiper>
					<view class="count_tag pa fz11 fm" style="bottom: 15rpx;right: 15rpx;color: #fff;">{{bannerIndex}}/{{banners.length}}</view>
				</view>
				
				
			</view> 
		</view>
		<!-- 保证 -->
		<view class="promise p10  pb5 fsb" >
			<view class="ftm">
				<image :src="`${baseImageUrl}/checklist@2x.png`" mode="scaleToFill" style="width: 13px;height: 13px;margin-right: 5px;"></image>
				<text class="fz11" style="color: #666;">产地直供，品质保证</text>
			</view>
			<view class="ftm">
				<image :src="`${baseImageUrl}/checklist@2x.png`" mode="scaleToFill" style="width: 13px;height: 13px;margin-right: 5px;"></image>
				<text class="fz11" style="color: #666;">7天无忧退货</text>
			</view>
			<view class="ftm">
				<image :src="`${baseImageUrl}/checklist@2x.png`" mode="scaleToFill" style="width: 13px;height: 13px;margin-right: 5px;"></image>
				<text class="fz11" style="color: #666;">认证厂商，品牌商品</text>
			</view>
		</view>

		<!-- 分类列表 -->
		<view :class="['goodss']">
			<view class="nav p10" style="padding-top: 0px;padding-bottom: 0px;">
				<van-grid column-num="5" :border="false">
					<van-grid-item use-slot v-for="(item,index) in cateList" :key="index" >
						<view class="fm pr" style="flex-flow: column wrap;" @click="toCateDetail($event,item,index)" :data-url="'/pages/cate/intro_cate_detail/intro_cate_detail?id='+item.id+'&name='+item.name">
							<Pic :src="item.mobilePhoto" :height="'40px'" :width="'40px'" :mode="'aspectFill'" :back="'#f1f1f1'" :round="true"></Pic>
							<text class="text fz12" style="color: #222;margin-top: 5rpx;">{{item.name}}</text>
							<button class="fill pa" v-if="index==5" open-type="contact"  bindcontact="handleContact" style="opacity: 0;top: 0;left: 0;" type="primary"></button>
						</view>
					</van-grid-item>
				</van-grid>
			</view>
		</view>
		
		<!-- 专项栏目 -->
		<view class="navs f p10">
			<view class="left p10" @click="navigateTo" :data-url="'/pages/index/seckill/seckill'">
				<view class="ftm mb5" >
					<image class="mr5" lazy-load="true" :src="`${baseImageUrl}/clock.png`" mode="aspectFit" style="width: 30rpx;height:33rpx;"></image>
					<text class="fb fz15">限时秒杀</text>
				</view>
				<view class="fz12" style="color: #666;">新鲜好物特惠抢购</view>
				<view class="mb10 mt5">
					<view class="time fsb">
						<view class="hour fm">{{hour}}</view>
						<text>:</text>
						<view class="minute fm">{{minute}}</view>
						<text>:</text>
						<view class="second fm">{{second}}</view>
					</view>
				</view>
				
				<image :src="`${baseImageUrl}/yumi.jpg`" mode="aspectFit" style="width: 282rpx;height: 243rpx;"></image>
			</view>
			<view style="width: 20px;"></view>
			<view class="right fsb" style="flex-direction: column;" >
				<view class="top p10" @click="commingsoon">
					<view class="ftm">
						<text class="fb fz15">预售好货</text>
						<image class="ml5" lazy-load="true" :src="`${baseImageUrl}/czhh.jpg`" mode="aspectFit" style="width: 120rpx;height:34rpx;"></image>
					</view>
					<view class="" style="margin-top: -5px;">
						<text class="fz12" style="color: #666;" :decode="true">精选好货  超前首发</text>
					</view>
					<view class="f">
						<image lazy-load="true" :src="`${baseImageUrl}/fanshu.png`" mode="aspectFit" style="width: 138rpx;height: 91rpx;"></image>
						<image lazy-load="true" :src="`${baseImageUrl}/jidan.jpg`" mode="aspectFit" style="width: 138rpx;height: 91rpx;"></image>
					</view>
				</view>
				<view class="bottom p10" @click="commingsoon">
					<view class="ftm">
						<text class="fb fz15">超值拼团</text>
						<image  lazy-load="true" class="ml5" :src="`${baseImageUrl}/jghml.jpg`" mode="aspectFit" style="width: 120rpx;height:34rpx;"></image>
					</view>
					<view class="" style="margin-top: -5px;">
						<text class="fz12" style="color: #666;" :decode="true">应季美食 潮流护理</text>
					</view>
					<view class="f">
						<image lazy-load="true" :src="`${baseImageUrl}/fanqie.jpg`" mode="aspectFit" style="width: 138rpx;height: 91rpx;"></image>
						<image lazy-load="true" :src="`${baseImageUrl}/mihoutao.jpg`" mode="aspectFit" style="width: 138rpx;height: 91rpx;"></image>
					</view>
					
				</view>
			</view>
		</view>
		

		<!-- 今日推荐 -->
		<view class="intro p10 hot" style="padding-top: 0px;">
			<view class="shadow">
				<view class="navbar pr">
					<view class="pa fill fsb p10" style="align-items: center;top: 0px;left: 0px;z-index: 9;">
						<text class="fb fz14" style="text-indent: 50rpx;">优品推荐</text>
						<view class="more fz10 ftm" style="color: #666;border-color: #666;" @click="toList('recommandList')"><text>更多推荐</text><image :src="`${baseImageUrl}/Lowerarrow@2x.png`" mode="aspectFill" style="width: 14px;height: 4px;margin-left: 2px;"></image></view>
					</view>
					<image lazy-load="true" class="pa fill" style="top: 0px;left: 0px;" :src="`${baseImageUrl}/bg-bar.png`" mode="widthFix"></image>
				</view>
				<view class="content ftm">
					<scroll-view class="f" scroll-x style="height: 180px;">
						<view class="wrapper f">
							<view class="item p10 ml10 pr" v-for="(item,index) in recommandList" :key="index" @click="navigateTo" :data-url="'/pages/index/product/product?id='+item.id">
								<view class="tag pa">
									<text class="center fz10" style="color: #fff;line-height: 36rpx;text-align: center;white-space: nowrap;">好货</text>
									<image lazy-load="true" class="fill" :src="`${baseImageUrl}/good_bg@2x.png`" mode=""></image>
								</view>
								<Pic :src="item.pic" :height="'100px'" :width="'100px'" :mode="'aspectFill'" :back="'#f1f1f1'"></Pic>
								<view class="text-hidden  fz14" style="width: 100%;">{{item.name}}</view>
								<view class="fsb" style="align-items: center;margin-top: -2px;">
									<text class="price theme fz13">
										￥{{item.price}}
									</text>
									<image lazy-load="true" style="width: 15px;height: 36rpx;transform: translateY(-2px);" :src="`${baseImageUrl}/shopping-Cart-Selection@2x.png`"
									 mode="aspectFit"></image>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>

		<!-- 热销榜 -->
		<view class="intro p10" style="padding-top: 0px;padding-bottom: 0px;">
			<view class="shadow">
				<view class="navbar pr">
					<view class="pa fill fsb p10" style="align-items: center;top: 0px;left: 0px;z-index: 9;">
						<text class="fb fz14" style="text-indent: 50rpx;" >热销榜</text>
						<view class="more fz10 ftm" style="color: #666;border-color: #666;" @click="toList('hotList')"><text>更多热销</text><image :src="`${baseImageUrl}/Lowerarrow@2x.png`" mode="aspectFill" style="width: 14px;height: 4px;margin-left: 2px;"></image></view>
					</view>
					<image lazy-load="true" class="pa fill" style="top: 0px;left: 0px;" :src="`${baseImageUrl}/bg-bar.png`" mode="widthFix"></image>
				</view>
				<view class="content p5">
					<div class="single f p10 mb5" v-for="(item,index) in hotList" :key="index" v-if="index<3" @click="navigateTo"
					 :data-url="'/pages/index/product/product?id='+item.id">
						<view class="mr10 pr" style="width: 180rpx;height:180rpx">
							<Pic :src="item.pic" :height="'100%'" :width="'100%'" :mode="'aspectFill'" :back="'#f1f1f1'"></Pic>
							<image lazy-load="true" class="pa" style="top: 0px;left: 0px;width: 60rpx;height: 60rpx;" :src="
							index==0? `${baseImageUrl}/ranking1@2x.png` : index==1? `${baseImageUrl}/ranking2@2x.png` : `${baseImageUrl}/ranking3@2x.png`
							"
							 mode="aspectFill"></image>
						</view>
						<div class="container fsb" style="flex: 1;flex-flow: column wrap;">
							<view class="fsb" style="align-items: center;">
								<view class="title fb fz16">
									{{item.name}}
								</view>
								<view class="fz11" style="color: #666;">销量 {{item.sale}}</view>
							</view>
							
							<view class="mt5 mb5">
								<my-tag :type="'second'" :text="item.tagName" />
							</view>
							<view class="fsb" style="align-items: center;margin-top: -2px;">
								<text class="price theme fz16 fb">
									￥{{item.price}}
								</text>
								<image lazy-load="true" style="width: 22.5px;height: 54rpx;transform: translateY(-2px);" :src="`${baseImageUrl}/shopping-Cart-Selection@2x.png`"  
								 mode="aspectFit"></image>
							</view>
						</div>
					</div>
				</view>
			</view>
			
		</view>

		<!-- 商品列表 -->
		<view class="goods">
			<view class="fm pr">
				<image class="small mr5" :src="`${baseImageUrl}/title_bg@2x.png`" mode="aspectFill" style="width: 320rpx;height: 100rpx;"></image>
				<text class="center fb">猜你喜欢</text>
			</view>
			<swiper  :indicator-dots="false"  :interval="2000" :duration="1000" @change="onSwiperChange" easing-function="easeOutCubic"  >
				<swiper-item class="p10" style="box-sizing: border-box;" v-for="(single,idx) in pageData[0].list" :key="idx" v-if="idx<2" >
					<view class="swiper-item">
						<view class="f" v-for="(s,i) in single" :key="i" >
							<view class="item p5  pr shadow" style="margin-left: 12.5rpx;"  v-for="(item,index) in s" :key="index"  @click="navigateTo" :data-url="'/pages/index/product/product?id='+item.id" >
								<Pic :src="item.pic" :height="'200rpx'" :width="'200rpx'" :mode="'aspectFill'" :back="'#f1f1f1'"></Pic>
								<view class="text-hidden  fz14" style="width: 200rpx;" >{{item.name}}</view>
								<view class="fsb" style="align-items: center;margin-top: -2px;">
									<text class="price theme fz13">
										￥{{item.price}}
									</text>
								</view>
								<view><text class="fz11" style="color: #666;">销量:{{item.sale}}</text></view>
								<image lazy-load="true" class="pa" style="width: 30rpx;height: 72rpx;transform: translateY(-2rpx);bottom: 0rpx;right: 15rpx;" :src="`${baseImageUrl}/tab-shoppingchart-pre@2x.png`"
								 mode="aspectFit"></image>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="dots frm pb15">
				<view class="dots_wrapper f ">
					<view  v-for="(item,index) in length" :key="index" :class="['dot','mr5',activeIndex==index?'active':''] "></view>
				</view>
			</view>
		</view>
		
		<!-- 客服图标 -->
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Ser from "../../../mycomponents/Ser/Ser";
	import BwSwiper from "../../../mycomponents/bw-swiper/bw-swiper";
	import MyList from "../../../mycomponents/my-list/my-list.vue";
	import uniGrid from "../../../mycomponents/uni-grid/uni-grid.vue";
	import uniGridItem from "../../../mycomponents/uni-grid-item/uni-grid-item.vue"
	import MyTag from '../../../mycomponents/my-tag/my-tag.vue';
	import Dialog from '../../../wxcomponents/vant/dialog/dialog.js'
	let timer =null;
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
				baseImageUrl:getApp().globalData.baseImageUrl,
				bannerIndex:1,
				banners:[
					{url:"https://mall-wechat.oss-cn-beijing.aliyuncs.com/banner01.jpg",id:"445"},
					{url:"https://mall-wechat.oss-cn-beijing.aliyuncs.com/banner02.jpg",id:"373"},
					{url:"https://mall-wechat.oss-cn-beijing.aliyuncs.com/banner03.jpg",id:"401"},
					{url:"https://mall-wechat.oss-cn-beijing.aliyuncs.com/banner04.jpg",id:"409"}
				],
				hotList: [],
				newList: [],
				recommandList: [],
				cateList: [],
				pageData: [],
				selectarea: "全部",
				isLoaded: false,
				activeIndex:0,
				hour:'00',
				minute:'00',
				second:'00'
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
		onShow() {
			this.starttimer();
		},
		onHide() {
			clearInterval(timer)
		},
		onUnload() {
			clearInterval(timer)
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
			},
			length(){
				if(this.pageData[0]==undefined){
					return 0
				}else{
					return 2
				}
				
			}
		},
		methods: {
			//敬请期待
			commingsoon(){
				uni.showModal({
					content:"敬请期待",
					showCancel: false
				});
				
			},
			starttimer(){
				timer = setInterval(()=>{this.updateTime()},1000);
			},
			updateTime(){
				let startTime = this.startTime ? new Date(this.startTime) : new Date();
				let endTime = this.endTime ? new Date(this.endTime) : this.$tools.getNextHour();
				
				const addZero = this.$tools.addZero;
				const seconds =Math.floor((endTime.getTime() -startTime.getTime())/1000);
				[this.hour,this.minute,this.second] = [addZero(Math.floor(seconds/3600)),addZero(Math.floor(seconds/60)),addZero(seconds%60)];
			},
			clearTimer(){
				clearInterval(timer);
			},
			toProductDetail(id){
				this.$tools.navigateTo(`/pages/index/product/product?id=${id}`)
			},
			indexChange(e){
				this.bannerIndex = e.detail.current+1;
			},
			onSwiperChange(e){
				console.log(e)
				this.activeIndex = e.detail.current
			},
			toCateDetail(e, item,index) {
				if(index==5){return}
				if(index==6){uni.showModal({
					content:"敬请期待",
					showCancel: false
				});return}
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
			//跳往列表页
			toList(type) {
				this.$tools.navigateTo(`/pages/index/list/list?list=${JSON.stringify(this[type])}&name=${type=='hotList'?'热销榜':type=='newList'?'新品速递':type=='recommandList'?'今日推荐':''}`)
			},
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
				const mapPrice = (arr)=>arr.map(item=>{item.price=item.price.split("~")[0];return item});
				let list = result.catList.reverse();
				
				list.splice(5,0,...[{
						id:9,
						mobilePhoto:"https://mall-wechat.oss-cn-beijing.aliyuncs.com/cate06%403x.png",
						name:"在线客服"
					},{
						id:10,
						mobilePhoto:"https://mall-wechat.oss-cn-beijing.aliyuncs.com/cate07%403x.png",
						name:"会员系统"
					}])
				console.log(list)
				this.cateList = list, this.hotList = result.hotProducts, this.newList = mapPrice(result.newProducts) ,
				this.recommandList = mapPrice(result.recommandProducts) ;this.banners = result.banners
			},
			//获取数据
			getData() {
				this.$loadData.loadMore.call(this, async (reslove, reject) => {
					const index = parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea));
					let v = this.pageData[index];
					const result = await this.$net.sendRequest("/home/guessLike", {
						recommandStatus: 1,
						pageNum: v.pageNum,
						pageSize: 20,
					}, "GET");
					
					
					const arr =  this.$tools.deepFlatten(result.filter(item=>!item.deleteStatus).map(item=>{
						return  item.products
					}))	
	
					v.list = [...v.list, ...arr];
					this.$set(this.pageData, index, v);
					reslove(result);
					// 打乱数组
					this.pageData[0].list = this.$tools.chunk(this.$tools.shuffle(this.pageData[0].list),6).map(item=>this.$tools.chunk(item,3));
					this.isLoaded = true;
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';
	.goodss{
		min-height: 142rpx;
	}
	.shadow{
		box-shadow: 1rpx 5rpx 34rpx 0rpx 
				#F1F1F1;
	}
	.hot{
		min-height: 40rpx;
	}
	
	.navs{
		>.left,.right{
			flex: 1;
			height: 200rpx;
		}
		.left{
			width: 310rpx;
			height: 470rpx;
			background-color: #ffffff;
			box-shadow: 1px 9px 34px 0px 
				rgba(118, 127, 123, 0.16);
			border-radius: 10px;
			.time{
				width: 170rpx;
				>view{
					width: 40rpx;
					height: 46rpx;
					background-color: #222222;
					border-radius: 4rpx;
					color: #fff;
					font-size: 26rpx;
				}
			}
		}
		.right{
			height: 470rpx;
			.top{
				width: 380rpx;
				height: 226rpx;
				background-color: #ffffff;
				box-shadow: 1px 9px 34px 0px 
					rgba(118, 127, 123, 0.16);
				border-radius: 10px;
			}
			.bottom{
				width: 380rpx;
				height: 226rpx;
				background-color: #ffffff;
				box-shadow: 1px 9px 34px 0px 
					rgba(118, 127, 123, 0.16);
				border-radius: 10px;
			}
		}
	}
	.contact::after{
		border: none;
	}
	.van-grid-item__content {
		padding-bottom: 0px;
	}

	.big {
		@include wh(15rpx, 15rpx);
	}

	.small {
		@include wh(10rpx, 10rpx);
	}

	.navbar {
		@include wh(100%, 80rpx);
	}

	.intro {
		width: 100%;

		.content {
			width: 100%;

			.single {
				
				border-radius: 5px;
			}

			.item {
				width: 260rpx;
				box-shadow: 2px 2px 5px #f1f1f1;
				border-radius: 5px;

				.tag {
					@include wh(70rpx, 36rpx);
					left: 0rpx;
					right: 0px;

				}
			}
		}
	}

	.more {
		border: 1px solid #fff;
		color: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		padding: 0px 10rpx;
	}

	.new_goods {
		@include wh(100%, 320rpx);

		.new_content {
			.count_tag{
					width: 81rpx;
					height: 40rpx;
					background-color: #000000;
					border-radius: 20rpx;
					opacity: 0.5;
			}
			swiper-item{
				background: #f1f1f1;
				overflow: hidden;
			}
			@include wh(710rpx, 380rpx);

			.content {
				top: 0rpx;
				left: 0rpx;

				.container {
					background: #fff;
					height: 80%;

					.item {
						width: 222rpx;
					}
				}
			}
		}

		.back {
			@include wh(100%, 210rpx);
			height: 210rpx !important;
			top: 0rpx;
			left: 0rpx;
		}
	}

	.goods {
		swiper{
			height: 800rpx;
		}
		.dots{
			width: 100%;
			
			.dots_wrapper{
				.dot{
					width: 15rpx;
					height: 15rpx;
					background: #666666;
					border-radius: 18rpx;
					overflow: hidden;
					transition: all 0.5s;
				}
				.active{
					background: linear-gradient(142deg,rgba(26,174,104,1) 0%,rgba(124,206,89,1) 100%);
					width: 40rpx;
				}
			}
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
