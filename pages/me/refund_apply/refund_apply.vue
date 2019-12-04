<template>
	<view class="main bt">
		<!-- 头部 -->
		<view class="header p10">
			<view class="fz14">订单号: {{pageData.orderNo}}</view>
			<view class="fz14">订单金额: <text class="theme">¥{{pageData.totalAmount}}</text></view>
			<!-- <Header></Header> -->
		</view>

		<!-- 身体 -->
		<view class="body pb10">
			<my-goods-card :item="pageData" :isClick="false"></my-goods-card>
			<van-field label="退款金额"  readonly >
				<view class="price theme" slot="right-icon">
					¥{{pageData.totalAmount}}
				</view>
			</van-field>
			<picker :range="mapReasons" @change="bindReasonChange"  >
				<van-field required label="退款原因" placeholder="请选择" :value="reason"  readonly input-align="right" right-icon="arrow" />
			</picker>
			<picker :range="proofs" @change="bindProofChange"  >
				<van-field required label="申请凭证" placeholder="请选择" :value="proof"  readonly input-align="right" right-icon="arrow" />
			</picker>
			<van-field type="textarea" autosize label="问题说明" maxlength="200"  :value="problem" placeholder="最多填写200字" clearable  @change="onChange" data-name="problem" />
			<view class="voucher">
				<van-field label="上传凭证" :border="false"/>
				<view class="pb10 pl15 pr15">
					<UploadImg ref="upload" :url="'sdafdf'" :length="8"></UploadImg>
				</view>
			</view>
		</view>
		<view style="height: 80rpx;"></view>

		<!-- 底部按钮 -->
		<view class="bottom_btn pf" @click="onSub">
			<van-button color="linear-gradient(142deg,rgba(26,174,104,1) 0%,rgba(124,206,89,1) 100%)" block ><text style="color: #fff;">提交申请</text></van-button>
		</view>
	</view>
</template>

<script>
	import UploadImg from "../../../mycomponents/upload_img/upload_img.vue";
	import Header from "../../../mycomponents/refund-components/header/header.vue";
	import MyGoodsCard from "../../../mycomponents/my-goods-card/my-goods-card.vue";
	import MyButton from "../../../mycomponents/my-button/my-button.vue";
	let reasons = [];
	export default {
		components: {
			UploadImg,
			Header,
			MyGoodsCard,
			MyButton
		},
		data() {
			return {
				pageData:{},
				refund_type:"refund_money",//两种值 refund_money,refund_money_goods
				reason:"",//退款原因
				reasons:[{name:""}],
				proof:"",
				proofs:[1,0],
				// reasons:{
				// 	"refund_money":["不喜欢/不想要","拍错/多拍","地址电话信息填写错误","缺货","未及时发货"],
				// 	"refund_money_goods":["颜色/图案/尺寸不符","质量问题","缺少配件","材质与商品描述不符","收到货有破损/污迹/变形","卖家发错货","其他"]
				// },//退款原因
				problem:"" //退款问题
			};
		},
		onLoad(options) {
			console.log(getCurrentPages()[getCurrentPages().length-1].route,options)
			//设置页面内容
			this.setPageContent(options);
			//获取退款原因
			this.getRefundReason();
		},
		computed:{
			mapReasons(){
				return this.reasons.map(item=>item.name)
			}
		},
		methods:{
			//设置页面内容
			setPageContent(options){
				this.pageData = JSON.parse(options.pageData);
				this.refund_type = options.type;
			},
			//获取退款原因
			async getRefundReason(){
				this.reasons=await this.$net.sendRequest("/returnApply/getReasons");
			},
			//数据绑定
			onChange(e){
				this[e.currentTarget.dataset.name] = e.detail;
			},
			//选定值绑定
			bindReasonChange(e){
				this.reason = this.mapReasons[parseInt(e.detail.value)];
			},
			//绑定凭证
			bindProofChange(e){
				this.proof = this.proofs[parseInt(e.detail.value)];
			},
			//提交退款
			async onSub(){
				await this.$refs.upload.uploadFiles();
			},
			//检验表单
			checkForm(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';

	.header {
		background: #fff;
		border-bottom: 5px solid #f1f1f1;
	}
	.body{
		background: #fff;
	}
	.bottom_btn{
		width: 100%;
		bottom: 0px;
		left: 0px;
		z-index: 99;
	}
	.main{
		background: #f1f1f1;
	}
</style>
