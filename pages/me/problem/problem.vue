<template>
	<view class="main"  v-if="baseImageUrl">
		<!-- <van-cell-group>
			<van-cell v-for="(item,index) in problems" :key="index" is-link :title="item.paramKey" link-type="navigateTo" url="/pages/me/problem_detail/problem_detail" />
		</van-cell-group> -->
		<rich-text :nodes="problems" space="nbsp" style="max-width: 100%;"></rich-text>
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
				isLoaded:false,
				problems:""
			};
		},
		computed: {

		},
		onLoad(options) {
			//页面信息答应
			this.setPage(options);
			//获取数据
			this.getData()
		},
		methods: {
			setPage(options) {
				console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
				opt = options;pages = getCurrentPages();
			},
			//获取数据
			async getData(){
				wx.showLoading({
					title:"请稍候",
					mask:true
				})
				const result =  await this.$net.sendRequest("/common/queryText",{
					type:3
				});
				this.problems = result.paramValue;
				// this.problems = "<div>hello,world</div>";
				await this.$tools.sleep(100)
				wx.hideLoading();this.isLoaded = true;
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
