<template>
	<view class="main bgf1 pt10">
		<view class="wrapper bgf1">
			<!-- 商品详情 -->
			<view class="container f p10  mb10 bgfff" @click="navigateTo" :data-url="'/pages/index/product/product?id='+single.id">
				<view class="pic pr">
					<Pic :src="pageData.pic" :height="'90px'" :width="'90px'" :mode="'aspectFill'"></Pic>
				</view>
				<view class="info fsr ml10">
					<text class="text-hidden" style="width: 230px;">{{pageData.attrName}}</text>
					<text class="text-hidden fz10 size" :decode="true" style="width: 220px;margin-top: -5px;">{{pageData.productName}}</text>
					<view class="price fz16  fsb">
						<text>￥{{pageData.price}}</text>
						<view class="fz12" style="color: #727272;">
							x{{pageData.payNum}}
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
								<text class="fz12 c222">拼团规则：<text class="theme">{{pageData.groupPeople}}</text>人成团，人数不足自动退款</text>
							</view>
						</van-cell>
					</view>

				</view>
				<view class="bottom p10 fm" style="flex-flow: column wrap;">
					<view v-if="groupStatus==2">
						<view class="lefttext fz15 fb" style="text-align: center;">
							拼团剩余时间
						</view>
						<view class="time fsb mt5" style="align-items: center;width: 250rpx;">
							<view class="hour fm">{{hour}}</view>
							<text>:</text>
							<view class="minute fm">{{minute}}</view>
							<text>:</text>
							<view class="second fm">{{second}}</view>
						</view>
					</view>
					<view v-if="groupStatus==1">
						<view class="lefttext fz15 fb">
							拼团成功
						</view>
					</view>
					<view v-if="groupStatus==0">
						<view class="lefttext fz15 fb">
							拼团失败
						</view>
					</view>
					<view class="wrapper frm mb10 mt10 w100" style="flex-flow: row wrap;">
						<view class="item pr mb5" v-for="(item,index) in users" :key="index">
							<view class="tag fm pa fz10 cfff" v-if="index==0">
								团长
							</view>
							<!-- <view class="single fm fz23 c999">
								?
							</view> -->
							<view class="header" style="border: none;">
								<image class="fill" :src="item.icon" mode="aspectFill"></image>
							</view>
						</view>
						<view class="item" v-for="(item,index) in pageData.groupPeople-users.length" :key="index">
							<view class="single fm fz23 c999">
								?
							</view>
						</view>
					</view>

					<view class="fz16" v-if="groupStatus==2">
						还差 <text class="theme">{{pageData.diff}}</text>人，即可拼团成功！
					</view>
					<view class="c999 fz13 mb10" v-if="groupStatus==2">
						分享到群里，成团成功率翻倍
					</view>

					<view class="w100" @click="showPopup" v-if="isInGroup&&groupStatus==2">
						<van-button block round type="primary" plain>邀请好友参团</van-button>
					</view>
					<view class="w100" v-if="!isInGroup&&groupStatus==2" @click="navigateTo" :data-url="`/pages/index/product/product?id=${pageData.productId}&groupId=${pageData.parentGroupSuccessId}`">
						<van-button block round type="primary" plain>立即参团</van-button>
					</view>

					<view class="w100 mt10">
						<van-button block round color="linear-gradient(142deg,rgba(26,174,104,1) 0%,rgba(124,206,89,1) 100%)" v-if="!isInGroup"
						 @click="toIndex">去首页逛逛</van-button>
					</view>
				</view>
			</view>
			<!-- 猜你喜欢 -->
			<view class="more_group">
				<view class="fm pr">
					<image class="small mr5" :src="`${baseImageUrl}/title_bg@2x.png`" mode="aspectFill" style="width: 320rpx;height: 100rpx;"></image>
					<text class="center fb">猜你喜欢</text>
				</view>
				<MyList :list="likes"></MyList>
				<load-more :tip="'到底了'" :loading="false" />
			</view>
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

			<!-- 弹出图片 -->
			<van-action-sheet class="masking" :show="isShow" :actions="actions" @select="selectItem">
				<view class="pr" style="height: 0px;">
					<view class="cl container bgfff">
						<image class="fill" :src="shareImageUrl" mode="scaleToFill"></image>
					</view>
				</view>
			</van-action-sheet>
			<!-- 绘制图片 -->
			<canvas canvas-id="myCanvas" style="width: 500rpx;height: 786rpx;background-color: #fff;position: fixed;z-index: -1;opacity: 0;"></canvas>
		</view>
		<Layer :isLoaded="isLoaded" class="fill"></Layer>
	</view>
</template>

