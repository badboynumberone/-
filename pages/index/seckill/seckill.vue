<template>
	<view class="main bgf1">
		<view style="height: 150rpx;">
			<SeckillHeader></SeckillHeader>	
		</view>
		<view class="wrapper pl10 pr10 pr">
			<SeckillItem></SeckillItem>
		</view>
	</view>
</template>

<script module="test" lang="wxs">
    function split(str){
		return str+"sadsadsad"
	}
    module.exports = {
      split: split
    }
</script>
<script>
	import SeckillHeader from '../../../mycomponents/seckill-header/seckill-header.vue'
	import SeckillItem from '../../../mycomponents/seckill-item/seckill-item.vue'
	let opt = null,pages=null;
	export default {
		components:{
			SeckillHeader,SeckillItem
		},

		data() {
			return {
				a:1,
				b:2
			};
		},
		computed:{
			
		},
		onLoad(options) {
			//页面信息答应
			this.setPage(options);
		},
		methods:{
			setPage(options){
				this.config.optionMergeStrategies.
				console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
				opt = options;pages=getCurrentPages();
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
