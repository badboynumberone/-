
<template>
	<view class="main"  >
		<!-- 地址选择 -->
		<view class="address p10">
			<view class="wrapper pr">
				<Pic :src="`${baseImageUrl}/order_address_background@2x.png`" :width="'100%'" :height="'90px'"></Pic>
				<view class="content pa p10 pl15 frm" style="top: 0px;left: 0px;flex-flow: column wrap;" v-if="address.id" @click="navigateTo"
				 data-url="/pages/me/address_list/address_list">
					<view class="">
						<text :decode="true" class="wsnw fb fz17">{{address.name}} {{address.phoneNumber}}</text>
					</view>
					<view class="address_detail more-hidden fz12" style="width: 250px;">
						{{address.province+address.city+address.region+address.detailAddress}}
					</view>
				</view>
				<view class="content pa p10 ftm" style="top: 0px;left: 0px;" v-if="!address.id" @click="navigateTo" data-url="/pages/me/address_list/address_list">
					<view class="mt5 ml20" size="20px">
						<van-icon name="location-o" />
					</view><text class="fz14">请选择收货地址</text>
				</view>
				<view class="icon ct" style="right: 10px;">
					<van-icon name="arrow" />
				</view>
			</view>
		</view>
		<!-- 商品信息 -->
		<view class="container" v-for="(item,index) in orders" :key="index">
			<my-goods-card :isClick="false" :item="item"></my-goods-card>
			<van-cell title="配送方式" value="普通快递" />
			<van-field :value="item.note" label="备注" type="textarea" placeholder="请输入备注(50字以内)" autosize maxlength="50" @change="bindNote($event,index)" />
			<view class="pt10 pb10 pl15 pr15 f" style="justify-content: flex-end;align-items: center;background: #fff;">
				<text style="color: #222;">合计:</text>
				<text class="price fb fz20">￥{{itemTotalPrice(item.items)}}</text>
			</view>
		</view>

		<view class="compute mt10 pt10 pb10 pl15 pr15 " style="background: #fff;">
			<view class="one fsb"><text class="fz14">商品金额</text><text class="fz14">￥{{totalPrice/100}}</text></view>
			<view class="one fsb"><text>运费</text><text>￥{{freight}}</text></view>
		</view>

		<view style="height: 60px;background: #F1F1F1;"></view>

		<!-- 底部结算条 -->
		<view class="submit_bar pf" style="bottom:0px">
			<van-submit-bar :price="totalPrice+freight*100" :button-text="'提交订单'" @submit="onSub" :tip="true" />
		</view>


	</view>
</template>

