<template>
	<view class="container fill pr">
		<view class="content center fm">
			<view>
				<image :src="src" mode="aspectFit"></image>
			</view>
			<view style="transform: translateY(-20px);">
				<text class="fz15 ccc">{{text}}</text>
			</view>
			
			<view class="button p30 pt5 pb5 theme" v-if="btnText" @click="navigateTo" :data-url="url">
				{{btnText || '去首页'}}
			</view>
		</view>
	</view>
</template>

<script>
	const obj = {
		address:""
	};
	export default {
		
		props:{
			src:String,
			type:String,
			text:String,
			btnText:String,
			url:String
		},
		
		data() {
			return {
				
			};
		},
		methods:{
			//页面跳转
			navigateTo(e) {
					uni.navigateTo({
						url:e.currentTarget.dataset.url,
						fail() {
							uni.switchTab({
								url:e.currentTarget.dataset.url
							})
						}
					})
			},
		}
		
	}
</script>

<style lang="scss" scoped>
	.container{
		.content{
			top: 40%;
			flex-flow: column wrap;
			text{
				color: #ccc;
			}
		}
		.button{
			border-radius: 50rpx;
			overflow: hidden;
			border: 1rpx solid $theme;
		}
	}
</style>
