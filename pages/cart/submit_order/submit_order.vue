<template>
	<view class="main">
		<!-- 地址选择 -->
		<view class="address p10">
			<view class="wrapper pr">
				<Pic :src="'/static/images/order_address_background@2x.png'" :width="'100%'" :height="'90px'"></Pic>
				<view class="content pa p10 pl15 frm" style="top: 0px;left: 0px;flex-flow: column wrap;" v-if="address.id" @click="navigateTo" data-url="/pages/me/address_list/address_list" >
					<view class="">
						<text :decode="true" class="wsnw fb fz17">{{address.name}} {{address.phoneNumber}}</text>
					</view>
					<view class="address_detail more-hidden fz12" style="width: 250px;">
						{{address.province+address.city+address.region+address.detailAddress}}
					</view>
				</view>
				<view class="content pa p10 ftm" style="top: 0px;left: 0px;" v-if="!address.id" @click="navigateTo" data-url="pages/me/address_list/address_list">
					<view class="mt5 ml20" size="20px"><van-icon name="location-o" /></view><text class="fz14">请选择收货地址</text>
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
			<van-field :value="message" label="备注" type="textarea" placeholder="请输入备注(50字以内)" autosize maxlength="50" />
			<view class="pt10 pb10 pl15 pr15 f" style="justify-content: flex-end;align-items: center;background: #fff;">
				<text style="color: #222;">合计:</text>
				<text class="price fb fz20">￥{{itemTotalPrice(item.items)}}</text>
			</view>
		</view>
		
		
		<view style="height: 60rpx;background: #F1F1F1;"></view>
		
		<!-- 底部结算条 -->
		<view class="submit_bar pf" style="bottom:0px">
			<van-submit-bar :price="totalPrice" :button-text="'提交订单'" @submit="onSub" :tip="true"/>
		</view>
		
		
	</view>
</template>

<script>
	import MyGoodsCard from "../../../mycomponents/my-goods-card/my-goods-card.vue";
	import Pic from "../../../mycomponents/Pic/Pic.vue";
	export default {
		components: {
			MyGoodsCard,Pic
		},
		data() {
			return {
				message:"",
				address:{},//地址
				orders:[
					{
						businessId:"",
						businessName:"",
						items:[
							{	
								attrName:"",
								attrId:"",
								productPic:"",
								productName:"",
								price:"",
								quantity:""
							}
						],
						note:""
					}
				]
			};
		},
		computed:{
			itemTotalPrice(){
				return function(orders=[{quantity:0,price:0}]){
					return orders.reduce((all,next)=>all+=(next.quantity*next.price),0)
				}
			},
			totalPrice(){
				let total = 0;
				if(this.orders.length){
					const arr = this.$tools.deepFlatten(this.orders.map(item=>item.items));
					total = arr.reduce((all,next)=>all+=(next.quantity*next.price),0)
				}
				return total*100;
			}
		},
		onLoad(options) {
			console.log(getCurrentPages()[getCurrentPages().length-1].route,options)
			//获取地址
			this.getAddress();
			this.$mp.page.hook = this.setAddress;
			//获取提交的商品
			this.getSubmitProducts(options);
		},
		methods:{
			getSubmitProducts(options){
				this.orders = JSON.parse(options.items);
			},
			//页面跳转
			navigateTo(e) {
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
			//获取地址
			getAddress(){
				this.address = 	this.$store.state.defaultAddress;
			},
			setAddress(item){
				this.address = item;
			},
			//提交订单
			async onSub(){
				//检验表单
				if(!this.checkForm()){
					return
				}
				//下单
				const result = await this.$net.sendRequest("/order/generateOrder",{
					addressId:this.address.id,
					appSource:'weixin',
					attrId:this.orders[0].items[0].attrId,
					note:this.orders[0].note,
					quantity:this.orders[0].items[0].quantity
				});
				// 支付
				const res = await this.$net.sendRequest("/order/miniAppPay",result);
				console.log(res);
			},
			//检验表单
			checkForm(){
				if(!this.address.id){
					this.$tools.Toast("请选择收货地址!");
					return false;
				}
				return true;
			},
			//获取数据
			getData(){
				
			},
		}
	}
</script>

<style lang="scss">
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
		.container{
			border-bottom: 5px solid #f1f1f1;
			.price{
				color: $theme;
			}
		}
	}
</style>
