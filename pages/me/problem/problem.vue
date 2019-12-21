<template>
	<view class="main">
		<van-cell-group>
			<van-cell is-link title="已确认收货的订单失效" link-type="navigateTo" url="/pages/me/problem_detail/problem_detail" />
		</van-cell-group>
	</view>
</template>

<script>
	let opt = null,
		pages = null;
	export default {
		components: {

		},
		data() {
			return {

			};
		},
		computed: {

		},
		onLoad(options) {
			//页面信息答应
			this.setPage(options);
		},
		methods: {
			setPage(options) {
				console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
				opt = options;
				pages = getCurrentPages();
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
