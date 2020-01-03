<template>
	<view class="main">
		<view class="title p10">
			感谢您提出宝贵的意见,我们将虚心接受您的批评与意见，努力更改。
		</view>
		<view class="textarea bgfff pr p10 pb20">
			<textarea class="fill" v-model="content" placeholder="请输入您的意见" maxlength="1000" />
			<text class="pa">{{content.length}}/1000</text>
		</view>
		<view class="upload bgfff mt20 p10">
			<UploadImg ref="upload" :url="'sdafdf'" :length="8"></UploadImg>
		</view>
		
		<!-- 添加地址按钮 -->
		<view class="button pf" @click="onSub" :data-url="'/pages/me/address/address'">
			<view  class="pt10 pb10" style="width: 95%;margin: 0 auto;">
				<van-button :color="'linear-gradient(142deg,rgba(26,174,104,1) 0%,rgba(124,206,89,1) 100%)'" block round ><text style="color: #fff;">提交</text></van-button>
			</view>
		</view>
	</view>
</template>

<script>
	let opt = null,pages=null,isSub=false;
	import UploadImg from "../../../mycomponents/upload_img/upload_img.vue";
	export default {
		components:{
			UploadImg
		},
		data() {
			return {
				content:''//内容
			};
		},
		computed:{
			
		},
		onLoad(options) {
			//页面信息答应
			this.setPage(options);
		},
		methods:{
			setPage(options){
				console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
				opt = options;pages=getCurrentPages();
			},
			//提交页面
			async onSub(){
					if(!this.content) {this.$tools.Toast('意见不能为空哦');return}
					wx.showLoading({
						title:"提交中...",
						mask:true
					});
					isSub = true;
					await this.$refs.upload.uploadFiles();
					const result  = await this.$net.sendRequest("/feedback/add",{
						content:this.content
					})
					wx.hideLoading();
					isSub = false;
					this.$tools.Toast("反馈成功!","success");
					let timer = setTimeout(()=>{uni.navigateBack();clearTimeout(timer)},500)
			},
		
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		background: #F0F0F0;
	}
	.textarea{
		@include wh(100%,200rpx);
		text{
			right: 0px;
			bottom: 0px;
			color: #666;
		}
	}
	.bgfff{
		background: #fff;
	}
	.button{
		width: 100%;
		bottom: 0px;
		left: 0px;
	}
</style>
