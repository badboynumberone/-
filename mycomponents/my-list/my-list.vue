<template>
	<view class="container clearfix">
		<view class="content">
			<view class="column pr5">
				<view v-for="(item,index) in pageData" :key="index" v-if="index%2==0" @click="toProduct" :data-url="'/pages/index/product/product'">
					<MyItem></MyItem>
				</view>
			</view>
			
			<view class="column pl5">
				<view v-for="(item,index) in pageData" :key="index" v-if="index%2==1" @click="toProduct" :data-url="'/pages/index/product/product'">
					<MyItem></MyItem>
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
			pageData:{
				type:Array,
				default:function(){
					return [
						"as暗示法大纲打得过大个个都是是的港式大飒飒噶都是嘎我当时嘎嘎挂电视柜d","asdas",
						"adsgaassd","asddsga",
						"adsgaassd","asddsga"
					]
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
