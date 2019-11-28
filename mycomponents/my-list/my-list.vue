<template>
	<view class="container clearfix">
		<view class="content">
			<view class="column pr5">
				<view v-for="(item,index) in list" :key="index" v-if="index%2==0" @click="toProduct" :data-url="'/pages/index/product/product?id='+item.id">
					<MyItem :item="item"></MyItem>
				</view>
			</view>
			
			<view class="column pl5">
				<view v-for="(item,index) in list" :key="index" v-if="index%2==1" @click="toProduct" :data-url="'/pages/index/product/product?id='+item.id">
					<MyItem :item="item"></MyItem>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MyItem from "../my-item/my-item.vue";
	
	export default {
		components:{
			MyItem
		},
		props:{
			list:{
				type:Array,
				default:function(){
					return []
				}
			}
		},
		computed:{
		},
		data() {
			return {
				
			};
		},
		methods:{
			toProduct(e){
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../static/styles/mixin.scss';
	.container {
		.content{
			width: 750upx;
			padding: 0px 10px;
			display: flex;
			.column {
				width: 50%;
				
			}
		}
		
	}
</style>
