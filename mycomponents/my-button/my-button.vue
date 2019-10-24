<template>
	<view style="width: 95%;margin: 0 auto;">
		<van-button type="default" :color="color" block round>{{text}}</van-button>
	</view>
</template>

<script>
	export default {
		props:{
			text:{
				type:String,
				
			},
			color:{
				type:String,
				default:"linear-gradient(142deg,rgba(26,174,104,1) 0%,rgba(124,206,89,1) 100%)"
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
