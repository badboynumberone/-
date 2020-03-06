<template>
	<view class="main"  v-if="baseImageUrl">
		<view class="top f p20">
			<view class="mr20">
				<Pic :width="'130rpx'" :height="'130rpx'" :mode="'aspectFit'" :src="pic"></Pic>
			</view>
			<view class="fsb" style="flex-flow: column wrap;">
				<view class="fb fz14 text-hidden" style="color: #222;width: 230px;">
					{{title}}
				</view>
				<view class="fz13" style="color:#666;margin-top: -12px;">
					物流状态:<text class="theme" style="text-indent: 5rpx;">{{status}}</text> 
				</view>
				<view style="margin-top: -15px;">
					<text class="fz12" :decode="true" style="color: #666;">{{company}} : {{logisticsNum}}</text>
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
	let pages = null,opt = null;
	import logCompany from '../../../json/logisitic_company.js';
	export default {
		data() {
			return {
				isLoaded:false,
				title:"",
				pic:"",
				company:'',
				status:'',
				logisticsNum:'',//物流单号
				steps: [
				      {
				        text: '',
				        desc: ''
				      },
				      {
				        text: '',
				        desc: ''
				      },
				      {
				        text: '',
				        desc: ''
				      },
				      {
				        text: '',
				        desc: ''
				      }
				    ],
				active:""
			};
		},
		onLoad(options) {
			console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
			pages = getCurrentPages(),opt = options;
			//获取数据
			this.getData(options);
		},
		methods:{
			//获取数据
			async getData(options){
				wx.showLoading({
					title:"加载中...",
					mask:true
				})
				const item = JSON.parse(options.item); 
				//获取商品信息
				this.title = item.items[0].productName,
				this.pic = item.items[0].productPic;
				
				//获取物流信息
				const result = await this.$net.sendRequest("/common/queryExpress",{
					orderNo:item.orderNoString
				},"GET");
				let info = JSON.parse(result);
				[this.status,this.logisticsNum,this.company] = [info.data[info.data.length-1].status,info.nu,
				logCompany.RECORDS.find(item=>item.logistics_code==info.com).logistics_name];
				this.steps = info.data.map(item=>{
					item.text = item.time + ' (' + item.status + ')' ;
					item.desc = item.context.slice(1);
					delete item.time;delete item.areaCode;
					delete item.status;delete item.ftime;
					delete item.context;
					return item;
				})
				await this.$tools.sleep(100);
				wx.hideLoading();this.isLoaded = true;
			}
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
