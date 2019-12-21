<template>
	<view class="main">
		<view class="container" v-if="list.length">
			<!-- 地址列表 -->
			<van-cell-group>
				<van-swipe-cell v-for="(item,index) in list" :key="index" :right-width="isLastOrder ? 1:item.defaultStatus?65:130" @click="setOrderAddress(item)">
				  <van-cell icon="location-o" center>
				  			  <view slot="title">
				  			      <view class="van-cell-text"><text class="fb fz16" :decode="true">{{item.name }}     {{item.phoneNumber }}</text></view>
				  				  <view class="address more-hidden">{{item.province+item.city+item.region+item.detailAddress}}</view>
				  			  </view>
				  			  <view slot="right-icon" @click="setDefault(item.id)" v-if="!item.defaultStatus">
				  			       <view :class="['van-cell-text','theme'] ">设为默认</view>
				  			  </view>
				  </van-cell>
				  <view class="right" slot="right">
					  <view class="edit fm" @click="toEdit(item)" :data-url="''">
					  	编辑
					  </view>
					  <view class="del fm" @click="delAddress(item.id)">
					  	删除
					  </view>
				  </view>
				</van-swipe-cell>
			</van-cell-group>
			<view style="height: 64px;"></view>
			
			
			
			
			<!-- 模态框 -->
			<van-dialog id="van-dialog" confirm-button-color="#38A472" />
		</view>
		
		<view style="height: 100%;" v-if="!list.length">
			<Empty :type="'address'" :text="'您还没有收货地址哦'" :src="'/static/images/dzwsj@2x.png'" />
		</view>
		
		<!-- 添加地址按钮 -->
		<view class="button pf" @click="navigateTo" :data-url="'/pages/me/address/address'">
			<view  class="pt10 pb10" style="width: 95%;margin: 0 auto;">
				<van-button :color="'linear-gradient(142deg,rgba(26,174,104,1) 0%,rgba(124,206,89,1) 100%)'" block round ><text style="color: #fff;">新增地址</text></van-button>
			</view>
		</view>
	</view>
</template>

<script>
	import MyButton from "../../../mycomponents/my-button/my-button.vue";
	import Dialog from '../../../wxcomponents/vant/dialog/dialog';
	import Empty from '../../../mycomponents/empty-item/empty-item.vue';
	import {sendRequest} from "../../../utils/request.js";
	let pages=null;
	export default {
		components:{
			MyButton,Empty
		},
		data() {
			return {
			
			}
		},
		computed:{
			list(){
				return this.$store.state.addressList
			},
			isLastOrder(){
				console.log(getCurrentPages())
				return getCurrentPages()[getCurrentPages().length-2].route=='pages/cart/submit_order/submit_order'
			}
		},
		onLoad() {
			this.getAddressList();
			pages = getCurrentPages();
		},
		methods: {
			//获取地址栏信息列表
			getAddressList(){
				this.$store.dispatch("getUserAddress");
			},
			//页面跳转
			navigateTo(e) {
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
			//去编辑
			toEdit(item){
				this.$tools.navigateTo(`/pages/me/address/address?item=${JSON.stringify(item)}`)
			},
			//设置地址
			setOrderAddress(item){
				if(this.isLastOrder){
					pages[pages.length-2].hook(item);
					wx.navigateBack()
				}
				
			},
			//设置默认地址
			setDefault(id){
				Dialog.confirm({
				  title: '提示',
				  message: '确认设置该地址为默认地址吗?'
				}).then(async () => {
					const result = await this.$net.sendRequest(`/member/address/setDefault/${id}`);
					this.$tools.Toast("设置成功","success");
					this.getAddressList();
				  // on confirm
				}).catch(() => {
				  // on cancel
				});
			},
			//删除地址
			delAddress(id){
				Dialog.confirm({
				  title: '提示',
				  message: '确认删除该地址吗?'
				}).then(async () => {
				  // on confirm
				  const result = await this.$net.sendRequest(`/member/address/delete/${id}`);
				  this.getAddressList();
				}).catch(() => {
				  // on cancel
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';
	
	.bark{
		color: #ccc;
	}
	.button {
		bottom: 0px;
		width: 100%;
	}
	
	.right{
		display: flex;
		height: 100%;
		view{
			width: 65px;
			line-height: 100%;
			color: #fff;
		}
		.edit{
			background: $theme;
		}
		.del{
			background: #EE0A24;
		}
	}
</style>
