<template>
	<view>
		<button type="primary" @click="refresh">刷新</button>
	</view>
</template>

<script>
	let pages = null;
	export default {
		data() {
			return {
				
			}
		},
		onLoad(){
			pages = getCurrentPages();
		},
		methods: {
			refresh(){
				const lastpages = pages[pages.length-2];
				lastpages.hook(true);
			}
		}
	}
</script>

<style>

</style>
