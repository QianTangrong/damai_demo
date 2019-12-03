//获取 cookie的 search_word
function getCookie(name) {
    var cookie = document.cookie;
    var dataList = cookie.split("; ");//用"; "分割
    var obj = {}
    for (var i = 0; i < dataList.length; i++) {
        var item = dataList[i].trim();// 去除首尾空格
        var key = item.split("=")[0];
        var val = item.split("=")[1];
        if (name == key) {
            return val;
        }
    }
    return "";
}
var search_word =  getCookie("search_word");
// console.log(search_word)
if(search_word){
    var word = search_word;
    $("input[class=search-frame]").val(word)
    // console.log(word);
    var sortBy =  $(".search_sort .search_sort_active").html();
    if(sortBy=="价格排序"){
        sortBy="showprice";
    }else if(sortBy=="推荐排序"){
        sortBy="showname";
    }else if(sortBy=="最近开场"){
        sortBy="showtime";
    }else{
        sortBy="showcity";
    }
    $.ajax({
        type:'POST',
        url:'php/searchSelect.php',
        dataType:'json',
        data:{
            word:word,
            sortBy : sortBy,
        },
        success:function(data){
            setCookie("search_word","",-1,path = "/");
            // console.log(data);
            html="";
            for(let i = 0 ;i<data.length;i++){
                let item = data[i];
                    // console.log(item);
                    
                    var {ID,showname,showspace,showtime,pricebetween,shower,showcity,showimg,itemid}=item;
                    html+=`<div class="items" showID="${ID}" itemid=${itemid}>
                    <div class="item_img">
                        <img src="${showimg}"
                            alt="">
                    </div>
                    <div class="item_txt">
                        <div class="item_txt_title">
                            【<span class='item_txt_city'>${showcity}</span>】
                            <span class="showname"  showID="${ID}">${showname}</span>
                        </div>
                        <div class="item_txt_singer item_time">
                            <span>艺人：</span><span class="item_singer">
                                ${shower}</span>
                        </div>
                        <div class="item_txt_space item_time">
                            <span class="iconfont icon-didian"></span>
                            ${showcity} | ${showspace}
    
                        </div>
                        <div class="item_txt_time  item_time">
                            <span class="iconfont icon-rili"></span>
                           ${showtime}
                        </div>
                        <div class="item_txt_price">
                        <span>${pricebetween}<i>元</i></span>售票中
                        </div>
                    </div>
                </div>`;
            }
            //动态生成
            $(".item_box").html(html);
            //获取所有数据条数
        var item_number =  $(".items").size();
        $(".item_number").html(item_number);

        var showList =$(".showname");
            // console.log(showList);
            showList.click(function(){
               var showID =  $(this).attr("showID");
            //    console.log(showID);
            location.href = `detail.html?showID=${showID}&itemid=${itemid}`
            })
        }
    })
}else{
    showPage();
}

function showPage(){
//获取城市
    var showcity_doc = $(".factor_item_1 .content_main_active");
    var showcity = showcity_doc.html();
    if (showcity=="全部"){
        showcity="*";
    }
//获取类型
    var showType_doc = $(".factor_item_2 .factor_content .content_main_active");
    var showtype = showType_doc.html();
    
    if (showtype=="全部"){
        showtype="*";
    }
//获取排序方式
    var sortBy =  $(".search_sort .search_sort_active").html();
        if(sortBy=="价格排序"){
            sortBy="showprice";
        }else if(sortBy=="推荐排序"){
            sortBy="showname";
        }else if(sortBy=="最近开场"){
            sortBy="showtime";
        }else{
            sortBy="showcity";
        }
//获取当前页码
var page = $(".page_index").html();
//ajax请求后台数据
        $.ajax({
            type:'POST',
            url:'php/sortSelect.php',
            dataType:'json',
            data:{
                showcity:showcity,
                showtype:showtype,
                sortBy : sortBy,
            },
            success:function(data){
                // console.log(data);
                html="";
                for(let i = 0 ;i<data.length;i++){
                    let item = data[i];
                        // console.log(item);
                        
                        var {ID,showname,showspace,showtime,pricebetween,shower,showcity,showimg,itemid}=item;
                        html+=`<div class="items"  showID="${ID}" itemid=${itemid}>
                        <div class="item_img">
                            <img src="${showimg}"
                                alt="">
                        </div>
                        <div class="item_txt">
                            <div class="item_txt_title">
                                【<span class='item_txt_city'>${showcity}</span>】
                                <span class="showname"  showID="${ID}">${showname}</span>
                            </div>
                            <div class="item_txt_singer item_time">
                                <span>艺人：</span><span class="item_singer">
                                    ${shower}</span>
                            </div>
                            <div class="item_txt_space item_time">
                                <span class="iconfont icon-didian"></span>
                                ${showcity} | ${showspace}
        
                            </div>
                            <div class="item_txt_time  item_time">
                                <span class="iconfont icon-rili"></span>
                               ${showtime}
                            </div>
                            <div class="item_txt_price">
                            <span>${pricebetween}<i>元</i></span>售票中
                            </div>
                        </div>
                    </div>`;
                }
                //动态生成
                $(".item_box").html(html);
                //获取所有数据条数
            var item_number =  $(".items").size();
            $(".item_number").html(item_number);
            //点击跳转并传id到地址栏
            var showList =$(".showname");
            showList.click(function(){
               var showID =  $(this).attr("showID");
               var itemid = $(".items").attr("itemid");
            location.href = `detail.html?showID=${showID}&itemid=${itemid}`
            })
            }
        })

    }
 //---------------------------------------------------------点击上一页
 $(".prevPage").click(function(){
    page--;
    if(page<1){
        page=1;
    }
    $(".page_index").html(page);

})
//----------------------------------------------------------点击下一页
$(".nextPage").click(function(){
    page++;
    if(page>2){
        page=2;
    }
    $(".page_index").html(page);
    // console.log(page);
})


