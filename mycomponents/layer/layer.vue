<template>
	<view :class="['fill bgfff pf fm container',isLoaded ? 'no':'']" style="top: 0px;left: 0px;">
		<image :src="`${baseImageUrl}/loading.gif`" style="width: 400rpx;height: 300rpx;" mode="aspectFit"></image>
	</view>
</template>

<script>
	export default {
		props:{
			isLoaded:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				baseImageUrl:getApp().globalData.baseImageUrl,
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		transition: all 0.3s 0.3s;
		z-index:999;
	}
	.no{
		opacity: 0;
		z-index: -9;
		// animation: fadeOut 0.25s, 100ms;
	}
	
	@keyframes fadeOut {
	  0% {
	    display: block;
	  }
	  100% {
		display: none;
	  }
	}
</style>
