import {sendRequest} from './request.js';
import {Toast} from './tools.js';
export default {
	//是否有购买限制
	async isLimitBuy(items = [{id:0,name:"",count:0}]){
			let pormises = items.reduce((all,next)=>[...all,sendRequest("/xianGou/verification",{productId:next.id},"GET")],[])
			const result = await new Promise((resolve,reject)=>{
				Promise.all(pormises).then(res=>{
					resolve(res.every((item,index)=>{ 
						if(item.xianGouStatus>=1&&items[index].count>item.num){ //超买
							Toast(items.length>1?items[index].name+"为活动限购商品,超出了限购范围哦!": "活动限购商品,超出了限购范围哦!");
							return false
						}
					return true}))
				})
			})
			return result;
	},
	//添加限制
	async addLimit(addData=[]){
		let promises = addData.reduce((all,next)=>{
			console.log(next)
			return [...all,sendRequest("/xianGou/insertOmsOrderXiangou", {
			  buyNumber: next.quantity==undefined ? (next.productQuantity!=undefined ? next.productQuantity:''):next.quantity,
			  productId: next.productId
			})]
		 },[]);
		 await new Promise(function (resolve, reject) {
			 Promise.all(promises).then((res)=>{
				 if(res.length>=addData.length){
					 resolve();
				 }
			 })
		 });
	},
	// 监听时间
	timelistener(startTime="",endTime="",fn1,fn2,fn3,fn4=()=>{}){
		let now = new Date();
		startTime = new Date(startTime.replace(/-/g,"/"));
		endTime = new Date(endTime.replace(/-/g,"/"));
		let s_n = startTime.getTime()-now.getTime();
		let e_n = endTime.getTime()-now.getTime();
		let seconds = null;
		let status = null;
		//活动未开始
		if(s_n>0){
			seconds =s_n;
			fn1();
		}
		//活动进行中
		if(s_n<0 && e_n>0){
			seconds =e_n;
			fn2(seconds);
		}
		//活动已结束
		if(e_n<0){
			fn3();
		}
		fn4(seconds);
		
	}
}