//城市筛选
 var citys =  $(".factor_content_main span");
    citys.click(function(){
   
    $(".factor_content_main .content_main_all").removeClass("content_main_active");

    $(this).siblings().removeClass("content_main_active");
    $(this).addClass("content_main_active");
    
    showPage();

})

$(".factor_content_main .content_main_all").click(function(){
    $(".factor_content_main .factor_content span").removeClass("content_main_active");
})
//类型筛选
var type =  $(".factor_item_2 .factor_content span");
type.click(function(){
$(this).siblings().removeClass("content_main_active");
$(this).addClass("content_main_active");
    showPage();

}) 

//子类型筛选
var types =  $(".factor_item_3 .factor_content span");
types.click(function(){
$(this).siblings().removeClass("content_main_active");
$(this).addClass("content_main_active");

})

//时间筛选
var time =  $(".factor_item_4 .factor_content span");
time.click(function(){
$(this).siblings().removeClass("content_main_active");
$(this).addClass("content_main_active");

})

//排序方式
var sort_by = $(".search_sort .search_sort_item");
// console.log(sort_by);
    sort_by.click(function(){
        $(this).siblings().removeClass("search_sort_active");
        $(this).addClass("search_sort_active");
       showPage();
    })


    
//搜索功能
var search_btn = $(".search-font");
search_btn.click(function(){
    var word = $("input[class=search-frame]").val();
    // console.log(word);
    var sortBy =  $(".search_sort .search_sort_active").html();
    if(sortBy=="价格排序"){
        sortBy="showprice";
    }else if(sortBy=="推荐排序"){
        sortBy="showname";
    }else if(sortBy=="最近开场"){
        sortBy="showtime";
    }else{
        sortBy="showcity";
    }
    $.ajax({
        type:'POST',
        url:'php/searchSelect.php',
        dataType:'json',
        data:{
            word:word,
            sortBy : sortBy,
        },
        success:function(data){
            // console.log(data);
            html="";
            for(let i = 0 ;i<data.length;i++){
                let item = data[i];
                    // console.log(item);
                    
                    var {ID,showname,showspace,showtime,pricebetween,shower,showcity,showimg,itemid}=item;
                    html+=`<div class="items" showID="${ID}" itemid=${itemid}>
                    <div class="item_img">
                        <img src="${showimg}"
                            alt="">
                    </div>
                    <div class="item_txt">
                        <div class="item_txt_title">
                            【<span class='item_txt_city'>${showcity}</span>】
                            <span class="showname"  showID="${ID}">${showname}</span>
                        </div>
                        <div class="item_txt_singer item_time">
                            <span>艺人：</span><span class="item_singer">
                                ${shower}</span>
                        </div>
                        <div class="item_txt_space item_time">
                            <span class="iconfont icon-didian"></span>
                            ${showcity} | ${showspace}
    
                        </div>
                        <div class="item_txt_time  item_time">
                            <span class="iconfont icon-rili"></span>
                           ${showtime}
                        </div>
                        <div class="item_txt_price">
                        <span>${pricebetween}<i>元</i></span>售票中
                        </div>
                    </div>
                </div>`;
            }
            //动态生成
            $(".item_box").html(html);
            //获取所有数据条数
        var item_number =  $(".items").size();
        $(".item_number").html(item_number);

        var showList =$(".showname");
            // console.log(showList);
            showList.click(function(){
               var showID =  $(this).attr("showID");
            //    console.log(showID);
            location.href = `detail.html?showID=${showID}&itemid=${itemid}`
            })
        }
    })


})

