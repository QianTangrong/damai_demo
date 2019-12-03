//获取地址栏的 ID
function GetQueryString(name)
{
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
var search = decodeURIComponent(window.location.search);
var r = search.substr(1).match(reg);
if(r!=null)return unescape(r[2]); return null;
}
var showID = GetQueryString("showID");
var showprice = GetQueryString("show_price");
var showNumber = GetQueryString("show_number");

var phone = getCookie("phone");
var itemid = GetQueryString("itemid");
var showimg = GetQueryString("showimg")
var showname = GetQueryString("showname");
var showNumber= getCookie("shownumber");
// console.log(showNumber);


 var all_show_number=0;
 var all_show_price=0;
if(itemid&&phone){
   
//动态生成请求数据
$.ajax({
        type:'POST',
        url:'php/addToshoppingCar.php',
        dataType:'json',
        data:{
           itemid,
           phone,
           showID,
           showNumber,
           showprice,
           showimg,
           showname
        },
        success:function(data){
            // console.log(phone);
            // console.log(data);
            $.ajax({
                type:'POST',
                url:'php/shoppingCarPage.php',
                dataType:'json',
                data:{
                    phone
                },
                success:function(data){
                    setCookie("shownumber", 0, -1, path = "/");
                    // console.log(data);
                    // showNumber=0;
                    html="";
                    
                for(let i = 0 ;i<data.length;i++){
                    let item = data[i];
                    all_show_number=all_show_number+item.shownumber*1;
                    all_show_price=all_show_price+item.shownumber*item.showprice;
                    // console.log(all_show_number,all_show_price);

                    var {ID,showname,showimg,itemid,shownumber,showprice}=item;
                    var showID = GetQueryString("showID");
                    // console.log(item);
                    html+=` <div class="show_item" itemid=${itemid} showID=${showID}>
                    <div class="show_item_check"><input type="checkbox" class="item_cheched"></div>
                    <div class="show_item_img">
                        <img src="${showimg}"
                            alt="">
                    </div>
                    <div class="show_item_name"><span>${showname}</span></div>
                    <div class="show_item_price">￥<span class="showprice">${showprice}</span></div>
                    <div class="show_item_adjust">
                        <div class="adjust_box">
                            <span class="adjust_reduce">-</span>
                            <span class="adjust_number">${shownumber}</span>
                            <span class="adjust_add">+</span>
                        </div>
                    </div>
                    <div class="show_item_total">
                        ￥<span>${shownumber*showprice}</span>
                    </div>
                    <div class="show_item_delete">
                       <span>删除</span> 
                    </div>
                </div>`
                }
                $(".item_box").html(html);
                add();//加号
                reduce();//减号
                item_checked();//选中一个
                find_check();//找到选中的商品
                del();
                img_href();
                name_href();
                all_checked()
                }

            })
        }
    })

}else{
    $.ajax({
        type:'POST',
        url:'php/shoppingCarPage.php',
        dataType:'json',
        data:{
            phone
        },
        success:function(data){
            // showNumber=0;
            // console.log(data);
            html="";
          
        for(let i = 0 ;i<data.length;i++){
            let item = data[i];
            all_show_number=all_show_number+item.shownumber*1;
            all_show_price=all_show_price+item.shownumber*item.showprice;
            // console.log(all_show_number,all_show_price);

            var {ID,showname,showimg,itemid,shownumber,showprice}=item;
            // console.log(item);
            html+=` <div class="show_item" itemid=${itemid} showID=${showID}>
            <div class="show_item_check"><input type="checkbox" class="item_cheched"></div>
            <div class="show_item_img">
                <img src="${showimg}"
                    alt="">
            </div>
            <div class="show_item_name"><span>${showname}</span></div>
            <div class="show_item_price">￥<span class="showprice">${showprice}</span></div>
            <div class="show_item_adjust">
                <div class="adjust_box">
                    <span class="adjust_reduce">-</span>
                    <span class="adjust_number">${shownumber}</span>
                    <span class="adjust_add">+</span>
                </div>
            </div>
            <div class="show_item_total">
                ￥<span>${shownumber*showprice}</span>
            </div>
            <div class="show_item_delete">
               <span>删除</span> 
            </div>
        </div>`
        }
        $(".item_box").html(html);
        add();//加号
        reduce();//减号
        item_checked();//选中一个
        find_check();//找到选中的商品
        del();
        img_href();
        name_href();
        all_checked()
        }

    })
}
//点击加号
function add(){
    $(".adjust_add").click(function(){
        var bool = 1;
        var itemid = $(this).parent().parent().parent().attr("itemid");
        var showprice = $(this).parent().parent().parent().children("div").eq(3).children(".showprice").html();
        var shownumber_box=$(this).parent().parent().parent().children("div").eq(4).children(".adjust_box").children(".adjust_number");
        var shownumber = $(this).parent().parent().parent().children("div").eq(4).children(".adjust_box").children(".adjust_number").html();
        var showtotal_box = $(this).parent().parent().parent().children("div").eq(5).children("span");
        var showtotal = $(this).parent().parent().parent().children("div").eq(5).children("span").html();
        // console.log(showtotal);
        $.ajax({
                type:'GET',
                url:'php/updateShoppingCar.php',
                dataType:'json',
                data:{
                    itemid,
                    showprice,
                    bool
                },
                success:function(data){
                    // console.log(data.status);
                    if(data.status){
                        // console.log(shownumber);
                        shownumber++;
                        showtotal=shownumber*showprice;
                        shownumber_box.html(shownumber);
                        showtotal_box.html(showtotal);
                        all_checked();
                    }
                    // show_item_total();
                    item_checked();
                    find_check();
                    
                }           
             })
    

    
})
}


