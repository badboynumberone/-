export default class CanvasKit {

	canvas = null;
	id=null;
	constructor(id) {
		this.id = id;
		this.canvas = wx.createCanvasContext(id)
	}

	//绘制图片
	drawImg(option = {
		x: 40,
		y: 524,
		w: 50,
		h: 50,
		url: "imageurl"
	}) {
		let {
			x,
			y,
			w,
			h,
			url
		} = option;
		url = option.url;
		this.canvas.drawImage(url, x, y, w, h);
		return this
	}

	// 绘制矩形
	drawRect(option = {
		x: 40,
		y: 524,
		width: 50,
		height: 50,
		color: null
	}) {
		if (option.color) {
			this.canvas.setFillStyle(option.color)
		}
		this.canvas.fillRect(10, 10, 150, 100)

		this.canvas.draw()
		return this
	}

	//绘制圆图片
	drawCircleImage(options = {
		x: 40,
		y: 524,
		r: 50,
		w: 50,
		h: 50,
		url: ''
	}) {
		// Draw coordinates
		let {
			x,
			y,
			r,
			url
		} = options;
		url = options.url;
		this.canvas.save()
		this.canvas.beginPath()
		this.canvas.arc(x, y, r, 0, 2 * Math.PI)
		this.canvas.clip()
		this.canvas.drawImage(url, x - r, y - r, 2 * r, 2 * r)
		this.canvas.restore()

		return this;
	}

	//绘制文字
	drawText(option = {
		x: 40,
		y: 524,
		color: '#333333',
		size: 32,
		align: 'left',
		baseline: 'top',
		text: '哈哈哈哈，加粗',
		bold: false
	}) {

		this.canvas.save();

		this.canvas.setFillStyle(option.color);

		this.canvas.setFontSize(option.size);

		this.canvas.setTextAlign("left");


		this.canvas.setTextBaseline("middle");
		if (option.bold) {
			this.canvas.fillText(option.text, option.x, option.y - 0.5);
			this.canvas.fillText(option.text, option.x - 0.5, option.y);
			this.canvas.fillText(option.text, option.x, option.y + 0.5);
			this.canvas.fillText(option.text, option.x + 0.5, option.y);
		}
		this.canvas.fillText(option.text, option.x, option.y);
		this.canvas.restore();
		return this
	}
	// 绘制换行文字
	drawWrapText(option){
		let {t,c,s,x,y,w} = option;
		w = option.w;
		var chr = t.split("");
		var temp = "";				
		var row = [];
		this.canvas.save();
		
		this.canvas.setFillStyle(c);
		
		this.canvas.setFontSize(s);
		
		this.canvas.setTextAlign("left");
		
		
		this.canvas.setTextBaseline("middle");
		
		for(var a = 0; a < chr.length; a++){
			if( this.canvas.measureText(temp).width < w ){
				;
			}
			else{
				row.push(temp);
				temp = "";
			}
			temp += chr[a];
		}
		
		row.push(temp);
		
		for(var b = 0; b < row.length; b++){
			this.canvas.fillText(row[b],x,y+(b+1)*20);
		}
		this.canvas.restore();
		return this;
	}
	//开画
	draw() {
		this.canvas.draw()
	}
	
}
