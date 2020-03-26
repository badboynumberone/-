<template>
	<view class="main bgf1">
		<view class="bgf1">
			<image class="w100" :src="`${baseImageUrl}/banner-group@2x.png`" mode="widthFix"></image>
			<view class="wrapper p10 pr" style="top: -210rpx;">
				<view class="item ftm p10 bgfff pr mt15" v-for="(item,index) in list" v-key="index" @click="navigateTo($event,item)"
				 :data-url="'/pages/index/product/product?id='+item.productId">
					<view class="pr">
						<Pic :src="item.pic" :height="'170rpx'" :width="'170rpx'" :mode="'aspectFit'" :back="'#f1f1f1'" />

						<image v-if="item.productStock<=0" class="center" :src="`${baseImageUrl}/spike_sellout@2x.png`" mode="scaleToFill"
						 style="width: 120rpx;height: 120rpx;"></image>
					</view>

					<view class="content ml10 f1">
						<view class="title fz15 fb more-hidden" style="line-height: 46rpx;">
							{{item.name}}
						</view>
						<view class="progress fsb w100 pt5 pb5" style="align-items: center;">
							<view class="line fz11 theme pl5 pr5">
								{{item.time}}
							</view>
							<view class="text ml10 c666 fz12">{{item.groupPeople}}人团</view>
						</view>
						<view class="price">
							<text class="now fz19 fb">¥30.00</text>
							<text class="old fz13">¥20.00</text>
						</view>
					</view>

					<view class="button pa">
						<view class="go ftm cfff" v-if="item.status==2">去开团
							<van-icon name="arrow" style="margin-top: 7.9rpx;" />
						</view>
						<view class="go ftm cfff" v-if="item.status==0">已结束
							<van-icon name="arrow" style="margin-top: 7.9rpx;" />
						</view>
					</view>
				</view>
				<!-- 加载更多 -->
				<load-more :tip="'到底了'" :loading="list.length" />
			</view>
		</view>
		<Layer :isLoaded="isLoaded" class="fill"></Layer>
	</view>
</template>

<script>
	let opt = null,
		pages = null,
		timer = null;
	import Api from "../../../utils/api.js"
	export default {
		components: {},
		data() {
			return {
				baseImageUrl: getApp().globalData.baseImageUrl,
				list: [],
				isLoaded:false
			};
		},
		computed: {

		},
		onLoad(options) {
			//页面信息答应
			this.setPage(options);
			//获取拼团商品信息
			this.getGroupingData();
		},
		onUnload() {
			clearInterval(timer);
		},
		methods: {
			setPage(options) {
				console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
				opt = options;
				pages = getCurrentPages();
			},

			//页面跳转
			navigateTo(e) {
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
			//获取拼团商品信息
			async getGroupingData() {
				const result = await this.$net.sendRequest("/group/pageList", {}, "GET");
				this.list = result;this.starttimer();this.isLoaded=true
			},
			//开启监听器
			starttimer() {
				timer = setInterval(() => {
					this.list.forEach((item, index) => {
						Api.timelistener(
							"",
							item.endTime.replace(/-/g, "/"),
							() => { //活动未开始
								this.$set(this.list[index], 'status', 1)
							},
							(seconds) => { //活动正在进行中
								this.$set(this.list[index], 'status', 2)
								const addZero = this.$tools.addZero;
								seconds = Math.floor(seconds / 1000);
								const time = "剩余" + Math.floor(seconds / (3600 * 24)) + "天" + addZero(Math.floor((seconds%(3600 * 24)) / 3600)) + ":" +
									addZero(Math.floor((seconds % 3600) / 60)) + ":" + addZero(seconds % 60);
								this.$set(this.list[index], 'time', time)
							},
							() => { //活动已经结束
								this.$set(this.list[index], 'status', 0)
							}
						)
					})
				}, 1000)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		border-radius: 18rpx;
		overflow: hidden;
		min-height: 210rpx;

		.progress {
			.line {
				border: 1px solid $theme;
				border-radius: 20px;
				line-height: 30rpx;
				overflow: hidden;
			}
		}




		.limit_count {
			color: #33BAC5;
		}

		.limit_time {
			color: #23B166;
		}

		.price {
			.now {
				color: #1AAE68;
			}

			.old {
				color: #C2C2C2;
				text-decoration: line-through;
				margin-left: 15rpx;
			}
		}

		.button {
			bottom: 20rpx;
			right: 20rpx;

			>view {
				padding: 0rpx 20rpx;
				border-radius: 26px;
				overflow: hidden;
			}

			.go {
				background: linear-gradient(101deg, rgba(26, 174, 104, 1) 0%, rgba(136, 207, 118, 1) 100%);
				box-shadow: 1px 8px 18px 0px rgba(125, 203, 117, 0.48);
			}

			.out {
				background: #C9C9C9;
			}

			.ready {
				background: #59C08F;
			}
		}
	}
</style>
