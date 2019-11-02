<template>
	<view class="ftm">
		<view class="ftm di" v-if="type=='first'">
			<Pic :src="'/static/images/header.png'" :height="'50rpx'" :width="'50rpx'" :mode="'aspectFill'" :back="'#fff'" :round="true"></Pic>
			<text class="ml5 key">樱桃鸭</text>
		</view>
		
		<view class="fm pl10 pr10 text-tag di fz12" v-if="type=='second'">
			{{text}}
		</view>
	</view>
</template>

<script>
	import Pic from '../Pic/Pic.vue';
	export default {
		components:{
			Pic
		},
		props:{
			type:{
				type:String,
				default:"second"
			},
			text:{
				type:String,
				default:"绿色食品"
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../static/styles/mixin.scss';
	.key{
		color: #666;
	}
	.text-tag{
		display: inline-block;
		border-radius: 15px;
		overflow: hidden;
		color: $theme;
		background: #E6F5EE;
	}
</style>
