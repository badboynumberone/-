<template>
	<view class="main bt"  v-if="baseImageUrl" style="background: #f1f1f1;">
		<view class="wrapper p20 pt10 pb10 b5" style="background: #fff;">
			<view class="header fsb pb5"  style="align-items: center;">
				<view class="left f"  style="align-items: center;">
					<image class="mr10" :src="`${baseImageUrl}/Order-complete@2x.png`" mode="aspectFill"></image>
					<text class="fz14 fb">{{text}}</text>
				</view>
				<view class="right theme fz15 fb">
					{{pageData.status}}
				</view>
			</view>
			<view class="address pt5 bt" v-if="pageData.receivePhone">
				<view class="left fz15 theme fb">退货信息</view>
				<view class="right" style="flex: 1;">
					<view class="fz14">
						<view class="f"><view class="f" style="width: 52px;justify-content: space-between;margin-right: 5rpx;"><text>收</text><text>件</text><text>人</text></view><view class="mr5">
						:</view>{{pageData.receiveMan}}</view>
					</view>
					<view class="fz13">
						<text :decode="true"> 手机号码: {{pageData.receivePhone}}</text>
					</view>
					<view class="fz13">
						<text :decode="true"> 快递单号: {{pageData.deliverySn}}({{pageData.deliveryCompany}})</text>
					</view>
					<view class="fz13 mb5">
						<text :decode="true"> 退货地址: {{pageData.description}}</text>
						
					</view>
					<view class="theme fz12">
						*退货需用户支付快递费用，如设置货到付款,商家默认拒收
					</view>
				</view>
			</view>
		</view>
		
		<view class="product b5">
			<my-goods-card :item="pageData"  :isHeader="false"></my-goods-card>
		</view>
		
		<view class="list_detail p20 pt10 pb10  b5" style="background: #fff;">
			<view class="line fsb" style="align-items: center;">
				<text class="fz13" style="color: #6A6A6A;">退款编号</text>
				<text class="fz13">{{pageData.refundNum}}</text>
			</view>
			<view class="line fsb" style="align-items: center;">
				<text class="fz13" style="color: #6A6A6A;">订单编号</text>
				<text class="fz13">{{pageData.orderId}}</text>
			</view>
			<view class="line fsb" style="align-items: center;">
				<text class="fz13" style="color: #6A6A6A;">申请时间</text>
				<text class="fz13">{{createTime(pageData.createTime)}}</text>
			</view>
			<view class="line fsb" style="align-items: center;">
				<text class="fz13" style="color: #6A6A6A;">退款金额</text>
				<text class="fz13">¥{{pageData.returnAmount}}</text>
			</view>
			<view class="line fsb" style="align-items: center;">
				<text class="fz13" style="color: #6A6A6A;">退款原因</text>
				<text class="fz13">{{pageData.reason}}</text>
			</view>
			<view class="line fsb" style="align-items: center;">
				<text class="fz13" style="color: #6A6A6A;">退货凭据</text>
				<text class="fz13">{{pageData.proofPics.length?'有质检报告':'无质检报告'}}</text>
			</view>
			<view class="line fsb" style="align-items: center;">
				<text class="fz13" style="color: #6A6A6A;">问题说明</text>
				<text class="fz13">{{pageData.description}}</text>
			</view>
		</view>
		
		<view class="proof p20 pt10 pb10" v-if="pageData.proofPics[0]">
			<div class="title fz14 mb5" style="color: #6A6A6A;">
				凭证
			</div>
			<view class="wrap">
				<image v-for="(item,index) in pageData.proofPics" @click="previewImg(item)" :key="index" :style="{'margin-right':(index+1)%4 ? '20rpx' :'0rpx'}" :src="item" mode="aspectFill"></image>
			</view>
		</view>
		<view style="height: 50px;background: #f1f1f1;"></view>
		<view class="pf" style="bottom: 0px;left:0px; width: 100%;">
			<my-button v-if="pageData.status=='待寄回商品'" :type="5" :textFirst="'填写退货物流信息'" :textSecond="'订单详情'" @firstClick="firstClick" @secondClick="secondClick" />
			<view v-else @click="toDetail"><van-button  color="linear-gradient(142deg,rgba(26,174,104,1) 0%,rgba(124,206,89,1) 100%)" block ><text style="color: #fff;">订单详情</text></van-button></view>
		</view>

	</view>
</template>

<script>
	import MyGoodsCard from "../../../mycomponents/my-goods-card/my-goods-card.vue";
	import MyButton from '../../../mycomponents/my-button/my-button.vue';
	let opt = null,pages=null;
	export default {
		components:{
			MyGoodsCard,MyButton
		},
		data() {
			return {
				text:'',
				isLoaded:false,
				pageData:{
					
				}
			};
		},
		computed:{
			createTime(){
				return function(time){
					
					return  this.$tools.dateFormat("YYYY-mm-dd HH:MM:SS", new Date(time))
				}
			}
		},
		onLoad(options) {
			//页面信息答应
			this.setPage(options);
			this.getData(options);
		},
		methods:{
			//查看订单详情
			toDetail(){
				this.$tools.navigateTo(`/pages/me/order_detail/order_detail?orderNo=${this.pageData.orderNoString}`);
			},
			//第一次点击
			firstClick(){
				this.$tools.navigateTo('/pages/me/add_logistics/add_logistics?id='+this.pageData.id)
				switch (this.pageData.status){
					case '待审核':
						break;
					case '商家已拒绝':
						break;
					case '退款中':
						break;
					case '复核已拒绝':
						break;
					case '退款成功':
						break;
					case '已关闭':
						break;
				}
			},
			//第二次点击
			secondClick(){
				
				
			},
			//设置页面
			setPage(options){
				console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
				opt = options;pages=getCurrentPages();
			},
			//获取数据
			async getData(options){
				// let item = JSON.parse(options.item);
				let result  = await this.$net.sendRequest('/returnApply/info',{
					id:options.id
				});
				result.proofPics=result.proofPics.split(",");
				const arr = [['',''],['待审核','退货申请提交成功，等待商家处理！'],['商家已拒绝','商家已拒绝退款,请重新提交审核!'],['退款中','退款中,请稍候!'],['复核已拒绝','复核未通过,请重新提交审核!'],['',''],['退款成功','恭喜您退款成功!'],['已关闭','该订单已被关闭'],['待寄回商品','商家已同意退货退款，请寄回商品!'],['待商家收货','商品已退回，等待商家确认!'],['退款失败',result.busRefundReason]];
				result.status = arr[result.status][0];
				this.text = arr.find(item=>item[0]==result.status)[1];
				this.pageData = result;this.isLoaded = true;
			},
			//预览图片
			previewImg(item){
				uni.previewImage({
					current:item,
					urls:this.pageData.proofPics,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.b5{
		border-bottom: 5px solid #f1f1f1;
	}
	.wrapper{
		
		.header{
			image{
				@include  wh(50rpx,50rpx);
			}
		}
	}
	.list_detail{
		.line{
			line-height: 30px;
		}
	}
	.proof{
		image{
			@include wh(152.5rpx,152.5rpx);

		}
	}
</style>
