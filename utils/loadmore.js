export default async function loadmore(callback) {
	if (this.pageData.findIndex(item => item.areaName == this.selectarea) == -1) {
		this.pageData = [...this.pageData, {
			areaName: this.selectarea,
			pageNum: 0,
			text: "",
			isLoading: 0,
			list: []
		}]
	}

	await fn.call(this, async (reslove, reject) => {
		callback(reslove, reject);
	});
}


async function fn(callback) {
	//获取需要加载的选项
	const index = parseInt(this.pageData.findIndex(item => item.areaName == this.selectarea));
	//停止加载
	if (this.pageData[index].text == "到底了") {
		return;
	}
	//加页数
	let item = this.pageData[index];
	item.pageNum = ++item.pageNum;
	this.$set(this.pageData, index, item);

	//第一次加载添加加载中的对话
	if (this.pageData[index].pageNum == 1) {
		wx.showLoading({
			title: "加载中",
			mask: true
		})
	}
	//显示加载中
	let v = this.pageData[index];
	v.isLoading = true;
	v.text = "加载中...";
	this.$set(this.pageData, index, v);

	//获取数据
	const result = await new Promise((resolve, reject) => {
		callback(resolve, reject);
	})
	//隐藏loading框
	wx.hideLoading();

	let s = this.pageData[index];
	s.isLoading = false;
	this.$set(this.pageData, index, s);

	//设置加载文案
	let text = "";
	if (this.pageData[index].pageNum == 1 && result.length == 0) {
		text = "没有数据";
	} else if (this.pageData[index].pageNum >= 1 && result.length == 10) {
		text = "上拉加载更多"
	} else {
		text = "到底了"
	}

	let m = this.pageData[index];
	m.text = text;
	this.$set(this.pageData, index, m);
}
