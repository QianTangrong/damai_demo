'use strict';





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function ($) {
    'use strict';

    $.fn.extend({
        fade: function fade(options) {
            var obj = {}; // 字面量对象
            // console.log(options)
            // console.log('轮播图')
            // 1、通过解构赋值获取轮播图的参数
            var imgs = options.imgs,
                prev = options.prev,
                next = options.next,
                points = options.points,
                autoplay = options.autoplay,
                delay = options.delay,
                current = options.current,
                duration = options.duration;
            // 2、为可选参数设置默认值

            autoplay = autoplay === false ? false : true; // 自动轮播
            delay = delay || 3000; // 自动轮播的时长
            current = current || 0; // 默认显示的是哪一个图片
            duration = duration || 300; // 每次动画时长
            // 3、获取图片的个数
            var len = imgs.length;
            // console.log(len)

            // 4、默认的图片显示
            ani(current);

            // 5、点击下一页
            next.on('click', function () {
                current++;
                if (current === len) {
                    current = 0;
                }
                ani(current);
            });

            // 6、点击上一页
            prev.on('click', function () {
                current--;
                if (current === -1) {
                    current = len - 1;
                }
                ani(current);
            });

            // 7、显示小圆点 并且给默认的图片对应的小圆点加样式
            for (var i = 0; i < len; i++) {
                points.append('<li></li>');
            }
            points.find('li').eq(current).addClass('active').siblings().removeClass('active');

            // 8、自动轮播
            var timer = null;
            if (autoplay) {
                timer = setInterval(function () {
                    next.click();
                }, delay);
            }

            // 9、鼠标滑过事件 -- 取消自动轮播，鼠标移除，重新自动轮播
            // console.log(this)
            if (autoplay) {
                this.hover(function () {
                    clearInterval(timer);
                }, function () {
                    timer = setInterval(function () {
                        next.click();
                    }, delay);
                });
            }

            // 10、小圆点滑过切换
            points.find('li').on('mouseenter', function () {
                current = $(this).index();
                ani(current);
            });

            // 封装动画的函数
            function ani(current) {
                points.find('li').eq(current).addClass('active').siblings().removeClass('active');
                imgs.eq(current).stop().fadeIn(duration).siblings().stop().fadeOut(duration);
            }
        }
    });
})(jQuery);
;(function () {
    'use strict';

    // $("#popup closee").on("click",function  () {
    //     $("#popup").css("display","none")
    //     console.log(1)
    // })


    $(".top .home-kind .kind a").hover(function () {
        $(this).css("color", "#ff1268");
    }, function () {
        $(this).css("color", "#000");
    });

    // 登录
    $(".top .rights-header .enroll").hover(function () {
        $(this).find("i").css("color", "#ff1268");
        $(this).find("ul").css("display", "block");
        $(this).find("ul li").on("mouseenter", function () {
            $(this).find("ul li").css("background-color", "red").siblings().css("background-color", "#fff");
        });
        $(this).find("ul li").on("mouseleave", function () {
            $(this).find("ul li").css("background-color", "#fff");
        });
    }, function () {
        $(this).find("i").css("color", "#000");
        $(this).find("ul").css("display", "none");
    });

    $(".top .rights-header .download").hover(function () {
        $(this).find("i").css("color", "#ff1268");
        $(this).find("div").css("display", "block");
    }, function () {
        $(this).find("i").css("color", "#000");
        $(this).find("div").css("display", "none");
    });

    var Home = function () {
        function Home() {
            _classCallCheck(this, Home);

            this.url = "http://localhost/Barley/dist/data/catch.json";
            this.cont = document.querySelector(".boxss");
            this.cont1 = document.querySelector(".bbox");

            this.load();
        }

        _createClass(Home, [{
            key: 'load',
            value: function load() {
                var _this = this;

                $.getJSON({
                    url: this.url,
                    success: function success(res) {
                        _this.res = res;
                        _this.display();
                    }
                });
            }
        }, {
            key: 'display',
            value: function display() {
                var str = "";
                for (var i = 0; i < this.res.length; i++) {
                    str += '<div class="boxs">\n                      <div class="head">\n                        <span class="head-title">' + this.res[i].title + '</span>\n                        <span class="head-more">' + this.res[i].more + '</span>\n                        <div class="box">\n                            <div class="box-left"><img src="' + this.res[i].img + '" alt="">\n                            <div class="box-left-info">\n                            <div class="title">' + this.res[i].name + '</div>\n\t\t\t\t\t\t\t<div class="price">' + this.res[i].price + '<span>\u8D77</span></div>\n                            </div>\n                            </div>\n                        <div class="box-right">';
                    for (var j = 0; j < this.res[i].childArr.length; j++) {
                        str += ' <div class="img">\n                        <img src="' + this.res[i].childArr[j].img + '" alt=""></div>\n                        <div class="iteninfo">\n                            <div class="title">' + this.res[i].childArr[j].title + '</div>\n                            <div class="venue">' + this.res[i].childArr[j].venue + '</div>\n                            <div class="showtime">' + this.res[i].childArr[j].showtime + '</div>\n                            <div class="price">' + this.res[i].childArr[j].price + '<span>\u8D77</span></div>\n                        </div>\n                    \n                   ';
                    }
                    str += '</div> </div></div></div>';
                }
                $(".boxss").html(str);
                //    this.cont.innerHTML = str;
            }
        }]);

        return Home;
    }();

    new Home();
})();
$(".loading .load-load div").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(".loading .load-cont>div").eq($(this).index()).addClass("active").siblings().removeClass("active");
});


// var phone = getCookie("phone");
// console.log(phone);
