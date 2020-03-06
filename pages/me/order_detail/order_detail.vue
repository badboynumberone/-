<template>
	<view class="main"  >
		<view class="header">
			<view class="top pr">
				<Pic :src="`${baseImageUrl}/order-background@2x.png`" :height="'100%'" :width="'100%'" :mode="'aspectFill'"></Pic>
				<view class="pa box fill fsr p20">
					<view class="fz18 fb" style="color: #fff;">{{pageData.state}}</view>
					<view style="color: #fff;">订单号：{{pageData.orderNoString}}</view>
				</view>
			</view>
			<view class="bottom ftm pl10 pr10 ">
				<Pic :src="`${baseImageUrl}/order-address@2x.png`" :height="'45rpx'" :width="'37rpx'" :mode="'scaleToFill'" :back="'#fff'"></Pic>
				<view class="box fsr">
					<text class="fz16 fb" :decode="true">{{pageData.receiverName}} {{pageData.receiverPhone}}</text>
					<view class="more-hidden" style="width: 310px;line-height: 17px;">{{pageData.address}}</view>
				</view>
			</view>
		</view>
		<view class="body">
			<my-goods-card :item="pageData" :isClick="true"></my-goods-card>
			<view class="pt10 pb10 pl15 pr15" style="text-align: right;">
				<text class="fz14" style="color: #333;">商品总金额:</text>
				<text class="fz16 fb theme">¥{{pageData.totalAmount}}</text>
			</view>
			<van-field :value="'微信支付'" readonly label="支付方式" input-align="right" />
			<van-field :value="'普通快递'" readonly label="配送方式" input-align="right" />
			<van-field :value="'￥'+pageData.freightAmount || '￥'+0.00 " readonly label="运费" input-align="right" />
			<van-field type="textarea" readonly label="订单备注" input-align="left">
				<view slot="right-icon" style="width: 250px;height: 50px;text-align: left;">
					{{pageData.note || '空空如也~'}}
				</view>
			</van-field>
			<view class="pt10 pb10 pl15 pr15" style="text-align: right;">
				<text class="fz16 theme">合计:</text>
				<text class="fz20 fb theme">¥{{pageData.totalAmount}}</text>
			</view>
		</view>
		<view style="height: 46px;"></view>

		<view class="bottom_bar p10 f pf">
			<view class="ml10" v-if="pageData.status==0" @click="cancelOrder">
				<van-tag :color="'#666'" plain round size="medium">取消订单</van-tag>
			</view>
			<view class="ml10" v-if="pageData.status==0" @click="comfirmPay">
				<van-tag :color="'#38A472'" plain round size="medium">立即支付</van-tag>
			</view>
			<view class="ml10" v-if="pageData.status==1" @click="applyRefund('refund_money')">
				<van-tag :color="'#666'" plain round size="medium">申请退款</van-tag>
			</view>
			<view class="ml10" v-if="pageData.status==2" @click="applyRefund('refund_money_goods')">
				<van-tag :color="'#666'" plain round size="medium">申请退货退款</van-tag>
			</view>
			<view class="ml10" v-if="pageData.status==2 || pageData.status==3" @click="toLogisics">
				<van-tag :color="'#38A472'" plain round size="medium">查看物流</van-tag>
			</view>
			<view class="ml10" v-if="pageData.status==2" @click="comfirmReceipt">
				<van-tag :color="'#38A472'" plain round size="medium">确认收货</van-tag>
			</view>
			<view class="ml10" v-if="pageData.status==3 || pageData.status==4" @click="delOrder">
				<van-tag :color="'#666'" plain round size="medium">删除订单</van-tag>
			</view>
		</view>
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import MyGoodsCard from "../../../mycomponents/my-goods-card/my-goods-card.vue";
	import Dialog from "../../../wxcomponents/vant/dialog/dialog.js";
	import Api from "../../../utils/api.js";
	let pages = null;
	export default {
		components: {
			MyGoodsCard
		},
		data() {
			return {
				baseImageUrl:getApp().globalData.baseImageUrl,
				isLoaded: false,
				pageData: {}, //页面数据
			};
		},
		async onLoad(options) {
			console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
			pages = getCurrentPages();
			//获取地址
			await this.getOrderDetail(options.orderNo);
			this.isLoaded = true;
		},
		methods: {
			//删除订单
			delOrder(){
				Dialog.confirm({
				  title: '提示',
				  message: '您确认需要删除该订单吗?'
				}).then(async () => {
					wx.showLoading();
					await this.$net.sendRequest("/order/delete",{orderIds:this.pageData.orderNoString});
					try{
						pages[pages.length-2].hook();
					}catch(e){
						//TODO handle the exception
					}
					
					this.$tools.Toast("删除成功");
					wx.hideLoading();
					let timer = setTimeout(()=>{uni.navigateBack();clearTimeout(timer)},500);
				  // on confirm
				}).catch(() => {
				  // on cancel
				});
			},
			//去查看物流
			toLogisics(){
				let pageData = JSON.parse(JSON.stringify(this.pageData));
				delete pageData.receiverName;
				delete pageData.receiverDetailAddress;
				delete pageData.address;
				this.$tools.navigateTo("/pages/me/logistics/logistics?item="+JSON.stringify(pageData));
			},
			//获取订单详情
			async getOrderDetail(orderNo) {
				const result = await this.$net.sendRequest("/order/info", {
					orderNo
				});
				this.pageData = this.mapResult(result);
			},
			//处理结果
			mapResult(res) {
				const arr = ['待付款', '待发货', '待收货', '交易成功', '交易关闭','','退款','退款退货'];
				res.state = arr[res.status], res.address = res.receiverProvince + res.receiverCity + res.receiverRegion + res.receiverDetailAddress;
				res.items = res.orderItemList;
				// 更改producId为 id-----------------------------------------------------
				res.items = res.items.map(item=>{item.id=item.productId;return item})
				delete res.orderItemList;
				return res;
			},
			//确认收货
			comfirmReceipt(){
				Dialog.confirm({
				  title: '提示',
				  message: '您确认收到货了吗?'
				}).then(async () => {
					await this.$net.sendRequest("/order/receive",{orderNo:this.pageData.orderNoString});
					await this.$tools.Toast("收货成功","success",500);
					let timer = setTimeout(()=>{uni.navigateBack();clearTimeout(timer)},500);
					try{
						pages[pages.length-2].hook();
					}catch(e){
						//TODO handle the exception
					}
					
				  // on confirm
				}).catch(() => {
				  // on cancel
				});
			},
			// 立即支付
			async comfirmPay() {
				//限制购买
				const islimit = await Api.isLimitBuy(this.pageData.items.map(item=>item.id));
				if(!islimit){
					return;
				}
				
				const res = await this.$net.sendRequest("/pay/miniAppPay", {
					orderNo: this.pageData.orderNoString
				});
				console.log('支付接口信息', res);
				//调用支付接口
				uni.requestPayment({
					timeStamp: res.timeStamp,
					nonceStr: res.nonceStr,
					package: res.package,
					signType: 'MD5',
					paySign: res.paySign,
					success: async (res) => {
						this.$tools.Toast("支付成功", "success");
						//获取需要添加限制的数据
						const addData = this.pageData.items.filter(i=>i.xiangou>0)
						await Api.addLimit(addData);
						try{
							pages[pages.length-2].hook();
						}catch(e){
							//TODO handle the exception
						}
						let timer = setTimeout(() => {
							wx.navigateBack();
							clearTimeout(timer)
						}, 1000);
					},
					fail: (res) => {

					}
				})
			},
			//取消订单
			cancelOrder() {
				Dialog.confirm({
				  title: '标题',
				  message: '您确认需要取消该订单吗?'
				}).then(async () => {
					await this.$net.sendRequest("/order/cancelOrder",{orderId:this.pageData.orderNo+""});
					this.$tools.Toast("取消成功","success");
					try{
						getCurrentPages()[getCurrentPages().length-2].hook();
					}catch(e){
						//TODO handle the exception
					}
					wx.navigateBack();
				  // on confirm
				}).catch(() => {
				  // on cancel
				});
			},
			//申请退款
			applyRefund(name) {
				let pageData = JSON.parse(JSON.stringify(this.pageData));
				delete pageData.receiverName;
				delete pageData.receiverDetailAddress;
				delete pageData.address;
				this.$tools.navigateTo("/pages/me/refund_apply/refund_apply?type="+name+"&pageData=" + JSON.stringify(pageData))
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';

	.header {
		border-bottom: 5px solid #f1f1f1;

		.top {
			@include wh(100%, 200rpx);

			.box {
				top: 0rpx;
				left: 0rpx;
				flex-flow: column wrap;
			}
		}

		.bottom {
			@include wh(100%, 160rpx);

			.box {
				margin-left: 20px;
				flex: 1;
				flex-flow: column wrap;
			}
		}
	}

	.bottom_bar {
		justify-content: flex-end;
		bottom: 0rpx;
		left: 0px;
		width: 100%;
		background: #fff;
		z-index: 9;
		border-top: 1rpx solid #f1f1f1;
		overflow: hidden;
	}
</style>
