<template>
	<view class="ftm" v-if="text!=''&&text!='无'">
		<view class="ftm di" v-if="type=='first'">
			<Pic :src="'/static/images/brand_name@2x.png'" :height="'50rpx'" :width="'50rpx'" :mode="'aspectFill'" :back="'#fff'" :round="true"></Pic>
			<text class="ml5 key">{{text}}</text>
		</view>
		
		<view class="fm pl10 pr10 text-tag di fz12" v-if="type=='second'">
			{{text}}
		</view>
		
		<view class="fm pl10 pr10 fz12 limit ml5"  v-if="type=='three'">
			限购{{text}}件
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
	.limit{
		line-height: 30rpx;
		background: #F97F44;
		border-radius: 3px;
		overflow: hidden;
		color:#FFFFFF;
	}
</style>
