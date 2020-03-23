	<template>
	<view class="main bgf1 pt10">
		<!-- 商品详情 -->
		<view class="container f p10  mb10 bgfff" @click="navigateTo" :data-url="'/pages/index/product/product?id='+single.id">
			<view class="pic pr">
				<Pic :src="`${baseImageUrl}/bg_details@2x.png`" :height="'90px'" :width="'90px'" :mode="'aspectFill'"></Pic>
			</view>
			<view class="info fsr ml10">
				<text class="text-hidden" style="width: 230px;">商品名称</text>
				<text class="text-hidden fz10 size" :decode="true" style="width: 220px;margin-top: -5px;">规格1</text>
				<view class="price fz16  fsb">
					<text>￥20.00</text>
					<view class="fz12" style="color: #727272;">
						x6
					</view>
				</view>
			</view>
		</view>
		<!-- 团详情 -->
		<view class="group-detail bgfff">
			<view class="top">
				<view @click="navigateTo" :data-url="'/pages/index/grouping_play/grouping_play'">
					<van-cell is-link>
						<view slot="title">
							<text class="fz12 c222">拼团规则：<text class="theme">2</text>人成团，人数不足自动退款</text>
						</view>
					</van-cell>
				</view>

			</view>
			<view class="bottom p10 fm" style="flex-flow: column wrap;">
				<view class="lefttext fz15 fb">
					拼团剩余时间
				</view>
				<view class="time fsb mt5" style="align-items: center;width: 250rpx;">
					<view class="hour fm">{{hour}}</view>
					<text>:</text>
					<view class="minute fm">{{minute}}</view>
					<text>:</text>
					<view class="second fm">{{second}}</view>
				</view>
				<view class="wrapper f mb10 mt10">
					<view class="item pr">
						<view class="tag fm pa fz10 cfff">
							团长
						</view>
						<!-- <view class="single fm fz23 c999">
							?
						</view> -->
						<view class="header" style="border: none;">
							<image class="fill" :src="`${baseImageUrl}/bg_details@2x.png`" mode=""></image>
						</view>
					</view>
					<view class="item">
						<view class="single fm fz23 c999">
							?
						</view>
						<!-- 
						<view class="header" style="border: none;">
							<image class="fill" :src="`${baseImageUrl}/bg_details@2x.png`" mode=""></image>
						</view> -->
					</view>
				</view>

				<view class="fz16">
					还差 <text class="theme">1</text>人，即可拼团成功！
				</view>
				<view class="c999 fz13 mb10">
					分享到群里，成团成功率翻倍
				</view>

				<view class="w100" @click="showPopup">
					<van-button block round type="primary" plain>邀请好友参团</van-button>
				</view>
				<view class="w100 mt10">
					<van-button block round color="linear-gradient(142deg,rgba(26,174,104,1) 0%,rgba(124,206,89,1) 100%)">查看订单详情</van-button>
				</view>
			</view>
		</view>
		<!-- 更多拼团 -->

		<!-- 弹出分享框 -->
		<view class="share">
			<van-popup :show="isMask" @close="onClose">
				<view class="wrapper fm">
					<view class="box theme bgfff fm fz15" @click="genratePoster">
						生成海报
					</view>
					<view style="width: 50rpx;"></view>
					<view class="pr box  fm fz15 cfff" style="flex-flow: column wrap;background: linear-gradient(142deg,rgba(26,174,104,1) 0%,rgba(124,206,89,1) 100%);">
						<view class="">
							邀请好友
						</view>
						<view>
							参团
						</view>
						<button class="pa fill" style="opacity: 0;" type="primary" open-type="share"></button>
					</view>
				</view>
			</van-popup>
		</view>

		<van-action-sheet class="masking" :show="isShow" :actions="actions" @select="selectItem">
			<view class="pr" style="height: 0px;">
				<view class="cl container bgfff">

				</view>
			</view>
		</van-action-sheet>
	</view>
</template>

<script>
	let opt = null,
		pages = null;
	export default {
		components: {

		},
		data() {
			return {
				baseImageUrl: getApp().globalData.baseImageUrl,
				hour: '00',
				minute: '00',
				second: '00',
				isMask: false,
				actions: [{
						name: '保存图片'
					},
					{
						name: '取消'
					},
				],
				isShow: true,

			};
		},
		computed: {

		},
		onLoad(options) {
			//页面信息答应
			this.setPage(options);


		},
		methods: {
			
			genratePoster() {
				this.isMask=false,
				this.isShow=true
			},
			//选择项
			selectItem(e) {
				const name = e.detail.name;
				if (name == '保存图片') {
					//保存图片操作
				} else {
					this.isShow = false
				}
				console.log(e.detail)
			},
			setPage(options) {
				console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
				opt = options;
				pages = getCurrentPages();
			},
			showPopup() {
				this.isMask = true
			},

			onClose() {
				this.isMask = false
			},

			//页面跳转
			navigateTo(e) {
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.masking .container {
		@include wh(500rpx, 786rpx);
		top: -1100rpx;
		box-shadow: 0px 0px 19px 0px rgba(175, 175, 175, 0.68);
	}

	.share .wrapper {
		>.box {
			@include wh(180rpx, 180rpx);
			border-radius: 50%;
			overflow: hidden;
		}

	}

	.container {

		.pic {
			border-radius: 5rpx;
			overflow: hidden;
		}

		.info {
			flex-flow: column wrap;
			flex: 1;

			.size {
				color: #727272;
			}

			.price {
				align-items: center;

				>text {
					color: $theme;
				}
			}
		}
	}

	.bottom {
		.wrapper .item {
			&:not(:last-child) {

				margin-right: 20px;
			}

			.tag {
				background-color: #DD2727;
				@include wh(60rpx, 30rpx);
				border-radius: 60rpx;
				overflow: hidden;
				top: 0px;
				right: -10rpx;
				border: none;
			}

			view {
				@include wh(100rpx, 100rpx);
				border: 1px dashed #999;
				border-radius: 50%;
				overflow: hidden;

				image {
					border-radius: 50%;
					overflow: hidden;
				}
			}
		}
	}

	.time {
		width: 150rpx;
		transform: scale(0.8, 0.8);

		>view {
			width: 56rpx;
			height: 56rpx;
			background-color: #222222;
			border-radius: 4rpx;
			color: #fff;
			font-size: 36rpx;
		}

		text {
			line-height: 30rpx;
		}
	}
</style>
