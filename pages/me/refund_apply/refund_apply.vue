<template>
	<view class="main">
		<UploadImg :url="'sdafdf'" :count="4" :length="4"></UploadImg>
	</view>
</template>

<script>
	import UploadImg from "../../../mycomponents/upload_img/upload_img.vue";
	export default {
		components:{
			UploadImg
			
		},
		data() {
			return {
				
				
			};
		}
	}
</script>

<style lang="scss">
	@import './../../../static/styles/mixin.scss';
</style>
