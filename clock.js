//钟表对象
function Clock(opt){
				this.config={
					target:"",
					width:500,
					height:500,
				}
				for(var i in opt){
						this.config[i]=opt[i];
				}
				this.canvasEl=document.querySelector(this.config.target);
				this.contx=this.canvasEl.getContext("2d");
				
				this.canvasEl.width=this.config.width;
				this.canvasEl.height=this.config.height;
				this.init();
				
}
Clock.prototype={
				init:function(){
					this.move();
				},
				//生成表盘
				createdial:function(h,m,s){
					var contx=this.contx;
					contx.beginPath();
					contx.strokeStyle="#666";
					contx.fillStyle="#eee";
					contx.lineWidth=5;
					contx.save();
					contx.translate(this.config.width/2,this.config.height/2);
					var r=this.config.width>this.config.height?this.config.height/2-10:this.config.width/2-10;
					contx.arc(0,0,r,0,2*Math.PI);
					contx.stroke();
					contx.fill();
					this.r=r;
	
					
					contx.beginPath();
					contx.fillStyle="#900";
					contx.arc(0,0,10,0,2*Math.PI);
					contx.fill();
					
					//创建标记
					this.createdot();
					//生成指针
					this.drawWizard("h",h);
					this.drawWizard("m",m);
					this.drawWizard("s",s);
					contx.restore();
				},
				//生成时间标记点
				createdot:function(){
					var contx=this.contx;
					//计算每个小时标记的弧度值
					var deghr=2*Math.PI/12;
					//计算分钟弧度
					var degmin=2*Math.PI/60;
					contx.save();	
					contx.fillStyle="#000";
					
					for(var i=0;i<60;i++){
						//计算文字坐标
						contx.beginPath();
						
						if(i%5==0){
							contx.rect(0,-this.r+5,5,15);
						}else{
							contx.rect(0,-this.r+5,5,5);
						}
						
						contx.fill();
						contx.rotate(degmin);
						//console.log(i*deghr);
					}
					//还原保存
					contx.restore(); 
					this.drawText(deghr);
				},
				//绘制数字
				drawText:function(deg){
					var contx=this.contx;
					contx.save();
					contx.fillStyle="#000";
					contx.textAlign="center";
					contx.textBaseline="middle";
					contx.font="28px 微软雅黑";
					for(var i=1;i<13;i++){
						var x=Math.sin(i*deg)*(this.r-40);
						var y=-Math.cos(i*deg)*(this.r-40);
						contx.beginPath();
						contx.fillText(i,x,y);
						
					}
					contx.restore(); 
					
				},
				drawWizard:function(code,time){
					var contx=this.contx;
					var degh=2*Math.PI/12;
					var degm=2*Math.PI/60;
					contx.save();
					contx.beginPath();
					contx.fillStyle="#000";
					if(code=="h"){
						contx.rotate(degh*time);
						contx.rect(-3,-this.r/2.5,6,this.r/2);
						
					}else if(code=="m"){
						contx.rotate(degm*time);
						contx.rect(-2,-this.r/1.5,4,this.r/1.3);
						
					}else if(code=="s"){
						contx.fillStyle="#f00";
						contx.rotate(degm*time);
						contx.rect(-1,-this.r/1.4,2,this.r/1.1);
						
					}
					contx.fill();
					contx.restore(); 
				},
				move:function(){
					var contx=this.contx;
					var that=this;
					
					setInterval(function(){
						var thisdate=new Date();
						contx.clearRect(0,0,that.config.width,that.config.height);
						var h=thisdate.getHours();
						var m=thisdate.getMinutes();
						var s=thisdate.getSeconds();
						if(h>=12){
							h-=12;
						}
						if(h==24){
							h=0;
						}
						that.createdial(h,m,s);
					},1000)
				}
}