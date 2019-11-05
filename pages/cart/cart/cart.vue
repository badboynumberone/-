<template>
	<view class="main">
		<!-- 编辑栏 -->
		<view class="top_bar fsb p10 pf">
			<text class="good_count fz10">已选{{selectedCount}}件商品</text>
			<view class="good_edit" @click="editGoods">
				<view v-if="!isEdit" style="display: inline-block;transform: translateY(2px);">
					<van-icon name="edit" />
				</view>
				<text>{{isEdit?'完成':'编辑商品'}}</text>
			</view>
		</view>
		<view style="height: 46px;"></view>

		<!-- 商品内容 -->
		<view class="container" v-for="(single,idx) in cartData" :key="idx">
			<view class="header ftm p10">
				<van-checkbox :value="isStoreChecked(single.goods)" @change="onStoreChange(idx)" />
				<view class="store ftm ml10" @click="navigateTo" :data-url="'/pages/index/store_details/store_details'">
					<view class="icon mr5">
						<van-icon name="shop-o" :size="'20x'" />
					</view>
					<text class="fb">{{single.shopName}}</text>
					<view class="icon right">
						<van-icon name="arrow" :color="'#ccc'" />
					</view>
				</view>
			</view>
			<view class="content ftm p10" v-for="(item,index) in single.goods" :key="index">
				
				<view class="pr10 ftm pr" style="height: 75px;width: 100%;" >
						<van-checkbox :class="'key-'+idx+'-'+index" v-if="!((item.status==1&&item.leftNum<=0) || (item.status==2)&&!isEdit)" :value="item.ischecked" @change="onGoodsChange(idx,index)" />
						<view class="pa" style="top: 0px;left: 0px;z-index: 9;width: 30px;height: 100%;" @click="clickCheckHandle($event,idx,index)"></view>
				</view>
				
				<view class="info f  pr">
					<view class="pa" style="height: 100%;width: 220px;opacity: 0;z-index: 9;top: 0px;left: 0px;" @click="navigateTo" :data-url="'/pages/index/product/product'"></view>
					<view class="pr">
						<Pic :src="item.goodsPic" :height="'150rpx'" :width="'150rpx'" :mode="'aspectFill'"></Pic>
						<view class="status center" v-if="item.status==1&&item.leftNum<=0">已售罄</view>
						<view class="status center" v-if="item.status==2">已下架</view>
						<view class="left pa" v-if="item.status==1&&item.leftNum<=5&&item.leftNum>0">仅剩{{item.leftNum}}件</view>
					</view>
					<view class="text f ml10">
						<text class="text-hidden" style="width: 230px;">{{item.goodsName}}</text>
						<text class="text-hidden fz10 size" :decode="true" style="width: 240px;">{{item.goodsSize}}</text>
						<view class="price fz16 fb fsb">
							<text>￥{{item.goodsPrice}}</text>
							<view style="transform: scale(0.8,0.8);">
								<van-stepper :value="item.goodsNum" @change="onCountChange($event,idx,index)"  />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 加载更多 -->
		<load-more :tip="'到底了'" :loading="false" />
		<view style="height: 50px;"></view>
		<!-- 底部结算条 -->
		<view class="submit_bar pf">
			<van-submit-bar :price="totalPrice" :button-text="isEdit?`删除`:`结算(${selectedCount})`" @submit="onClickButton" :tip="true">
				<view class="pl10">
					<van-checkbox :value="isAllChecked" @change="onAllChange()">全选</van-checkbox>
				</view>
			</van-submit-bar>
		</view>
		<!-- 模态框 -->
		<van-dialog id="van-dialog" confirm-button-color="#38A472" :z-index="999" />
	</view>
</template>

