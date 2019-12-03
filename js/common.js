//用户名和用户头像
var phone = getCookie("phone");
    // console.log(phone);
var user = $(".userName");


    $(".shoppingCar").click(function(){
        location.href="login.html";
    })
    if(phone){
        user.html("地瓜");
        $(".userImg").attr("src","image/index/userImg.jpg");
        $(".exit").html("退出登录");
        $(".exit").click(function(){
            setCookie("phone",phone,-1, path = "/");
            location.reload();
        })
        $(".shoppingCar").html("购物车");
        $(".shoppingCar").click(function(){
            location.href = 'shoppingCar.html';
        })
    }

//获取地址栏的值的 办法
function GetQueryString(name)
{
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
var r = window.location.search.substr(1).match(reg);
if(r!=null)return unescape(r[2]); return null;
}

//点击搜索按钮搜索
$(".search-font").click(function(){
    var search_word = $(".search-frame").val();
    // console.log(search_word);
    if(search_word){
        setCookie("search_word",search_word,1,path = "/");
        location.href=`search.html`;
    }
})
