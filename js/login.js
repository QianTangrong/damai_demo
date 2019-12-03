//获取地址栏的 ID
function GetQueryString(name)
{
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
var r = window.location.search.substr(1).match(reg);
if(r!=null)return unescape(r[2]); return null;
}
var showID = GetQueryString("showID");

var phone_inp = $(".inp_phone");
var pwd_inp = $(".inp_pwd");
var btn = $(".btn");

// console.log(phone,pwd,btn);
btn.click(function(){
    var phone = phone_inp.val();
    var pwd = pwd_inp.val();
    console.log(phone,pwd);
    $.ajax({
        type:'POST',
        url:'php/login.php',
        data:{
            phone:phone,
            pwd:pwd
        },
        dataType:'json',
        success:function(data){
            console.log(data);
            if(data.status){
                setCookie("phone",phone,7, path = "/");
                if(showID){
                    location.href=`detail.html?showID=${showID}`
                }else{
                    location.href = "index.html";
                }
            }else{
                alert("账户不存在或密码错误");
            }
            
        }
    })
})

