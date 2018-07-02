window.onload = function () {

  //渲染xml文件中的js文件
     $.ajax({
      url: "../xml/FileList.xml",
      dataType: 'xml',
      type: 'GET',
      timeout: 2000,
      error: function (xml) {
          alert("加载XML 文件出错！");
      },
      success: function (xml) {
        console.log(xml);
        var con = $(xml).find("Compile");
        for(var i = 0;i<con.length;i++){
          var comp = $(con[i]);
          var path = comp.attr("Include");
          var url = path.replace(/\.js/g,"").replace(/\//g,".").replace(/src/g,"KJ")
          kj.RouterOpt
          spaRouters.map(url, function (transition) {
            url = transition.path;
            var fullUrl = url.replace(/\./g,"/").replace(/KJ/g,".") + ".js";
            spaRouters.asyncFun(fullUrl, transition)
          })
        }

        spaRouters.beforeEach(function (transition) {
          console.log('切换之前dosomething')
          setTimeout(function () {
            //模拟切换之前延迟，比如说做个异步登录信息验证
            transition.next()
          }, 100)
        })
        spaRouters.afterEach(function (transition) {
          console.log("切换之后dosomething")
        })
        spaRouters.init()
        

      }
  });

  $.ajax({
    url:"../xml/test_ajax.py",
    type:"post",
    // dataType:"jsoinp",
    success:function(){

    }
  })


  // spaRouters.map('KJ.js.index', function (transition) {
  //   spaRouters.asyncFun('./js/index.js', transition)
  // })
  // spaRouters.map('KJ.js.list', function (transition) {
  //   spaRouters.asyncFun('./js/list.js', transition)
  // })
  // spaRouters.map('KJ.js.detail', function (transition) {
  //   spaRouters.asyncFun('./js/detail.js', transition)
  // })
  // spaRouters.map('KJ.js.detail2', function (transition) {
  //   spaRouters.syncFun(function (transition) {
  //     document.getElementById("content").innerHTML = '<p style="color:#DD8C6F;">当前同步渲染详情页' + JSON.stringify(transition) + '</p>'
  //   }, transition)
  // })

  // spaRouters.beforeEach(function (transition) {
  //   console.log('切换之前dosomething')
  //   setTimeout(function () {
  //     //模拟切换之前延迟，比如说做个异步登录信息验证
  //     transition.next()
  //   }, 100)
  // })
  // spaRouters.afterEach(function (transition) {
  //   console.log("切换之后dosomething")
  // })
  // spaRouters.init()
}