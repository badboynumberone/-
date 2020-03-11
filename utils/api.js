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
							Toast(items.length>1?items[index].name+"为活动限购商品,不要太贪哦!": "活动限购商品,不要太贪哦!");
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
	}
}