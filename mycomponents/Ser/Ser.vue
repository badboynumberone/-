<template>
	<view>
		<!-- 搜索框 -->
		<view class="searchTopBox">
			<view class="searchBoxRadius">
				<view class="grace-search-icon searchBoxIcon" >
					<van-icon name="search" :color="'#38A472'" />
				</view>
				<input class="searchBoxIpt" type="search" confirm-type="搜索" :value="searchValue"  placeholder="搜索商品" :disabled="isDisabled" maxlength="30" @input="bindValue" @confirm="confirmContent"></input>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			isDisabled:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				searchValue:""
			}
		},
		methods: {
			//数据绑定
			bindValue(e){
				this.searchValue = e.detail.value;
				if(!this.searchValue.length){
					this.$parent.isHistory = true;
				}
			},
			//搜索内容
			confirmContent(){
				if(!this.searchValue.length){
					this.$tools.Toast("搜索内容不能为空哦!")
					return;
				}
				const history = [...new Set([...JSON.parse(wx.getStorageSync("searchHistory")),this.searchValue])];
				if(history.length<=15){
					uni.setStorageSync("searchHistory",JSON.stringify(history));
				}
				
				
				this.$parent.isHistory = false;
				
				this.$parent.getKey();
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../static/styles/mixin.scss';
.searchTopBox {
		width: 100%;
		height: 90upx;
		box-sizing: border-box;
		padding-top: 15upx;
		background: $theme;
	}
	
	.searchBoxRadius {
		width: 90%;
		height: 60upx;
		background-color: #fff;
		border:1upx solid #ccc;
		margin-left: 5%;
		overflow: hidden;
		border-radius: 35upx;
	}
	
	.searchBoxIcon {
		font-size: 40upx;
		margin-left: 20upx;
		float: left;
	}
	
	.searchBoxIpt {
		height: 60upx;
		line-height: 60upx;
		margin-left: 20upx;
		float: left;
		width: 550upx;
	}
	
	
</style>
