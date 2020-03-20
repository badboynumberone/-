<template>
	<view class="main"  style="background-color: #f1f1f1;">
		<view class="container" style="background-color: #f1f1f1;">
			<view id="content" style="height: 150rpx;">
				<SeckillHeader ref="header" :navs="arr" @menuclick="getMatchData"></SeckillHeader>	
			</view>
			<view class="wrapper pl10 pr10 pr pb10">
				<view class="mb15" v-if="list[activeIndex].length" v-for="(item,index) in list[activeIndex]" :key="index" @click="navigateTo($event,item)" :data-url="'/pages/index/product/product?id='+item.productId+'&killId='+item.id">
					<!-- <SeckillItem ref="item" :single="item" :state="timerState"></SeckillItem> -->
					<view class="item ftm p10 bgfff pr" >
						<view class="pr">
							<Pic :src="item.pic" :height="'170rpx'" :width="'170rpx'" :mode="'aspectFit'" :back="'#f1f1f1'"/>
					
							<image v-if="item.productQgNumber-item.correntStock==item.productQgNumber" class="center" :src="`${baseImageUrl}/spike_sellout@2x.png`" mode="scaleToFill" style="width: 120rpx;height: 120rpx;"></image>
						</view>
						
						<view class="content ml10">
							<view class="title fz15 fb more-hidden" style="line-height: 46rpx;">
								{{item.name}}
							</view>
							<view >
								<text class="limit_time fz12 mr5">{{utils.getHourMinute(item.beginTime)}}开抢</text> <text class="limit_count fz12">限量{{item.productQgNumber}}件</text> 
							</view>
							<view class="progress ftm pt5">
								
								<view class="line">
									
									<view class="length" :style="[{width:getPercent(item.productQgNumber-item.correntStock,item.productQgNumber),'height':'100%'}]"></view>
								</view>
								<view class="text ml10 cccc fz12">已抢{{item.productQgNumber-item.correntStock}}件</view>
							</view>
							<view class="">
								<!-- <TextTimer :startTime="'2020-03-08 18:04:00'" :endTime="'2020-03-08 20:00:00'" ref="texttimer" @update="updateStatus"></TextTimer> -->
								<view>
									<view class="left_time" v-if="getStatus(item.beginTime,item.endTime)==1">
										<text class="fz12 c666">活动即将开始</text>
										<!-- <text class="fz12 c666" style="color: #1AAE68;">{{hour}}:{{minute}}:{{second}}</text> -->
									</view>
									<view class="left_time" v-if="getStatus(item.beginTime,item.endTime)==2">
										<text class="fz12" style="color: red;">正在抢购中</text>
									</view>
									<view class="left_time" v-if="getStatus(item.beginTime,item.endTime)==0">
										<text class="fz12 c666">活动已结束</text>
									</view>
								</view>
							</view>
							
							
							<view class="price">
								<text class="now fz21 fb">¥{{item.productQgPrice}}</text>
								<text class="old fz13">¥{{item.productPrice}}</text>
							</view>
							
						</view>
						
						<view class="button pa">
							<view class="go ftm cfff" v-if="getStatus(item.beginTime,item.endTime)==2">去抢购<van-icon name="arrow" style="margin-top: 7.9rpx;" /></view>
							<view class="out ftm cfff" v-if="getStatus(item.beginTime,item.endTime)==0">已抢完</view>
							<view class="go ftm cfff"  v-if="getStatus(item.beginTime,item.endTime)==1">查看详情</view>
						</view>
					</view>
				</view>
				<MyEmpty v-if="!list[activeIndex].length" :height="height"></MyEmpty>
			</view>
		</view>
		<Layer :isLoaded="isLoaded" class="fill" ></Layer>
	</view>
