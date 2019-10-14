<template>
	<view class="main">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500"
		 :circular="true">
			<swiper-item>
				<view class="swiper-item uni-bg-red">A</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-green">B</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-blue">C</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				title: 'Hello',
				background: ['color1', 'color2', 'color3']
			}
		},
		onLoad() {

		},
		methods: {
			changeStatusColor() {
				uni.setNavigationBarColor({
					frontColor: "#ffffff",
					backgroundColor: "#007AFF"
				})
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			}

		}
	}
</script>

<style lang="scss">
	
		.swiper-item{
			height: 100%;
		}
	
</style>
