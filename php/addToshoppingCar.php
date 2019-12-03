<?php
    @require_once("common.php");
    // addToShoppingCar.php

    $showNumber = $_POST["showNumber"];
    $itemid = $_POST["itemid"];
    $phone = $_POST["phone"];
    $showprice = $_POST["showprice"];
    $showimg = $_POST["showimg"];
    $showname = $_POST["showname"];
    // 新增之前应该判断 该用户 的 购物车 中的 该商品 是否存在  
    // 不存在   新增
    // 存在     数量更新

    $search_sql = "select * from `shopping` where phone = '$phone' and itemid = '$itemid' and showprice='$showprice'";
    $result = mysql_query($search_sql);

    $item = mysql_fetch_array($result);

    if($item){  //存在
        // echo "存在";
        //  buy_num = buy_num + 2    buy_num = 原来的数量 + 新的数量
        $update_sql = "update `shopping` set shownumber = shownumber + $showNumber where phone='$phone' and itemid ='$itemid' and showprice='$showprice';";
        mysql_query($update_sql);
    }else{  //不存在
        // echo "不存在";
         // 新增数据  ->  新增之前应该判断购物车中的该商品是否存在
        $add_sql = "insert into `shopping`(phone,itemid,shownumber,showprice,showimg,showname) values('$phone','$itemid','$showNumber','$showprice','$showimg','$showname')";
        mysql_query($add_sql);
    }
    

    $row = mysql_affected_rows();

    $msg = array();
    if($row>0){
        $msg["status"] = true;
        $msg["msg"] = "新增成功！";
    }else{
        $msg["status"] = false;
        $msg["msg"] = "新增失败！";
    }
    echo json_encode($msg);



   


?>