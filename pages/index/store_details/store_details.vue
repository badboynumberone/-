<template>
	<view class="main"  >
		<!-- 店铺信息 -->
		<view class="store_info">
			<view class="wrapper pr">
				<view class="business pr20 pl20 pt10 pb10 pa" style="top: 0px;left: 0px;width: 100%;z-index: 9;">
					<view class="label f">
						<view class="store_header mr20">
							<Pic :src="businessInfo.busLog" :height="'60px'" :width="'60px'" :mode="'aspectFill'"></Pic>
						</view>
						<view class="info fsr">
							<view class="text-hidden fb fz17" style="width: 230px;">
								{{businessInfo.name}}
							</view>
							<view class="text-hidden" style="width: 230px;color: #666;">
								{{businessInfo.detailAddress}}
							</view>
						</view>
					</view>
				</view>
				<view style="height: 80px;opacity: 0.6;">
					<Pic :src="`${baseImageUrl}/background-Merchant@2x.png`" :height="'100%'" :width="'100%'" :mode="'aspectFill'" ></Pic>
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
				店铺商品
			</view>
			<!-- 商品列表 -->
			<MyList :list="pageData[loadIndex].list"></MyList>
			<!-- 加载更多 -->
			<load-more :tip="pageData[loadIndex].text" :loading="pageData[loadIndex].isLoading" />
		</view>
	</view>
</template>

<script>
	import MyList from "../../../mycomponents/my-list/my-list.vue";
	import Pic from "../../../mycomponents/Pic/Pic.vue";
	import loadData from "../../../utils/loaddata.js";
	export default {
		components:{
			MyList,Pic
		},
		data() {
			return {
				baseImageUrl:getApp().globalData.baseImageUrl,
				isLoadMore:true,//是否加载更多
				isLoaded: false,//是否加载完
				pageData: [{
					areaName: "初始化",
					list: []
				}],
				selectarea:'初始化',
				businessInfo:{},//商家信息
				
			}
		},
		async onLoad(options) {
			console.log(getCurrentPages()[getCurrentPages().length-1].route,options)
			//获取商户信息
			this.selectarea = "店铺";
			await this.getBussinessInfo(options);
			this.getData(options);
			//获取商家信息
			
		},
		computed:{
			//需要加载的索引
			loadIndex() {
				let index = 0;
				index =parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea)) ;
				return index;
			}
		},
		onReachBottom(){
			this.getData(getCurrentPages()[getCurrentPages().length-1].options);
		},
		methods:{
			async getBussinessInfo(options){
				this.businessInfo = await this.$net.sendRequest(`/home/business/${options.id}`,{},'GET');
			},
			//搜索
			async getData(options){
				loadData.loadMore.call(this, async (reslove, reject) => {
					await new Promise(async (res, rej) => {
						//获取需要加载的选项
						const index = parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea));
						// 获取需要加载的那一项
						let v = this.pageData[index];
						//发送请求了
						const result = await this.$net.sendRequest('/home/getProductList', {
							businessId:options.id,
							pageNum: v.pageNum,
							pageSize: 20
						},"GET");
						v.list = [...v.list, ...result]
						this.$set(this.pageData, index, v);
						this.isLoaded = true;
						reslove(result);
						res();
					})
				});
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
