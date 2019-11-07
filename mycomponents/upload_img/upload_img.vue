<template>
	<view class="upload-content">
		<block v-for="(item, index) in imageList" :key="index">
			<view class="upload-item">
				<image class="upload-img" :src="item" mode="aspectFill" @click="previewImage(index)"></image>
				<image class="upload-del-btn" 
					@click="delImage(index)" 
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjNBODgzQjUwNDM5MTFFOUJDMjlGN0UwRTJGMjVCNjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjNBODgzQjYwNDM5MTFFOUJDMjlGN0UwRTJGMjVCNjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGM0E4ODNCMzA0MzkxMUU5QkMyOUY3RTBFMkYyNUI2NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGM0E4ODNCNDA0MzkxMUU5QkMyOUY3RTBFMkYyNUI2NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuYQTIAAAAHNSURBVHjazJgxasMwFIbjnsD4BDmCLxDQDZrNQ5bcILlBvXvpDRLIWmiHFkyH2t0LyVbwEkPpbE/eYlUCGYQax096UuIffkIgij7ryU/vyZuYy2e+Z56K70R8lsJcOfPn5AriMCvmZ2YKdMW8EQ/hRA9iEorwXlpZtObMRySQ6kysvrFWloHUEIcmUBuHUDLccmxQskErt7wyVLdy00tQ4Q2g5De2V9kNwWjffiNDA33f/42i6E13Qj5uNptlwJD+SyODuaqqqi/KVBTFOxSKA7VtW/NxSZI8AcbE2nuraZpvKgSBk6G4drsdBOwogz1CwAghH/JEl+BUKJ1VltPHHjoIAoeE4l53YFqb+RKcBSgqyqXhtxEKZwkKB3YOThYCqjPuCDoHZwGK3mGLtdPp5LmqTI1Dqe4p26EkNqA4iE6eg2z+iQ0okyQMATvYgLIIt9Y6knTyFBIudHqIq3BpmkL60VJ9O0sXZY8MBwSLtdNGEAQ/i8XiVXcz83EcEPDbuq/fzMdYWt+6GTmMsX2rh9q3TtsxNrzXhKt1rwg6rR1Dhdjqo7QMlWOvoWTF4imxQMRF7eaL8L5ohmwrLgDB8pCQc8DlcG7y538CDABJNGPqfaJgfgAAAABJRU5ErkJggg==" 
					mode="scaleToFill">
				</image>
			</view>
		</block>
		<view class="upload-add-btn" v-if="imageList.length<length" @click="chooseImage"></view>
	</view>
</template>

<script>
import {upLoadFile} from "../../utils/uploadImg.js";
export default {
	data() {
		return {
			imageList: []
		};
	},
	props: {
		count: {
			type: Number,
			value: 4 //单次可选择的图片数量
		},
		length: {
			type: Number,
			value: 50 //可上传总数量
		}
	},
	methods: {
		//选择图片
		chooseImage: function(){
			uni.chooseImage({
				count: this.length - this.imageList.length, //最多可以选择的图片张数，默认9
				sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
				sourceType: ['album'], //album 从相册选图，camera 使用相机，默认二者都有
				success: (res)=> {
					const images = res.tempFilePaths;
					this.imageList = [...this.imageList,...images];
				}
			});
		},
		//上传图片
		async uploadFiles(){
			try{
				this.imageList = await upLoadFile(this.imageList);
				return true;
			}catch(e){
				//TODO handle the exception
				return false;
			}
		},
		//删除图片
		delImage: function(index){
			uni.showModal({
				content: '确定要放弃这张图片么？',
				success: (confirmRes)=> {
					if (confirmRes.confirm) {
						this.imageList.splice(index, 1);
					} 
				}
			});
		},
		//预览图片
		previewImage: function(index){
			uni.previewImage({
				current: this.imageList[index],
				urls: this.imageList,
				indicator: "number"
			})
		}
	}
}
</script>

<style lang="scss">
	.upload-content{
		padding-top: 5px;
		background-color: #fff;
		overflow:hidden;
		padding-right: 5px;
	}
	.upload-item{
		position: relative;
		float:left;
		width:150upx;
		height:150upx;
		margin-right:27upx;
		margin-bottom:30upx;
		&:nth-child(4n){
			margin-right:0;
		}
		.upload-img{
			width:100%;
			height:100%;
			border-radius:8upx;
		}
		.upload-del-btn{
			position: absolute;
			right:-16upx;
			top:-14upx;
			width:36upx;
			height:36upx;
			border: 4upx solid #fff;
			border-radius: 100px;
		}
		.upload-progress{
			position: absolute;
			left:0;
			top:0;
			display:flex;
			align-items:center;
			justify-content: center;
			width:100%;
			height:100%;
			background-color: rgba(0,0,0,.4);
			color:#fff;
			font-size:24upx;
			border-radius:8upx;
		}
	}
	.upload-add-btn {
		position: relative;
		float:left;
		width: 150upx;
		height: 150upx;
		z-index: 99;
		border-radius:8upx;
		background:#f9f9f9;
		&:before,
		&:after {
			content: " ";
			position: absolute;
			top: 50%;
			left: 50%;
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			width: 4upx;
			height: 60upx;
			background-color: #d6d6d6;
		}
		&:after {
			width: 60upx;
			height: 4upx;
		}
		&:active {
			background-color: #f7f7f7;
		}
	}

</style>
