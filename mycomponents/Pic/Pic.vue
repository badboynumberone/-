<template>
	<view class="wrapper" :style="{width:width,height:height}">
		<image v-show="imgLoaded>0" class="fill" @load="imgLoad" :src="src" :mode="mode" :lazy-load="true" :class="{'round':round}"></image>
	</view>
</template>

<script>
	export default {
		props:{
			src:{
				type:String,
				default:"/static/images/201272713562117180.jpg"
			},
			mode:{
				type:String
			},
			width:{
				type:String,
				default:'100%'
			},
			height:{
				type:String,
				default:'100%'
			},
			round:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				imgLoaded:0
			};
		},
		methods:{
			imgLoad(){
				this.imgLoaded++;
			}
		}
	}
</script>

<style lang="scss">
	.wrapper{
		background: #f1f1f1;
	}
	.round{
		border-radius: 50%;
	}
</style>