<script>
	import Dialog from '../../../wxcomponents/vant/dialog/dialog';
	export default {
		components: {

		},
		data() {
			return {
				allRadio: '1',
				isEdit: false, //顶部文案
				cartData: [{
					shopName: "南京普朗克科贸有限公司",
					goods: [{
						goodsPic: "https://gw.alicdn.com/bao/upload/TB1YIrykbH1gK0jSZFwXXc7aXXa.jpg_Q75.jpg",
						goodsName: "云南小土豆新鲜10斤马铃薯云南小土豆新鲜10斤马铃薯云南小土豆新鲜10斤马铃薯",
						goodsSize: "10斤 5号",
						goodsPrice: 13.5,
						goodsNum: 1,
						ischecked: false,
						status:1,
						leftNum:10
					}, {
						goodsPic: "https://gw.alicdn.com/bao/upload/TB1YIrykbH1gK0jSZFwXXc7aXXa.jpg_Q75.jpg",
						goodsName: "云南小土豆新鲜10斤马铃薯云南小土豆新鲜10斤马铃薯云南小土豆新鲜10斤马铃薯",
						goodsSize: "10斤 5号",
						goodsPrice: 13.5,
						goodsNum: 1,
						ischecked: true,
						status:2,
						leftNum:3
					}]
				}, {
					shopName: "南京普贸有限公司",
					goods: [{
						goodsPic: "https://gw.alicdn.com/bao/upload/TB1YIrykbH1gK0jSZFwXXc7aXXa.jpg_Q75.jpg",
						goodsName: "铃薯云南小土豆新鲜10斤马铃薯云南小土豆新鲜10斤马铃薯",
						goodsSize: "10斤 5号",
						goodsPrice: 13.5,
						goodsNum: 1,
						ischecked: true,
						status:2,
						leftNum:4
					}, {
						goodsPic: "https://gw.alicdn.com/bao/upload/TB1YIrykbH1gK0jSZFwXXc7aXXa.jpg_Q75.jpg",
						goodsName: "铃薯云南小土豆新鲜10斤马铃薯云南小土豆新鲜10斤马铃薯",
						goodsSize: "10斤 5号",
						goodsPrice: 13.5,
						goodsNum: 3,
						ischecked: true,
						status:1,
						leftNum:2
					}]
				}, ],
				checked: false
			}
		},
		computed: {
			//店铺是否全选
			isStoreChecked() {
				let _this = this;
				return function(arr = [{
					ischecked: false
				}]) {
					arr = arr.filter(item=>!((item.status==1&&item.leftNum<=0) || (item.status==2)&&!_this.isEdit));
					return arr.every((item)=>item.ischecked==true);
				}
			},
			// 商品是否全选
			isAllChecked(){
				let arr=[];let _this = this;
				this.cartData.forEach(item=>{arr=[...arr,...item.goods]});
				arr = arr.filter(item=>!((item.status==1&&item.leftNum<=0) || (item.status==2)&&!_this.isEdit));
				return this.cartData==false ? false:arr.every((item)=>item.ischecked==true);
			},
			//计算已选商品的数量
			selectedCount(){
				let count = 0;
				this.cartData.forEach((item,idx)=>{
					item.goods.forEach((single,index)=>{
						if(!this.isEdit && single.ischecked && !((single.status==1&&single.leftNum<=0) || (single.status==2))){
							count++;
						}
						if(this.isEdit && single.ischecked){
							count++;
						}
					})
				});
				return count;
			},
			// 计算总价
			totalPrice(){
				let total = 0;
				this.cartData.forEach((item,idx)=>{
					item.goods.forEach((single,index)=>{
						if(single.ischecked && !((single.status==1&&single.leftNum<=0) || (single.status==2))){
							total+=(single.goodsPrice*100*single.goodsNum);
						}
					})
				});
				return this.isEdit ? 'delete' : total;
			}
		},
		methods: {
			//页面跳转
			navigateTo(e) {
				this.$tools.navigateTo(e.currentTarget.dataset.url)
			},
			//改变数量
			onCountChange(e,idx,index) {
				this.$set(this.cartData[idx].goods[index],'goodsNum',e.detail);
			},
			//当所有选项发生变化
			onAllChange(e) {
				const flag = this.isAllChecked;
				this.cartData.forEach((item,idx)=>{
					item.goods.forEach((single,index)=>{
						this.$set(this.cartData[idx].goods[index],'ischecked',!flag);
					})
				});
			},
			// 当店铺复选框改变的时候
			onStoreChange(idx){
					const flag = this.cartData[idx].goods.every((item)=>item.ischecked==true);
					this.cartData[idx].goods.forEach((item,index)=>{
						item.ischecked = !flag
					});
			},
			clickCheckHandle(e,idx,index){
				const checkbox = this.$mp.page.selectComponent(`.key-${idx}-${index}`);
				console.log(checkbox)
				checkbox.toggle();
			},
			//当商品复选框改变时
			onGoodsChange(idx,index){
				this.$set(this.cartData[idx].goods[index],'ischecked',!this.cartData[idx].goods[index].ischecked);
			},
			//点击底部按钮
			onClickButton() {
				if (this.isEdit) {
					Dialog.confirm({
						title: '提示',
						message: `确认删除这${this.selectedCount}件商品吗?`
					}).then(() => {
						// on confirm
					}).catch(() => {
						// on cancel
					});
				}
				
				//如果是结算
				if(!this.isEdit){
					//深度拷贝
					if(this.selectedCount<=0){
						this.$tools.Toast("您还没有选择宝贝哦")
						return;
					}
					const cartData = JSON.parse(JSON.stringify(this.cartData));
					const checkedResult = cartData.filter(item=>{
						const filterResult = item.goods.reduce((arr,single)=>{
							   const flag = !(single.status==1&&single.leftNum<=0 || single.status==2) && single.ischecked;
							   return flag ? [...arr,single]:arr
						},[]);
						if(filterResult!=false){
							item.goods=filterResult;
						}
						return filterResult!=false
					});
					this.$tools.navigateTo("/pages/cart/submit_order/submit_order");
				}

			},
			//编辑商品
			editGoods() {
				this.isEdit = !this.isEdit;
			}

		}
	}
</script>

<style lang="scss" scoped>
	@import './../../../static/styles/mixin.scss';

	.container {
		&:not(:first-child) {
			border-top: 5rpx solid #f1f1f1;
		}

		.header {
			border-bottom: 1rpx solid #f1f1f1;

			.icon {
				transform: translateY(2px);
			}
		}

		.content {
			align-items: center;
			
			.info {
				.status{
					@include borderRadius(110rpx);
					background: rgba(0,0,0,0.6);
					line-height: 110rpx;
					text-align: center;
					z-index: 0;
					@include sc(12px,#f1f1f1);
				}
				.left{
					@include sc(12px,#f1f1f1);
					line-height: 20px;
					width: 100%;
					text-align: center;
					z-index: 0;
					background: rgba(0,0,0,0.6);
					bottom: 0px;
					left: 0px;
				}
				.text {
					flex-flow: column wrap;

					.size {
						color: #727272;
					}

					.price {
						align-items: center;

						>text {
							color: $theme;
						}
					}
				}
			}
		}
	}

	// 顶部栏
	.top_bar {
		width: 100%;
		top: 0rpx;
		align-items: center;
		background: #fff;
		z-index: 99;

		.good_count {
			color: #666;
		}

		.good_edit {
			color: #222;
		}

		box-shadow:0px 3px 2px #f1f1f1;
		border-top: 1rpx solid #f1f1f1;
	}

	//底部导航条
	.submit_bar {
		bottom: 0px;
	}
</style>
