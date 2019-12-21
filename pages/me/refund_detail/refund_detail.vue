<template>
	<view class="main bt" v-show="isLoaded">
		<view class="wrapper p20 pt10 pb10 b5">
			<view class="header fsb pb5"  style="align-items: center;">
				<view class="left f"  style="align-items: center;">
					<image class="mr10" src="/static/images/Order-complete@2x.png" mode="aspectFill"></image>
					<text class="fz14 fb">商家已同意退款，请寄回退货!</text>
				</view>
				<view class="right theme fz15 fb">
					{{pageData.status}}
				</view>
			</view>
			<view class="address f pt5 bt">
				<view class="left fz13" style="width: 70px;">退货地址：</view>
				<view class="right" style="flex: 1;">
					<view class="fz15">
						<text class="fb" :decode="true">菜菜 15957624596</text>
					</view>
					<view class="fz13 mb5">
						江苏省江宁区双龙大道833号南方花园风彩园20栋3单元304室
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
		
		<view class="list_detail p20 pt10 pb10  b5">
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
		
		<view class="proof p20 pt10 pb10" v-if="pageData.proofPics.length">
			<div class="title fz14 mb5" style="color: #6A6A6A;">
				凭证
			</div>
			<view class="wrap">
				<image v-for="(item,index) in pageData.proofPics" @click="previewImg(item)" :key="index" :style="{'margin-right':(index+1)%4 ? '20rpx' :'0rpx'}" :src="item" mode="aspectFill"></image>
			</view>
		</view>
		<view style="height: 50px;"></view>
		<view class="pf" style="bottom: 0px;left:0px; width: 100%;">
			<my-button :type="5" :textFirst="'填写退货物流信息'" :textSecond="'订单详情'" @firstClick="firstClick" @secondClick="secondClick" />
		</view>

	</view>
</template>

<script>
	import MyGoodsCard from "../../../mycomponents/my-goods-card/my-goods-card.vue";
	import MyButton from '../../../mycomponents/my-button/my-button.vue';
	let opt = null,pages=null;
	const status=['待审核','商家已拒绝','退款中','复核已拒绝','退款成功','已关闭'];
	export default {
		components:{
			MyGoodsCard,MyButton
		},
		data() {
			return {
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
			//设置页面
			setPage(options){
				console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
				opt = options;pages=getCurrentPages();
			},
			//获取数据
			getData(options){
				let item = JSON.parse(options.item);
				item.proofPics=item.proofPics.split(",");
				this.pageData = item;this.isLoaded = true;
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
