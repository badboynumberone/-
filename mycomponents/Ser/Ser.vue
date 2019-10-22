<template>
	<view>
		<!-- 搜索框 -->
		<view class="searchTopBox">
			<view class="searchBoxRadius">
				<view class="grace-search-icon searchBoxIcon">
					<van-icon name="search" :color="'#38A472'" />
				</view>
				<input class="searchBoxIpt" type="search"  placeholder="搜索商品" disabled></input>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
	}
	
	.searchBotBox {
		width: 100%;
		margin-top: 30upx;
		padding: 15upx 3%;
		box-sizing: border-box;
	}
	
	.searchHistoryBox {
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		margin-top: 40upx;
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
		border: 1px solid #ccc;
	}
</style>
