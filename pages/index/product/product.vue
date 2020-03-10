<template>
	<view class="main">
		<!-- 左上角返回按钮 -->
		<view class="back pf pr" @click="back">
			<van-icon class="center" style="margin-top: 2px;" name="arrow-left" color="#fff" />
		</view>
		<!-- 轮播 -->
		<view class="carousel">
			<swiper v-if="!isVideoing" indicator-dots circular=true duration="400" style="background: #f1f1f1;">
				
				<!-- 未售空 -->
				<swiper-item v-if="pageData.stock>0" class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper pr">
						<image :src="item" class="loaded" mode="aspectFill" @click="previewImgVideo($event,index)" :data-imgs="imgList" :data-src="item"></image>
						<image v-if="index==0&&pageData.albumVideo.length" class="pa" style="bottom: 20px;left: 20px;width: 35px;height: 35px;" :src="`${baseImageUrl}/video.png`" mode="aspectFit"></image>
					</view>
				</swiper-item>
				<!-- 售空 -->
				<swiper-item v-else class="swiper-item">
					<view class="image-wrapper pr">
						<image :src="imgList[0]" class="loaded" mode="aspectFill"></image>
						<view class="pa fill" style="background-color: rgba(0,0,0,0.5);top: 0px;left: 0rpx;"></view>
						<image class="center" style="width: 400rpx;height: 400rpx;" :src="`${baseImageUrl}/empty.png`" mode="aspectFill"></image>
						<!-- <view class=""></view> -->
						<!-- <image v-if="index==0&&pageData.albumVideo.length" class="pa" style="bottom: 20px;left: 20px;width: 35px;height: 35px;" :src="`${baseImageUrl}/video.png`" mode="aspectFit"></image> -->
					</view>
				</swiper-item>
			</swiper>
			<video v-else :src="pageData.albumVideo" autoplay controls style="height: 710upx;width: 100%;" @play="videoStart" @ended="videoEnd" />
		</view>
		<view class="seckill pr" style="line-height: 0;" v-if="status!=0">
			<image style="width: 100%;" :src="`${baseImageUrl}/bg_details@2x.png`" mode="widthFix"></image>
			<view class="content fsb fill pa p5" style="top: 0px;left: 0px;align-items: center;">
				<view class="left">
					<view class="ftm">
						<text class="fz12 cfff">秒杀价</text><text class="fz20 fb ml5 cfff" >¥{{killInfo.productQgPrice}}</text><text class="fz10 cfff ml5">仅剩{{killInfo.correntStock}}件</text><view class="buyed ml10 cfff fz12">已抢{{killInfo.productQgNumber-killInfo.correntStock}}件</view>
					</view>
					<view class="ftm">
						<text class="cfff fz10" >原价<text style="text-decoration: line-through;">¥{{killInfo.productPrice}}</text> </text> <text class="fz11 cfff ml10" >累计销量{{pageData.sale}}{{pageData.unit}}</text> <text class="fz12 cfff ml10" v-if="pageData.xiangou">每人限购{{pageData.xiangou}}件</text>
					</view>
				</view>
				<view class="right f" style="flex-flow: column wrap;align-items: flex-end;">
					<view class="fz12 cfff" style="text-align: right;">
						{{status==1?'距离抢购时间还剩':status==2?'距离价格变更还剩':'活动已结束'}}
					</view>
					<view class="time fsb mt5">

							<view class="hour fm">{{hour}}</view>
							<text>:</text>
							<view class="minute fm">{{minute}}</view>
							<text>:</text>
							<view class="second fm">{{second}}</view>

					</view>
				</view>
			</view>
		</view>
		<view class="wrapper">
			<!-- 商品信息 -->
			<view class="info_wrapper p10">
				<view class="detail fsb ">
					<view class="text more-hidden fz16 fb">
						{{pageData.name}}
					</view>
					<view class="icon fm pr bl" style="width: 40px;">
						<van-icon name="share" size="16px" color="#38A472" />
						<text class="fz10" style="color: #666;">分享</text>
						<button class="pa fill" style="z-index:9;opacity: 0;" open-type="share" ></button>
					</view>
					
				</view>
				<view class="tag ftm mt5">
						<my-tag :type="'first'" :text="pageData.brandName"/>
						<my-tag v-if="pageData.tagName && pageData.tagName!='无'" class="ml10" :type="'second'" :text="pageData.tagName"/>
						<my-tag v-if="pageData.xiangou==1" class="ml10" :type="'three'" :text="pageData.xiangouNumber"/>
				</view>
				<view class="price_box fsb mt20 mb10" v-if="status==0">
					<text class="price fb fz18">￥{{pageData.price}}</text>
					<text class="sal">销量{{pageData.sale}}{{pageData.unit}}</text>
				</view>
			</view>

			<!-- 商家 -->
			<view class="business" @click="navigateTo" :data-url="'/pages/index/store_details/store_details?id='+pageData.businessId+'&brandId='+pageData.brandId">
				<van-field :border="false" is-link center readonly>
					<view class="label  fsb" slot="label">
						<view class="mr20">
							<Pic :src="pageData.businessPic" :height="'60px'" :width="'60px'" :mode="'aspectFill'"></Pic>
						</view>
				
						<view class="info fsr">
							<view class="text-hidden fb fz17" style="width: 230px;">
								{{pageData.businessName}}
							</view>
							<view class="text-hidden" style="width: 230px;color: #666;">
								{{pageData.bussinessDesc}}
							</view>
						</view>
					</view>
				</van-field>
			</view>
			


			<!-- 图片 -->
			<view class="image ">
				<view class="h1 fz18 fb p10">
					商品详情
				</view>
				<view class="container" style="font-size: 0px;line-height: 0px;">
					<image v-for="(item,index) in pageData.detailPics"  :key="index" :src="item" @load="loadImg" mode="widthFix" style="width: 100%;display: block;height: auto;background: #f1f1f1;"></image>
				</view>
				<!-- 加载更多 -->
				<load-more :tip="loadImgNum==pageData.detailPics.length ? '到底了':'加载中'" :loading="loadImgNum!=pageData.detailPics.length" />

				<view style="height: 50px;">

				</view>
			</view>
		</view>


		<!-- 商品提交条 -->
		<view class="bottom_bar">
			<view class="bar fz14" v-if="pageData.stock<=5 || !pageData.publishStatus">{{ !pageData.publishStatus ?  '当前商品已下架,快去看看其他商品吧!' :  pageData.stock<=0 ? '当前商品已售罄，可查看更多商品':`当前商品库存仅剩${pageData.stock}件`}}</view>
			<van-goods-action>
				<van-goods-action-icon @click="contact" icon="chat-o" text="客服" />
				<van-goods-action-icon @click='toCart' v-if="!cartCount" icon="cart-o" text="购物车"  />
				<van-goods-action-icon @click='toCart' v-if="cartCount" icon="cart-o" text="购物车" :info="cartCount" />
				<view class="f" style="width:100%;border-radius: 25px;overflow: hidden;">
					<van-goods-action-button v-if="!killInfo" text="加入购物车" :color="'#222'" @click="showModal(false)" />
					<van-goods-action-button text="立即购买" :color="'linear-gradient(142deg,rgba(26,174,104,1) 0%,rgba(124,206,89,1) 100%)'" @click="showModal(true)" />
				</view>
				<view style="width: 10px;height: 100%;"></view>
			</van-goods-action>
		</view>
		


		<!-- 规格-模态层弹窗 -->
		<view class="popup spec pr" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<view class="image">
						<Pic :src="imgList[0]" :height="'100%'" :width="'100%'" :mode="'aspectFill'"></Pic>
					</view>
					<view class="right">
						<view><text class="price">¥{{selectedItem.price}}</text><text class="cccc fz12 ml5" v-if="killInfo" style="text-decoration: line-through;">¥{{selectedItem.originPrice}}</text></view>
						
						<text class="stock">库存：{{selectedItem.stockNum}}{{pageData.unit}}</text>
						<view class="selected">
							已选：
							<text class="selected-text" >
								{{selectedItem.name}}
							</text>
						</view>
					</view>
				</view>
				
				<view class="attr-list"><!-- v-for="(item,index) in specList" -->
					<text>{{pageData.proAttribute}}</text>
					<view class="item-list">
						<text v-for="(childItem, childIndex) in selectItems"  :key="childIndex" class="tit"
						 :class="{selected: childItem.selected}" @click="selectSpec(childIndex, childItem)">
							{{childItem.name}}
						</text>
					</view>
				</view>
				
				<view class="attr-list">
					<view class="ftm">
						<text>数量</text>
						<text class="fz12 ml5" style="color: #38A472;" v-if="pageData.xiangou==1">(每人限购{{pageData.xiangouNumber}}件)</text>
					</view>
					
					<view class="item-list">
						<van-stepper :value="count" @change="onCountChange" :max="selectedItem.stockNum" />
					</view>
				</view>
				
				<view style="height: 100rpx;">
					
				</view>
				<view class="cl pt10 pb10" style="width: 348px;bottom: 0px;" @click="subOrder">
					<van-button :color="'linear-gradient(142deg,rgba(26,174,104,1) 0%,rgba(124,206,89,1) 100%)'" block round :size="'small'"><text style="color: #fff;">完成</text></van-button>
				</view>
				
				<view class="pa pr10 pt10" style="top: 0px;right: 0px;" @click="toggleSpec">
					<van-icon name="close" size="20px" :color="'#D0D0D0'" />
				</view>
			</view>
		</view>
		<van-toast id="van-toast" />
		<Layer :isLoaded="isLoaded" class="fill"></Layer>
	</view>
