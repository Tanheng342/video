//http://blog.csdn.net/likendsl/article/details/7852658
window.onload = function(){
	var canvas = document.querySelector("#canvas");
	var ctx = canvas.getContext("2d");
	//point_cnt - 1 阶bezier曲线
	var point_cnt = 20;
	var points = [];
	for(var i=0; i<point_cnt; ++i){
		var p = {};
		p.x = Math.random() * 800;
		p.y = Math.random() * 800;
		points.push(p);
	}
	drawBezier(ctx, points); 
};

//bezier 动画生成
function drawBezier(ctx, points){
	var colors = [];
	for(var i=0; i<points.length; ++i){
		colors.push(getRandowColor());
	}
	var t = 0;
	var step_t = 0.0006;
	var timer = setInterval(function(){
		ctx.clearRect(0, 0, 1000, 1000);
		dfs(ctx, colors, points, t, 0);
		t += step_t;
		if(t >= 1){
			dfs(ctx, colors, points, 1, 0);
			clearInterval(timer);
		}
	},1);
}

var pps = []; //存储曲线上的所有点
//递归生成降阶的贝塞尔所需要的点
function dfs(ctx, colors, points, t, cnt){
	if(points.length == 1){
		pps.push(points[0]);
		ctx.lineWidth = 3;
		for(var i=0; i<pps.length-1; ++i){
			ctx.beginPath();
		//	ctx.arc(pps[i].x, pps[i].y, 1, 0, Math.PI * 2, false);
			ctx.strokeStyle = "black";
			ctx.moveTo(pps[i].x, pps[i].y);
			ctx.lineTo(pps[i+1].x, pps[i+1].y);
			ctx.stroke();
		}
		ctx.lineWidth = 1;
		return;
	}
	drawLines(ctx, colors[cnt], points);
		var ps = [];
	for(var i=0; i<points.length -1; ++i){
		var p = {};
		//一阶贝塞尔公式
		p.x = (1-t) * points[i].x + t * points[i+1].x;
		p.y = (1-t) * points[i].y + t * points[i+1].y;
		ps.push(p);
	}
	dfs(ctx, colors, ps, t, cnt+1);
}
//按顺序将points数组中的点连成线段
function drawLines(ctx, color, points){
	ctx.strokeStyle = color;
	for(var i=0; i<points.length - 1; ++i){
		ctx.beginPath();
		ctx.moveTo(points[i].x, points[i].y);
		ctx.lineTo(points[i+1].x, points[i+1].y);
		ctx.stroke();
	}
}
function getRandowColor(){
	var r = Math.floor(Math.random() * 255);
	var g = Math.floor(Math.random() * 255);
	var b = Math.floor(Math.random() * 255);
	var color = (r<<16) + (g<<8) + b;
	color = "#" + color.toString(16);
	return color;
}