</template>
<script module="utils" lang="wxs" src="../../../utils/util.wxs" />
<script>
	import SeckillHeader from '../../../mycomponents/seckill-header/seckill-header.vue'
	import MyEmpty from "../../../mycomponents/my-empty/my-empty.vue"
	let opt = null,pages=null;let timer = null;
	export default {
		components:{
			SeckillHeader,MyEmpty
		},

		data() {
			return {
				isLoaded:false,
				baseImageUrl:getApp().globalData.baseImageUrl,
				list:[],
				activeIndex:0,
				timerState:true,
				status:0,
				arr:[{
					title:"今天",
					tag:"正在开抢中"
				},
				{
					title:"明天",
					tag:"即将开抢"
				},
				{
					title:"后天",
					tag:"即将开抢"
				}],
				height:""
			};
		},
		computed:{
			
			getPercent(){
				return function(left=0,all=0){
					return Math.ceil((left/all)*100)+'%'
				}
			},
			getStatus(){
				return function(startTime="",endTime=""){
					let now = new Date();
					startTime = new Date(startTime.replace(/-/g,"/"));
					endTime = new Date(endTime.replace(/-/g,"/"));
					let s_n = startTime.getTime()-now.getTime();
					let e_n = endTime.getTime()-now.getTime();
					let seconds = null;
					let status = null;
					//活动未开始
					if(s_n>0){
						seconds =s_n;
						status = 1;
					}
					//活动进行中
					if(s_n<0 && e_n>0){
						seconds =e_n;
						status = 2;
					}
					//活动已结束
					if(e_n<0){
						status = 0;
					}
					return status
				}
			}
		},
		async onLoad(options) {
			//计算高度
			 this.changeHeight();
			await this.getKillData();
		},
		onShow() {
			this.timerState = true;
		},
		onHide() {
			console.log("asd")
			this.timerState = false;
		},
		onUnload() {
			console.log("asdasdasd")
			this.timerState = false;
		},
		methods:{
			//计算长方形高度
			changeHeight(){
				this.$nextTick(()=>{
					const query = wx.createSelectorQuery().in(this)
					   query.select('#content').boundingClientRect((res)=>{
						   console.log(res.height)
					     // 这个组件内 #the-id 节点的上边界坐标
						 console.log(wx.getSystemInfoSync().windowHeight)
						 this.height = (wx.getSystemInfoSync().windowHeight-res.height-20) + 'px';
						 // this.$emit("heightEmit",res.height);
					   }).exec()
				})				
			},
			//获取对应的信息
			getMatchData(){
				this.activeIndex = this.$refs.header.activeIndex
			},
			//获取秒杀商品数据
			async getKillData(){
				let result = await this.$net.sendRequest("/qiangGou/getRedisQgGoods",{},"GET");
				this.list = [result.todayList,result.tomorrowList,result.houTianList];
				this.isLoaded = true;
			},
			//页面跳转
			navigateTo(e,item) {
				if(!this.getStatus(item.beginTime,item.endTime)){
					return
				}
				this.$nextTick(()=>{
					this.$tools.navigateTo(e.currentTarget.dataset.url)
				})
			},
			starttimer(){
				this.timer = setInterval(()=>{this.updateTime()},1000);
			},
			updateTime(){
				let now = new Date();
				let startTime = new Date(this.startTime);
				let endTime = new Date(this.endTime);
				let s_n = startTime.getTime()-now.getTime();
				let e_n = endTime.getTime()-now.getTime();
				let seconds = null;
				
				//活动未开始
				if(s_n>0){
					seconds =s_n;
					this.status = 1;
				}
				//活动进行中
				if(s_n<0 && e_n>0){
					seconds =e_n;
					this.status = 2;
				}
				//活动已结束
				if(e_n<0){
					this.status = 0;
				}
			},
			clearTimer(){
				clearInterval(this.timer);
			}
		}
	}
</script>

<style lang="scss" scoped>
.item{
		border-radius:18rpx;
		overflow: hidden;
		min-height: 210rpx;
		.progress{
			
		}
		.line{
			@include wh(220rpx,8rpx);
			border-radius: 8rpx;
			overflow: hidden;
			border: 1px solid #1AAE68;
			.length{
				background:linear-gradient(101deg,rgba(26,174,104,1) 0%,rgba(136,207,118,1) 100%);
			}
		}
		.limit_count{
			color: #33BAC5;
		}
		.limit_time{
			color: #23B166;
		}
		.price{
			.now{
				color: #1AAE68;
			}
			.old{
				color: #C2C2C2;
				text-decoration: line-through;
				margin-left:15rpx;
			}
		}
		
		.button{
			bottom:20rpx;
			right: 20rpx;
			>view{
				padding: 7.5rpx 20rpx;
				border-radius:26px;
				overflow: hidden;
			}
			.go{
				background:linear-gradient(101deg,rgba(26,174,104,1) 0%,rgba(136,207,118,1) 100%);
				box-shadow:1px 8px 18px 0px rgba(125,203,117,0.48);
			}
			.out{
				background: #C9C9C9;
			}
			.ready{
				background: #59C08F;
			}
		}
	}
</style>
