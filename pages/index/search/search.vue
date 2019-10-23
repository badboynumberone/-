<template>
	<view class="main">
		<!-- 搜索框 -->
		<Ser :isDisabled="false" ref="search"></Ser>
		
		<!-- 搜索历史 -->
		<view class="searchBotBox" v-if="isHistory">
			<view class="ov ">
				<view class="fl" style="color: #898989;">搜索历史</view>
				<view @click="clearKey" class="fr grace-more-r grace-search-remove">
					<van-icon name="delete"></van-icon>
				</view>
			</view>
			<view class="searchHistoryBox" >
				<view class="searchHistoryBoxItem text-hidden" v-for="(item,index) in searchKey" :key='index' style="max-width: 150px;" @click="itemSearch(item)">
					{{item}}
				</view>
			</view>
		</view>
		
		<!-- 模态框 -->
		<van-dialog id="van-dialog" confirm-button-color="#38A472" />
	</view>
</template>

<script>
	import Ser from "../../../mycomponents/Ser/Ser";
	import Dialog from '../../../wxcomponents/vant/dialog/dialog';
	export default {
		components:{
			Ser
		},
		data() {
			return {
				searchKey:[],
				isHistory:true
			}
		},
		onLoad(){
			this.getKey();
		},
		methods: {
			getKey(){
				try{
					this.searchKey = JSON.parse(uni.getStorageSync("searchHistory"));
				}catch(e){
					//TODO handle the exception
					uni.setStorageSync("searchHistory",JSON.stringify([]))
				}
				
			},
			clearKey(){
				Dialog.confirm({
				  title: '提示',
				  message: '确认删除该地址吗?'
				}).then(() => {
				  // on confirm
				  uni.setStorageSync("searchHistory",JSON.stringify([]));
				  this.getKey()
				});
			},
			itemSearch(item){
				this.$refs.search.searchValue = item;
				this.$refs.search.confirmContent();
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';
	.searchBotBox {
		width: 100%;
		margin-top: 10upx;
		padding: 15upx 3%;
		box-sizing: border-box;
	}
	
	.searchHistoryBox {
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		margin-top: 60upx;
		
	}
	
	.searchHistoryBoxItem {
		float: left;
		font-size: 26upx;
		color: #666;
		line-height: 46upx;
		height: 46upx;
		padding: 0 20upx;
		border-radius: 23upx;
		margin-left: 15upx;
		margin-bottom: 20upx;
		background: #f1f1f1;
	}
</style>
