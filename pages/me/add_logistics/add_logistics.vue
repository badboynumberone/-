<template>
	<view class="main"  v-if="baseImageUrl">
		<view class="container">
			<van-cell-group>
				<van-field label="收件人" :value="name" placeholder="请输入收件人姓名" border="false" @change="onChange" :data-name="'name'"
				 :maxlength="10" />
				<van-field label="物流公司" :value="company" placeholder="请输入物流公司" border="false" @change="onChange" :data-name="'company'"
				 :maxlength="10" />
				<van-field label="物流单号" :value="logisitics_no" placeholder="请输入物流单号" border="false" @change="onChange" :data-name="'logisitics_no'"
				 :maxlength="50" />
				<van-field label="手机号码" typp="number" :value="phone" placeholder="请输入手机号号码便于卖家联系您" border="false" @change="onChange"
				 :data-name="'phone'" :maxlength="11" />
			</van-cell-group>
		</view>
		<view class="pf" style="bottom: 0px;left:0px; width: 100%;" @click="onSub">
			<my-button :type="1" :text="'提交'" />
		</view>
	</view>
</template>

<script>
	let opt = null,
		pages = null,
		isSubing = false;
	import MyButton from '../../../mycomponents/my-button/my-button.vue';
	export default {
		components: {
			MyButton
		},
		data() {
			return {
				name:'',
				company: "",
				logisitics_no: "",
				phone: ''
			};
		},
		computed: {

		},
		onLoad(options) {
			//页面信息答应
			this.setPage(options);
		},
		methods: {
			//数据绑定
			onChange(e) {
				console.log(e)
				this[e.currentTarget.dataset.name] = e.detail;
			},
			setPage(options) {
				console.log(getCurrentPages()[getCurrentPages().length - 1].route, options)
				opt = options;
				pages = getCurrentPages();
			},
			//提交数据
			onSub() {
				if (!this.checkForm() || isSubing) {
					return
				}
				isSubing = true;
				uni.showLoading({
					title: "提交中",
					mask: true
				})
				const result = this.$net.sendRequest("/returnApply/updateExp", {
					id:parseInt(opt.id),
					receiveMan:this.name,
					deliveryCompany: this.company,
					deliverySn: this.logisitics_no,
					receivePhone: this.phone
				});
				//刷新上一个页面
				pages[pages.length-3].hook();
				isSubing = false;uni.hideLoading();
				this.$tools.Toast("提交成功","success");
				let timer =setTimeout(()=>{
					uni.navigateBack({
						delta:2
					});
				},1500);
			},
			//检验表单
			checkForm() {
				const arr = [
					[!this.name, '收件人姓名不能为空'],
					[!this.company, '快递公司不能为空'],
					[!this.logisitics_no, '快递单号不能为空'],
					[!this.phone, '手机号码不能为空'],
					[!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone), '手机号码格式不正确哦!'],
				]

				for (let [rule, message] of arr) {
					if (rule) {
						this.$tools.Toast(message);
						return false;
					}
				}
				return true;
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
