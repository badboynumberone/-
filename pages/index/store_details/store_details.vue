<template>
	<view class="main">
		<!-- 店铺信息 -->
		<view class="store_info">
			<view class="wrapper pr">
				<view class="business pr20 pl20 pt10 pb10 pa" style="top: 0px;left: 0px;width: 100%;z-index: 9;">
					<view class="label f">
						<view class="store_header mr20">
							<Pic :src="busLog" :height="'60px'" :width="'60px'" :mode="'aspectFill'"></Pic>
						</view>
						<view class="info fsr">
							<view class="text-hidden fb fz17" style="width: 230px;">
								{{businessInfo.name}}
							</view>
							<view class="text-hidden" style="width: 230px;color: #666;">
								
							</view>
						</view>
					</view>
				</view>
				<view style="height: 80px;opacity: 0.6;">
					<Pic :src="'/static/images/background-Merchant@2x.png'" :height="'100%'" :width="'100%'" :mode="'aspectFill'" ></Pic>
				</view>
			</view>
			
			<view class="store_word">
				<view class="">
					<text :class="[isLoadMore?'more-hidden':'' ,'word','p10']" :decode="true" :space="'nbsp'">{{businessInfo.busDesc}}</text>
				</view>
				<view @click="loadMoreInfo">
					 <van-divider contentPosition="center" >更多商家信息<van-icon :name="isLoadMore?'arrow-up':'arrow-down'" style="transform: translate(2px,2px);" /></van-divider>
				</view>
			</view>
		</view>
		<!-- 店铺商品 -->
		<view class="store_goods">
			<view class="h1 fz18 fb p10" style="border-top: 5px solid #f1f1f1;">
				商品
			</view>
			<!-- 商品列表 -->
			<MyList :pageData="pageData"></MyList>
			<!-- 加载更多 -->
			<load-more :tip="'正在加载中...'" :loading="true" />
		</view>
	</view>
</template>

<script>
	import MyList from "../../../mycomponents/my-list/my-list.vue";
	import Pic from "../../../mycomponents/Pic/Pic.vue";
	export default {
		components:{
			MyList,Pic
		},
		data() {
			return {
				isLoadMore:true,//是否加载更多
				pageData: [
					"as暗示法大纲打得过大个个都是是的港式大飒飒噶都是嘎我当时嘎嘎挂电视柜d", "asdas",
					"adsgaassd", "asddsga",
					"adsgaassd", "asddsga"
				],
				businessInfo:{},//商家信息
				
			}
		},
		//
		onLoad(options) {
			console.log(getCurrentPages()[getCurrentPages().length-1].route,options)
			//获取商户信息
			this.getData(options)
		},
		methods:{
			async getData(options){
				const result = await this.$net.sendRequest(`/home/business/${options.id}`,{},"GET");
				this.businessInfo = result;
			},
			loadMoreInfo(){
				this.isLoadMore = !this.isLoadMore;
			}
			
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
	.store_info{
		.word{
			line-height: 30px;
			text-indent: 29px;color: #222;
			display: -webkit-box;
			-webkit-box-orient: vertical;
		}
	}
</style>
