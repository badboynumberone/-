<template>
	<view class="main">
		<!-- 头部 -->
		<div class="top f p20 pr" @click="navigateTo" :data-url="'/pages/me/wxlogin/wxlogin'">
			<!-- <button v-if="!isLogin" class="fill pa" style="top: 0px;left: 0px;opacity: 0;z-index: 99;" open-type="getUserInfo"
			 @getuserinfo="getUserInfo"></button> -->

			<div class="left mr20">
				<Pic :height="'100%'" :width="'100%'" :mode="'aspectFill'" :round="true"></Pic>
			</div>

			<div class="right fsr">
				<block v-if="false">
					<view class="fb fz18">
						User
					</view>
					<view class="fz14" style="margin-top: -20px;">
						136****0335
					</view>
				</block>
				<block v-else>
					<view class="fb fz18">
						用户登录
					</view>
				</block>
			</div>
		</div>
		<!-- 购物流程 -->
		<div class="body p20">
			<div class="wrapper pl20 pr20">
				<view class="title fsb pt10">
					<text class="fz19 fb">我的订单</text>
					<text class="fz12" style="color:#ccc">查看全部&gt;</text>
				</view>
				<view class="box pt10 pb10">
					<uni-grid :column="5" :show-border="false" :square="false">
						<uni-grid-item v-for="(item,index) in keys" :key="index">
							<view class="pic_item pr"  @click="navigateTo" :data-url="'/pages/me/order/order'">
								<Pic :src="item.src" :height="'45px'" :width="'45px'" :mode="'aspectFill'" :back="'#fff'"></Pic>
								<view v-if="item.num" class="pa num">{{item.num}}</view>
							</view>
							<text class="text fz12" style="color: #222;">{{item.text}}</text>
						</uni-grid-item>
					</uni-grid>
				</view>
			</div>
		</div>

		<!-- 底部菜单栏 -->
		<div class="bottom">
			<van-cell-group>
				<van-cell icon="location-o" title="收货地址管理" is-link @click="navigateTo" data-url="/pages/me/address_list/address_list" />
			</van-cell-group>

		</div>
		<!-- 版权所有 -->
		<div class="copyright">
			@copyright 2019 All Rights Reserverd
		</div>
	</view>
</template>

<script>
	import uniGrid from "../../../mycomponents/uni-grid/uni-grid.vue"
	import uniGridItem from "../../../mycomponents/uni-grid-item/uni-grid-item.vue"
	let pages = null;
	let pageNum = 0;
	export default {
		components: {
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				keys: [{
						text: "待付款",
						url: "",
						src: "/static/images/Pending-payment@2x.png",
						num: 1
					},
					{
						text: "待发货",
						url: "",
						src: "/static/images/shipped@2x.png",
						num: 0
					},
					{
						text: "待收货",
						url: "",
						src: "/static/images/Goods-to-be-received@2x.png",
						num: 0
					},
					{
						text: "已完成",
						url: "",
						src: "/static/images/complete@2x.png",
						num: 0
					},
					{
						text: "退货退款",
						url: "",
						src: "/static/images/refund@2x.png",
						num: 0
					}
				],
				
				
			}
		},
		computed: {
			isLogin() {
				return this.$store.state.hasLogin
			}
		},
		methods: {
			refresh() {
				const lastpages = pages[pages.length - 2];
				lastpages.hook(true);
				
			},
			//获取用户信息
			getUserInfo() {

			},
			//页面跳转
			navigateTo(e) {
				console.log(e)
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';

	.top {
		background: url("data:image/png;base64,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") no-repeat center/cover;

		.left {
			@include borderRadius(90px);
			border: 1px solid #fff;
			box-shadow: 0px 0px 5px 2px #E8E8E8;
		}

		.right {
			flex-flow: column wrap;
		}
	}

	.body {
		.wrapper {
			box-shadow: 0px 0px 5px 2px #E8E8E8;
			background: #fff;
			border-radius: 10px;
			overflow: hidden;

			.title {

				align-items: center;
			}
		}

		.box {
			.pic_item {
				.num {
					padding: 0px 8px;
					background: red;
					@include sc(12px, #fff);
					border-radius: 20px;
					top: -10px;
					right: -10px;
				}
			}
		}
	}

	.copyright {
		width: 100%;
		line-height: 100rpx;
		background: #ffff;
		@include sc(11px, #666);
		text-align: center;
	}
</style>
