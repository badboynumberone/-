<template>
	<view class="main">
		<!-- 导航条 -->
		<scroll-view scroll-x style="width: 750rpx;">
			<van-tabs :active="active" @change="onTabChange" :line-width="'20'">
			  <van-tab name="all" title="全部"/>
			  <van-tab name="waitpay" title="待审核"/>
			  <van-tab name="waitsend" title="待寄回退货"/>
			  <van-tab name="waitaccept" title="待商家收货"/>
			  <van-tab name="waitaccept" title="拒绝收货"/>
			  <van-tab name="waitaccept" title="拒绝退款"/>
			  <van-tab name="waitaccept" title="退款成功"/>
			</van-tabs>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	@import './../../../static/styles/mixin.scss';
</style>
