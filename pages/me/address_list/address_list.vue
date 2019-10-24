<template>
	<view class="main">
		
		<!-- 地址列表 -->
		<van-cell-group>
			<van-swipe-cell v-for="(item,index) in 6" :key="index" :right-width="130">
			  <van-cell icon="location-o" center>
			  			  <view slot="title">
			  			      <view class="van-cell-text"><text class="fb fz16":decode="true">王磊     13685280335</text></view>
			  				  <view class="address more-hidden">江苏省南京市秦淮区新街口十号店20-20厅萨达多所</view>
			  			  </view>
			  			  <view slot="right-icon" @click="setDefault">
			  			       <view :class="['van-cell-text','theme'] ">设为默认</view>
			  			  </view>
			  </van-cell>
			  <view class="right" slot="right">
				  <view class="edit fm" @click="navigateTo" :data-url="'/pages/me/address/address'">
				  	编辑
				  </view>
				  <view class="del fm" @click="delAddress">
				  	删除
				  </view>
			  </view>
			</van-swipe-cell>
		</van-cell-group>
		<view style="height: 64px;"></view>
		
		
		<!-- 添加地址按钮 -->
		<view class="button pf pt10 pb10" @click="navigateTo" :data-url="'/pages/me/address/address'">
			<my-button :text="'新增地址'" ></my-button>
		</view>
		
		<!-- 模态框 -->
		<van-dialog id="van-dialog" confirm-button-color="#38A472" />
	</view>
</template>

<script>
	import MyButton from "../../../mycomponents/my-button/my-button.vue";
	import Dialog from '../../../wxcomponents/vant/dialog/dialog';
	export default {
		components:{
			MyButton
		},
		data() {
			return {
				
			}
		},
		methods: {
			//页面跳转
			navigateTo(e) {
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
			//设置默认地址
			setDefault(){
				console.log(Dialog)
				Dialog.confirm({
				  title: '提示',
				  message: '确认设置该地址为默认地址吗?'
				}).then(() => {
				  // on confirm
				}).catch(() => {
				  // on cancel
				});
			},
			//删除地址
			delAddress(){
				Dialog.confirm({
				  title: '提示',
				  message: '确认删除该地址吗?'
				}).then(() => {
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
