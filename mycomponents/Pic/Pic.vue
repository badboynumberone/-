<template>
	<view class="wrapper" :style="{width:width,height:height}" :class="{'round':round}">
		<image v-show="imgLoaded>0" class="fill" @load="imgLoad" :src="src" :mode="mode" :lazy-load="true" :class="{'round':round}" ></image>
		<view :class="['back pa fill','noback']" v-show="imgLoaded==0" ></view>
	</view>
</template>

<script>
	export default {
		props:{
			src:{
				type:String
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
			},
			back:{
				type:String,
				default:'#FAFAFA'
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
	.round{
		overflow: hidden;
		border-radius: 50%;
	}
	.back{
		left: 0;
		top: 0;
	}
</style>
