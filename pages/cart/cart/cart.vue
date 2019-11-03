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
				<van-checkbox :value="item.ischecked" @change="onGoodsChange(idx,index)" />
				<view class="info f ml10 pr">
					<view class="pa" style="height: 100%;width: 220px;opacity: 0;z-index: 9;top: 0px;left: 0px;" @click="navigateTo" :data-url="'/pages/index/product/product'"></view>
					<Pic :src="item.goodsPic" :height="'150rpx'" :width="'150rpx'" :mode="'aspectFill'"></Pic>
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
			<van-submit-bar :price="totalPrice" :button-text="isEdit?'删除':'提交订单'" @submit="onClickButton" :tip="true">
				<view class="pl10">
					<van-checkbox :value="isAllChecked" @change="onAllChange()">全选</van-checkbox>
				</view>
			</van-submit-bar>
			<!-- 模态框 -->
			<van-dialog id="van-dialog" confirm-button-color="#38A472" />
		</view>
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
						ischecked: false
					}, {
						goodsPic: "https://gw.alicdn.com/bao/upload/TB1YIrykbH1gK0jSZFwXXc7aXXa.jpg_Q75.jpg",
						goodsName: "云南小土豆新鲜10斤马铃薯云南小土豆新鲜10斤马铃薯云南小土豆新鲜10斤马铃薯",
						goodsSize: "10斤 5号",
						goodsPrice: 13.5,
						goodsNum: 1,
						ischecked: true
					}]
				}, {
					shopName: "南京普贸有限公司",
					goods: [{
						goodsPic: "https://gw.alicdn.com/bao/upload/TB1YIrykbH1gK0jSZFwXXc7aXXa.jpg_Q75.jpg",
						goodsName: "铃薯云南小土豆新鲜10斤马铃薯云南小土豆新鲜10斤马铃薯",
						goodsSize: "10斤 5号",
						goodsPrice: 13.5,
						goodsNum: 1,
						ischecked: true
					}, {
						goodsPic: "https://gw.alicdn.com/bao/upload/TB1YIrykbH1gK0jSZFwXXc7aXXa.jpg_Q75.jpg",
						goodsName: "铃薯云南小土豆新鲜10斤马铃薯云南小土豆新鲜10斤马铃薯",
						goodsSize: "10斤 5号",
						goodsPrice: 13.5,
						goodsNum: 3,
						ischecked: true
					}]
				}, ],
				checked: false
			}
		},
		computed: {
			//店铺是否全选
			isStoreChecked() {
				return function(arr = [{
					ischecked: false
				}]) {
					return arr.every((item)=>item.ischecked==true);
				}
			},
			// 商品是否全选
			isAllChecked(){
				let arr=[];
				this.cartData.forEach(item=>{arr=[...arr,...item.goods]});
				return this.cartData==false ? false:arr.every((item)=>item.ischecked==true);
			},
			//计算已选商品的数量
			selectedCount(){
				let count = 0;
				this.cartData.forEach((item,idx)=>{
					item.goods.forEach((single,index)=>{
						if(single.ischecked){
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
						if(single.ischecked){
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
						this.$set(this.cartData[idx].goods[index],'ischecked',!flag);
					});
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
						message: '确认删除这3件商品吗?'
					}).then(() => {
						// on confirm
					}).catch(() => {
						// on cancel
					});
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
