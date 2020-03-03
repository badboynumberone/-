import {sendRequest} from './request.js';
import {Toast} from './tools.js';
export default {
	async isLimitBuy(id){
			const result  =await sendRequest("/xianGou/verification",{productId:id},"GET");
			if(result){
				Toast("该商品为限购商品,无法二次购买哦")
				return false;
			}
			return true;
	}
}