<script>
	let opt = null,
		pages = null,
		timer = null;
	import CanvasKit from '../../../utils/CanvasKit.js';
	let canvasUtil = null;
	import MyList from "../../../mycomponents/my-list/my-list.vue";
	export default {
		components: {
			MyList
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
				isShow: false,
				pageData: {},
				users: [],
				shareImageUrl: '',
				isInGroup: false,
				likes: [], //猜你喜欢
				isLoaded: false
			};
		},
		computed: {
			userinfo() {
				return this.$store.state.userinfo
			},
			//拼团状态
			groupStatus() { //0拼团失败,1拼团成功2.正在拼团
				if (this.pageData.time == undefined) {
					return 0
				}
				if (this.pageData.time < 0 && this.users.length < this.pageData.groupPeople) {
					return 0
				}
				if (this.users.length > this.pageData.groupPeople) {
					return 1
				}
				if (this.users.length < this.pageData.groupPeople && this.pageData.time > 0) {
					return 2
				}
			},


		},
		async onLoad(options) {
			//创建canvas
			canvasUtil = new CanvasKit('myCanvas');

			//页面信息答应
			this.setPage(options);
			//处理小程序分享进口页面
			this.handleShareScene();
			//获取团详情
			await this.getGroupInfo();
			//获取团成员
			await this.getGroupMember();
			//更新时间
			this.updateTime();
			//获取用户是否参团
			this.isInGroup = this.users.map(item => item.userId).includes(this.userinfo.id)
			//获取猜你喜欢的商品
			await this.getYouLike();
			//结束加载
			this.isLoaded = true;
		},
		onUnload() {
			clearInterval(timer)
		},
		onShareAppMessage: function() {
			return {
				title: this.userinfo.wxName + '向您分享了一个购物团,赶紧来加入吧!',
				imageUrl:this.pageData.pic,
				path: '/pages/index/grouping_detail/grouping_detail?id=' + this.pageData.parentGroupSuccessId,
				success: function(res) {}
			}
		},
		methods: {
			handleShareScene() {
				console.log(this)
				const scene = opt.scene;
				(scene != undefined) && (opt.id = scene.split("=")[1]);
			},
			setPage(options) {
				console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
				opt = options;
				pages = getCurrentPages();
			},
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index/index"
				})
			},
			// 绘制图片
			async drawImage() {
				//获取二维码
				let result = await this.getRcode();
				//下载图片
				const headerUrl = await this.$tools.downLoadFile(this.userinfo.wxPic);
				const productUrl = await this.$tools.downLoadFile(this.pageData.pic);
				const qrCodeUrl = await this.$tools.downLoadFile(result);
				const tagUrl = await this.$tools.downLoadFile("https://mall-wechat.oss-cn-beijing.aliyuncs.com/group_tag.png");
				canvasUtil.drawCircleImage({
						x: 35,
						y: 35,
						r: 25,
						url: headerUrl
					}).drawText({
						x: 70,
						y: 35,
						color: '#333333',
						size: 14,
						text: '快来，拼团拿走超值商品！',
						bold: false
					}).drawImg({
						x: 10,
						y: 60,
						w: 232,
						h: 232,
						url: productUrl
					}).drawWrapText({
						t: this.pageData.attrName.slice(1, 20),
						c: '#333',
						s: 12,
						x: 10,
						y: 290,
						w: 120
					}).drawImg({
						x: 182,
						y: 300,
						w: 55,
						h: 55,
						url: qrCodeUrl
					}).drawText({
						x: 175,
						y: 365,
						color: '#999999',
						size: 10,
						text: '长按识别二维码',
						bold: false
					}).drawText({
						x: 188,
						y: 380,
						color: '#999999',
						size: 10,
						text: '立即参团',
						bold: false
					}).drawText({
						x: 10,
						y: 355,
						color: '#1AAE68',
						size: 14,
						text: '￥39.8',
						bold: true
					}).drawImg({
						x: 10,
						y: 370,
						w: 45,
						h: 15,
						url: tagUrl
					})
					.draw();
				// canvasUtil.exportImg();
			},
			//获取二维码
			async getRcode() {
				let result = await this.$net.sendRequest("/group/creatQrCode", {
					page: "pages/index/product/product", //测试使用
					//page: "pages/index/grouping_detail/grouping_detail",//正式使用
					successGroupId: this.pageData.parentGroupSuccessId
				});
				return result
				console.log("二维码地址:" + result)
			},
			//获取猜你喜欢的商品
			async getYouLike() {
				const result = await this.$net.sendRequest("/home/guessLike", {
					recommandStatus: 1,
					pageNum: 1,
					pageSize: 100,
				}, "GET");
				const arr = this.$tools.deepFlatten(result.filter(item => !item.deleteStatus).map(item => {
					return item.products
				}))
				this.likes = this.$tools.shuffle(arr).slice(10);
			},
			//获取团详情
			async getGroupInfo() {
				this.pageData = await this.$net.sendRequest("/group/findUserGroupDetail", {
					id: opt.id
				}, "GET");
			},
			// 获取团成员
			async getGroupMember() {
				this.users = await this.$net.sendRequest("/group/findGroupUserList", {
					parentGroupSuccessId: opt.id
				}, "GET");
			},
			//更新时间
			updateTime() {
				const addZero = this.$tools.addZero;
				timer = setInterval(() => {
					this.$set(this.pageData, 'time', this.pageData.time - 1000);
					const seconds = Math.floor(this.pageData.time / 1000);
					[this.hour, this.minute, this.second] = [addZero(Math.floor(seconds / 3600)), addZero(Math.floor((seconds %
								3600) /
							60)),
						addZero(seconds % 60)
					];
				}, 1000)
			},
			//生成海报
			genratePoster() {
				this.isMask = false;
				uni.showLoading({
					title: '',
					mask: false,
					success: async () => {
						await this.drawImage();
						await this.$tools.sleep(1000);
						wx.canvasToTempFilePath({
							canvasId: "myCanvas",
							success: (res) => {
								console.log(res.tempFilePath)
								this.shareImageUrl = res.tempFilePath;
							}
						})
						this.isShow = true;
						uni.hideLoading();
					}
				});
			},
			//选择项
			selectItem(e) {
				const name = e.detail.name;
				if (name == '保存图片') {
					//保存图片操作
					uni.saveFile({
						tempFilePath: this.shareImageUrl,
						success: () => {
							this.$tools.Toast("保存成功")
						}
					})
				}
				this.isShow = false
				console.log(e.detail)
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
			&:nth-child(5n) {
				margin-right: 0px !important;
			}

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
