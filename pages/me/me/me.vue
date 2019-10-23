<template>
	<view class="main">
		<!-- 头部 -->
		<div class="top f p20 pr">
			<button v-if="!isLogin" class="fill pa" style="top: 0px;left: 0px;opacity: 0;z-index: 99;" open-type="getUserInfo" @getuserinfo="getUserInfo"></button>
			
			<div class="left mr20">
				<Pic :height="'100%'" :width="'100%'" :mode="'aspectFill'" :round="true"></Pic>
			</div>
			
			<div class="right fsr">
				<block v-if="false">
					<view class="fb fz18">
						User
					</view>
					<view class="fz14" style="margin-top: -20px;">
						136****0335
					</view>
				</block>
				<block v-else>
					<view class="fb fz18">
						用户登录
					</view>
				</block>
			</div>
		</div>
		<!-- 购物流程 -->
		<div class="body p20">
			<div class="wrapper pl20 pr20">
				<view class="title fsb pt10">
					<text class="fz19 fb">我的订单</text>
					<text class="fz12" style="color:#ccc">查看全部&gt;</text>
				</view>
				<view class="box pt10 pb10">
					<uni-grid :column="5" :show-border="false"  :square="false">
					    <uni-grid-item v-for="(item,index) in keys" :key="index">
							<view class="pic_item pr">
								<Pic :src="item.src" :height="'45px'" :width="'45px'" :mode="'aspectFill'"></Pic>
								<view v-if="item.num" class="pa num">{{item.num}}</view>
							</view>
							
					        <text class="text fz12" style="color: #222;">{{item.text}}</text>
					    </uni-grid-item>
					</uni-grid>
				</view>
			</div>
		</div>
		
		<!-- 底部菜单栏 -->
		<div class="bottom">
			<van-cell-group>
			  <van-cell icon="location-o" title="收货地址管理" is-link @click="navigateTo" data-url="/pages/me/address_list/address_list" />
			</van-cell-group>
			
		</div>
		<!-- 版权所有 -->
		<div class="copyright">
		  @copyright 2019 All Rights Reserverd
		</div>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	let pages = null;
	export default {
		components:{
			uniGrid,uniGridItem
		},
		data() {
			return {
				keys:[
					{text:"待付款",url:"",src:"/static/images/Pending-payment@2x.png",num:1},
					{text:"待发货",url:"",src:"/static/images/shipped@2x.png",num:0},
					{text:"待收货",url:"",src:"/static/images/Goods-to-be-received@2x.png",num:0},
					{text:"已完成",url:"",src:"/static/images/complete@2x.png",num:0},
					{text:"退货退款",url:"",src:"/static/images/refund@2x.png",num:0}
				]
			}
		},
		onLoad(){
			pages = getCurrentPages();
		},
		computed:{
			isLogin(){
				return this.$store.state.hasLogin
			}
		},
		methods: {
			refresh(){
				const lastpages = pages[pages.length-2];
				lastpages.hook(true);
			},
			//获取用户信息
			getUserInfo(){
				
			},
			//页面跳转
			navigateTo(e){
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';
	
	.top{
		background: url("https://fc3tn.baidu.com/it/u=819511735,1750414951&fm=202&src=bqdata") no-repeat center/cover;
		.left{
			@include borderRadius(90px);
			border: 1px solid #fff;
			 box-shadow:0px 0px 5px 2px #E8E8E8;
		}
		.right{
			flex-flow: column wrap;
		}
	}
	
	.body{
		.wrapper{
			 box-shadow:0px 0px 5px 2px #E8E8E8;
			 border-radius: 10px;
			 overflow: hidden;
			.title{
				
				align-items: center;
			}
		}
		.box{
			.pic_item{
				.num{
					padding: 0px 7px;
					background:red;
					@include sc(12px,#fff);
					border-radius: 20px;
					top:-10px;
					right: -10px;
				}
			}
		}
	}
	
	.copyright{
	  width: 100%;
	  line-height: 100rpx;
	  background: #ffff;
	  @include sc(11px,#666);
	  text-align: center;
	}
</style>
