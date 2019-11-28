//多个值 - > 一个值 - > 多个校验



//遍历(值 校验器 错误消息)
//校验规则
const testRule = {
	phone(val) {
		return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(val)
	}, //手机号匹配
	email(val) {
		return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(val)
	}, //电子邮箱匹配
	url(val) {
		return /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(val)
	},
	number(val) {
		return /^\d+$/.test(val)
	},
	range(val, start, end) {
		return eval(`/^\d{${start},${end}}$/`).test(val)
	},
	required(val) {
		return trim(val) != false || trim(val).length!=0
	},
	maxlength(val, max) {
		return val.length < parseInt(max)
	},
	minlength(val, min) {
		return val.length > parseInt(min)
	}
}

//[rule,message]

//校验器
function verification(value,callback,...ruleArr) {
	return function(){
		for (let [rule,message] of ruleArr) {
			 if(!testRule[rule.split(",")[0]](value,...rule.split(",").slice(1))){
				 callback(message);
				 return false;
			 }
		}
		return true;
	}
}
