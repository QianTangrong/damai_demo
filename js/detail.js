//获取地址栏的 ID
function GetQueryString(name)
{
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
var r = window.location.search.substr(1).match(reg);
if(r!=null)return unescape(r[2]); return null;
}
var showID = GetQueryString("showID");
var itemid = GetQueryString("itemid");
console.log(itemid);



var price = 0;

//点击加入到购物车
//动态生成页面
if(showID=="null"){
    showID=itemid;
}
if(itemid!=showID){
itemid=showID;
}

    $.ajax({
        type:'POST',
        url:'php/detail.php',
        dataType:'json',
        data:{
            showID:showID,
            itemid:itemid
        },
        success:function(data){
            // console.log(data);
            html = "";
            for(let i = 0 ;i<data.length;i++){
                let item = data[i];
                // console.log(item);
                        
                var {ID,showname,showspace,showtime,shower,showcity,showimg,maxprice,showprice,itemid}=item;
                html+=`<div class="left_top" itemid="${itemid}">
                        
                <div class="itemImg box_Pic">
                    <img src="${showimg}"alt="" class="big_pic">
                    <div class="box1">
                        <img src="${showimg}" class="bigg_pic">
                    </div>
                </div>
                <div class="itemTxt">
                    <div class="show_name">
                        【 <span>${showcity}</span>】<span class="showname">${showname}</span>
                    </div>
                    <div class="show_date_box">
                        时间：<span class="show_date">${showtime}</span>
                    </div>
                    <div class="show_space_box">
                        场馆：<span class="show_city">${showcity}</span> 市 | <span class="show_space">${showspace}</span><span class="iconfont icon-didian"></span>
                    </div>
                    <div class="show_notice">
                        <span>预售</span>
                        <div>本商品为预售商品，正式开票后将在第一时间为您配送</div>
                        <div class="show_notice1">预售期间，由于主办未正式开票，下单后无法立即配送票品。一般演出前2-6周出票，待正式开票后将在第一时间为您配送，请耐心等待。纸质票购票后可在订单详情页查看物流信息</div>
                    </div>
                    <div class="show_notice_time">
                        <span class="iconfont icon-i"></span><span>场次时间均为演出当地时间</span>
                    </div>
                    <div class="show_select_time">
                        <div><span>场次</span></div>
                        <div class="show_time_box"><span class="show_time">${showtime}</span><span class="show_time_tips">预售</span></div>
                    </div>
                    <div class="show_select_price">
                        <div>票档</div>
                        <div class="show_minPrice_box show_price_box price_active"><span class="show_minPrice show_price">${showprice}</span>普通会员档</div>
                        <div class="show_maxPrice_box show_price_box"><span class="show_maxPrice show_price">${maxprice}</span>钻石会员档</div>
                    </div>
                    <div class="show_select_number">
                        <div>数量</div>
                        <div class="buy_number_adjust">
                            <span class="adjust_reduce">-</span>
                            <span class="adjust_number">1</span>
                            <span class="adjust_add">+</span>
                        </div>
                        <span class="adjust_noitce">每笔订单限购6张</span>
                    </div>
                    <div class="show_buy_price">
                        <div>合计</div>
                        <div class="price_notice"><span class="price_total">￥${price}</span><span class="price_count">登录后查看是否享受优惠</span></div>
                    </div>
                    <div class="buy_now">
                        <button class="buy_button">添加到购物车</button>
                    </div>
                </div>
            </div>`;
    
            }
            $(".leftBox").html(html);
           //放大镜
           $(".box_Pic").mousemove(function(e){
                    $(".box1").show();
                    var maxWidth = 200;
                    var maxHeight =290;
                    var e = e || window.event;
                    var x = e.pageX - $(".box_Pic").offset().left - 35;
                    var y = e.pageY - $(".box_Pic").offset().top - 35;
                    
                    if(x<0){
                        x=0
                    }
                    if(y<0){
                        y=0
                    }
                    if(x>200){
                        x=200
                    }
                    if(y>290){
                        y=290
                    }
                    $(".box1").css({
                        "left":x,
                        "top":y
                    })
                    
                    $(".bigg_pic").css({
                        "left":-2*x-35,
                        "top":-2*y-35
                    })
                    
                })
                $(".box_Pic").mouseleave(function(){
                    $(".box1").hide();
                })
           
            price = $(".price_active").children().html(); //获取 当前 价格档次
            $(".price_total").html("￥"+price);//初始化总价格
            
            buy_number = $(".adjust_number").html();//获取 当前 门票张数
    
            if(buy_number<2){//初始化 减号颜色变淡
                $(".adjust_reduce").css("color","#ccc");
            }
    
            //点击选择 的价格 档次时
            $(".leftBox").on("click",".show_price_box",function(){
            $(this).siblings().removeClass("price_active");//改变选中的和未被选中的样式
            $(this).addClass("price_active");
            $(".price_total").html("￥"+$(".price_active").children().html()*$(".adjust_number").html());//重新生成价格
            })
    
            //点击减号
            $(".adjust_reduce").click(function(){
                buy_number--;
                // price="￥"+$(".price_active").children().html()*$(".adjust_number").html();
                if(buy_number<2){
                    //让减号颜色变淡
                    $(".adjust_reduce").css("color","#ccc");
                    buy_number=1;
                }
                $(".adjust_number").html(buy_number);
                $(".price_total").html("￥"+$(".price_active").children().html()*$(".adjust_number").html());
            })
            //点击加号
            $(".adjust_add").click(function(){
                buy_number++;
                $(".adjust_reduce").css("color","#000");
                // price="￥"+$(".price_active").children().html()*$(".adjust_number").html();
                if(buy_number>6){
                    buy_number=6;
                }
                $(".adjust_number").html(buy_number);
                $(".price_total").html("￥"+$(".price_active").children().html()*$(".adjust_number").html());
            })
            //点击加入购物车
            $(".buy_button").click(function(){
                var show_price = $(".price_active").children().html();
                var show_number = $(".adjust_number").html();
                setCookie("shownumber", show_number, 1, path = "/");
                var itemid = $(".left_top").attr("itemid");
                var showname = $(".showname").html();
                // showname = encodeURIComponent(showname);
                var showimg = $(".big_pic").prop("src");
                // console.log(itemid);
                var phone = getCookie("phone");
                if(phone){
                   str=`shoppingCar.html?show_price=${show_price}&showID=${showID}&itemid=${itemid}&showimg=${showimg}&showname=${showname}`;
                    console.log(str);
    
                    location.href = str;
                }
                else{
                    if(confirm("当前未登录，请先登录")){
                        location.href=`login.html?showID=${showID}`;
                    };
                    
                }
            })
        }
    })


