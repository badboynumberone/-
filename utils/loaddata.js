export default {
	// 清空数据
	clear: async function clear() {
		try{
			const index = this.pageData.findIndex(e => e.areaName == this.selectarea);
			- 1 != index && this.$set(this.pageData,
				index, {
					areaName: this.selectarea,
					pageNum: 0,
					text: "",
					isLoading: 0,
					list: []
				});
		}catch(e){
			//TODO handle the exception
		}finally{
			return true;
		}
	},
	
	//加载更多
	loadMore: async function loadMore(a) {
		-1 == this.pageData.findIndex(a => a.areaName == this.selectarea) && (this.pageData = [...this.pageData, {
			areaName: this.selectarea,
			pageNum: 0,
			text: "",
			isLoading: 0,
			list: []
		}]), await fn.call(this, async (e, t) => {
			a(e, t)
		})
	}
}


async function fn(a) {
	const t = parseInt(this.pageData.findIndex(a => a.areaName == this.selectarea));

	if (["到底了", "没有数据"].includes(this.pageData[t].text)) return;

	let e = this.pageData[t];

	e.pageNum = ++e.pageNum, this.$set(this.pageData, t, e), 1 == this.pageData[t].pageNum && wx.showLoading({
		title: "加载中",
		mask: !0
	});

	let s = this.pageData[t];

	s.isLoading = !0, s.text = "加载中...", this.$set(this.pageData, t, s);

	const i = await new Promise((t, e) => {
		a(t, e)
	});

	wx.hideLoading();

	let g = this.pageData[t];

	g.isLoading = !1, this.$set(this.pageData, t, g);

	let h = "";
	h = 1 == this.pageData[t].pageNum && 0 == i.length ? "没有数据" : this.pageData[t].pageNum >= 1 && 20 == i.length ?
		"上拉加载更多" : "到底了";

	let p = this.pageData[t];

	p.text = h, this.$set(this.pageData, t, p)
}
