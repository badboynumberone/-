<template>
	<view class="main">

		<view class="submit_bar pf">
			<van-submit-bar :price="3050" button-text="提交订单" bind:submit="onClickButton" :tip="true">
				<van-radio-group :value="allRadio" @change="onAllChange">
					<view class="ml10">
						<van-radio name="1">全选</van-radio>
					</view>
				</van-radio-group>
			</van-submit-bar>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allRadio:'1'
			}
		},
		methods: {
			onAllChange(e){
				console.log(e)
			}

		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';

	.submit_bar {
		bottom: 0px;
	}
</style>
