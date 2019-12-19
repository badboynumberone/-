<template>
	<view class="main" v-show="isLoaded">
		<!-- 左上角返回按钮 -->
		<view class="back pf pr" @click="back">
			<van-icon class="center" style="margin-top: 2px;" name="arrow-left" color="#fff" />
		</view>
		<!-- 轮播 -->
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image :src="item" class="loaded" mode="aspectFill" @click="previewImg" :data-imgs="imgList" :data-src="item"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="wrapper">
			
			<!-- 商品信息 -->
			<view class="info_wrapper p10">
				<view class="detail fsb ">
					<view class="text more-hidden fz16 fb">
						{{pageData.name}}
					</view>
					<view class="icon fm pr" style="width: 40px;">
						<van-icon name="share" size="16px" />
						<text>分享</text>
						<button class="pa fill" style="z-index:9;opacity: 0;" open-type="share" ></button>
					</view>
					
				</view>
				<view class="tag ftm mt5">
						<my-tag :type="'first'" :text="pageData.brandName"/>
						<my-tag v-if="pageData.tagName" class="ml10" :type="'second'" :text="pageData.tagName"/>
				</view>
				<view class="price_box fsb mt20 mb10">
					<text class="price fb fz18">￥{{pageData.price}}</text>
					<text class="sal">销量{{pageData.sale}}</text>
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
			

			<!-- 推荐 -->
			<!-- <view class="intro p10">
				<view class="h1 fz18 fb mb10" style="line-height: 40px;">
					推荐理由
				</view>
				<view class="f">
					<Pic :height="'40px'" :width="'40px'" :mode="'aspectFill'"></Pic>
					<div class="intro_content ml20 " style="color: #666;">
						盐水鸭油盐水鸭油盐水鸭油盐水鸭油盐水鸭油盐水鸭油盐水鸭油盐水鸭油盐水鸭油盐水鸭油
					</div>
				</view>
			</view> -->

			<!-- 图片 -->
			<view class="image ">
				<view class="h1 fz18 fb p10">
					商品详情
				</view>
				<view class="container">
					<Pic v-for="(item,index) in pageData.detailPics" :key="index" :src="item" :width="'100%'" :mode="'widthFix'"></Pic>
				</view>
				<!-- 加载更多 -->
				<load-more :tip="'到底了'" :loading="false" />

				<view style="height: 50px;">

				</view>
			</view>
		</view>


		<!-- 商品提交条 -->
		<view class="bottom_bar">
			<view class="bar fz14" v-if="pageData.stock<=5 || !pageData.publishStatus">{{ !pageData.publishStatus ?  '当前商品已下架,快去看看其他商品吧!' :  pageData.stock<=0 ? '当前商品已售罄，可查看更多商品':`当前商品库存仅剩${pageData.stock}件`}}</view>
			<van-goods-action>
				<van-goods-action-icon icon="chat-o" text="客服" />
				<van-goods-action-icon @click='toCart' v-if="!cartCount" icon="cart-o" text="购物车"  />
				<van-goods-action-icon @click='toCart' v-if="cartCount" icon="cart-o" text="购物车" :info="cartCount" />
				<view class="f" style="width:100%;border-radius: 25px;overflow: hidden;">
					<van-goods-action-button text="加入购物车" :color="'#222'" @click="showModal(false)" />
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
					<image :src="pageData.pic"></image>
					<view class="right">
						<text class="price">¥{{selectedItem.price}}</text>
						<text class="stock">库存：{{selectedItem.stockNum}}{{pageData.unit}}</text>
						<view class="selected">
							已选：
							<text class="selected-text" >
								{{selectedItem.name}}
							</text>
						</view>
					</view>
				</view>
				
				<view  :key="index" class="attr-list"><!-- v-for="(item,index) in specList" -->
					<text>{{item.name}}</text>
					<view class="item-list">
						<text v-for="(childItem, childIndex) in selectItems"  :key="childIndex" class="tit"
						 :class="{selected: childItem.selected}" @click="selectSpec(childIndex, childItem)">
							{{childItem.name}}
						</text>
					</view>
				</view>
				
				<view class="attr-list">
					<text>数量</text>
					<view class="item-list">
						<van-stepper :value="count" @change="onCountChange" />
					</view>
				</view>
				
				<view style="height: 50px;">
					
				</view>
				<view class="cl pt10 pb10" style="width: 348px;bottom: 0px;" @click="subOrder">
					<van-button :color="'linear-gradient(142deg,rgba(26,174,104,1) 0%,rgba(124,206,89,1) 100%)'" block round :size="'small'"><text style="color: #fff;">完成</text></van-button>
				</view>
				
				<view class="pa pr10 pt10" style="top: 0px;right: 0px;" @click="toggleSpec">
					<van-icon name="close" size="20px" :color="'#D0D0D0'" />
				</view>
			</view>
		</view>
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	
	import MyButton from "../../../mycomponents/my-button/my-button.vue";
	import MyTag from "../../../mycomponents/my-tag/my-tag.vue";
	import Dialog from '../../../wxcomponents/vant/dialog/dialog.js';
	export default {
		components: {
			MyButton,MyTag
		},
		data() {
			return {
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
				]
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
			wx.showLoading({title:"加载中",mask:true});
			this.getData(options)
		},
		methods:{
			async getData(options){
				const result =await this.$net.sendRequest("/home/getProduct",{id:parseInt(options.id)},"GET");
				this.imgList = result.albumPics.split(",");result.detailPics = result.detailPics.split(",");
				this.pageData = result;this.selectItems = result.attrs;this.isLoaded = true;
				wx.hideLoading();this.isLoaded = true;
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
			previewImg(e){
				console.log(e.currentTarget.dataset.imgs)
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
					this.$tools.Toast("商品库存不足,请重新选择!");return;
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
								quantity:this.count
							}
						],
						note:""
					}];
					this.$tools.navigateTo(`/pages/cart/submit_order/submit_order?items=${JSON.stringify(submitData)}`);
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
			image{
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;;
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
				animation: showPopup 0.2s linear both;
			}
			.layer {
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
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
