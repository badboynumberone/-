<template>
	<view class="main pr">
		
		<!-- 输入框 -->
		<van-cell-group>
			<van-field required label="姓名" maxlength="15" :value="name" placeholder="请输入姓名" clearable  @change="onChange" data-name="name" />
			<van-field required type="number" maxlength="11" label="手机号" :value="phone" placeholder="请输入手机号码" clearable  @change="onChange" data-name="phone" />
			<picker mode="region" @change="bindRegionChange" :value="area" >
				<van-field required is-link label="地区" :value="area" placeholder="请选择省市区"   data-name="area" readonly />
			 </picker>
			<van-field required type="textarea" autosize label="详细地址" maxlength="50"  :value="detail" placeholder="街道门牌,楼层房间号等信息" clearable  @change="onChange" data-name="detail" />
		</van-cell-group>
		
		<!-- 保存按钮 -->
		<view class="button pa pt10 pb10" @click="perserve">
			<my-button  :text="'保存'"></my-button>
		</view>
		
		
	</view>
</template>

<script>
	import MyButton from "../../../mycomponents/my-button/my-button.vue";
	export default {
		components: {
			MyButton
		},
		data() {
			return {
				name:"",
				phone:"",
				area:[],
				detail:""
			}
		},
		methods:{
			//数据绑定
			onChange(e){
				this[e.currentTarget.dataset.name] = e.detail;
			},
			//绑定地区
			bindRegionChange(e){
				this.area = e.detail.value;
			},
			//保存 记录
			perserve(){
				//检验表单
				if(this.checkForm()){
					return;
				}
			},
			//表单验证
			checkForm(){
				const array = [
					[!this.name.length,"姓名不能为空!"],
					[!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone),"手机格式不正确!"],
					[!this.area.length,"地区不能为空!"],
					[!this.detail.length,"详细地址不能为空!"]
				];
				for (let v of array) {
					if(v[0]){
						this.$tools.Toast(v[1]);
						return false
					}
				}
				return true;
			}
		}
	}
</script>

<style lang="scss">
	@import './../../../static/styles/mixin.scss';

	.button {
		bottom: 0px;
		width: 100%;
	}
</style>
