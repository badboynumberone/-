<template>
	<view class="main">
		<van-tabs :active="active" @change="onTabChange" :line-width="'20'">
		  <van-tab name="all" title="全部"/>
		  <van-tab name="waitpay" title="待付款"/>
		  <van-tab name="waitsend" title="待发货"/>
		  <van-tab name="waitaccept" title="待收货"/>
		  <van-tab name="finish" title="已完成"/>
		  <van-tab name="dealclose" title="交易关闭"/>
		</van-tabs>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:0
			}
		},
		methods: {
			onTabChange(e){
				this.active = parseInt(e.detail.index);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';
</style>
