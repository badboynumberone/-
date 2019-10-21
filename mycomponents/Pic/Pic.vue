<template>
	<view :style="{width:width,height:height}">
		<image class="fill" @load="imgLoad" :src="src" :mode="mode" :lazy-load="true"></image>
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

</style>
