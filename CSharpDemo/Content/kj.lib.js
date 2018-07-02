$(function(){
    var global = window,
         enumerables = true,
         enumerablesTestObj = {
             toString: 1
         },
         objectPrototype = Object.prototype,
         toString = objectPrototype.toString,
         hasOwnProperty = Object.prototype.hasOwnProperty,
         nonWhitespaceRe = /\S/,
         callOverrideParent = function () {
             var method = callOverrideParent.caller.caller;
             return method.$owner.prototype[method.$name].apply(this, arguments);
         },
         name;
 
     //初始化HY对象，赋值为一个空对象
     var kj = global.kj = {};
     //让HY对象的global指向全局window/this
     kj.global = global;
     kj.apply = function (object, config, defaults) {
        if (defaults) {
            Box.apply(object, defaults || {});
        }
        if (object && config && typeof config == 'object') {
            var i, j, k;
            for (i in config) {
                object[i] = config[i];
            }
            if (enumerables) {
                for (j = enumerables.length; j--;) {
                    k = enumerables[j];
                    if (config.hasOwnProperty(k)) {
                        object[k] = config[k];
                    }
                }
            }
        }
        return object;
    };


    kj.apply(kj, {
        objectPrototype: Object.prototype,
        
        isDate: function (date) {
            return kj.objectPrototype.toString.apply(date) === '[object Date]';
        },
    });


     //标准浏览器对于for(var i in enumerablesTest){console.log(i)};
     //会输出"toString", 因为toString已经为自定义成员了。所以会遍历这个成员，
     //而IE6却只认名字不认人。它不会输出自定义的toString成员，
     //包括其它系统的成员也不会。因此，在IE6需要主动判断是否定义了toString。
     for (name in enumerablesTestObj) {
         enumerables = !enumerables;
     }
 
     if (enumerables) {
         enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable',
             'toLocaleString', 'toString', 'constructor'
         ];
     }
 
     //生成随机Guid码
     function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
     }
     function guid() {
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
     }
     kj.train = function(result){
         console.log(result)
     }


     kj.enumerables = enumerables;
     
     kj.Router = function(){
        this.routes = {};
        this.curUrl = '';
        
        this.route = function(path, callback){
         this.routes[path] = callback || function(){};
        };
        
        this.refresh = function(){
         this.curUrl = location.hash.slice(1) || '/';
         this.routes[this.curUrl]();
        };
        
        this.init = function(){
         window.addEventListener('load', this.refresh.bind(this), false);
         window.addEventListener('hashchange', this.refresh.bind(this), false);
        }
       }
    // var Router = new kj.Router();
    //    Router.init();
       

     kj.define = function(url,opt){
        if(!kj.RouterOpt) kj.RouterOpt = {};

        opt.beforeSetup = function(data){
            opt.$params = data.query;
            opt.setup();
            console.log(opt)
        }
        kj.RouterOpt[url] = opt;
     };


     //自定义提示框
     kj.Notify = {
            success:function (str) {
                this.NotifyBox({
                    str:str,
                    color:"#5ebd5e",
                    icon:"fa-check-circle",
                    text:"提示",
                });
            },
            warning: function (str) {
                this.NotifyBox({
                    str:str,
                    color:"#eda338",
                    icon:"fa-exclamation-triangle",
                    text:"警告",
                });
            },
            error: function (str) {
               this.NotifyBox({
                   str:str,
                   color:"#e66454",
                   icon:"fa-times",
                   text:"错误",
               });
            },
            NotifyBox:function(opt){
                var i = "Notify" + guid();
                var a = $(".NotifyBox").length;
                if (a == 0) {
                    $(document.body).append($('<div class="NotifyBox" style="position:absolute;width:230px;height:auto;right:20px;bottom:20px;"></div>'));
                }
                var box = $('<div id=' + i + ' style="margin:10px 0;transition:all 1s;background:'+opt.color+';width:220px;height:auto;min-height:50px;opacity:0;color:#efefef;padding:5px"><span class="fa '+opt.icon+'" style="vertical-align:top;font-size:30px;line-height:60px;margin:0 15px 0 5px"></span><div style="display:inline-block;width:calc(100% - 50px)"><span style="display:inline-block;vertical-align:top;font-weight:bold;margin-bottom:5px">'+opt.text+':</span><br><span style="width:calc(100% - 60px);font-size:12px">' + opt.str + '</span></div></div>');
                $(".NotifyBox").append(box);
                setTimeout(function () {
                    $("div#" + i).css("opacity", "1");
                }, 200);
                setTimeout(function () {
                    $("div#" + i).css("opacity", "0");
                    setTimeout(function () {
                        $("div#" + i).remove();
                    }, 1000)
                }, 4000);
            }
     }

     kj.format = {
        renderDate: function (date, defaultVal) {
            if (typeof date === "undefined" || date == null) {
                return defaultVal || "--";
            }
            if (typeof date === "string") {
                var v = date.replace(/\..*/g, "").replace(/[^/\d\s]+/g, " ").split(" ");
                date = new Date();
                date.setFullYear(v[0]);
                date.setDate(v[2] || 1);
                date.setMonth((v[1] - 1));
                date.setDate(v[2] || 1);
                date.setMonth((v[1] - 1));
                date.setHours(v[3] || 0);
                date.setMinutes(v[4] || 0);
                date.setSeconds(v[5] || 0);
            }
            if (date.toString() === 'Invalid Date')
                return defaultVal || "--";
            return this.formatDate(date, "yyyy-MM-dd");
        },
          //自定义格式化日期时间
          formatDate: function (date, fmt) {
            if (!kj.isDate(date))
                date = new Date(date);
            if (kj.isDate(date))
                return date.format(fmt);
            else
                throw 'date的格式不对';
        },
     }

     //重写resize方法，可以对don元素进行了使者判断
     jQuery.fn.extend({
         kResize:function(f){
            var w = $(this).width(), h = $(this).height(), oldw, oldh;
            setInterval(function () {
                oldw = $(this).width(); oldh = $(this).height();
                if (oldw != w || oldh != h) { f(); }
                w = oldw; h = oldh;
            }, 250);
         }
     })
     //这种方法会返回计时器
     kj.kjResize = function(obj, f) {
        var w = obj.width(), h = obj.height(), oldw, oldh;
        var timer = setInterval(function () {
            oldw = obj.width(); oldh = obj.height();
            if (oldw != w || oldh != h) { f(); }
            w = oldw; h = oldh;
        }, 250);
        return timer;
    }

    //生成卡片格式显示框
    kj.CardMessage = function (opt) {
        var me = this;
        //opt = {
        //    barHeight: 40,                   //标题栏高度
        //    name: "测试模板",             //标题栏名称
        //    renderTo: $(".className"),    //依赖的Dom元素
        //    content: $(".className"),      //框体里的内容
        //    conWidth:"100%",               //框体宽度
        //    margin:"20px auto",             //框体之间间距
        //    close: function () { },         //每当框体关闭时触发的函数
        //    open: function () { },          //每当框体打开时触发的函数
        //};
        // me.divForFinanceCard = me.CardMessage({
        //     name: "财务状况",
        //     //barHeight: 30,
        //     renderTo: me.Win.find(".divForFinanceBox"),
        //     content: $('<div class="divForFinance"></div>'),
        // });

        // me.divForFinanceCard.close();
        if (!opt.renderTo) {
            Box.Notify.warning("请设置依赖主体!");
            return;
        }
        opt.content = opt.content ? opt.content : $('<div></div>');
        opt.barHeight = opt.barHeight ? opt.barHeight : 40;
        opt.fontSize = opt.fontSize ? opt.fontSize : 16;
        opt.name = opt.name ? opt.name : "未命名";
        opt.margin = opt.margin ? opt.margin : "20px auto";
        opt.conWidth = opt.conWidth ? opt.conWidth : "100%";
        var bar = $('<div class="IsObsoleteDiv " style="border: 1px solid #ccc;border-radius:5px ; border-bottom: 0; height: ' + opt.barHeight + 'px; text-align: center; background: #f5f5f5; position: relative"><h5 class="IsObsoleteH" style="margin: 0 auto; width: 100%; position: relative; font-weight: bold; margin-top: 0; line-height: ' + opt.barHeight + 'px; font-size: ' + opt.fontSize + 'px; ">' + opt.name + '<span class="IsObsolete fa fa-chevron-up" style="position:absolute;right:10px;font-size:18px;line-height:' + opt.barHeight + 'px" title="隐藏详情"></span></h5></div>');
        var body = opt.content.addClass("IsObsoleteBox").css({ "border-bottom": "1px solid #ccc", "border-radius": "0 0 5px 5px", "overflow": "hidden" });
        opt.renderTo.append(bar).append(body).css({ "margin": opt.margin, "border-radius": "5px", "width": opt.conWidth });
        if (opt.hidden) {
            opt.renderTo.hide();
        } else {
            opt.renderTo.show();
        }

        var fnOpen = function (fun) {
            opt.renderTo.find("div.IsObsoleteBox").eq(0).slideDown(200);
            opt.renderTo.find(".IsObsolete").eq(0).removeClass("fa-chevron-down").addClass("fa-chevron-up").attr("title", "隐藏详情");
            opt.renderTo.find("div.IsObsoleteDiv").eq(0).css({ "border-radius": "5px  5px 0 0", "border-bottom": "1px solid #ccc" });
            if (fun) fun();
            if (opt.open) opt.open();
        }

        var fnClose = function (fun) {
            opt.renderTo.find("div.IsObsoleteBox").eq(0).slideUp(200);
            opt.renderTo.find(".IsObsolete").eq(0).addClass("fa-chevron-down").removeClass("fa-chevron-up").attr("title", "显示详情");
            opt.renderTo.find("div.IsObsoleteDiv").eq(0).css({ "border-radius": "5px", "border-bottom": "1px solid #ccc" });
            if (fun) fun();
            if (opt.close) opt.close();
        }

        opt.renderTo.find(".IsObsolete").eq(0).bind("click", function (e, target) {
            var me = this
            if ($(e.target).hasClass("fa-chevron-down")) {
                fnOpen();
            } else {
                fnClose();
            }
            return false
        });

        opt.renderTo.find(".IsObsoleteH").eq(0).bind("click", function (e, target) {
            var me = this
            if ($(e.target).find(".IsObsolete").eq(0).hasClass("fa-chevron-down")) {
                fnOpen();
            } else {
                fnClose();
            }
            return false
        });

        var option = {
            height: opt.height,
            name: opt.name,
            hidden: opt.hidden,
            renderTo: opt.renderTo,
            content: opt.content,
            close: function (fun) {
                fnClose(fun);
            },
            open: function (fun) {
                fnOpen(fun);
            },
        };
        return option;
    }

    })