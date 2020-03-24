<template>
	<view class="main"  >
		<!-- 状态栏 -->
		<view class="header">
			<van-tabs :active="active" @change="onTabChange" :line-width="'20'">
				<van-tab name="all" title="全部" />
				<van-tab name="waitpay" title="待付款" />
				<van-tab name="waitgroup" title="待成团" />
				<van-tab name="waitsend" title="待发货" />
				<van-tab name="waitaccept" title="待收货" />
				<van-tab name="finish" title="交易成功" />
				<van-tab name="dealclose" title="交易关闭" />
			</van-tabs>
		</view>
		<view style="height: 39px;"></view>
		
		<!-- 内容 -->
		<scroll-view scroll-y class="container" v-if="isLoaded&&pageData[loadIndex].list.length">
			<view class="item" v-for="(item,index) in pageData[loadIndex].list" :key="index" :item="item">
				<view @click="navigateTo" :data-url="`/pages/me/order_detail/order_detail?orderNo=${item.orderNoString}`">
					<my-goods-card :item="item" :isShow="true"></my-goods-card>
				</view>
				<view class="pay pl5 pr5 fsb" style="align-items: center;">
					<text>剩余拼团时间: <text class="theme">{{item.time}}</text></text>
					
					(不含运费)商品总价:<text class="theme fz16 fb">￥{{item.total}}</text>
				</view>
				<view class="action f p5">
					<view class="ml5" v-if="item.status=='待付款'" @click="cancelOrder(item)">
						<van-tag plain round size="medium">取消订单</van-tag>
					</view>
					<view class="ml5" v-if="item.status=='待付款'" @click="comfirmPayOrder" :data-item="item">
						<van-tag type="success" plain round size="medium" :color="'#38A472'">立即支付</van-tag>
					</view>
					<view class="ml5" v-if="item.status=='交易关闭' || item.status=='交易成功'" @click="deleteOrder" :data-item="item">
						<van-tag plain round size="medium">删除订单</van-tag>
					</view>
					<view class="ml5" v-if="item.status=='待收货' || item.status=='交易成功'" @click="toLogisics" :data-item="item" >
						<van-tag plain round size="medium" :color="'#38A472'">查看物流</van-tag>
					</view>
					<view class="ml5" v-if="item.status=='待收货'" @click="comfirmReceipt" :data-item="item">
						<van-tag type="success" round size="medium" :color="'#38A472'">确认收货</van-tag>
					</view>
				</view>
			</view>
			<load-more :tip="pageData[loadIndex].text" :loading="pageData[loadIndex].isLoading" />
		</scroll-view >

		<view style="height: 100%;" v-if="isLoaded && !pageData[loadIndex].list.length">
			<Empty :type="'address'" :text="'您暂时没有订单哦,赶紧去首页看看吧！'" :src="`${baseImageUrl}/ddwsj@2x.png`" :btnText="'去首页'" :url="'/pages/index/index/index'" />
		</view>
		<Layer :isLoaded="isLoaded" class="fill"></Layer>
		<!-- 模态框 -->
		<van-dialog id="van-dialog" />
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import loadData from "../../../utils/loaddata.js";
	import MyGoodsCard from "../../../mycomponents/my-goods-card/my-goods-card.vue";
	import Empty from '../../../mycomponents/empty-item/empty-item.vue';
	import Dialog from '../../../wxcomponents/vant/dialog/dialog';
	import Api from "../../../utils/api.js";
	const arr = ['待付款','待发货', '待收货', '交易成功', '交易关闭', '全部','退款','退货退款'];let timer=null;
	export default {
		components: {
			MyGoodsCard,
			Empty
		},
		data() {
			return {
				baseImageUrl:getApp().globalData.baseImageUrl,
				isLoaded: false,
				pageData: [{
					areaName: "初始化",
					list: [] 
				}],
				selectarea: "初始化",
				active: 0
			}
		},
		computed: {
			//需要加载的索引
			loadIndex() {
				let index = 0;
				index = parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea));
				return index;
			}
		},
		onLoad(options) {
			console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
			this.$mp.page.hook = this.refresh;
			this.active = options.active;
			this.selectarea = arr[options.active - 1];
			this.getData();
		},
		onReachBottom() {
			this.getData();
		},
		onUnload() {
			clearInterval(this.timer);
		},
		methods: {
			//查看物流
			toLogisics(e){
				const item =e.currentTarget.dataset.item;
				this.$tools.navigateTo('/pages/me/logistics/logistics?item='+JSON.stringify(item));
			},
			//申请退款
			applyRefund(e) {
				const item =e.currentTarget.dataset.item;
				this.$tools.navigateTo("/pages/me/refund_apply/refund_apply?type='refund_money'&pageData=" + JSON.stringify(item))
			},
			//确认收货
			comfirmReceipt(e){
				const item =e.currentTarget.dataset.item;
				Dialog.confirm({
				  title: '提示',
				  message: '您确认收到货了吗?'
				}).then(async () => {
					await this.$net.sendRequest("/order/receive",{orderNo:item.orderNoString});
					this.refresh();
				  // on confirm
				}).catch(() => {
				  // on cancel
				});
				console.log(e)
			},
			onTabChange(e) {
				this.active = parseInt(e.detail.index);
				console.log(this.active)
				this.selectarea = this.active == 5 ? '全部' : arr[this.active - 1];
				this.isLoaded = this.pageData.some(item=>item.areaName==this.selectarea);
				this.getData();
			},
			//取消订单
			cancelOrder(item) {
				console.log("所选订单:",item);
				Dialog.confirm({
				  title: '标题',
				  message: '您确认需要取消该订单吗?'
				}).then(async () => {
					await this.$net.sendRequest("/order/cancelOrder",{orderId:item.orderNoString});
					this.refresh();
				  // on confirm
				}).catch(() => {
				  // on cancel
				});
			},
			//更新时间
			updateTime(){
				timer = setInterval(()=>{
					const addZero = this.$tools.addZero;
					this.pageData[this.loadIndex].list.forEach((item,index)=>{
						this.$set(this.pageData[this.loadIndex].list[index],'leftTime',item.leftTime-1000);
						let seconds = Math.floor(item.leftTime/1000);
						this.$set(this.pageData[this.loadIndex].list[index],'time',addZero(Math.floor(seconds/3600))+":"+addZero(Math.floor((seconds%3600)/60))+":"+addZero(seconds%60))
					})
				},1000)
			},
			//立即支付
			async comfirmPayOrder(e){
				const item =e.currentTarget.dataset.item;
				
				//限制购买
				const islimit = await Api.isLimitBuy(item.items.map(item=>{return {id:item.productId,name:item.productName,count:item.productQuantity}}));
				if(!islimit){
					return;
				}
				
				// 支付
				const res = await this.$net.sendRequest("/pay/miniAppPay",{orderNo:item.orderNoString});	
				console.log('支付接口信息',res);
				//调用支付接口
				uni.requestPayment({
					  timeStamp: res.timeStamp,
					  nonceStr: res.nonceStr,
					  package: res.package,
					  signType: 'MD5',
					  paySign: res.paySign,
					  success:async (res)=>{
						  //获取需要添加限制的数据
						  const addData = item.items.filter(i=>i.xiangou>0)
						  await Api.addLimit(addData);
						  this.$tools.Toast("支付成功","success");
						  this.refresh();
					  },
					  fail:(res)=>{ 
						  
					  }
				})
			},
			//刷新页面
			refresh(){
				this.pageData.splice(1);
				this.getData();
			},
			//获取数据
			getData() {
				loadData.loadMore.call(this, async (reslove, reject) => {
					await new Promise(async (res, rej) => {
						//获取需要加载的选项
						const index = parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea));
						// 获取需要加载的那一项
						let v = this.pageData[index];
						const map = new Map([
							[1,0],
							[2,15],
							[3,1],
							[4,2],
							[5,3],
							[6,4],
							[7,5],
							[8,6],
							[9,7],
							[10,8],
							[11,9]
						]); 
						//发送请求了
						let  result = await this.$net.sendRequest('/order/list', {
							pageNo: v.pageNum,
							pageSize: 20,
							...this.active == 0 ? {} : {
								status: map.get(this.active)
							}
						});
						// console.log(result)
						result = result.map(item=>{
							if(item.status==15){
								item.status='待成团'
							}else{
								item.status = arr[item.status];
							}
						return item});
						//开启定时器
						if(this.active==2){
							this.updateTime();
						}
						v.list = [...v.list, ...result]
						this.$set(this.pageData, index, v);
						this.isLoaded = true;
						reslove(result);
						res();
					})
				});
			},
			//页面跳转
			navigateTo(e) {
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
			//删除订单
			deleteOrder(e){
				const item =e.currentTarget.dataset.item;
				Dialog.confirm({
				  title: '提示',
				  message: '您确认需要删除该订单吗?'
				}).then(async () => {
					await this.$net.sendRequest("/order/delete",{orderIds:item.orderNoString});
					this.refresh();
				  // on confirm
				}).catch(() => {
				  // on cancel
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';

	.header {
		position: fixed;
		top: 0px;
		@include wh(100%, 44px);
		z-index: 9;
	}

	.container {
		height: 100%;
		.item {
			border-top: 5px solid #f1f1f1;

			.pay {
				color: #222;
				text-align: right;
			}

			.action {
				justify-content: flex-end;
			}
		}
	}
</style>
