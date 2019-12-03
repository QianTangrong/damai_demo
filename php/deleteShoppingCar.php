<?php

    @require_once("common.php");

    $itemid = $_GET["itemid"];
    $phone = $_GET["phone"];
    $showprice = $_GET["showprice"];

    $sql = "delete from `shopping`where phone = '$phone' and itemid = '$itemid' and showprice='$showprice'";

    mysql_query($sql);

    $row = mysql_affected_rows();

    $msg = array();
    
    if($row>0){
        $msg["status"] = true;
        $msg["msg"] = "删除成功！";
    }else{
        $msg["status"] = false;
        $msg["msg"] = "删除失败！";
    }

    echo json_encode($msg);


?>