<template>
	<view class="main" style="background-color: #f1f1f1;">
		<view class="container" style="background-color: #f1f1f1;">
			<view style="height: 150rpx;">
				<SeckillHeader ref="header" :navs="dates" @menuclick="getMatchData"></SeckillHeader>
			</view>
			<view class="wrapper pl10 pr10 pr pb10">
				<view class="mb15" v-for="(item,index) in list" :key="index" @click="navigateTo($event,item)" :data-url="'/pages/index/product/product?id='+item.productId">
					<!-- <SeckillItem ref="item" :single="item" :state="timerState"></SeckillItem> -->
					<view class="item ftm p10 bgfff pr">
						<view class="pr">
							<Pic :src="item.pic" :height="'170rpx'" :width="'170rpx'" :mode="'aspectFit'" :back="'#f1f1f1'" />

							<image v-if="item.productStock<=0" class="center" :src="`${baseImageUrl}/spike_sellout@2x.png`"
							 mode="scaleToFill" style="width: 120rpx;height: 120rpx;"></image>
						</view>

						<view class="content ml10">
							<view class="title fz15 fb more-hidden" style="line-height: 46rpx;">
								{{item.name}}
							</view>
							<view>
								<text class="limit_time fz12 mr5">{{utils.getHourMinute(item.beginTime)}}开售</text> <text class="limit_count fz12">限量{{item.productStock}}件</text>
							</view>
							<view class="progress ftm">

								<view class="line">

									<view class="length" :style="[{width:getPercent(item.sale,item.productStock),'height':'100%'}]"></view>
								</view>
								<view class="text ml10 cccc fz12">已抢{{item.sale}}件</view>
							</view>
							<view class="" style="height: 17px;">
								<!-- <TextTimer :startTime="'2020-03-08 18:04:00'" :endTime="'2020-03-08 20:00:00'" ref="texttimer" @update="updateStatus"></TextTimer> -->
								<view>
									<view class="left_time" v-if="item.status==1">
										<text class="fz12 c666">活动即将开始</text>
									</view>
									<view class="left_time" v-if="item.status==2">
										<text class="fz12 c666">距离价格变更还剩:</text><text class="fz12" style="color: red;">{{item.time || "00:00:00"}}</text>
									</view>
									<view class="left_time" v-if="item.status==0">
										<text class="fz12 c666">预售已结束</text>
									</view>
								</view>
							</view>


							<view class="price">
								<text class="now fz19 fb">¥{{item.price}}</text>
							</view>
						</view>

						<view class="button pa">
							<view class="go ftm cfff" v-if="item.status==2">抢先购
								<van-icon name="arrow" style="margin-top: 7.9rpx;" />
							</view>
							<view class="out ftm cfff" v-if="item.status==0">已预售完</view>
							<view class="go ftm cfff" v-if="item.status==1">查看详情</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<Layer :isLoaded="isLoaded" class="fill"></Layer>
	</view>
</template>

<script module="utils" lang="wxs" src="../../../utils/util.wxs" />
<script>
	let opt = null,
		pages = null;
	import SeckillHeader from '../../../mycomponents/seckill-header/seckill-header.vue'
	import Api from "../../../utils/api.js"
	let timer =null;
	export default {
		components: {
			SeckillHeader
		},
		data() {
			return {
				isLoaded: false,
				list: [],
				dates: [],
				timer:null
			};
		},
		computed: {
			getPercent(){
				return function(left=0,all=0){
					return Math.ceil((left/all)*100)+'%'
				}
			}
		},
		onLoad(options) {
			//页面信息答应
			this.setPage(options);
			//获取日期
			this.getNextDates();
			//获取列表
			this.getMatchData();
		},

		onUnload() {
			clearInterval(this.timer);
		},

		methods: {
			//开启监听器
			starttimer(){
				this.timer = setInterval(()=>{
					this.list.forEach((item,index)=>{
						Api.timelistener(
							item.beginTime.replace(/-/g,"/"),	
							item.endTime.replace(/-/g,"/"),
							()=>{
								this.$set(this.list[index],'status',1)
							},
							(seconds)=>{
								this.$set(this.list[index],'status',2)
								const addZero = this.$tools.addZero;
								seconds =Math.floor(seconds/1000);
								this.$set(this.list[index],'time',addZero(Math.floor(seconds/3600))+":"+addZero(Math.floor((seconds%3600)/60))+":"+addZero(seconds%60))
							},
							()=>{
								this.$set(this.list[index],'status',0)
							}
						)
					})					
				},1000)
			},
			setPage(options) {
				// console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
				opt = options;
				pages = getCurrentPages();
			},
			
			//页面跳转
			navigateTo(e) {
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},

			//显示以后日期数
			getNextDates() {
				function mapWeekDate() {
					return function(number = 0) {
						const map = new Map([
							[0, "周天"],
							[1, "周一"],
							[2, "周二"],
							[3, "周三"],
							[4, "周四"],
							[5, "周五"],
							[6, "周六"],
						])
						return map.get(number)
					}
				}
				const fn = mapWeekDate();
				let arr = [];
				for (let i = 0; i < 5; i++) {
					let nextDate = new Date();
					nextDate.setDate(new Date().getDate() + i)
					arr.push({
						date: this.$tools.dateFormat("YYYY-mm-dd", nextDate),
						title: this.$tools.dateFormat("mm月dd日", nextDate),
						tag: fn(nextDate.getDay())
					})
				}
				this.dates = arr;
			},
			//获取匹配的数据
			async getMatchData() {
				const index = this.$refs.header.activeIndex;
				const result = await this.$net.sendRequest("/yuShou/getPmsProductYuShouList", {
					date: this.dates[index].date
				}, "GET");
				this.list = result.sort((itemA,itemB)=>{return itemA.sort-itemB.sort});
				this.isLoaded = true;
				this.starttimer();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		border-radius: 18rpx;
		overflow: hidden;
		min-height: 210rpx;

		.progress {}

		.line {
			@include wh(220rpx, 8rpx);
			border-radius: 8rpx;
			overflow: hidden;
			border: 1px solid #1AAE68;

			.length {
				background: linear-gradient(101deg, rgba(26, 174, 104, 1) 0%, rgba(136, 207, 118, 1) 100%);
			}
		}

		.limit_count {
			color: #33BAC5;
		}

		.limit_time {
			color: #23B166;
		}

		.price {
			.now {
				color: #1AAE68;
			}

			.old {
				color: #C2C2C2;
				text-decoration: line-through;
				margin-left: 15rpx;
			}
		}

		.button {
			bottom: 20rpx;
			right: 20rpx;

			>view {
				padding: 4rpx 20rpx;
				border-radius: 26px;
				overflow: hidden;
			}

			.go {
				background: linear-gradient(101deg, rgba(26, 174, 104, 1) 0%, rgba(136, 207, 118, 1) 100%);
				box-shadow: 1px 8px 18px 0px rgba(125, 203, 117, 0.48);
			}

			.out {
				background: #C9C9C9;
			}

			.ready {
				background: #59C08F;
			}
		}
	}
</style>
