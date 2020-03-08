<template>
	<view class="time fsb">
		<view class="hour fm">{{hour}}</view>
		<text>:</text>
		<view class="minute fm">{{minute}}</view>
		<text>:</text>
		<view class="second fm">{{second}}</view>
	</view>
</template>

<script>
	function getNextHour(){
		let date = new Date();
		date.setHours(new Date().getHours()+1)
		date.setMinutes(0)
		date.setSeconds(0)
		date.setMilliseconds(0)
		return date;
	}
	function addZero(num){
		return num<10 ? '0'+num:num;
	}
	let timer = null;
	export default {
		props:{
			startTime:{
				type:String
			},
			endTime:{
				type:String
			}
		},
		created() {
			console.log(this.$attrs)
			this.timer();
		},
		data(){
			return{
				hour:'00',
				minute:'00',
				second:'00'
			}
		},
		methods: {
			timer(){
				timer = setInterval(()=>{this.updateTime()},1000);
			},
			updateTime(){
				let startTime = this.startTime ? new Date(this.startTime) : new Date();
				let endTime = this.endTime ? new Date(this.startTime) : getNextHour();
				const seconds =Math.floor((endTime.getTime() -startTime.getTime())/1000);
				[this.hour,this.minute,this.second] = [addZero(Math.floor(seconds/3600)),addZero(Math.floor(seconds/60)),addZero(seconds%60)];
			},
			clearTimer(){
				clearInterval(timer);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.time {
		width: 170rpx;

		>view {
			width: 40rpx;
			height: 46rpx;
			background-color: #222222;
			border-radius: 4rpx;
			color: #fff;
			font-size: 26rpx;
		}
	}
</style>
