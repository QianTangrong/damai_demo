var phone = $(".inp_phone");
var pwd = $(".inp_pwd");
var pwds = $(".inp_pwds");
var check = $(".check-p");
var doc = $(".checkBox_doc");
var phone_tips = $(".phone_tips");
var pwd_tips = $(".pwd_tips");
var pwds_tips = $(".pwds_tips");
var btn = $(".agree");
// console.log(btn);

//用户名规范检查

// var phone_flag = false;
// var pwd_flag = false;
// var pwds_flag = false;
phone.on("change focusout",function(){
    // phone_flag = false;
    // console.log("111");
    var phone_value = phone.val();
   
    if(phone_value){
        var reg = /^1\d{10}$/;
        if(reg.test(phone_value)){
            phone_tips.html("✔");
            phone_flag = true;
        }else{
            phone_tips.html("请输入正确的手机号");
        }
    }else{
        phone_tips.html("* 请输入手机号");
    }
    // return phone_flag;
})

//密码规范检查
pwd.on("change focusout",function(){
    // console.log("111");
    var pwd_value = pwd.val();
    // pwd_flag = false;
    if(pwd_value){
        var reg = /^\w+$/;
        if(reg.test(pwd_value)){
            pwd_tips.html("✔");
            pwd_flag = true;
        }else{
            pwd_tips.html("请输入规范密码");
        }
    }else{
        pwd_tips.html("* 请输入密码");
    }
    // return pwd_flag;

})
//确认密码规范检查
 pwds.on("change focusout",function(){
    // console.log("111");
    var pwds_value = pwds.val();
    var pwd_value = pwd.val();
    //  pwds_flag = false;
    if(pwds_value){
        // var reg = /^\d{6,20}$/;
        if(pwds_value==pwd_value){
            pwds_tips.html("✔");
            pwds_flag = true;
           
        }else{
            pwds_tips.html("* 两次输入密码不一致");
        }
    }else{
        pwds_tips.html("* 请确认密码");
    }
    // return pwds_flag;
})

btn.click(function(){
    // var pwds_value = pwds.val();
    var pwd_value = pwd.val();
    var phone_value = phone.val();
    // aa();bb();cc();
    // phone.on();pwd.on();pwds.on();
    if(check.html()=="验证成功"){
        if(doc.prop('checked')){

            if(phone_tips.html()=="✔"&&pwd_tips.html()=="✔"&&pwds_tips.html()=="✔"){
             //    console.log(phone_value);
             //    console.log("可以注册");
                 $.ajax({
                     type:'POST',
                     url:'php/register.php',
                     data:{phone:phone_value,pwd:pwd_value},
                     dataType:'json',
                     success:function(data){
                         if(data.status){
                             if(confirm("注册成功，是否立即登录?")){
                                 location.href ="login.html";
                             }
                         }else{
                            if(confirm("手机号已存在，是否登录?")) {
                             location.href ="login.html";
                            }
                         }
                     }
                 })
            }

        }else{
            $(".doc_tips").html("请阅读条例并勾选同意")
        }




    }else{
        $(".check_tips").html("请拖动滑块验证");
        // console.log("cuowu");
    }
})