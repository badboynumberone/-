<template>
	<view style="width: 95%;margin: 0 auto;">
		<van-button type="primary" :color="color" block round>{{text}}</van-button>
	</view>
</template>

<script>
	export default {
		props:{
			text:{
				type:String,
				color:String
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
