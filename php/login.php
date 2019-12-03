<?php
 @require_once("common.php");

   
    $phone = $_POST["phone"];
    $pwd = $_POST["pwd"];

    
    $sql = "select * from `usersinfo` where  phone = '$phone'";

    $result = mysql_query($sql);  

    $item = mysql_fetch_array($result); 

    $msg = array();
    if($item){  
        // print_r($item);
        $sql_pwd = $item[3];
        if($sql_pwd==$pwd){
            $msg["status"]=true;
            $msg["msg"]="登录成功!";
        }else{
            $msg["status"]=false;
            $msg["msg"]="密码有误!";
        }

    }else{
        $msg["status"]=false;
        $msg["msg"]="该账号不存在!";
    }

    echo json_encode($msg);







?>