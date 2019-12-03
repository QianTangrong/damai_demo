<?php
    @require_once("common.php");

    $itemid = $_GET["itemid"];
    $showprice = $_GET["showprice"];
    $flag = $_GET["bool"];   //  0   减法    1代表加法


    $msg = array();

    if($flag=="0"){
        $sql = "update `shopping` set shownumber = shownumber - 1 where itemid = '$itemid' and showprice = '$showprice'";
        
    }else if($flag == "1"){
        $sql = "update `shopping` set shownumber = shownumber + 1 where itemid = '$itemid' and showprice = '$showprice'";
    }else{
        
        $msg["status"] = false;
        $msg["msg"] = "参数错误！";
       
    }


    if($flag=="0"||$flag=="1"){
         mysql_query($sql);

        $row = mysql_affected_rows();

        $msg = array();
        
        if($row>0){
            $msg["status"] = true;
            $msg["msg"] = "修改成功！";
        }else{
            $msg["status"] = false;
            $msg["msg"] = "修改失败！";
        }

    }
   
    echo json_encode($msg);



?>