//点击减号
function reduce(){
    $(".adjust_reduce").click(function(){
        var bool = 0;
        var itemid = $(this).parent().parent().parent().attr("itemid");
        var showprice = $(this).parent().parent().parent().children("div").eq(3).children(".showprice").html();
        var shownumber_box=$(this).parent().parent().parent().children("div").eq(4).children(".adjust_box").children(".adjust_number");
        var shownumber = $(this).parent().parent().parent().children("div").eq(4).children(".adjust_box").children(".adjust_number").html();
        var showtotal_box = $(this).parent().parent().parent().children("div").eq(5).children("span");
        var showtotal = $(this).parent().parent().parent().children("div").eq(5).children("span").html();
        // console.log(showprice);
        if(shownumber>1){
            $.ajax({
                    type:'GET',
                    url:'php/updateShoppingCar.php',
                    dataType:'json',
                    data:{
                        itemid,
                        showprice,
                        bool
                    },
                    success:function(data){
                        console.log(data.status);
                        // console.log(showprice,showNumber);
                        if(data.status){
                                // console.log(shownumber);
                                shownumber--;
                                if(shownumber<1){
                                    shownumber=1;
                                }
                                showtotal=shownumber*showprice;
                                shownumber_box.html(shownumber);  
                                showtotal_box.html(showtotal);
                                all_checked(); 
                        }
                        // show_item_total();
                        item_checked();
                        find_check();
                        
                    }           
                 })
        }

        
    })
    
}
//删除
function del(){
   $(".show_item_delete span").click(function(){
       var item_box = $(this).parent().parent();
       var itemid = $(this).parent().parent().attr("itemid");
       var showprice = $(this).parent().parent().children("div").eq(3).children(".showprice").html();
    //    console.log(phone);
        if(confirm("是否删除当前商品？")){
            $.ajax({
                type:'GET',
                url:'php/deleteShoppingCar.php',
                dataType:'json',
                data:{
                    itemid,
                    showprice,
                    phone
                },
                success:function(data){
                    // console.log(data);
                    if(data.status){
                        item_box.remove();
                    }
                }
            })

        } 
   })
}
//单选
function item_checked(){
    

    $(".show_item_check").click(function(){
        var item_check =  ($(this).children(".item_cheched"));//获取当前被选中的元素
        var itemid = $(this).parent().attr("itemid");//获取当前选中的商品 ID
        var shownumber = $(this).parent().children("div").eq(4).children(".adjust_box").children(".adjust_number").html();//获取当前商品的数量
        var showtotal = $(this).parent().children("div").eq(5).children("span").html();//获取当前商品的小计
        var all_price_box = $(".all_price");
        var all_price = $(".all_price").html();
        var all_number_box=$(".all_number");
        var all_number=$(".all_number").html();
        if(item_check.is(':checked')){
            all_number_box.html(shownumber);
            all_price_box.html(showtotal);

        }else{
            all_number_box.html("0");
            all_price_box.html(0);
        }   
        find_check();
    })
   
}
//全选
all_checked();
function all_checked(){
    // var  $("input:checked")
    $(".check_all_inp").click(function(){

        // var all_check_inp = $("input[type=checkbox]");
        // console.log(all_check_inp);
       

        var all_price_box = $(".all_price");
        var all_price = $(".all_price").html();
        var all_number_box=$(".all_number");
        var all_number=$(".all_number").html();

        // find_check();

        // console.log($(this));
        if($(".check_all_inp").is(':checked')){
            console.log(111);
            var all_check_inp = $("input[type=checkbox]");
            all_check_inp.prop("checked",true);
            all_number_box.html(all_show_number);
            all_price_box.html( all_show_price);
        }else{
            console.log(222);
            var all_check_inp = $("input[type=checkbox]");
            all_check_inp.prop("checked",false);
            all_number_box.html(0);
            all_price_box.html( 0);
        }
        find_check();
    })
}
 //找到所有被选中的 复选框
//  find_check();
 function find_check(){
    var all_itemcheck_num =  $(".item_cheched").size();
    var all_itemchecked_num =$(".item_cheched:checked").length;
    var all_price_box = $(".all_price");
    var all_price = $(".all_price").html();
    var all_number_box=$(".all_number");
    var all_number=$(".all_number").html();

    if(all_itemcheck_num==all_itemchecked_num){
        $(".check_all_inp").prop("checked",true);
        all_number_box.html(all_show_number);
        all_price_box.html( all_show_price);
    }
    else{
        $(".check_all_inp").prop("checked",false);
    }
 }
 //点击图片跳转
 function img_href(){
    $(".show_item_img").click(function(){
        var itemid = $(this).parent().attr("itemid");
        // console.log(itemid);
        location.href =`detail.html?showID=${showID}&itemid=${itemid}`
    })
 }
 //点击 演出 名字跳转
 function name_href(){
     $(".show_item_name span").click(function(){
        var itemid = $(this).parent().parent().attr("itemid");
        location.href =`detail.html?showID=${showID}&itemid=${itemid}`
     })
 }
 //获取所有的数量和价格
 function showPage(){
    $.ajax({

    })
 }