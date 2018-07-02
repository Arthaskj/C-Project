kj.define("KJ.js.list",{
	setup:function(transition){
		document.getElementById("content").innerHTML = '<p style="color:#000;">当前异步渲染首页'+ JSON.stringify(this.$params) +'</p>'

			// console.trace("trace");

			// throw new Error('路由切换后回调函数不正确')

	}
})
	