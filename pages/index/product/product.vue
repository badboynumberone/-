<template>
	<view class="main">
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
		<!-- 商品信息 -->
		<view class="wrapper">

			<view class="detail fsb p10">
				<view class="text more-hidden fz16 fb">
					金秋红蜜桃水蜜桃子新鲜水果脆桃当金秋红蜜桃水蜜桃子新鲜水果脆桃当
				</view>
				<view class="icon fm">
					<van-icon name="share" size="16px" />
					<text>分享</text>
				</view>
			</view>

			<!-- 商家 -->
			<van-field :border="false" is-link center readonly>
				<view class="label  fsb" slot="label">
					<view class="mr20">
						<Pic :height="'60px'" :width="'60px'" :mode="'aspectFill'"></Pic>
					</view>

					<view class="info fsr">
						<view class="text-hidden fb fz17" style="width: 230px;">
							南京樱桃鸭业有限公司
						</view>
						<view class="text-hidden" style="width: 230px;color: #666;">
							南京樱桃鸭业有限公司南京樱桃鸭业有限公司南京樱桃鸭业有限公司南京樱桃鸭业有限公司
						</view>
					</view>
				</view>

			</van-field>

			<!-- 推荐 -->
			<view class="intro p10">
				<view class="h1 fz18 fb mb10" style="line-height: 40px;">
					推荐理由
				</view>
				<view class="f">
					<Pic :height="'40px'" :width="'40px'" :mode="'aspectFill'"></Pic>
					<div class="intro_content ml20 " style="color: #666;">
						盐水鸭油盐水鸭油盐水鸭油盐水鸭油盐水鸭油盐水鸭油盐水鸭油盐水鸭油盐水鸭油盐水鸭油
					</div>
				</view>
			</view>

			<!-- 图片 -->
			<view class="image p10">
				<view class="h1 fz18 fb mb10">
					商品详情
				</view>
				<view class="container">
					<Pic :width="'100%'" :mode="'widthFix'"></Pic>
				</view>
				<!-- 加载更多 -->
				<load-more :tip="'到底了'" :loading="false" />

				<view style="height: 50px;">

				</view>
			</view>
		</view>


		<!-- 商品提交条 -->
		<van-goods-action>
			<van-goods-action-icon icon="chat-o" text="客服" />
			<van-goods-action-icon icon="cart-o" text="购物车" />
			<view class="f" style="width:100%;border-radius: 25px;overflow: hidden;">
				<van-goods-action-button text="加入购物车" :color="'#222'" @click="showModal" />
				<van-goods-action-button text="立即购买" :color="'linear-gradient(142deg,rgba(26,174,104,1) 0%,rgba(124,206,89,1) 100%)'" @click="showModal" />
			</view>
			<view style="width: 10px;height: 100%;"></view>
		</van-goods-action>


		<!-- 规格-模态层弹窗 -->
		<view class="popup spec pr" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image src="https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg"></image>
					<view class="right">
						<text class="price">¥328.00</text>
						<text class="stock">库存：188件</text>
						<view class="selected">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
								{{sItem.name}}
							</text>
						</view>
					</view>
				</view>
				<view v-for="(item,index) in specList" :key="index" class="attr-list">
					<text>{{item.name}}</text>
					<view class="item-list">
						<text v-for="(childItem, childIndex) in specChildList" v-if="childItem.pid === item.id" :key="childIndex" class="tit"
						 :class="{selected: childItem.selected}" @click="selectSpec(childIndex, childItem.pid)">
							{{childItem.name}}
						</text>
					</view>
				</view>
				<view style="height: 50px;">
					
				</view>
				<view class="pa pt10 pb10"style="width: 348px;bottom: 0px;" @click="finsh">
					<van-button :color="'linear-gradient(142deg,rgba(26,174,104,1) 0%,rgba(124,206,89,1) 100%)'" block round :size="'small'"><text style="color: #fff;">完成</text></van-button>
				</view>
				
				<view class="pa pr10 pt10" style="top: 0px;right: 0px;" @click="toggleSpec">
					<van-icon name="close" size="20px" :color="'#D0D0D0'" />
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import MyButton from "../../../mycomponents/my-button/my-button.vue";
	export default {
		components: {
			MyButton
		},
		data() {
			return {
				imgList: ['https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg',
						'https://gd3.alicdn.com/imgextra/i3/TB1RPFPPFXXXXcNXpXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg',
						'https://gd2.alicdn.com/imgextra/i2/38832490/O1CN01IYq7gu1UGShvbEFnd_!!38832490.jpg_400x400.jpg'
				],
				specClass:"none",
				specSelected:[],
				specList: [
					{
						id: 1,
						name: '尺寸',
					},
					{	
						id: 2,
						name: '颜色',
					},
				],
				specChildList: [{
						id: 1,
						pid: 1,
						name: 'XS',
					},
					{
						id: 2,
						pid: 1,
						name: 'S',
					},
					{
						id: 3,
						pid: 1,
						name: 'M',
					},
					{
						id: 4,
						pid: 1,
						name: 'L',
					},
					{
						id: 5,
						pid: 1,
						name: 'XL',
					},
					{
						id: 6,
						pid: 1,
						name: 'XXL',
					},
					{
						id: 7,
						pid: 2,
						name: '白色',
					},
					{
						id: 8,
						pid: 2,
						name: '珊瑚粉',
					},
					{
						id: 9,
						pid: 2,
						name: '草木绿',
					},
				]
			};
		},
		methods:{
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
			selectSpec(index, pid){
				let list = this.specChildList;
				list.forEach(item=>{
					if(item.pid === pid){
						this.$set(item, 'selected', false);
					}
				})
			
				this.$set(list[index], 'selected', true);
				//存储已选择
				/**
				 * 修复选择规格存储错误
				 * 将这几行代码替换即可
				 * 选择的规格存放在specSelected中
				 */
				this.specSelected = []; 
				list.forEach(item=>{ 
					if(item.selected === true){ 
						this.specSelected.push(item); 
					} 
				})
				
			},
			showModal(){
				this.toggleSpec();
			},
			finsh(){
				this.toggleSpec();
			},
			stopPrevent(){
				// this.toggleSpec();
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';
	.wrapper {
		.detail {
			.text {
				line-height: 23px;
				padding-right: 20px;
			}

			.icon {
				flex-flow: column wrap;

				text {
					white-space: nowrap;
				}
			}
		}

		.label {
			.info {
				flex-flow: column wrap;
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
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
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
