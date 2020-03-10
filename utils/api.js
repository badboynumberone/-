import {sendRequest} from './request.js';
import {Toast} from './tools.js';
export default {
	//是否有购买限制
	async isLimitBuy(ids=[],names=[]){
			let pormises = ids.reduce((all,next)=>[...all,sendRequest("/xianGou/verification",{productId:next},"GET")],[])
			const result = await new Promise((resolve,reject)=>{
				Promise.all(pormises).then(res=>{
					resolve(res.every((item,index)=>{ 
						if(!item && ids.length==1){ //如果item>0 就是限购, 该商品是一件商品 
							Toast(`该商品为限购商品,您还可以购买${item}件`)
						} 
						if(!item && ids.length>1){ //如果item>0 就是限购, 该商品是多件商品 
							Toast(`${names[index]}为限购商品,,您还可以购买${item}件`)
						} 
					return item>0}))
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