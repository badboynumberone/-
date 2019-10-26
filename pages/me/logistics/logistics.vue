<template>
	<view class="main">
		<view class="top f p20">
			<view class="mr20">
				<Pic :width="'160rpx'" :height="'160rpx'" :mode="'aspectFit'" :src="'/static/images/header.png'"></Pic>
			</view>
			<view class="fsr" style="flex-flow: column wrap;">
				<view class="fb fz18" style="color: #222;">
					已完成
				</view>
				<view style="margin-top: -15px;">
					<text class="fz15" :decode="true" style="color: #666;">中通快递 5393493347766</text>
				</view>
			</view>
		</view>
		<view class="body">
			<van-steps
			  :steps="steps"
			  :active="active"
			  direction="vertical"
			  active-color="#38A472"
			/>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				steps: [
				      {
				        text: '步骤一',
				        desc: '描述信息'
				      },
				      {
				        text: '步骤二',
				        desc: '描述信息'
				      },
				      {
				        text: '步骤三',
				        desc: '描述信息'
				      },
				      {
				        text: '步骤四',
				        desc: '描述信息'
				      }
				    ],
				active:""
			};
		}
	}
</script>

<style lang="scss">
	@import './../../../static/styles/mixin.scss';
	.top{
		border-top: 1px solid #f1f1f1;
		border-bottom: 10px solid #f1f1f1;
	}
</style>
