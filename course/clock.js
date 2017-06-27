function Clock(option){
	this.config = {
		target:"",
		width:"",
		height:"",
		border:""
	}
	//参数赋值
	for(var i in option){
//		console.log(option[i] + "--"+this.config[i])
		this.config[i] = option[i];
	}
	
//	console.log(this.config);
	
	//获取dom节点
	this.canvasEle = document.querySelector(this.config.target);
	//设置canvas宽高
	this.canvasEle.width = this.config.width;
	this.canvasEle.height = this.config.height;
	this.canvasEle.style.border = this.config.border;
	this.ctx = this.canvasEle.getContext("2d");
	
	
	this.init();
}

Clock.prototype = {
	init:function(){
		console.log("1、初始化");
		this.x = this.canvasEle.width / 2 ;
		this.y = this.canvasEle.height / 2 ;
		this.r = this.x > this.y ? this.y - 10 : this.x - 10;
		//辅助线
		var ctx = this.ctx;
		ctx.translate(this.x,this.y);
		ctx.rotate(-Math.PI/2);
		ctx.save();
		ctx.moveTo(this.config.width/2,0);	
		ctx.lineTo(this.config.width/2,this.config.height);
		ctx.moveTo(0,this.config.height/2);	
		ctx.lineTo(this.config.width,this.config.height/2);
		ctx.stroke();
		this.move()
		
	},
	move:function(){
		var ctx= this.ctx;
		var that = this;
		setInterval(function(){
			ctx.clearRect(-that.config.width/2,-that.config.height/2,that.config.width,that.config.height)
			
			//画表盘
			that.drawArc();
			//画刻度-时针
			that.drawHoursLine();
			//画刻度-分针、秒针
			that.drawMsLine();
			var date = new Date();
			
			var h = date.getHours();
			h = h > 12 ? h - 12 : h;
			var m = date.getMinutes();
			var s = date.getSeconds();
			console.log(h + ":" + m + ":" + s)
			
			//画时针
			that.drawH(h,m,s);
			//画分针
			that.drawM(h,m,s);
			//画秒针
			that.drawS(h,m,s);
		},1000)
		
		
	},
	drawArc:function(){
		var ctx = this.ctx;
		ctx.restore();
		ctx.save();
		
		ctx.beginPath();
		
		
		
		ctx.strokeStyle = "#ccc";
		ctx.fillStyle = "#eee";
		
		ctx.lineWidth = 5;
		ctx.arc(0,0,this.r,0,Math.PI*2);
		
//		ctx.fill();
		ctx.stroke();
	},
	drawHoursLine:function(){
		var ctx = this.ctx;
		
		ctx.restore();
		ctx.save();
		ctx.fillStyle = "#000";
		for(var i = 0; i < 12; i++){
				ctx.fillRect(this.r - 25,-3,20,6);
				ctx.rotate(Math.PI/6);
		}
		
		ctx.restore();
	},
	drawMsLine:function(){
		var ctx = this.ctx;
		ctx.fillStyle = "#000";
		ctx.restore();
		ctx.save();
		for(var i = 0; i < 60; i++){
			if(i % 5 != 0){
				ctx.fillRect(this.r - 15,-3,10,6);
			}
			ctx.rotate(Math.PI/30);
		}
	},
	drawH:function(h,m,s){
		var ctx = this.ctx;
		ctx.restore();
		ctx.save();
		ctx.rotate((h + m/60 + s/3600)*Math.PI/6)
		ctx.fillRect(-20,-3,this.r/2,6);
	},
	drawM:function(h,m,s){
		var ctx = this.ctx;
		ctx.restore();
		ctx.save();
		ctx.rotate((m + s/60)*Math.PI/30);
		ctx.fillRect(-20,-2,this.r*2/3,4);
	},
	drawS(h,m,s){
		var ctx = this.ctx;
		ctx.restore();
		ctx.save();
		ctx.rotate(s*Math.PI/30);
		ctx.fillRect(-30,-1,this.r*7/8,2);
	}
	
}
