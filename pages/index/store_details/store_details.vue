<template>
	<view class="main">
		<view class="business pr20 pl20 pt10 pb10">
			<view class="label f">
				<view class="store_header mr20">
					<Pic :height="'60px'" :width="'60px'" :mode="'aspectFill'"></Pic>
				</view>
				<view class="info fsr">
					<view class="text-hidden fb fz17" style="width: 230px;">
						南京樱桃鸭业有限公司
					</view>
					<view class="text-hidden" style="width: 230px;color: #666;">
						南京樱桃鸭业有限公司南京樱桃鸭业有限公司南京樱桃鸭业有限公司南京樱桃鸭业有限公司
					</view>
				</view>
			</view>
		</view>
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

	.business {
		.label {
			.store_header {
				border-radius: 5px;
				overflow: hidden;
				box-shadow: 0px 0px 5px #C7C7C7;
				@include wh(60px, 60px);
			}

			.info {
				flex-flow: column wrap;
			}
		}
	}
</style>