<script>
	import MyGoodsCard from "../../../mycomponents/my-goods-card/my-goods-card.vue";
	import Pic from "../../../mycomponents/Pic/Pic.vue";
	import Api from "../../../utils/api.js";
	let lastPage = null;
	export default {
		components: {
			MyGoodsCard,
			Pic
		},
		data() {
			return {
				orderInfo:null,
				baseImageUrl:getApp().globalData.baseImageUrl,
				message: "",
				item:{},
				address: {
					id:0
				}, //地址
				orders: [{
					businessId: "",
					businessName: "",
					items: [{
						attrName: "",
						attrId: "",
						productPic: "",
						productName: "",
						price: "",
						quantity: ""
					}],
					note: ""
				}],
				freight: 0
			};
		},
		computed: {
			itemTotalPrice() {
				return function(orders = [{
					quantity: 0,
					price: 0
				}]) {
					return orders.reduce((all, next) => all += (next.quantity * next.price), 0)
				}
			},
			totalPrice() {
				let total = 0;
				if (this.orders.length) {
					const arr = this.$tools.deepFlatten(this.orders.map(item => item.items));
					total = arr.reduce((all, next) => all += (next.quantity * next.price), 0)
				}
				return total * 100;
			}
		},
		onLoad(options) {
			console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
			lastPage = getCurrentPages()[getCurrentPages().length - 2];
			//获取地址
			this.getAddress();
			this.$mp.page.hook = this.setAddress;
			//获取提交的商品
			this.getSubmitProducts(options);
		},
		onShow(){
			console.log("haha")
		},
		methods: {
			//绑定备注
			bindNote(e,index){
				console.log(e)
				this.$set(this.orders[index],"note",e.detail);
			},
			//获取提交的订单
			getSubmitProducts(options) {
				this.orders = JSON.parse(options.items);
				if (this.address!={}) {
					this.getOrderDetail();
				}
			},
			//获取订单详情
			async getOrderDetail() {
				let result = null;
				try{
					//通过购物车下单
					if (lastPage.route == 'pages/cart/cart/cart'&&JSON.stringify(this.address) != '{}') {
						let cartIds = this.$tools.deepFlatten(this.orders.map(item => item.items)).map(item => item.id).join(",");
						result = await this.$net.sendRequest("/order/getPrice", {
							addressId: this.address.id,
							cartIds
						});
						this.freight = result.freight;
					}
					// 单独下单
					if (lastPage.route == 'pages/index/product/product'&&JSON.stringify(this.address) != '{}') {
						result = await this.$net.sendRequest("/order/getPrice", {
							addressId: this.address.id,
							attrId: this.orders[0].items[0].attrId
						});
						this.freight = result.freight;
					}
				}catch(e){
					//TODO handle the exception
					console.log(e)
				}
				
				
				
				
				
			},
			//页面跳转
			navigateTo(e) {
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
			//获取地址
			getAddress() {
				this.address = this.$store.state.defaultAddress==undefined ? {}:this.$store.state.defaultAddress;
			},
			//设置地址
			setAddress(item) {
				this.address = item;
				this.getOrderDetail();
			},
			// 下单
			async generateOrder() {
				

				let result = null;
				//下单
				if (lastPage.route == 'pages/index/product/product') {
					result = await this.$net.sendRequest("/order/generateOrder", {
						addressId: this.address.id,
						appSource: 'weixin',
						attrId: this.orders[0].items[0].attrId,
						note: this.orders[0].note,
						quantity: this.orders[0].items[0].quantity
					});
				}

				if (lastPage.route == 'pages/cart/cart/cart') {
					let readyData = JSON.parse(JSON.stringify(this.orders));
					readyData = readyData.map(item => {
						item.cartIds = item.items.map(single => single.id);
						delete item.businessName;
						delete item.items;
						delete item.ischecked;
						delete item.businessFreight;
						return item;
					})
					result = await this.$net.sendRequest("/order/generateOrder", {
						addressId: this.address.id,
						appSource: 'weixin',
						infos: readyData
					});
				}
				return result
			},

			//提交订单
			async onSub() {
				
				
				//检验表单
				if (!this.checkForm()) {
					return
				}
				// 如果正在下单停止下单
				
				wx.showLoading({mask:true});
				if(!this.orderInfo){
					//生成订单
					this.orderInfo = await this.generateOrder();
				}
				const result = this.orderInfo;

				

				// 支付
				const res = await this.$net.sendRequest("/pay/miniAppPay", {
					orderNo: result.orderNo
				});
				console.log('支付接口信息', res);
				wx.hideLoading();
				//调用支付接口
				uni.requestPayment({
					timeStamp: res.timeStamp,
					nonceStr: res.nonceStr,
					package: res.package,
					signType: 'MD5',
					paySign: res.paySign,
					success: async (res) => {
						wx.showLoading({mask:true});
						let type = lastPage.route == 'pages/index/product/product' ? 'product' : 'cart';
						this.$store.dispatch("getCart");
						//获取需要添加限制的数据
						const addData = this.$tools.deepFlatten(this.orders.map(item => item.items)).filter(item=>item.xiangou>0)
						await Api.addLimit(addData);
						wx.hideLoading();
						this.$tools.redirectTo("/pages/cart/pay_success/pay_success?type="+type+"&orderNo=" + result.orderNo + '&price=' +
								(this.totalPrice / 100 + this.freight));
						
					},
					fail: (res) => {
						wx.showLoading({mask:true});
						if (lastPage.route == 'pages/index/product/product') {
							this.$tools.redirectTo(`/pages/me/order_detail/order_detail?orderNo=${result.orderNo}`)
						}

						if (lastPage.route == 'pages/cart/cart/cart') {
							this.$store.dispatch("getCart");
							this.$tools.redirectTo(`/pages/me/order/order?active=0`)
						}
						wx.hideLoading();
					}
				})
				
			},
			//检验表单
			checkForm() {
				if (JSON.stringify(this.address) == '{}') {
					this.$tools.Toast("请选择收货地址!");
					return false;
				}
				return true;
			},
			//获取数据
			getData() {

			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';

	.main {
		background: #f1f1f1;

		.address {
			.wrapper {
				border-radius: 5px;
				overflow: hidden;

				.content {
					@include wh(100%, 80px);
				}
			}
		}

		.container {
			border-bottom: 5px solid #f1f1f1;

			.price {
				color: $theme;
			}
		}

		.compute .one {
			line-height: 26px;
		}
	}
</style>
