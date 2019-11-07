<template>
	<view>
		<view class="container" :style="{opacity: isLoaded?1:0}">
			<slot></slot>
		</view>
		<image v-for="(item,index) in getImgs" :key="index" @load="loadImg" :src="item" mode="aspectFill"></image>
	</view>
</template>

<script>
	import {getImages} from "../../utils/tools.js";
	export default {
		props:{
			images:{
				type:[Object,Array,String],
				default:function(){
					return [];
				}
			}
		},
		data() {
			return {
				num: 0
			}
		},
		computed:{
			getImgs(){
				let arr =getImages()(this.images) || ['0'];
				return arr;
			},
			isLoaded(){
				return this.num==this.getImgs.length;
			}
		},
		methods:{
			loadImg(){
				this.num++;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		transition: all 0.2s;
	}
	image{
		opacity: 0;
		width: 0px !important;
		height: 0px !important;
	}
</style>
