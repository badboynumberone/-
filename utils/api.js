import {sendRequest} from './request.js';
import {Toast} from './tools.js';
export default {
	//是否有购买限制
	async isLimitBuy(ids=[]){
			let pormises = ids.reduce((all,next)=>[...all,sendRequest("/xianGou/verification",{productId:next},"GET")],[])
			const result = await new Promise((resolve,reject)=>{
				Promise.all(pormises).then(res=>{
					resolve(res.every(item=>{ 
						if(item && ids.length==1){
							Toast("该商品为限购商品,无法二次购买哦")
						} 
						if(item && ids.length>1){
							Toast("存在限购商品,无法二次购买哦")
						} 
					return item==0}))
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
	}
}