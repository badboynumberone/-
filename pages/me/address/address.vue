<template>
	<view class="main pr">
		
		<!-- 输入框 -->
		<van-cell-group>
			<van-field required label="收货人" maxlength="15" :value="name" placeholder="请输入姓名" clearable  @change="onChange" data-name="name" />
			<van-field required type="number" maxlength="11" label="手机号码" :value="phone" placeholder="请输入手机号码" clearable  @change="onChange" data-name="phone" />
			<picker mode="multiSelector" :range="multiArray" @change="bindRegionChange" :value="area" >
				<van-field required is-link label="所在地区" :value="area" placeholder="请选择省市区"   data-name="area" readonly />
			 </picker>
			<!-- <van-field required label="邮政编码" type="number" maxlength="6" :value="postcode" placeholder="请输入邮政编码" clearable  @change="onChange" data-name="postcode" /> -->
			<van-field required type="textarea" autosize label="详细地址" maxlength="50"  :value="detail" placeholder="街道门牌,楼层房间号等信息" clearable  @change="onChange" data-name="detail" />
		</van-cell-group>
		
		<!-- 保存按钮 -->
		<view class="button pa" @click="perserve">
			<my-button :type="1" :text="'保存'"></my-button>
		</view>
		
		
	</view>
</template>

<script>
	const regionCodeMap=new Map([
		['玄武区',320102] ,
		['秦淮区',320104], 
		['鼓楼区',320106], 
		['建邺区',320105], 
		['栖霞区',320113], 
		['雨花台区',320113], 
		['浦口区',320111], 
		['江宁区',320115], 
		['六合区',320116], 
		['溧水区',320117], 
		['高淳区',320118]		
	])
	import MyButton from "../../../mycomponents/my-button/my-button.vue";
	export default {
		components: {
			MyButton
		},
		data() {
			return {
				multiArray: [['江苏省'], ['南京市'], ['玄武区', '秦淮区', '鼓楼区', '建邺区', '栖霞区', '雨花台区', '浦口区', '江宁区', '六合区', '溧水区', '高淳区']],
				id:0,
				name:"",
				phone:"",
				area:[],
				detail:"",
				postcode:"",
				status:0
			}
		},
		onLoad(options) {
			console.log(getCurrentPages()[getCurrentPages().length-1].route,options)
			this.getData(options);
		},
		methods:{
			//获取数据
			getData(options){
				if(options.index!=undefined){
					console.log(getCurrentPages()[getCurrentPages().length-2].data.list)
					const item = getCurrentPages()[getCurrentPages().length-2].data.list[options.index];
					[this.id,this.name,this.phone,this.area,this.detail,this.status]=[item.id,item.name,item.phoneNumber,[item.province,item.city,item.region],item.detailAddress,item.defaultStatus];
				}
			},
			//数据绑定
			onChange(e){
				this[e.currentTarget.dataset.name] = e.detail;
			},
			//绑定地区
			bindRegionChange(e){
				this.area = ['江苏省','南京市',this.multiArray[2][e.detail.value[2]]];
			},
			//保存 记录
			async perserve(){
				//检验表单
				if(!this.checkForm()){
					return;
				}
				//准备数据
				let readData = {
					name:this.name,
					phoneNumber:this.phone,
					defaultStatus:this.id ? this.status : !this.$store.state.addressList.length ? 1 :0,
					province:this.area[0],
					city:this.area[1],
					region:this.area[2],
					detailAddress:this.detail,
					cityCode:320100,
					regionCode:regionCodeMap.get(this.area[2])
				};
				
				const result = await this.$net.sendRequest(this.id ?`/member/address/update/${this.id}`:`/member/address/add`,readData);
				this.$store.dispatch("getUserAddress");
				this.$tools.Toast(this.id?"编辑成功":"添加成功","success");
				let timer = setTimeout(function(){wx.navigateBack();clearTimeout(timer)},1500);
			},
			//表单验证
			checkForm(){
				
				//校验规则
				const array = [
					[!this.name.length,"收货人不能为空!"],
					[!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone),"手机号码不正确!"],
					[!this.area.length,"所在地区不能为空!"],
					[!this.detail.length,"详细地址不能为空!"]
				];
				
				//校验器
				for (let [rule,message] of array) {
					if(rule){
						this.$tools.Toast(message);
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
