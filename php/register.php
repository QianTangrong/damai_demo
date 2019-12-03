<?php
 @require_once("common.php");

    // if($res){
    //     echo "成功！";
    // }

    $phone = $_POST["phone"];
    $pwd = $_POST["pwd"];
    //  (直接新增数据不够严谨,所以在新增之前判断用户名或手机号是否存在)

    $search_sql="SELECT * FROM `usersinfo` where  phone = '$phone'";

    $result = mysql_query($search_sql);
    
    $item = mysql_fetch_array($result);
    
    $msg = array();
    if($item){
        $msg["status"] = false;
        $msg["msg"] = "用户名或手机号已存在！";
    }else{
        // 新增数据 
        $insert_sql = "insert into `usersinfo`(phone,password) values('$phone','$pwd')";
        
        // echo $insert_sql;
        mysql_query($insert_sql); // 执行mysql语句

        $row = mysql_affected_rows(); //  $row>0  ,$row==0 , $row==-1   //语法问题

        $msg = array();
        if($row>0){
            $msg["status"] = true;
            $msg["msg"] = "新增成功！";
        }else{
            $msg["status"] = false;
            $msg["msg"] = "新增失败！";
        }
    }

    echo json_encode($msg); 












?>