</template>

<script>
	
	import MyButton from "../../../mycomponents/my-button/my-button.vue";
	import MyTag from "../../../mycomponents/my-tag/my-tag.vue";
	import Dialog from '../../../wxcomponents/vant/dialog/dialog.js';
	import Toast from "../../../wxcomponents/vant/toast/toast.js";
	import Api from "../../../utils/api.js";
	let timer =null;let attrs=null;
	
	export default {
		components: {
			MyButton,MyTag
		},
		data() {
			return {
				baseImageUrl:getApp().globalData.baseImageUrl,
				loadImgNum:0,
				isVideoing:false,
				isLoaded:false,
				action:true,//当前操作 true代表立即购买 false 代表加入购物车
				count:1,//商品数量
				imgList: [
				],//轮播图
				selectItems:[],//所有商品尺寸
				selectedItem:{
					name:"",
					price:0,
					stockNum:0
				},//已选商品尺寸
				specClass:"none",
				specSelected:[],
				specList: [],
				pageData:null,
				specChildList: [
				],
				startTime:"",
				endTime:"",
				killInfo:null,
				status:0,
				hour:'00',
				minute:'00',
				second:'00',
				flag:false,
			};
		},
		computed:{
			cartCount(){
				
				let length = 0;
				if(this.$store.state.cart.length){
					this.$store.state.cart.forEach(function(item){
						length+=item.items.length;
					})
				}
				return length
			}
		},
		onLoad(options) {
			console.log(getCurrentPages()[getCurrentPages().length-1].route,options)
			
			this.getData(options);
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
		methods:{
			starttimer(){
				if(this.killInfo==null){
					return;
				}
				timer = setInterval(()=>{this.updateTime()},1000);
			},
			updateTime(){
				let now = new Date();
				let startTime = new Date(this.killInfo.beginTime);
				let endTime = new Date(this.killInfo.endTime);
				//测试数据
				// let endTime = new Date("2020-03-08 21:00:00");
				// let startTime = new Date("2020-03-08 20:30:00");

				let s_n = startTime.getTime()-now.getTime();
				let e_n = endTime.getTime()-now.getTime();
				let seconds = null;
				
				//活动未开始
				if(s_n>0){
					seconds =s_n;
					this.status = 1;
				}
				//活动进行中需要更换商品属性的价格
				if(s_n<0 && e_n>0){
					seconds =e_n;
					this.status = 2;
					if(this.flag){
						return
					}
					const attrs = this.killInfo.productAttr.killAttrs.map(item=>{
						let obj = {
							id:item.killProAttId,
							productId:item.productId,
							name:item.attName,
							stockNum:item.stockNum,
							price:item.killPrice,
							selected:false,
							originPrice:item.price,
							killId:item.killId
						}
						return obj
					})
					this.flag = true;
					this.selectItems = attrs
					attrs[0].selected=true;
					this.selectedItem =this.selectItems[0];
				}
				//活动已结束,跟换商品属性
				if(e_n<0){
					this.status = 0;
				}
				const addZero = this.$tools.addZero;
				seconds =Math.floor(seconds/1000);
				[this.hour,this.minute,this.second] = [addZero(Math.floor(seconds/3600)),addZero(Math.floor((seconds%3600)/60)),addZero(seconds%60)];

			},
			clearTimer(){
				clearInterval(timer);
			},
			//加载图片
			loadImg(){
				this.loadImgNum++;
			},
			//联系商家
			contact(){
				uni.makePhoneCall({
					phoneNumber:this.pageData.busPhone
				})
			},
			//视频播放结束
			videoStart(){
				this.isVideoing = true;
			},
			videoEnd(){
				this.isVideoing = false;
			},
			//获取数据
			async getData(options){
				//获取商品详情
				const result =await this.$net.sendRequest("/home/getProduct",{id:parseInt(options.id)},"GET");
				this.isLoaded=true;
				this.imgList = result.albumPics.split(",");
				result.detailPics = result.detailPics.length>0 ? result.detailPics.split(",") : [];
				
				this.pageData = result;
				if(result.attrs.length){
					result.attrs[0].selected=true;this.selectItems = result.attrs;this.selectedItem =this.selectItems[0]; 
				}
				//获取秒杀信息
				const res = await this.$net.sendRequest("/qiangGou/getQgProductById",{productId:this.pageData.id,...options.killId?{killId:options.killId}:{}},"GET");
				this.killInfo = res;
				this.starttimer();
				// console.log(res)
			},
			toCart(){
				this.$tools.switchTab("/pages/cart/cart/cart")
			},
			//数量绑定
			onCountChange(e){
				this.count = e.detail;
			},
			//返回上一级
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			//预览图片
			previewImgVideo(e,index){
				console.log(e.currentTarget.dataset.imgs)
				const video =this.pageData.albumVideo || '';
				if(index==0&&video.length){
					this.isVideoing=true;
					return
				}
				uni.previewImage({
					current:e.currentTarget.dataset.src,
					urls:e.currentTarget.dataset.imgs
				})
			},
			//规格弹窗开关
			toggleSpec() {
				if(this.specClass === 'show'){
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
				}
			},
			//选择规格
			selectSpec(index, single){
				this.selectItems = this.selectItems.map((item)=>{item.selected=false;return item})
				this.$set(this.selectItems[index],'selected',true);
				this.selectedItem = single;
			},
			//页面跳转
			navigateTo(e) {
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
			//显示模态框
			showModal(action){
				if (!this.$net.checkLogin()) {
					return;
				}
				if(!parseInt(this.pageData.publishStatus)){
					this.$tools.Toast("商品已下架,快去看看其他商品吧")
					return;
				}
				this.action = action;  
				this.toggleSpec();
			},
			//提交订单
			async subOrder(){
				
				
				//判断是否已经选中商品
				if(JSON.stringify(this.selectedItem)==JSON.stringify({name:"",price:0,stockNum:0})){
					this.$tools.Toast("请选择商品种类");return;
				}
				//判断是否已经选中商品
				if(!this.selectedItem.stockNum){
					this.$tools.Toast("商品库存不足,请重新选择数量!");return;
				} 
				
				//限制购买
				const islimit = await Api.isLimitBuy([this.pageData.id]);
				if(!islimit){
					return;
				}
				//限购数量
				if(this.pageData.xiangou&&this.pageData.xiangouNumber>0&&this.count>this.pageData.xiangouNumber){
					this.$tools.Toast(`该商品限购${this.pageData.xiangouNumber}${this.pageData.unit},请重新选择数量!`);return;
				}
				//关闭弹窗
				this.toggleSpec();
				//跳转页面 
				if(this.action){//直接下订单
					let submitData=[{
						businessId:this.pageData.businessId,
						businessName:this.pageData.businessName,
						items:[
							{	
								attrName:this.selectedItem.name,
								attrId:this.selectedItem.id,
								productName:this.pageData.name,
								productPic:this.pageData.pic,
								price:this.selectedItem.price,
								quantity:this.count,
								xiangou:this.pageData.xiangou,
								xiangouNumber:this.pageData.xiangouNumber,
								productId:this.pageData.id
							}
						],
						note:""
					}];
					const killId = this.killInfo ? this.killInfo.id:0;
					this.$tools.navigateTo(`/pages/cart/submit_order/submit_order?items=${JSON.stringify(submitData)}&killId=${killId}`);
				}else{
					//添加购物车
					const result  =await this.$net.sendRequest("/cart/add",{productAttrId:this.selectedItem.id,quantity:this.count});
					this.$tools.Toast("添加购物车成功","success");
					this.$store.dispatch("getCart");
				}
				
			},
			stopPrevent(){
				// this.toggleSpec();
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';
	.seckill{
		.content{
			align-items: center;
			.left >view{
				line-height: 42rpx;
				
			}
			.right {
				margin-top: -5rpx;
				>.fz12{
					line-height: 30rpx;
				}	
				.time{
					width: 150rpx;
					transform: scale(0.8,0.8);
					>view{
						width: 35rpx;
						height: 35rpx;
						background-color: #222222;
						border-radius: 4rpx;
						color: #fff;
						font-size: 26rpx;
					}
					text{
						line-height: 30rpx;
					}
				}
			}
			.buyed{
				background:rgba(20,105,65,1);
				opacity:0.46;
				border-radius:19px;
				overflow: hidden;
				line-height: 38rpx;
				padding: 0rpx 15rpx;
			}
		}
	}
	.business{
		.label {
			.info {
				flex-flow: column wrap;
			}
		}
	}
	.bottom_bar{
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 9;
		.bar{
			@include wh(100%,60rpx);
			line-height: 60rpx;
			text-align: center;
			color: #fff;
			background: rgba(0,0,0,0.5);
		}
	}
	.back{
		top: 50rpx;
		left: 30rpx;
		@include borderRadius(30px);
		background: rgba(0,0,0,0.5);
		z-index: 9;
	}
	.wrapper {
		.price_box{
			align-items: flex-end;
			text{
				line-height: 0;
			}
			.price{
				font-size: 25px;
				color: $theme;
			}
			.sal{
				color: #666;
			}
		}
		.detail {
			.text {
				line-height: 23px;
				padding-right: 20px;
			}

			.icon {
				background: none;
				font-size: 12px;
				margin-top: -4px;
				&::after {
					border: none;
				}
				flex-flow: column wrap;
				text {
					white-space: nowrap;
					line-height: 10px;
				}
			}
		}

		
	}

	// 轮播
	.carousel {
		height: 722upx;
		position: relative;

		swiper {
			height: 100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	
	/* 规格选择弹窗 */
	.attr-content{
		padding: 10upx 30upx;
		.a-t{
			display: flex;
			.image{
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;;
				overflow: hidden;
			}
			.right{
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;
				.price{
					font-size: $font-lg;
					color: $theme;
					margin-bottom: 10upx;
				}
				.selected-text{
					margin-right: 10upx;
				}
			}
		}
		.attr-list{
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}
		.item-list{
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;
			text{
				border: 1px solid #F2F3F5;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #F2F3F5;
				margin-right: 10upx;
				margin-bottom: 15upx;
				border-radius: 100upx;
				min-width: 56upx;
				height: 56upx;
				padding: 0 20upx;
				font-size: 12px;
				color: $font-color-dark;
				border: 1upx solid #eee;
			}
			.selected{
				background: #fff;
				color: $theme;
				border: 1px solid $theme;
			}
		}
	}
	
	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.25s linear both;
			}
			.layer {
				animation: showLayer 0.25s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.25s linear both;
			}
			.layer {
				animation: hideLayer 0.25s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
			.btn{
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}
</style>
